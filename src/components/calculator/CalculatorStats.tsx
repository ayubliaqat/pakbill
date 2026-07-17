interface CalculatorStatsProps {
  units: number
  energy: number
  taxes: number
  total: number
}

export default function CalculatorStats({ units, energy, taxes, total }: CalculatorStatsProps) {
  const average = units > 0 ? (total / units).toFixed(2) : '0.00'

  const cards = [
    {
      title: 'Units Consumed',
      value: units,
      suffix: 'Units',
    },
    {
      title: 'Energy Charges',
      value: `Rs. ${energy.toFixed(2)}`,
    },
    {
      title: 'Taxes & Adjustments',
      value: `Rs. ${taxes.toFixed(2)}`,
    },
    {
      title: 'Average Cost',
      value: `Rs. ${average}`,
      suffix: '/Unit',
    },
  ]

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-heading">Usage Summary</h2>

          <p className="mt-3 text-body">A quick overview of your estimated electricity bill.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-sm text-muted">{card.title}</p>

              <h3 className="mt-4 text-3xl font-bold text-heading">{card.value}</h3>

              {card.suffix && <p className="mt-1 text-sm text-muted">{card.suffix}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
