import Link from 'next/link'
import { Calculator, Zap, ShieldCheck } from 'lucide-react'

export default function CalculatorHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#F8FBFF] to-[#F5F7FA]">
      {/* Background Blur */}
      <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-accent-blue/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-sky-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-accent-blue shadow-sm">
            <Calculator className="h-4 w-4" />
            Pakistan Electricity Bill Calculator
          </span>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-heading sm:text-5xl lg:text-6xl">
            Electricity Bill Calculator
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-body">
            Estimate your monthly electricity bill in seconds. Enter your electricity units, choose
            your consumer type, and get a detailed estimate with energy charges, taxes, fuel
            adjustments, and the total payable amount.
          </p>

          {/* Features */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
              <Zap className="h-4 w-4 text-accent-blue" />
              <span className="text-sm text-body">Residential & Commercial</span>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span className="text-sm text-body">Free & Instant</span>
            </div>

            <div className="rounded-full bg-card px-4 py-2 shadow-sm text-sm text-body">
              Updated Tariff Rates
            </div>

            <div className="rounded-full bg-card px-4 py-2 shadow-sm text-sm text-body">
              Bill Breakdown
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <Link
              href="#calculator"
              className="inline-flex items-center rounded-xl bg-accent-blue px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-blue-dark"
            >
              Start Calculating
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
