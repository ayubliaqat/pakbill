// src/app/(frontend)/ke/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { discos, getDiscoByCode } from '@/data/discos'
import BillChecker from '@/components/form/BillChecker'

const SITE_URL = 'https://ibill.pk'
const disco = getDiscoByCode('ke')!
const relatedDiscos = discos.filter((d) => d.code !== disco.code).slice(0, 6)

export const metadata: Metadata = {
  title: `${disco.name} Bill Check Online — ${disco.fullName}`,
  description: `Check your ${disco.name} electricity bill online instantly. Enter your 13-digit consumer number to view your official K-Electric duplicate bill. Fast, free, and secure.`,
  alternates: {
    canonical: `/${disco.code}`,
  },
  openGraph: {
    title: `${disco.name} Bill Check Online — ${disco.fullName}`,
    description: `Check your ${disco.name} electricity bill online instantly, free and direct from the official KE portal.`,
    url: `${SITE_URL}/${disco.code}`,
    siteName: 'PakBill',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${disco.name} Bill Check Online`,
    description: `Check your ${disco.name} electricity bill online instantly, free and direct from the official KE portal.`,
  },
}

const steps = [
  {
    title: 'Find your consumer number',
    text: 'Locate your 13-digit consumer number on the top-right corner of your physical K-Electric bill.',
  },
  {
    title: 'Enter your details',
    text: 'Type your 13-digit consumer number into the checker below. Ensure there are no spaces or extra characters.',
  },
  {
    title: 'View your duplicate bill',
    text: 'Click the check button to retrieve your latest bill from the official K-Electric billing system.',
  },
]

const benefits = [
  {
    icon: '🔒',
    title: 'Privacy focused',
    text: 'We do not save your consumer number or personal billing history on our servers.',
  },
  {
    icon: '⚡',
    title: 'Official KE Data',
    text: 'Your request is processed through the official K-Electric portal for accuracy.',
  },
  {
    icon: '💰',
    title: 'Free service',
    text: 'Our bill lookup service is completely free with no registration required.',
  },
  {
    icon: '🏢',
    title: 'Servicing Karachi',
    text: 'Specifically optimized for K-Electric consumers across Karachi and surrounding areas.',
  },
]

const faqs = [
  {
    q: 'How do I find my K-Electric consumer number?',
    a: 'Your 13-digit consumer number is located in the top-right corner of your K-Electric bill. It is unique to your electricity connection.',
  },
  {
    q: 'Is this an official K-Electric website?',
    a: 'No. PakBill is an independent helper tool designed to make it easier for you to access the official K-Electric duplicate bill portal.',
  },
  {
    q: 'Why is my bill showing an incorrect amount?',
    a: 'Billing discrepancies should be addressed directly with K-Electric. You can visit your nearest KE customer care center or contact their official helpline.',
  },
  {
    q: 'Can I pay my bill through this website?',
    a: 'No, PakBill only provides a link to view your duplicate bill. You can pay your bill using the payment channels listed on your official bill copy, such as banking apps or authorized collection points.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'PakBill', item: SITE_URL },
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
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function KePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav aria-label="Breadcrumb" className="px-4 pt-6 sm:px-6 lg:px-8">
        <ol className="mx-auto flex max-w-4xl items-center gap-2 text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-accent-blue">
              PakBill
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-body">{disco.name} Bill Check</li>
        </ol>
      </nav>

      <section id="top" className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
            <span className="inline-block rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
              {disco.name} &middot; Fast &amp; Secure
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-heading sm:text-3xl lg:text-4xl">
              {disco.name} Bill Check Online
            </h1>
            <p className="mt-2 text-sm font-medium text-accent-blue">{disco.fullName}</p>
            <div className="mt-8 flex w-full justify-center">
              <BillChecker lockedDiscoCode={disco.code} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-xl border border-border bg-off-white p-5 text-center sm:text-left"
              >
                <div className="mx-auto text-2xl sm:mx-0">{b.icon}</div>
                <h3 className="mt-3 font-semibold text-heading">{b.title}</h3>
                <p className="mt-2 text-sm text-body">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-10">
          <div>
            <h2 className="text-xl font-bold text-heading sm:text-2xl">
              Understanding your K-Electric Bill
            </h2>
            <p className="mt-3 leading-7 text-body">
              K-Electric operates as a vertically integrated utility, meaning they manage
              generation, transmission, and distribution within Karachi and surrounding areas.
              Because of this, their billing system is distinct from the PITC system used by other
              DISCOs.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-heading sm:text-2xl">
              Managing Your Energy Usage
            </h2>
            <p className="mt-3 leading-7 text-body">
              To avoid high bills, we recommend monitoring your daily consumption. K-Electric
              provides various tools and guides on their official website to help consumers
              understand peak hours and energy-saving practices. Always cross-reference your meter
              reading with the reading printed on your monthly bill.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-card px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-heading sm:text-3xl">
            How to Check Your {disco.name} Bill
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue/10 text-sm font-semibold text-accent-blue-dark">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-3 font-semibold text-heading">{s.title}</h3>
                <p className="mt-2 text-sm text-body">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-heading sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-border bg-card open:border-accent-blue"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-heading">
                  <span>{f.q}</span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-6 text-body">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
