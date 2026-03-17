import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata = {
  title: 'Message received',
  description: 'Thanks for reaching out.',
}

export default function ThankYou() {
  return (
    <SimpleLayout
      title="Thank you for reaching out."
      intro="Your message was submitted successfully. Alec or a member of the AmeriLife team will follow up with you soon."
    />
  )
}
