// src/app/(frontend)/pesco/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import { discos, getDiscoByCode } from '@/data/discos'
import BillChecker from '@/components/form/BillChecker'

const SITE_URL = 'https://ibill.pk'
const disco = getDiscoByCode('pesco')!
const relatedDiscos = discos.filter((d) => d.code !== disco.code).slice(0, 6)

export const metadata: Metadata = {
  title: `${disco.name} Bill Check Online — ${disco.fullName}`,
  description: `Check your ${disco.name} electricity bill online instantly. Enter your 14-digit reference number or Customer ID to view your official duplicate bill. Free, direct PITC data.`,
  alternates: {
    canonical: `/${disco.code}`,
  },
  openGraph: {
    title: `${disco.name} Bill Check Online — ${disco.fullName}`,
    description: `Check your ${disco.name} electricity bill online instantly, free and direct from official PITC data.`,
    url: `${SITE_URL}/${disco.code}`,
    siteName: 'PakBill',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${disco.name} Bill Check Online`,
    description: `Check your ${disco.name} electricity bill online instantly, free and direct from official PITC data.`,
  },
}

const steps = [
  {
    title: 'Find your reference number',
    text: 'Locate the 14-digit reference number on the top-left of any previous PESCO bill, just below your consumer name.',
  },
  {
    title: 'Enter your details here',
    text: 'Choose Reference Number or Customer ID, type the digits carefully, and confirm your selection before continuing.',
  },
  {
    title: 'Open the official bill',
    text: 'Use the button above to open the official PITC PESCO bill page in a new tab, showing your full duplicate bill.',
  },
]

const benefits = [
  {
    icon: '🔒',
    title: 'Your number stays private',
    text: 'We never store or log your reference number or Customer ID.',
  },
  {
    icon: '⚡',
    title: 'Direct from PITC',
    text: 'Your bill is fetched directly from the official PITC billing system in real time.',
  },
  {
    icon: '💰',
    title: 'Completely free',
    text: 'No registration, no fees, and no account required to check your bill.',
  },
  {
    icon: '🗺️',
    title: `Built for ${disco.region.split(',')[0]}`,
    text: `Supports consumers across ${disco.region} using the official PESCO billing network.`,
  },
]

const faqs = [
  {
    q: `How do I find my ${disco.name} reference number?`,
    a: 'Your 14-digit reference number is printed near the top-left section of every previous PESCO electricity bill, just below the consumer name.',
  },
  {
    q: 'Can I use my Customer ID instead of the reference number?',
    a: 'Yes. If you know your Customer ID, simply select Customer ID and enter it instead of the reference number.',
  },
  {
    q: `Is this an official ${disco.name} website?`,
    a: 'No. PakBill is an independent bill-checking platform. Your bill is retrieved directly from the official PITC billing system.',
  },
  {
    q: 'Why is my electricity bill higher this month?',
    a: 'Higher unit consumption, fuel price adjustments, taxes, seasonal usage, or previous outstanding balances can increase your monthly bill.',
  },
  {
    q: "What should I do if my bill doesn't open?",
    a: 'Verify your reference number or Customer ID, ensure the correct input type is selected, and try again later if the PITC servers are temporarily unavailable.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'PakBill',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: `${disco.name} Bill Check`,
      item: `${SITE_URL}/${disco.code}`,
    },
  ],
}

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

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Electricity Bill Lookup',
  provider: {
    '@type': 'Organization',
    name: 'PakBill',
    url: SITE_URL,
  },
  areaServed: disco.region,
  name: `${disco.name} Bill Check`,
  description: `Free duplicate bill checker for ${disco.fullName} consumers using official PITC data.`,
}

export default function PescoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <nav aria-label="Breadcrumb" className="px-4 pt-6 sm:px-6 lg:px-8">
        <ol className="mx-auto flex max-w-4xl items-center gap-2 text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-accent-blue">
              PakBill
            </Link>
          </li>

          <li>/</li>

          <li className="text-body">{disco.name} Bill Check</li>
        </ol>
      </nav>

      <section id="top" className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
            <span className="inline-block rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
              {disco.name} · Free &amp; Direct PITC Data
            </span>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-heading sm:text-3xl lg:text-4xl">
              {disco.name} Bill Check Online
            </h1>

            <p className="mt-2 text-sm font-medium text-accent-blue">{disco.fullName}</p>

            <div className="mt-8 flex w-full justify-center">
              <BillChecker lockedDiscoCode={disco.code} />
            </div>

            <p className="mt-4 max-w-md text-xs text-muted">
              Independent helper page. Your bill is opened directly from the official PITC website,
              and your information is never stored.
            </p>

            <Link
              href="/calculator"
              className="mt-3 text-xs font-medium text-accent-blue hover:underline"
            >
              Estimate your next bill with the calculator
            </Link>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {disco.region.split(',').map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs text-body"
                >
                  {area.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Benefits / Trust */}
      <section className="bg-card px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-xl border border-border bg-off-white p-5 text-center sm:text-left"
              >
                <div className="mx-auto text-2xl sm:mx-0" aria-hidden="true">
                  {b.icon}
                </div>

                <h3 className="mt-3 font-semibold text-heading">{b.title}</h3>

                <p className="mt-2 text-sm text-body">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long-form Content */}
      <section className="px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-10">
          <div>
            <h2 className="text-xl font-bold text-heading sm:text-2xl">
              {disco.name} Bill Check for Khyber Pakhtunkhwa
            </h2>

            <p className="mt-3 leading-7 text-body">
              PESCO (Peshawar Electric Supply Company) supplies electricity to millions of
              residential, commercial, agricultural, and industrial consumers across Khyber
              Pakhtunkhwa. Whether you live in Peshawar, Mardan, Swabi, Charsadda, Nowshera, Kohat,
              Bannu, Abbottabad, Haripur, Swat, or Dera Ismail Khan, you can check your duplicate
              PESCO electricity bill online using this page.
            </p>

            <p className="mt-3 leading-7 text-body">
              PakBill provides a simple way to reach the official PITC billing system without
              searching through multiple websites. We never generate or modify your electricity
              bill. Your Reference Number or Customer ID is sent directly to the official billing
              server, which returns the same duplicate bill available on the official PESCO portal.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-heading sm:text-2xl">
              Electricity Consumers Across Khyber Pakhtunkhwa
            </h2>

            <p className="mt-3 leading-7 text-body">
              PESCO serves one of Pakistan's largest electricity distribution networks, covering
              both densely populated cities and remote mountainous regions. Urban consumers
              generally experience stable supply, while rural areas may have longer feeder lines and
              weather conditions that can affect electricity distribution.
            </p>

            <p className="mt-3 leading-7 text-body">
              Before paying your electricity bill, always confirm that the Reference Number, Meter
              Number, consumer name, and billing month match your connection. This is especially
              important for rented houses, shared buildings, and newly transferred electricity
              connections.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-heading sm:text-2xl">
              Why Your PESCO Bill Changes Every Month
            </h2>

            <p className="mt-3 leading-7 text-body">
              Electricity bills rarely stay the same throughout the year. Summer months usually
              bring higher consumption because of fans, air conditioners, coolers, and water pumps.
              Winter bills may increase because of electric heaters and geysers in colder districts
              such as Abbottabad and Swat.
            </p>

            <p className="mt-3 leading-7 text-body">
              Your total amount may also include Fuel Price Adjustments (FPA), Quarterly Tariff
              Adjustments (QTA), taxes, previous outstanding balances, and other government-approved
              charges. If your bill suddenly increases, compare the current units with previous
              months before assuming there is a meter problem.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-heading sm:text-2xl">
              Moving Into a New Property
            </h2>

            <p className="mt-3 leading-7 text-body">
              If you recently moved into a new house or shop, verify that the electricity meter
              belongs to your portion of the property before paying any outstanding balance.
              Previous tenants may leave unpaid bills attached to the same connection until they are
              cleared.
            </p>

            <p className="mt-3 leading-7 text-body">
              You should also verify whether the connection is residential, commercial, or
              agricultural because different tariff categories affect your monthly electricity
              charges.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-heading sm:text-2xl">
              Complaints and Customer Support
            </h2>

            <p className="mt-3 leading-7 text-body">
              If you believe your meter reading is incorrect, your payment has not been updated, or
              your consumer information contains mistakes, contact the nearest PESCO customer
              service office. Keep your payment receipt, Reference Number, and meter photographs
              available when filing a complaint, as these help resolve issues much faster.
            </p>

            <p className="mt-3 leading-7 text-body">
              PakBill cannot modify electricity bills or billing records because all billing
              information comes directly from the official PITC database used by PESCO.
            </p>
          </div>
        </div>
      </section>
      {/* How to Check */}
      <section className="bg-card px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-heading sm:text-3xl">
            How to Check Your {disco.name} Bill
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue/10 text-sm font-semibold text-accent-blue-dark">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <h3 className="mt-3 font-semibold text-heading">{step.title}</h3>

                <p className="mt-2 text-sm text-body">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-heading sm:text-3xl">
            Frequently Asked Questions
          </h2>

          <div className="mt-10 space-y-3 sm:space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-border bg-card open:border-accent-blue open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium text-heading marker:content-['']">
                  <span>{faq.q}</span>

                  <svg
                    className="h-5 w-5 flex-shrink-0 text-accent-blue transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <p className="px-5 pb-5 text-sm leading-6 text-body">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related DISCOs */}
      <section className="bg-card px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-bold text-heading sm:text-2xl">
            Check Other Electricity Bills
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedDiscos.map((d) => (
              <Link
                key={d.code}
                href={`/${d.code}`}
                className="group rounded-xl border border-border bg-off-white p-5 transition-colors hover:border-accent-blue"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-heading">{d.name}</h3>

                  <span className="text-xs text-muted transition-colors group-hover:text-accent-blue">
                    Open Checker
                  </span>
                </div>

                <p className="mt-1 text-sm text-body">{d.fullName}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
        <h2 className="text-xl font-bold text-heading sm:text-2xl lg:text-3xl">
          Ready to check your {disco.name} bill?
        </h2>

        <p className="mt-2 text-body">
          Enter your Reference Number or Customer ID above and view your latest duplicate
          electricity bill in seconds.
        </p>

        <a
          href="#top"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-accent-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-blue-dark"
        >
          Check My Bill Now
        </a>
      </section>
    </>
  )
}
