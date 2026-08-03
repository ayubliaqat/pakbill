// src/components/calculator/BreakdownTable.tsx

'use client'

interface BreakdownTableProps {
  energy: number
  gst: number
  fpa: number
  tv: number
  incomeTax?: number
  qtrAdjustment?: number
  otherCharges?: number
}

export default function BreakdownTable({
  energy,
  gst,
  fpa,
  tv,
  incomeTax = 0,
  qtrAdjustment = 0,
  otherCharges = 0,
}: BreakdownTableProps) {
  const total = energy + gst + fpa + tv + incomeTax + qtrAdjustment + otherCharges

  const allRows = [
    {
      title: 'Energy Charges',
      value: energy,
      tooltip: 'Cost of electricity units consumed based on slab rates.',
      showSiempre: true,
    },
    {
      title: 'General Sales Tax (GST)',
      value: gst,
      tooltip: 'Government tax applied as a percentage of energy charges.',
      showSiempre: true,
    },
    {
      title: 'Fuel Price Adjustment (FPA)',
      value: fpa,
      tooltip: 'Adjustment based on variations in fuel prices used for power generation.',
      showSiempre: true,
    },
    {
      title: 'PTV Fee',
      value: tv,
      tooltip: 'Standard Pakistan Television fee charged on electricity connections.',
      showSiempre: true,
    },
    {
      title: 'Income Tax',
      value: incomeTax,
      tooltip: 'Withholding tax applicable based on billing slabs or commercial usage.',
      showSiempre: false,
    },
    {
      title: 'Quarterly Tariff Adjustment',
      value: qtrAdjustment,
      tooltip: 'Periodic tariff adjustments determined by NEPRA.',
      showSiempre: false,
    },
    {
      title: 'Other Charges',
      value: otherCharges,
      tooltip: 'Any extra meter rent, service fees, or arrears.',
      showSiempre: false,
    },
  ]

  // Hide rows with zero values unless they are core permanent rows
  const rows = allRows.filter((row) => row.showSiempre || row.value > 0)

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-card shadow-lg">
        <div className="border-b border-border px-6 py-5 sm:px-8 sm:py-6">
          <h2 className="text-xl sm:text-2xl font-bold text-heading">Bill Breakdown</h2>

          <p className="mt-1 text-sm sm:text-base text-body">
            Estimated charges based on the information you entered.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FBFF] dark:bg-zinc-800/50">
              <tr>
                <th className="px-6 py-3 sm:px-8 sm:py-4 text-left text-xs sm:text-sm font-semibold text-heading">
                  Description
                </th>

                <th className="px-6 py-3 sm:px-8 sm:py-4 text-right text-xs sm:text-sm font-semibold text-heading">
                  Amount (Rs.)
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.title} className="border-t border-border">
                  <td className="px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base text-body">
                    <div className="flex items-center gap-2">
                      <span>{row.title}</span>
                      <span
                        title={row.tooltip}
                        className="cursor-help text-xs text-muted rounded-full border border-border px-1.5 py-0.5"
                      >
                        ?
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-3.5 sm:px-8 sm:py-4 text-right text-sm sm:text-base font-medium text-heading">
                    Rs.{' '}
                    {row.value.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}

              <tr className="border-t-2 border-accent-blue bg-[#F8FBFF] dark:bg-zinc-800/50">
                <td className="px-6 py-4 sm:px-8 sm:py-5 text-base sm:text-lg font-bold text-heading">
                  Estimated Total
                </td>

                <td className="px-6 py-4 sm:px-8 sm:py-5 text-right text-lg sm:text-xl font-bold text-accent-blue">
                  Rs.{' '}
                  {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
