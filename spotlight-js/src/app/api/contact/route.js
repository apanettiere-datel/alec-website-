import { NextResponse } from 'next/server'

export const runtime = 'edge'

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
  return NextResponse.redirect(new URL(path, request.url), 303)
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

  const data = await response.json()
  return data?.success === true
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

  return response.ok
}

export async function GET(request) {
  return redirectTo('/#contact', request)
}

export async function POST(request) {
  try {
    const formData = await request.formData()

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

    const resendApiKey = process.env.RESEND_API_KEY
    const resendFromEmail = process.env.RESEND_FROM_EMAIL
    const contactToEmail = process.env.CONTACT_TO_EMAIL
    const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY

    if (
      !resendApiKey ||
      !resendFromEmail ||
      !contactToEmail ||
      !turnstileSecretKey
    ) {
      console.error('Contact form environment variables are not fully configured.')
      return redirectTo('/?contact=unconfigured#contact', request)
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

    const emailSent = await sendEmailWithResend({
      apiKey: resendApiKey,
      from: resendFromEmail,
      to: contactToEmail,
      replyTo: email,
      subject: `New Contact Request from ${name}`,
      text,
      html,
    })

    if (!emailSent) {
      console.error('Resend failed to deliver the contact email.')
      return redirectTo('/?contact=error#contact', request)
    }

    return redirectTo('/thank-you', request)
  } catch (error) {
    console.error('Contact form submission failed:', error)
    return redirectTo('/?contact=error#contact', request)
  }
}
