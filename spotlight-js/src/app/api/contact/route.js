export const runtime = 'nodejs'

const MAX_MESSAGE_LENGTH = 5000

function normalizeValue(value) {
  return String(value ?? '').trim()
}

function normalizeMessage(value) {
  return String(value ?? '').replace(/\r\n/g, '\n').trim()
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function redirectTo(path, request) {
  let location = path

  try {
    location = new URL(path, request.url).toString()
  } catch (error) {
    console.error('Failed to build redirect URL for contact route:', error)
    location = path.startsWith('/') ? path : '/'
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: location,
    },
  })
}

function getClientIp(request) {
  const cfIp = request.headers.get('cf-connecting-ip')
  if (cfIp) {
    return cfIp
  }

  const forwardedFor = request.headers.get('x-forwarded-for')
  if (!forwardedFor) {
    return ''
  }

  return forwardedFor.split(',')[0].trim()
}

async function verifyTurnstile({ token, ip, secretKey }) {
  const body = new URLSearchParams()
  body.append('secret', secretKey)
  body.append('response', token)

  if (ip) {
    body.append('remoteip', ip)
  }

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body,
    },
  )

  if (!response.ok) {
    return false
  }

  try {
    const data = await response.json()
    return data?.success === true
  } catch {
    return false
  }
}

async function sendEmailWithResend({
  apiKey,
  from,
  to,
  replyTo,
  subject,
  text,
  html,
}) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject,
      text,
      html,
    }),
  })

  let responseBody = ''

  try {
    responseBody = await response.text()
  } catch {
    responseBody = ''
  }

  return {
    ok: response.ok,
    status: response.status,
    body: responseBody,
  }
}

function parseResendError(body) {
  let parsed = null

  try {
    parsed = JSON.parse(body)
  } catch {
    parsed = null
  }

  const message = normalizeValue(parsed?.message || body).toLowerCase()
  const name = normalizeValue(parsed?.name).toLowerCase()

  return { message, name }
}

function isUnverifiedSenderDomainError(result) {
  if (result.ok) {
    return false
  }

  const error = parseResendError(result.body)
  const haystack = `${error.name} ${error.message}`

  return (
    haystack.includes('domain') &&
    (haystack.includes('verify') || haystack.includes('verified'))
  )
}

function isTestingRecipientLimitError(result) {
  if (result.ok) {
    return false
  }

  const error = parseResendError(result.body)
  const haystack = `${error.name} ${error.message}`

  return (
    haystack.includes('testing emails') &&
    haystack.includes('own email address')
  )
}

async function getRuntimeEnvValue(name) {
  const processValue = globalThis.process?.env?.[name]
  if (typeof processValue === 'string' && processValue.trim()) {
    return processValue.trim()
  }

  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    const cloudflareContext = await getCloudflareContext({ async: true })
    const cloudflareValue = cloudflareContext?.env?.[name]

    return typeof cloudflareValue === 'string' ? cloudflareValue.trim() : ''
  } catch {
    return ''
  }
}

export async function GET(request) {
  return redirectTo('/#contact', request)
}

export async function POST(request) {
  try {
    let formData

    try {
      formData = await request.formData()
    } catch (error) {
      console.error('Contact form payload could not be parsed:', error)
      return redirectTo('/?contact=invalid#contact', request)
    }

    // Honeypot field for basic bot filtering.
    const companyWebsite = normalizeValue(formData.get('company-website'))
    if (companyWebsite) {
      return redirectTo('/thank-you', request)
    }

    const reference =
      normalizeValue(formData.get('contact-reference')) ||
      'Alec Roedig - AmeriLife'
    const name = normalizeValue(formData.get('name'))
    const email = normalizeValue(formData.get('email')).toLowerCase()
    const phone = normalizeValue(formData.get('phone'))
    const message = normalizeMessage(formData.get('message'))
    const turnstileToken = normalizeValue(formData.get('cf-turnstile-response'))

    if (!name || !email || !message || !isValidEmail(email)) {
      return redirectTo('/?contact=invalid#contact', request)
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return redirectTo('/?contact=toolong#contact', request)
    }

    const resendApiKey = await getRuntimeEnvValue('RESEND_API_KEY')
    const resendFromEmail =
      (await getRuntimeEnvValue('CONTACT_FROM_EMAIL')) ||
      (await getRuntimeEnvValue('RESEND_FROM_EMAIL'))
    const resendFallbackFromEmail =
      (await getRuntimeEnvValue('RESEND_FALLBACK_FROM_EMAIL')) ||
      'Alec Roedig <onboarding@resend.dev>'
    const resendAllowFallbackSender = await getRuntimeEnvValue(
      'RESEND_ALLOW_FALLBACK_SENDER',
    )
    const contactToEmail = await getRuntimeEnvValue('CONTACT_TO_EMAIL')
    const turnstileSecretKey = await getRuntimeEnvValue('TURNSTILE_SECRET_KEY')

    const missingEnvVars = []

    if (!resendApiKey) {
      missingEnvVars.push('RESEND_API_KEY')
    }
    if (!resendFromEmail) {
      missingEnvVars.push('RESEND_FROM_EMAIL/CONTACT_FROM_EMAIL')
    }
    if (!contactToEmail) {
      missingEnvVars.push('CONTACT_TO_EMAIL')
    }
    if (!turnstileSecretKey) {
      missingEnvVars.push('TURNSTILE_SECRET_KEY')
    }

    if (missingEnvVars.length > 0) {
      console.error('Contact form environment variables are not fully configured.', {
        missing: missingEnvVars,
      })
      return redirectTo(
        `/?contact=unconfigured&missing=${encodeURIComponent(missingEnvVars.join(','))}#contact`,
        request,
      )
    }

    if (!turnstileToken) {
      return redirectTo('/?contact=captcha#contact', request)
    }

    const captchaPassed = await verifyTurnstile({
      token: turnstileToken,
      ip: getClientIp(request),
      secretKey: turnstileSecretKey,
    })

    if (!captchaPassed) {
      return redirectTo('/?contact=captcha#contact', request)
    }

    const submittedAt = new Date().toISOString()

    const text = [
      `Submitted at: ${submittedAt}`,
      `Reference: ${reference}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      '',
      'Message:',
      message,
    ].join('\n')

    const html = `
      <h2>New Contact Request</h2>
      <p><strong>Submitted at:</strong> ${escapeHtml(submittedAt)}</p>
      <p><strong>Reference:</strong> ${escapeHtml(reference)}</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;">${escapeHtml(message)}</pre>
    `

    const emailResult = await sendEmailWithResend({
      apiKey: resendApiKey,
      from: resendFromEmail,
      to: contactToEmail,
      replyTo: email,
      subject: `New Contact Request from ${name}`,
      text,
      html,
    })

    if (!emailResult.ok) {
      if (isTestingRecipientLimitError(emailResult)) {
        return redirectTo('/?contact=testing-limit#contact', request)
      }

      const fallbackSenderEnabled =
        resendAllowFallbackSender === 'true' ||
        (globalThis.process?.env?.NODE_ENV ?? '') !== 'production'
      const shouldTryFallbackSender =
        fallbackSenderEnabled &&
        resendFallbackFromEmail &&
        resendFallbackFromEmail !== resendFromEmail &&
        isUnverifiedSenderDomainError(emailResult)

      if (shouldTryFallbackSender) {
        const fallbackResult = await sendEmailWithResend({
          apiKey: resendApiKey,
          from: resendFallbackFromEmail,
          to: contactToEmail,
          replyTo: email,
          subject: `New Contact Request from ${name}`,
          text,
          html,
        })

        if (fallbackResult.ok) {
          console.warn(
            'Primary Resend sender domain is unverified. Delivered with fallback sender.',
          )
          return redirectTo('/thank-you', request)
        }

        console.error('Resend fallback sender also failed.', {
          status: fallbackResult.status,
          body: fallbackResult.body.slice(0, 500),
        })

        if (isTestingRecipientLimitError(fallbackResult)) {
          return redirectTo('/?contact=testing-limit#contact', request)
        }
      }

      console.error('Resend failed to deliver the contact email.', {
        status: emailResult.status,
        body: emailResult.body.slice(0, 500),
      })
      return redirectTo('/?contact=delivery#contact', request)
    }

    return redirectTo('/thank-you', request)
  } catch (error) {
    console.error('Contact form submission failed:', error)
    return redirectTo('/?contact=error#contact', request)
  }
}
