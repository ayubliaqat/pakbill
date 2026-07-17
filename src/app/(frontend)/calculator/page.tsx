// src/app/(frontend)/calculator/page.tsx

import type { Metadata } from 'next'

import CalculatorHero from '@/components/calculator/CalculatorHero'
import CalculatorForm from '@/components/calculator/CalculatorForm'
import CalculatorStats from '@/components/calculator/CalculatorStats'
import BreakdownTable from '@/components/calculator/BreakdownTable'
import CalculatorChart from '@/components/calculator/CalculatorChart'
import CalculatorTips from '@/components/calculator/CalculatorTips'
import CalculatorFAQ from '@/components/calculator/CalculatorFAQ'
import CalculatorCTA from '@/components/calculator/CalculatorCTA'
import CalculatorDisclaimer from '@/components/calculator/CalculatorDisclaimer'

export const metadata: Metadata = {
  title: 'Electricity Bill Calculator Pakistan | Estimate Your Bill Online',
  description:
    'Estimate your electricity bill online in Pakistan using our free electricity bill calculator. Calculate energy charges, GST, FPA, taxes, and total payable amount for all major DISCOs.',
  alternates: {
    canonical: '/calculator',
  },
  keywords: [
    'electricity bill calculator',
    'electricity calculator pakistan',
    'online bill calculator',
    'lesco calculator',
    'mepco calculator',
    'fesco calculator',
    'iesco calculator',
    'electricity unit calculator',
    'pakbill calculator',
  ],
}

export default function CalculatorPage() {
  return (
    <main className="bg-off-white">
      <CalculatorHero />

      <CalculatorForm />

      {/* Temporary Placeholder Data */}

      <CalculatorStats units={250} energy={5500} taxes={1425} total={6925} />

      <BreakdownTable energy={5500} gst={990} fpa={400} tv={35} />

      <CalculatorChart energy={5500} gst={990} fpa={400} tv={35} />

      <CalculatorFAQ />

      <CalculatorCTA />

      <CalculatorDisclaimer />
    </main>
  )
}
