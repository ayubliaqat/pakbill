// src/app/(frontend)/hazeco/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { discos, getDiscoByCode } from '@/data/discos'
import BillChecker from '@/components/form/BillChecker'

const SITE_URL = 'https://ibill.pk'
const disco = getDiscoByCode('hazeco')!
const relatedDiscos = discos.filter((d) => d.code !== disco.code).slice(0, 6)

export const metadata: Metadata = {
  title: `${disco.name} Bill Check Online — ${disco.fullName}`,
  description: `Check your ${disco.name} electricity bill online instantly. Enter your 14-digit reference number or customer ID to view your official duplicate bill. Free, direct PITC data.`,
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
    text: `Locate the 14-digit reference number on the top-left of any previous ${disco.name} bill, just below your consumer name.`,
  },
  {
    title: 'Enter your details here',
    text: 'Choose reference number or customer ID, type the digits carefully, and confirm your selection before continuing.',
  },
  {
    title: 'Open the official bill',
    text: `Use the button above to open the official PITC ${disco.name} bill page in a new tab, showing your full duplicate bill.`,
  },
]

const benefits = [
  {
    icon: '🔒',
    title: 'Your number stays private',
    text: 'We never store or log your reference number or customer ID.',
  },
  {
    icon: '⚡',
    title: 'Direct from PITC',
    text: 'Your bill is pulled straight from the official PITC system, in real time.',
  },
  {
    icon: '💰',
    title: 'Completely free',
    text: 'No registration, no fees, no account needed to check your bill.',
  },
  {
    icon: '🗺️',
    title: `Built for ${disco.region.split(',')[0]}`,
    text: `Covers ${disco.region}, on the same billing system used across the region.`,
  },
]

const faqs = [
  {
    q: `How do I find my ${disco.name} reference number?`,
    a: 'Your 14-digit reference number is printed in the top-left section of any previous physical bill, just below your consumer name. If you only have a digital copy, scroll to the same field near the top.',
  },
  {
    q: 'Can I use my Customer ID instead of the reference number?',
    a: "Yes. If you don't have your reference number handy, you can enter your Customer ID instead and the checker will resolve it the same way.",
  },
  {
    q: `Is this an official ${disco.name} or PITC website?`,
    a: "No. PakBill is an independent helper tool. Your number is sent directly to the official PITC bill portal, which returns the same duplicate bill you'd see visiting them yourself.",
  },
  {
    q: "Why does my bill show a previous balance I don't recognize?",
    a: `A carried-forward balance is common in rented or recently transferred connections. Check with your landlord or the previous account holder, or raise it directly with ${disco.name} if it looks incorrect.`,
  },
  {
    q: "What do I do if the bill doesn't load?",
    a: "Double-check that you selected the correct input type and entered all digits with no spaces or letters. If it still fails, it's usually temporary PITC server maintenance — try again shortly.",
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
  description: `Free online duplicate bill checker for ${disco.fullName} consumers, sourced directly from official PITC data.`,
}

export default function HazecoPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
              {disco.name} &middot; Free &amp; Direct PITC Data
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-heading sm:text-3xl lg:text-4xl">
              {disco.name} Bill Check Online
            </h1>
            <p className="mt-2 text-sm font-medium text-accent-blue">{disco.fullName}</p>
            <div className="mt-8 flex w-full justify-center">
              <BillChecker lockedDiscoCode={disco.code} />
            </div>
            <p className="mt-4 max-w-md text-xs text-muted">
              Independent helper page. Your bill opens on the official PITC website and your number
              is not stored by PakBill.
            </p>
            <Link
              href="/calculator"
              className="mt-3 text-xs font-medium text-accent-blue hover:underline"
            >
              Estimate your next bill with the calculator
            </Link>
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
              {disco.name} Bill Check for {disco.region.split(',')[0]} and Nearby Areas
            </h2>
            <p className="mt-3 leading-7 text-body">
              {disco.name} serves {disco.region}, covering everything from city apartments to shops
              and rural connections on the same PITC billing system. This page exists for one job:
              pulling up your official {disco.name} bill using your reference number or customer ID,
              without you needing to dig through the PITC site yourself.
            </p>
            <p className="mt-3 leading-7 text-body">
              PakBill doesn&apos;t create, store, or modify your bill. We pass your number to the
              official PITC portal, which returns the same duplicate bill you&apos;d see visiting
              them directly. If something on the bill looks wrong — the amount, the reading, the
              name — that correction has to go through {disco.name} or their complaint channel.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-heading sm:text-2xl">
              Rented Homes and Shared Meters
            </h2>
            <p className="mt-3 leading-7 text-body">
              A common source of confusion with {disco.name} bills in rented properties is multiple
              meters serving one building — one for the ground floor, another for an upper portion,
              sometimes a separate one for an attached shop. Before paying, match the meter number
              on your bill against your actual meter, especially in older or subdivided properties.
            </p>
            <p className="mt-3 leading-7 text-body">
              If you&apos;ve just moved in, check three things: whether your meter is genuinely
              separate, whether a previous balance is already sitting on the account, and whether
              the tariff is residential or commercial.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-heading sm:text-2xl">
              Seasonal Spikes and Tariff Categories
            </h2>
            <p className="mt-3 leading-7 text-body">
              Bills in this region often jump in the hotter months. Before assuming a meter issue,
              compare your current units against your billing history and check whether your account
              has shifted between protected and unprotected residential status.
            </p>
            <p className="mt-3 leading-7 text-body">
              Look past the total amount due. Check the tariff code, units consumed, previous
              balance, fuel price adjustment, and taxes individually — that breakdown usually
              explains a spike better than the total alone.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-heading sm:text-2xl">Complaints and Support</h2>
            <p className="mt-3 leading-7 text-body">
              For current helpline numbers, office locations, and official notices, always check{' '}
              {disco.name}&apos;s own website rather than an old contact list. For wrong readings,
              photograph your meter the same day you file a complaint. For payment issues, hold onto
              your receipt until the official bill reflects your payment.
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

      <section className="bg-card px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-bold text-heading sm:text-2xl">Check Other DISCO Bills</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedDiscos.map((d) => (
              <Link
                key={d.code}
                href={`/${d.code}`}
                className="rounded-xl border border-border bg-off-white p-5 hover:border-accent-blue"
              >
                <h3 className="font-semibold text-heading">{d.name}</h3>
                <p className="mt-1 text-sm text-body">{d.fullName}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 text-center">
        <h2 className="text-xl font-bold text-heading sm:text-2xl">
          Ready to check your {disco.name} bill?
        </h2>
        <a
          href="#top"
          className="mt-6 inline-block rounded-lg bg-accent-blue px-6 py-3 text-sm font-semibold text-white"
        >
          Check My Bill Now
        </a>
      </section>
    </>
  )
}
