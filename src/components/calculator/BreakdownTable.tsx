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

  const rows = [
    {
      title: 'Energy Charges',
      value: energy,
    },
    {
      title: 'GST',
      value: gst,
    },
    {
      title: 'Fuel Price Adjustment (FPA)',
      value: fpa,
    },
    {
      title: 'PTV Fee',
      value: tv,
    },
    {
      title: 'Income Tax',
      value: incomeTax,
    },
    {
      title: 'Quarterly Tariff Adjustment',
      value: qtrAdjustment,
    },
    {
      title: 'Other Charges',
      value: otherCharges,
    },
  ]

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-card shadow-lg">
        <div className="border-b border-border px-8 py-6">
          <h2 className="text-2xl font-bold text-heading">Bill Breakdown</h2>

          <p className="mt-2 text-body">Estimated charges based on the information you entered.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FBFF]">
              <tr>
                <th className="px-8 py-4 text-left text-sm font-semibold text-heading">
                  Description
                </th>

                <th className="px-8 py-4 text-right text-sm font-semibold text-heading">
                  Amount (Rs.)
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.title} className="border-t border-border">
                  <td className="px-8 py-4 text-body">{row.title}</td>

                  <td className="px-8 py-4 text-right font-medium text-heading">
                    {row.value.toFixed(2)}
                  </td>
                </tr>
              ))}

              <tr className="border-t-2 border-accent-blue bg-[#F8FBFF]">
                <td className="px-8 py-5 text-lg font-bold text-heading">Estimated Total</td>

                <td className="px-8 py-5 text-right text-xl font-bold text-accent-blue">
                  Rs. {total.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
