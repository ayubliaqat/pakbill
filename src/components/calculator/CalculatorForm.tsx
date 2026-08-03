'use client'

import { useState } from 'react'
import { Calculator, Home, Building2 } from 'lucide-react'

interface CalculatorFormProps {
  units: string
  setUnits: (units: string) => void
}

export default function CalculatorForm({ units, setUnits }: CalculatorFormProps) {
  const [consumerType, setConsumerType] = useState('Residential')
  const [connectionType, setConnectionType] = useState('Single Phase')
  const [protectedConsumer, setProtectedConsumer] = useState('Auto')
  const [month, setMonth] = useState('July 2026')
  const [error, setError] = useState<string | null>(null)

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Prevent negative numbers
    if (value.startsWith('-')) {
      setError('Units cannot be negative numbers.')
      return
    }

    if (value === '' || !isNaN(Number(value))) {
      setError(null)
      setUnits(value)
    }
  }

  return (
    <section id="calculator" className="px-4 pt-6 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* FORM CONTAINER */}
        <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-xl bg-accent-blue/10 p-3">
              <Calculator className="h-6 w-6 text-accent-blue" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading">Bill Calculator</h2>
              <p className="text-sm text-muted">
                Enter your electricity usage to calculate your bill.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Consumer Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-heading">Consumer Type</label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConsumerType('Residential')}
                  className={`rounded-xl border p-4 transition ${
                    consumerType === 'Residential'
                      ? 'border-accent-blue bg-accent-blue/10'
                      : 'border-border'
                  }`}
                >
                  <Home className="mx-auto mb-2 h-5 w-5 text-accent-blue" />
                  Residential
                </button>

                <button
                  type="button"
                  onClick={() => setConsumerType('Commercial')}
                  className={`rounded-xl border p-4 transition ${
                    consumerType === 'Commercial'
                      ? 'border-accent-blue bg-accent-blue/10'
                      : 'border-border'
                  }`}
                >
                  <Building2 className="mx-auto mb-2 h-5 w-5 text-accent-blue" />
                  Commercial
                </button>
              </div>
            </div>

            {/* Connection Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-heading">Connection</label>

              <select
                value={connectionType}
                onChange={(e) => setConnectionType(e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-accent-blue"
              >
                <option>Single Phase</option>
                <option>Three Phase</option>
              </select>
            </div>

            {/* Units Consumed */}
            <div>
              <label className="mb-2 block text-sm font-medium text-heading">Units Consumed</label>

              <input
                type="number"
                min="0"
                value={units}
                onChange={handleUnitChange}
                placeholder="Enter units (e.g. 250)"
                className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-accent-blue"
              />
              {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
              {units === '' && !error && (
                <p className="mt-1.5 text-xs text-muted">
                  Please enter units to see the updated estimation below.
                </p>
              )}
            </div>

            {/* Billing Month */}
            <div>
              <label className="mb-2 block text-sm font-medium text-heading">Billing Month</label>

              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-accent-blue"
              >
                <option>July 2026</option>
                <option>June 2026</option>
                <option>May 2026</option>
              </select>
            </div>

            {/* Protected Consumer */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-heading">
                Protected Consumer
              </label>

              <select
                value={protectedConsumer}
                onChange={(e) => setProtectedConsumer(e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-accent-blue"
              >
                <option>Auto</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
