import Link from 'next/link'
import { ArrowRight, Calculator, FileText } from 'lucide-react'

export default function CalculatorCTA() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white via-[#F8FBFF] to-[#EEF6FF] shadow-xl">
        <div className="grid items-center gap-10 px-8 py-12 lg:grid-cols-2 lg:px-14">
          {/* Left */}
          <div>
            <span className="inline-flex rounded-full border border-accent-blue/20 bg-accent-blue/10 px-4 py-2 text-sm font-medium text-accent-blue">
              You're Almost Done
            </span>

            <h2 className="mt-5 text-4xl font-bold leading-tight text-heading">
              Estimated Your Bill?
              <br />
              Now Check the Official One.
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-body">
              Our calculator gives you an estimated electricity bill based on your electricity
              usage. To view the exact payable amount, due date, taxes, and complete bill details,
              check your official duplicate electricity bill online.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-accent-blue px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-accent-blue-dark"
              >
                <FileText className="h-5 w-5" />
                Check Official Bill
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-semibold text-heading transition hover:border-accent-blue hover:text-accent-blue"
              >
                <Calculator className="h-5 w-5" />
                Home
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <h3 className="text-xl font-bold text-heading">Why Check Your Official Bill?</h3>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-blue" />
                <span className="text-body">View the latest payable amount.</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-blue" />
                <span className="text-body">Check the due date and payment status.</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-blue" />
                <span className="text-body">
                  Review taxes, FPA, QTR adjustment, and other charges.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-blue" />
                <span className="text-body">Available for all major DISCOs and K-Electric.</span>
              </li>
            </ul>

            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-accent-blue transition hover:gap-3"
            >
              Go to Bill Checker
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
