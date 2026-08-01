// src/app/(frontend)/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import BillChecker from '@/components/form/BillChecker'
import { discos } from '@/data/discos'
import Image from 'next/image'

const SITE_URL = 'https://ibill.pk'

export const metadata: Metadata = {
  title: 'Check Electricity Bill Online Pakistan | PakBill',
  description:
    'Check your electricity bill online for all Pakistani DISCOs — LESCO, MEPCO, FESCO, IESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, HAZECO & K-Electric. Free, instant, direct PITC data.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Check Electricity Bill Online Pakistan | PakBill',
    description:
      'Free, instant electricity bill checker for all Pakistani DISCOs plus K-Electric. Direct from official PITC data — no login, no data stored.',
    url: SITE_URL,
    siteName: 'PakBill',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: '/logos/banner.png',
        width: 1200,
        height: 630,
        alt: 'PakBill — Check your electricity bill online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Check Electricity Bill Online Pakistan | PakBill',
    description: 'Free, instant electricity bill checker for all Pakistani DISCOs plus K-Electric.',
    images: ['/logos/banner.png'],
  },
}

const faqs = [
  {
    q: 'How do I check my electricity bill online in Pakistan?',
    a: 'Select your DISCO from the checker above, enter your 14-digit reference number or customer ID, and click "Show my bill". The official PITC bill page opens in a new tab.',
  },
  {
    q: 'Where do I find my reference number?',
    a: 'Your 14-digit reference number is printed in the top-left section of your physical electricity bill, just below your consumer name. Skip any trailing letter like "U" or "R".',
  },
  {
    q: 'Is PakBill free and safe to use?',
    a: "Yes, completely free. PakBill does not store or access your billing data — your request connects directly to the official PITC portal. We're simply a faster, cleaner interface for it.",
  },
  {
    q: 'Which DISCOs are supported?',
    a: 'All 11 major DISCOs — LESCO, MEPCO, FESCO, IESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, HAZECO — plus K-Electric for Karachi.',
  },
  {
    q: 'Why is my bill not showing?',
    a: "Double-check you selected the right DISCO and entered all digits with no spaces or letters. If it still fails, it's usually temporary PITC server maintenance — try again shortly.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PakBill',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PakBill',
  url: SITE_URL,
  logo: `${SITE_URL}/logos/banner.png`,
  description:
    'Free electricity bill checker for all Pakistani DISCOs, sourced directly from PITC.',
}

const stats = [
  { value: '11', label: 'DISCOs Covered' },
  { value: '100%', label: 'Free Forever' },
  { value: '0', label: 'Data Stored' },
  { value: '24/7', label: 'Always Available' },
]

const steps = [
  {
    title: 'Select your DISCO',
    text: 'Choose your electricity distribution company from the dropdown. Not sure which one? Check your old bill — the DISCO name is printed at the top.',
  },
  {
    title: 'Enter your reference number',
    text: 'Type your 14-digit reference number, or use your customer ID instead. Digits only — no letters or spaces.',
  },
  {
    title: 'View your bill',
    text: 'Click "Show my bill" and you\u2019ll be routed to the official PITC portal with your full bill — amount due, due date, units consumed, and payment status.',
  },
]

const features = [
  {
    icon: '🔒',
    title: 'Your data is safe',
    text: 'We never store, log, or process your reference number. Your request goes directly to PITC.',
  },
  {
    icon: '⚡',
    title: 'Instant results',
    text: 'Bills load in seconds via the official PITC infrastructure — same as visiting their site directly.',
  },
  {
    icon: '💰',
    title: '100% free',
    text: 'No registration, no subscription, no hidden charges. Always free, always open.',
  },
  {
    icon: '🗺️',
    title: 'All of Pakistan',
    text: 'Every DISCO covered, from Lahore to Quetta, Peshawar to Karachi.',
  },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* ================= Hero ================= */}
      <section id="checker" className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/logos/banner.png"
            alt="Electricity transmission grid at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/55" />
        </div>

        <div className="relative mx-auto flex max-w-[1500px] items-center px-4 py-10 sm:px-6 sm:py-14 lg:px-20 lg:py-16">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            {/* Form — first on mobile, right column on desktop */}
            <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
              <BillChecker />
            </div>

            {/* Text content — second on mobile, left column on desktop */}
            <div className="order-2 max-w-2xl lg:order-1">
              <span className="inline-flex rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg sm:px-4 sm:py-2 sm:text-sm">
                Official PITC Electricity Bill Lookup
              </span>

              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="block text-gray-300 drop-shadow-lg">Check Your</span>
                <span className="block text-blue-300 drop-shadow-lg">Electricity Bill online</span>
                <span className="block text-gray-300 drop-shadow-lg"> in Seconds</span>
              </h1>

              <div className="mt-6 rounded-2xl border border-white/15 bg-black/20 p-4 backdrop-blur-md sm:mt-8 sm:p-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                      ✓
                    </span>
                    <span className="text-sm font-medium text-slate-100">Official PITC Source</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                      ✓
                    </span>
                    <span className="text-sm font-medium text-slate-100">
                      We Never Store Your Data
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                      ✓
                    </span>
                    <span className="text-sm font-medium text-slate-100">
                      No Registration Required
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                      ✓
                    </span>
                    <span className="text-sm font-medium text-slate-100">100% Free Forever</span>
                  </div>
                </div>
              </div>

              {/* Stats bar */}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:mt-8 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="text-center sm:text-left">
                    <div className="text-2xl font-bold text-white drop-shadow sm:text-3xl">
                      {s.value}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-300 sm:text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCO Grid */}
      <section className="bg-card px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-sm font-semibold text-accent-blue">Select Your DISCO</span>
            <h2 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">
              Your Electricity Distribution Company
            </h2>
            <p className="mt-3 text-body">
              Click any DISCO below to open its dedicated bill checker page.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {discos.map((d) => (
              <Link
                key={d.code}
                href={`/${d.code}`}
                className="disco-card group relative overflow-hidden rounded-2xl border border-gray-200 bg-[#F7F7F6] p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ '--brand': d.color } as React.CSSProperties}
              >
                <div
                  className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ backgroundColor: d.color }}
                />

                <div className="flex items-start justify-between">
                  <Image
                    src={d.logo}
                    alt={`${d.name} logo`}
                    width={50}
                    height={50}
                    className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    {d.badge}
                  </span>
                </div>

                <div className="mt-5">
                  <h3
                    className="text-xl font-bold tracking-tight sm:text-2xl"
                    style={{ color: d.color }}
                  >
                    {d.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{d.fullName}</p>
                </div>

                <div className="mt-4 flex items-start gap-2 text-sm text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-0.5 h-5 w-5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{d.region}</span>
                </div>

                <div className="my-5 border-t border-gray-200" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Official PITC</span>
                  <span className="disco-button rounded-lg border px-4 py-2 text-sm font-semibold">
                    Check Bill →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-sm font-semibold text-accent-blue">Simple Process</span>
            <h2 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">
              How to Check Your Bill
            </h2>
            <p className="mt-3 text-body">
              Three steps. Takes under 10 seconds. No login required.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="rounded-xl border border-border bg-[#F7F7F6] p-6 text-center sm:text-left"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue/10 text-sm font-semibold text-accent-blue-dark sm:mx-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-3 font-semibold text-heading">{s.title}</h3>
                <p className="mt-2 text-sm text-body">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why PakBill */}
      <section className="bg-[#F7F7F6] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-sm font-semibold text-accent-blue">Why PakBill</span>
            <h2 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">
              Fast, Free &amp; Trustworthy
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-6 text-center sm:text-left"
              >
                <div className="mx-auto text-2xl sm:mx-0">{f.icon}</div>
                <h3 className="mt-3 font-semibold text-heading">{f.title}</h3>
                <p className="mt-2 text-sm text-body">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — proper accordion */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="text-sm font-semibold text-accent-blue">FAQ</span>
            <h2 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-10 space-y-3 sm:space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-border bg-[#F7F7F6] open:border-accent-blue open:bg-white open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium text-heading marker:content-['']">
                  <span>{f.q}</span>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-accent-blue transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-sm leading-6 text-body">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#F7F7F6] px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
        <h2 className="text-xl font-bold text-accent-blue sm:text-2xl lg:text-3xl">
          Ready to check your bill?
        </h2>
        <p className="mt-2 text-body">Select your DISCO above and view your bill in seconds.</p>
        <Link
          href="/#checker"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-accent-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-blue-dark"
        >
          Check My Bill Now
        </Link>
      </section>
    </>
  )
}
