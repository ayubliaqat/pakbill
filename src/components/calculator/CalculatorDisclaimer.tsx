import { AlertCircle } from 'lucide-react'

export default function CalculatorDisclaimer() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="mt-1 h-6 w-6 text-amber-600" />

          <div>
            <h3 className="text-lg font-semibold text-heading">Important Disclaimer</h3>

            <p className="mt-3 leading-7 text-body">
              This calculator provides an estimated electricity bill for informational purposes
              only. Your actual electricity bill may vary depending on the latest tariff rates,
              taxes, fuel price adjustments (FPA), quarterly tariff adjustments (QTA), previous
              balances, meter rent, and other applicable charges issued by your electricity
              distribution company. Always refer to your official electricity bill for the exact
              payable amount.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
