import { Lightbulb, Snowflake, PlugZap, Clock3, BatteryCharging, SunMedium } from 'lucide-react'

const tips = [
  {
    icon: Lightbulb,
    title: 'Switch to LED Bulbs',
    description:
      'LED bulbs consume up to 80% less electricity than traditional incandescent bulbs and last much longer.',
    saving: 'Save up to 15%',
  },
  {
    icon: Snowflake,
    title: 'Set AC to 26°C',
    description:
      'Every degree below 26°C can noticeably increase electricity consumption during summer.',
    saving: 'Save up to 12%',
  },
  {
    icon: PlugZap,
    title: 'Turn Off Standby Devices',
    description: 'Unplug TVs, chargers, routers, and other electronics when they are not in use.',
    saving: 'Save up to 8%',
  },
  {
    icon: Clock3,
    title: 'Avoid Peak Hours',
    description:
      'Use heavy appliances during off-peak hours whenever possible to reduce overall costs.',
    saving: 'Lower peak usage',
  },
  {
    icon: BatteryCharging,
    title: 'Maintain Appliances',
    description:
      'Clean AC filters and maintain refrigerators and other appliances for better efficiency.',
    saving: 'Improve efficiency',
  },
  {
    icon: SunMedium,
    title: 'Use Natural Light',
    description: 'Open curtains during the day to reduce the need for artificial lighting.',
    saving: 'Reduce daily usage',
  },
]

export default function CalculatorTips() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-accent-blue">
            Save Electricity
          </span>

          <h2 className="mt-5 text-4xl font-bold text-heading">
            Tips to Reduce Your Electricity Bill
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-body">
            Small changes in your daily electricity usage can reduce your monthly bill and improve
            energy efficiency.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tips.map((tip) => {
            const Icon = tip.icon

            return (
              <div
                key={tip.title}
                className="group rounded-3xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-blue/10 transition-colors group-hover:bg-accent-blue">
                  <Icon className="h-7 w-7 text-accent-blue group-hover:text-white" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-heading">{tip.title}</h3>

                <p className="mt-3 leading-7 text-body">{tip.description}</p>

                <div className="mt-6 inline-flex rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
                  {tip.saving}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
