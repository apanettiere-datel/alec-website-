import { SimpleLayout } from '@/components/SimpleLayout'

const focusAreas = [
  {
    title: 'Retirement Income Strategy',
    description:
      'Build a coordinated income plan designed to support lifestyle needs throughout retirement.',
  },
  {
    title: 'Insurance and Risk Protection',
    description:
      'Evaluate existing policies and close gaps that could impact family and long-term plans.',
  },
  {
    title: 'Tax-Aware Financial Planning',
    description:
      'Coordinate planning decisions with tax impact in mind to improve long-term outcomes.',
  },
  {
    title: 'Legacy and Estate Alignment',
    description:
      'Ensure beneficiary, ownership, and transfer strategies reflect current goals and obligations.',
  },
]

export const metadata = {
  title: 'Planning Focus Areas',
  description:
    'Core financial planning areas Alec Roedig helps clients prioritize and execute.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Planning Focus Areas"
      intro="These are the core areas Alec helps clients structure, monitor, and improve over time."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        {focusAreas.map((item) => (
          <li
            key={item.title}
            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800/60"
          >
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </SimpleLayout>
  )
}
