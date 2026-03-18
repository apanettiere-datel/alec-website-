'use client'

import { useSearchParams } from 'next/navigation'

const contactStatusMessages = {
  invalid: 'Please complete all required fields with a valid email address.',
  toolong: 'Message is too long. Please keep it under 5,000 characters.',
  unconfigured: 'Contact form is not fully configured yet. Please try again shortly.',
  captcha: 'Captcha verification failed. Please complete the captcha and try again.',
  delivery:
    'We could not deliver your message yet. Please verify the Resend sender domain and try again.',
  'testing-limit':
    'Resend is currently in testing mode for this account. Send to your account email, or verify a domain in Resend to deliver to other recipients.',
  error: 'We could not send your message right now. Please try again.',
}

export function ContactStatusMessage() {
  const searchParams = useSearchParams()
  const status = searchParams.get('contact')
  const message = status ? contactStatusMessages[status] : null

  if (!message) {
    return null
  }

  return (
    <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200">
      {message}
    </p>
  )
}
