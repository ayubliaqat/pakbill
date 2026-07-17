import React from 'react'
import './styles.css'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'

export const metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'PakBill — Check Electricity Bill Online Pakistan',
    template: '%s | PakBill',
  },
  description:
    'Check your electricity bill online for all Pakistani DISCOs — LESCO, MEPCO, FESCO, IESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO & HAZECO. Free, instant, direct PITC data.',
  keywords: [
    'electricity bill online pakistan',
    'online bill check',
    'wapda bill',
    'bijli bill check',
    'lesco bill',
    'mepco bill',
    'fesco bill',
    'iesco bill',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'PakBill — Check Electricity Bill Online Pakistan',
    description:
      'Check electricity bills for all DISCOs in Pakistan. Free, instant, powered by direct PITC data.',
    url: 'https://yourdomain.com',
    siteName: 'PakBill',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PakBill — Pakistan Electricity Bill Checker',
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PakBill — Check Electricity Bill Online Pakistan',
    description:
      'Check your WAPDA electricity bill for all DISCOs — LESCO, MEPCO, FESCO, IESCO & more.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://yourdomain.com',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PakBill',
  url: 'https://yourdomain.com',
  logo: 'https://yourdomain.com/logo.svg',
  description:
    'Free electricity bill checker for all Pakistani DISCOs, powered by direct PITC data.',
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PakBill',
  url: 'https://yourdomain.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://yourdomain.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-off-white text-body antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
