import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Suspense } from 'react'

import { Container } from '@/components/Container'
import { ContactStatusMessage } from '@/components/ContactStatusMessage'
import alecImage from '@/images/alec.jpg'

const servicesOffered = [
  'Comprehensive financial planning',
  'Insurance and risk management strategy',
  'Retirement planning solutions',
  'Income and cashflow guidance',
  'Tax-aware planning support',
  'Legacy and estate planning coordination',
]

const atAGlance = [
  'Personalized guidance for insurance and retirement planning',
  'Backed by AmeriLife\'s national carrier and advisor network',
  'Straightforward planning focused on long-term financial security',
]

const financialPlanningApproach = [
  'Discovery and goal mapping aligned to your timeline and household priorities',
  'Cashflow planning that balances current obligations with long-term accumulation',
  'Protection-first framework for income, liabilities, and family continuity',
  'Investment and retirement strategy reviews with disciplined annual checkpoints',
]

const clientFocusAreas = [
  'Retirement income durability and withdrawal planning',
  'Policy and coverage alignment with changing life stages',
  'Tax-efficient planning coordination across accounts and strategies',
  'Legacy, beneficiary, and estate-planning readiness',
]

const ameriLifeStats = [
  'Over 300,000 insurance agents and advisors',
  '114 marketing organizations',
  '52 insurance agency locations',
]

function Section({ id, title, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 space-y-4 border-t border-zinc-200 pt-8 first:border-none first:pt-0 dark:border-zinc-700/40"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      <div className="space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
        {children}
      </div>
    </section>
  )
}

function RequiredLabel({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
    >
      {children} <span className="text-red-500">*</span>
    </label>
  )
}

export default function Home() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  return (
    <Container className="mt-10 sm:mt-16">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />
      <div className="mx-auto max-w-6xl space-y-10">
        <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700/40 dark:bg-zinc-900/80">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-7 sm:p-10">
              <p className="inline-flex rounded-full bg-[#3fa590]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#3fa590]">
                AmeriLife Financial Services
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
                Alec Roedig
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                Personalized insurance and retirement planning support for
                individuals, families, and pre-retirees. The focus is practical,
                clear strategy that protects today and builds confidence for the
                future.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/60">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Category
                  </p>
                  <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Financial Services
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/60">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Partner
                  </p>
                  <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    AmeriLife
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/60">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Focus
                  </p>
                  <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Retirement Strategy
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3 text-sm">
                <Link
                  href="#contact"
                  className="inline-flex items-center rounded-md bg-[#3fa590] px-4 py-2 font-semibold text-white transition hover:bg-[#368f81]"
                >
                  Contact Alec
                </Link>
                <Link
                  href="https://amerilife.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-md border border-zinc-300 px-4 py-2 font-semibold text-zinc-700 transition hover:border-[#3fa590] hover:text-[#3fa590] dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-[#3fa590] dark:hover:text-[#3fa590]"
                >
                  Visit AmeriLife
                </Link>
              </div>
            </div>

            <div className="relative min-h-[380px] border-t border-zinc-200 bg-zinc-100 lg:border-t-0 lg:border-l dark:border-zinc-700/40 dark:bg-zinc-800">
              <Image
                src={alecImage}
                alt="Alec Roedig"
                priority
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
          </div>

          <div className="border-t border-zinc-200 p-7 sm:p-10 dark:border-zinc-700/40">
            <nav className="mb-9 flex flex-wrap gap-2 text-sm">
              <Link
                href="#profile"
                className="rounded-full border border-zinc-300 px-4 py-2 font-medium text-zinc-700 transition hover:border-[#3fa590] hover:text-[#3fa590] dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-[#3fa590] dark:hover:text-[#3fa590]"
              >
                Profile
              </Link>
              <Link
                href="#services"
                className="rounded-full border border-zinc-300 px-4 py-2 font-medium text-zinc-700 transition hover:border-[#3fa590] hover:text-[#3fa590] dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-[#3fa590] dark:hover:text-[#3fa590]"
              >
                Services
              </Link>
              <Link
                href="#financial-planning"
                className="rounded-full border border-zinc-300 px-4 py-2 font-medium text-zinc-700 transition hover:border-[#3fa590] hover:text-[#3fa590] dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-[#3fa590] dark:hover:text-[#3fa590]"
              >
                Financial Planning
              </Link>
              <Link
                href="#amerilife"
                className="rounded-full border border-zinc-300 px-4 py-2 font-medium text-zinc-700 transition hover:border-[#3fa590] hover:text-[#3fa590] dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-[#3fa590] dark:hover:text-[#3fa590]"
              >
                AmeriLife
              </Link>
              <Link
                href="#contact"
                className="rounded-full border border-zinc-300 px-4 py-2 font-medium text-zinc-700 transition hover:border-[#3fa590] hover:text-[#3fa590] dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-[#3fa590] dark:hover:text-[#3fa590]"
              >
                Contact
              </Link>
            </nav>

            <div className="space-y-10">
              <Section id="profile" title="Profile">
                <p>
                  Alec Roedig provides personalized guidance centered on insurance
                  protection, retirement readiness, and practical decision-making
                  across each life stage.
                </p>
                <ul className="space-y-3">
                  {atAGlance.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-2 w-2 rounded-full bg-[#3fa590]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="services" title="Services Offered">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {servicesOffered.map((service) => (
                    <li
                      key={service}
                      className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="financial-planning" title="Financial Planning Approach">
                <p>
                  Planning starts with clarity: where you are now, what you want
                  to achieve, and what risks could disrupt progress. From there,
                  each recommendation is designed to be actionable and measurable.
                </p>
                <ul className="space-y-3">
                  {financialPlanningApproach.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-2 w-2 rounded-full bg-[#3fa590]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="grid gap-3 sm:grid-cols-2">
                  {clientFocusAreas.map((area) => (
                    <div
                      key={area}
                      className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200"
                    >
                      {area}
                    </div>
                  ))}
                </div>
              </Section>

              <Section id="amerilife" title="About AmeriLife">
                <p>
                  AmeriLife's mission is to provide insurance and retirement
                  solutions that help people live longer, healthier lives. The
                  organization is a national leader in developing, marketing,
                  distributing, and administering life and health insurance,
                  annuities, and retirement planning solutions.
                </p>
                <ul className="space-y-3">
                  {ameriLifeStats.map((stat) => (
                    <li key={stat} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-2 w-2 rounded-full bg-[#3fa590]"
                        aria-hidden="true"
                      />
                      <span>{stat}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="contact" title="Contact">
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Fields marked with an * are required.
                </p>
                <div>
                  <Suspense fallback={null}>
                    <ContactStatusMessage />
                  </Suspense>
                </div>

                <form
                  method="post"
                  action="/api/contact"
                  className="grid gap-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-800/60 sm:p-6"
                >
                  <input
                    type="text"
                    name="company-website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div>
                    <label
                      htmlFor="contact-reference"
                      className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                    >
                      Contact
                    </label>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      This is for your reference only and cannot be changed.
                    </p>
                    <input
                      id="contact-reference"
                      name="contact-reference"
                      readOnly
                      value="Alec Roedig - AmeriLife"
                      className="mt-2 block w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-600 dark:bg-zinc-700/60 dark:text-zinc-200"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <RequiredLabel htmlFor="name">Name</RequiredLabel>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-[#3fa590] focus:ring-2 focus:ring-[#3fa590]/20 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                      />
                    </div>

                    <div>
                      <RequiredLabel htmlFor="email">Email</RequiredLabel>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-[#3fa590] focus:ring-2 focus:ring-[#3fa590]/20 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-[#3fa590] focus:ring-2 focus:ring-[#3fa590]/20 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <RequiredLabel htmlFor="message">Message</RequiredLabel>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-[#3fa590] focus:ring-2 focus:ring-[#3fa590]/20 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    {turnstileSiteKey ? (
                      <div
                        className="cf-turnstile"
                        data-sitekey={turnstileSiteKey}
                        data-theme="auto"
                      />
                    ) : (
                      <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700 dark:border-amber-400/40 dark:bg-amber-500/10 dark:text-amber-200">
                        Captcha site key is not configured yet.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-fit items-center rounded-md bg-[#3fa590] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#368f81]"
                  >
                    Send Message
                  </button>
                </form>
              </Section>
            </div>
          </div>
        </article>
      </div>
    </Container>
  )
}
