// src/app/(frontend)/calculator/page.tsx

'use client'

import { useState, useMemo } from 'react'

import CalculatorHero from '@/components/calculator/CalculatorHero'
import CalculatorForm from '@/components/calculator/CalculatorForm'
import CalculatorStats from '@/components/calculator/CalculatorStats'
import BreakdownTable from '@/components/calculator/BreakdownTable'
import CalculatorChart from '@/components/calculator/CalculatorChart'
import CalculatorFAQ from '@/components/calculator/CalculatorFAQ'
import CalculatorCTA from '@/components/calculator/CalculatorCTA'
import CalculatorDisclaimer from '@/components/calculator/CalculatorDisclaimer'
import { calculateBill } from '@/lib/billCalculator'

export default function CalculatorPage() {
  const [units, setUnits] = useState<string>('250')

  // Single source of truth calculation memoized for performance
  const calculationResult = useMemo(() => {
    return calculateBill(units)
  }, [units])

  return (
    <main className="bg-off-white">
      {/* <CalculatorHero /> */}

      <CalculatorForm units={units} setUnits={setUnits} />

      <CalculatorStats
        units={calculationResult.units}
        energy={calculationResult.energy}
        taxes={calculationResult.taxes}
        total={calculationResult.total}
      />

      <BreakdownTable
        energy={calculationResult.energy}
        gst={calculationResult.gst}
        fpa={calculationResult.fpa}
        tv={calculationResult.tv}
      />

      <CalculatorChart
        energy={calculationResult.energy}
        gst={calculationResult.gst}
        fpa={calculationResult.fpa}
        tv={calculationResult.tv}
      />

      <CalculatorFAQ />

      <CalculatorCTA />

      <CalculatorDisclaimer />
    </main>
  )
}
