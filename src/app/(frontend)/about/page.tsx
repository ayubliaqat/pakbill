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

/** A section wrapped by the "live wire" trace — a node dot plus vertical line connecting it to the next. */
function WireSection({
  title,
  children,
  isLast = false,
}: {
  title: string
  children: React.ReactNode
  isLast?: boolean
}) {
  return (
    <div className="relative pl-10 sm:pl-14">
      {/* Node */}
      <span className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center sm:h-5 sm:w-5">
        <span className="absolute h-4 w-4 rounded-full bg-accent-blue/20 motion-safe:animate-ping sm:h-5 sm:w-5" />
        <span className="relative h-2.5 w-2.5 rounded-full bg-accent-blue sm:h-3 sm:w-3" />
      </span>

      {/* Wire trace down to next node */}
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-[7px] top-6 w-px bg-gradient-to-b from-accent-blue/50 to-border sm:left-[9px] sm:top-7"
          style={{ height: 'calc(100% + 3.5rem)' }}
        />
      )}

      <h2 className="text-2xl font-bold text-heading sm:text-3xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  )
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

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#F8FBFF] to-[#F5F7FA]">
        {/* Ambient circuit-line backdrop */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <path d="M0 60 H180 V140 H420 V60 H800" fill="none" stroke="#3D7FFF" strokeWidth="2" />
          <path d="M0 340 H240 V260 H520 V340 H800" fill="none" stroke="#3D7FFF" strokeWidth="2" />
          <circle cx="180" cy="60" r="4" fill="#3D7FFF" />
          <circle cx="420" cy="140" r="4" fill="#3D7FFF" />
          <circle cx="240" cy="340" r="4" fill="#3D7FFF" />
          <circle cx="520" cy="260" r="4" fill="#3D7FFF" />
        </svg>

        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
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

      {/* Main Content — connected by the wire trace */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-16 sm:space-y-20">
          <WireSection title="What is PakBill?">
            <p className="leading-8 text-body">
              PakBill is an independent utility platform created to help electricity consumers check
              duplicate electricity bills online without searching through multiple official
              websites. Whether you need to view, download, or print your latest bill, PakBill
              provides a simple interface that directs you to the official PITC billing system.
            </p>
            <p className="mt-4 leading-8 text-body">
              Our service is completely free and works on desktop, tablet, and mobile devices. We
              focus on providing a clean, fast, and reliable experience for consumers across
              Pakistan.
            </p>
          </WireSection>

          <WireSection title="How does PakBill work?">
            <p className="leading-8 text-body">
              PakBill does not generate electricity bills or maintain a billing database. When you
              enter your Reference Number or Customer ID and select{' '}
              <strong className="text-heading">Show my bill</strong>, your request is sent directly
              to the official PITC billing portal. The duplicate bill you see is retrieved from the
              official source, live.
            </p>
            <p className="mt-4 leading-8 text-body">
              We never store your reference number, customer ID, or billing information. PakBill
              simply provides an easier way to reach the official billing system.
            </p>
          </WireSection>

          <WireSection title="Supported distribution companies">
            <p className="text-body">
              PakBill currently connects to all major electricity distribution companies (DISCOs)
              operating under the PITC billing system.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {discos.map((d) => (
                <div
                  key={d.code}
                  className="group rounded-xl border border-border bg-card p-3.5 transition-colors hover:border-accent-blue/40 sm:p-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                      <span className="absolute h-1.5 w-1.5 rounded-full bg-emerald-500/40 motion-safe:animate-ping" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-sm font-bold text-heading">{d.code}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-5 text-muted">{d.name}</p>
                </div>
              ))}
            </div>
          </WireSection>

          <WireSection title="Why use PakBill?">
            <p className="leading-8 text-body">
              PakBill is designed to make checking electricity bills simple, fast, and accessible
              for consumers across Pakistan. Here&apos;s why thousands of users rely on our
              platform:
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
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
          </WireSection>

          <WireSection title="Disclaimer" isLast>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <p className="leading-8 text-body">
                PakBill is an independent third-party information service and is not affiliated with
                WAPDA, PITC, NEPRA, or any electricity distribution company operating in Pakistan.
              </p>
              <p className="mt-4 leading-8 text-body">
                All electricity billing information is obtained directly from the official PITC
                billing system. For billing corrections, complaints, new connections, meter issues,
                or official support, please contact your respective electricity distribution
                company.
              </p>
            </div>
          </WireSection>
        </div>

        {/* CTA */}
        <div className="mx-auto mt-16 max-w-4xl sm:mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-lg sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-blue/10 blur-3xl" />
            <h2 className="relative text-2xl font-bold text-heading sm:text-3xl">
              Ready to check your electricity bill?
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-body">
              Check your latest duplicate electricity bill in seconds using the official PITC
              billing system.
            </p>
            <Link
              href="/"
              className="relative mt-8 inline-flex rounded-xl bg-accent-blue px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-accent-blue-dark"
            >
              Check your bill
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
