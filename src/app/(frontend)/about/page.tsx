// src/app/(frontend)/about/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

const SITE_URL = 'https://ibill.pk'

export const metadata: Metadata = {
  title: 'About PakBill | Pakistan Electricity Bill Checker',
  description:
    'Learn about PakBill, a free platform that helps electricity consumers in Pakistan check duplicate bills online using the official PITC billing system.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About PakBill | Pakistan Electricity Bill Checker',
    description:
      'A free, independent platform connecting electricity consumers across Pakistan to their official PITC bill data — instantly, with nothing stored.',
    url: `${SITE_URL}/about`,
    siteName: 'PakBill',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About PakBill | Pakistan Electricity Bill Checker',
    description:
      'A free, independent platform connecting electricity consumers across Pakistan to their official PITC bill data.',
  },
}

const discos = [
  { code: 'LESCO', name: 'Lahore Electric Supply Company' },
  { code: 'MEPCO', name: 'Multan Electric Power Company' },
  { code: 'FESCO', name: 'Faisalabad Electric Supply Company' },
  { code: 'IESCO', name: 'Islamabad Electric Supply Company' },
  { code: 'GEPCO', name: 'Gujranwala Electric Power Company' },
  { code: 'PESCO', name: 'Peshawar Electric Supply Company' },
  { code: 'HESCO', name: 'Hyderabad Electric Supply Company' },
  { code: 'SEPCO', name: 'Sukkur Electric Power Company' },
  { code: 'QESCO', name: 'Quetta Electric Supply Company' },
  { code: 'TESCO', name: 'Tribal Electric Supply Company' },
  { code: 'HAZECO', name: 'Hazara Electric Supply Company' },
]

const trustPoints = [
  'Free to use with no hidden charges.',
  'Instant access to duplicate electricity bills.',
  'Works seamlessly on desktop, tablet, and mobile devices.',
  'No registration or account creation required.',
  'Your reference number and billing information are never stored.',
  'Supports all major electricity distribution companies (DISCOs) in Pakistan.',
  'Provides a clean, fast, and user-friendly experience.',
]

const steps = [
  {
    title: 'Select your DISCO',
    text: 'Choose your electricity distribution company. Not sure which one? It\u2019s printed at the top of your last bill.',
  },
  {
    title: 'Enter your reference number',
    text: 'Type your 14-digit reference number or customer ID. Digits only.',
  },
  {
    title: 'View your bill',
    text: 'PakBill routes you straight to the official PITC portal with your full bill.',
  },
]

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About PakBill',
  url: `${SITE_URL}/about`,
  description:
    'PakBill is an independent platform that helps electricity consumers in Pakistan check duplicate bills online via the official PITC billing system.',
  mainEntity: {
    '@type': 'Organization',
    name: 'PakBill',
    url: SITE_URL,
    description:
      'Free electricity bill checker for all Pakistani DISCOs, sourced directly from PITC.',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ================= Hero ================= */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-off-white to-card">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0 60 H180 V140 H420 V60 H800"
            fill="none"
            stroke="var(--color-accent-blue)"
            strokeWidth="2"
          />
          <path
            d="M0 340 H240 V260 H520 V340 H800"
            fill="none"
            stroke="var(--color-accent-blue)"
            strokeWidth="2"
          />
          <circle cx="180" cy="60" r="4" fill="var(--color-accent-blue)" />
          <circle cx="420" cy="140" r="4" fill="var(--color-accent-blue)" />
          <circle cx="240" cy="340" r="4" fill="var(--color-accent-blue)" />
          <circle cx="520" cy="260" r="4" fill="var(--color-accent-blue)" />
        </svg>

        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-16 text-center sm:px-6 sm:pt-12 sm:pb-20 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-accent-blue shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-2 w-2 rounded-full bg-accent-blue motion-safe:animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-accent-blue" />
            </span>
            About PakBill
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-heading sm:text-5xl lg:text-6xl">
            The bridge between you
            <span className="block text-accent-blue">and your electricity bill</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-body">
            PakBill connects you straight to the official PITC billing system — enter your Reference
            Number or Customer ID and get your bill in seconds. No registration, no hidden charges,
            and nothing stored.
          </p>
        </div>
      </section>

      {/* ================= What / How — two columns, each suited to its own content ================= */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-heading sm:text-3xl">What is PakBill?</h2>
            <p className="mt-5 leading-8 text-body">
              PakBill is an independent utility platform created to help electricity consumers check
              duplicate electricity bills online without searching through multiple official
              websites. Whether you need to view, download, or print your latest bill, PakBill
              provides a simple interface that directs you to the official PITC billing system.
            </p>
            <p className="mt-4 leading-8 text-body">
              We never generate or store bills ourselves. Your request goes directly to PITC —
              we&apos;re simply a faster, cleaner way to reach it.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-heading sm:text-3xl">How it works</h2>
            <ol className="mt-5 space-y-5">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent-blue/10 text-sm font-bold text-accent-blue">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-heading">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-body">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ================= Supported DISCOs — breaker panel (signature element) ================= */}
      <section className="bg-card px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-heading sm:text-3xl">
              Supported distribution companies
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-body">
              PakBill connects to every major DISCO operating under the PITC billing system — think
              of this as the panel.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {discos.map((d) => (
              <div
                key={d.code}
                className="group rounded-xl border border-border bg-off-white p-4 transition-colors hover:border-accent-blue/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-heading">{d.code}</span>
                  {/* Breaker toggle — flicks "on" on hover, the one deliberate motion moment on this page */}
                  <span className="relative h-3 w-6 flex-shrink-0 rounded-full bg-accent-blue/15">
                    <span className="absolute left-0.5 top-0.5 h-2 w-2 rounded-full bg-accent-blue transition-transform duration-300 group-hover:translate-x-3" />
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-muted">{d.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Why use PakBill — checklist, no artificial sequence ================= */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-heading sm:text-3xl">Why use PakBill?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-body">
              Simple, fast, and accessible for consumers across Pakistan.
            </p>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-blue/10 text-xs font-bold text-accent-blue">
                  ✓
                </span>
                <span className="text-sm leading-6 text-body">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= Disclaimer — visually distinct, plain, no motion ================= */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-off-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-heading">Disclaimer</h2>
          <p className="mt-4 leading-8 text-body">
            PakBill is an independent third-party information service and is not affiliated with
            WAPDA, PITC, NEPRA, or any electricity distribution company operating in Pakistan.
          </p>
          <p className="mt-4 leading-8 text-body">
            All electricity billing information is obtained directly from the official PITC billing
            system. For billing corrections, complaints, new connections, meter issues, or official
            support, please contact your respective electricity distribution company.
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-lg sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-blue/10 blur-3xl" />
          <h2 className="relative text-2xl font-bold text-heading sm:text-3xl">
            Ready to check your electricity bill?
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-body">
            Check your latest duplicate electricity bill in seconds using the official PITC billing
            system.
          </p>
          <Link
            href="/"
            className="relative mt-8 inline-flex rounded-xl bg-accent-blue px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-accent-blue-dark"
          >
            Check your bill
          </Link>
        </div>
      </section>
    </>
  )
}
