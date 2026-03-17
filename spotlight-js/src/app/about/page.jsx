import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata = {
  title: 'About',
  description:
    'About Alec Roedig and the planning philosophy behind his work with AmeriLife.',
}

export default function About() {
  return (
    <SimpleLayout
      title="About Alec Roedig"
      intro="Alec focuses on practical insurance and retirement planning for individuals and families who want clear recommendations and long-term confidence."
    >
      <div className="max-w-3xl space-y-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">
        <p>
          The planning process is built around transparency, structure, and
          accountability. Recommendations are tailored to real-world priorities,
          including income protection, retirement readiness, and family security.
        </p>
        <p>
          Alec works through AmeriLife's broad network of carrier and planning
          resources to align each strategy with client goals, risk tolerance,
          and timeline.
        </p>
        <p>
          Every engagement is designed to simplify complex decisions and create
          a plan clients can execute with confidence.
        </p>
      </div>
    </SimpleLayout>
  )
}
