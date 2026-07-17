'use client'

import { useMemo, useState } from 'react'
import { Calculator, Bolt, Home, Building2 } from 'lucide-react'

export default function CalculatorForm() {
  const [consumerType, setConsumerType] = useState('Residential')
  const [connectionType, setConnectionType] = useState('Single Phase')
  const [units, setUnits] = useState('')
  const [protectedConsumer, setProtectedConsumer] = useState('Auto')
  const [month, setMonth] = useState('July 2026')

  const unitRate = useMemo(() => {
    const value = Number(units)

    if (value <= 100) return 12
    if (value <= 200) return 16
    if (value <= 300) return 22
    if (value <= 500) return 28

    return 35
  }, [units])

  const calculation = useMemo(() => {
    const consumedUnits = Number(units)

    if (!consumedUnits || consumedUnits <= 0) {
      return {
        energy: 0,
        gst: 0,
        fpa: 0,
        tv: 0,
        total: 0,
      }
    }

    const energy = consumedUnits * unitRate
    const gst = energy * 0.18
    const fpa = consumedUnits * 2.15
    const tv = 35

    const total = energy + gst + fpa + tv

    return {
      energy,
      gst,
      fpa,
      tv,
      total,
    }
  }, [units, unitRate])

  return (
    <section id="calculator" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* FORM */}

        <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-xl bg-accent-blue/10 p-3">
              <Calculator className="h-6 w-6 text-accent-blue" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading">Bill Calculator</h2>

              <p className="text-sm text-muted">Enter your electricity usage.</p>
            </div>
          </div>

          {/* Consumer */}

          <div className="mb-6">
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

          {/* Connection */}

          <div className="mb-6">
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

          {/* Units */}

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-heading">Units Consumed</label>

            <input
              type="number"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              placeholder="Enter units"
              className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-accent-blue"
            />
          </div>

          {/* Month */}

          <div className="mb-6">
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

          {/* Protected */}

          <div>
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

        {/* RESULT */}

        <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-xl bg-green-100 p-3">
              <Bolt className="h-6 w-6 text-green-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading">Estimated Bill</h2>

              <p className="text-sm text-muted">Based on entered units</p>
            </div>
          </div>

          <div className="mb-8 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-blue-dark p-8 text-center text-white">
            <p className="text-sm uppercase tracking-wider">Estimated Amount</p>

            <h3 className="mt-2 text-5xl font-bold">Rs. {calculation.total.toFixed(0)}</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-body">Energy Charges</span>
              <span className="font-semibold">Rs. {calculation.energy.toFixed(0)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-body">GST</span>
              <span className="font-semibold">Rs. {calculation.gst.toFixed(0)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-body">Fuel Price Adjustment</span>
              <span className="font-semibold">Rs. {calculation.fpa.toFixed(0)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-body">TV Fee</span>
              <span className="font-semibold">Rs. {calculation.tv.toFixed(0)}</span>
            </div>

            <hr className="border-border" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-accent-blue">Rs. {calculation.total.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
