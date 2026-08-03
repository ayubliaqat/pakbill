'use client'

import { ArcElement, Chart as ChartJS, Legend, Tooltip, TooltipItem } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface CalculatorChartProps {
  energy: number
  gst: number
  fpa: number
  tv: number
}

export default function CalculatorChart({ energy, gst, fpa, tv }: CalculatorChartProps) {
  const total = energy + gst + fpa + tv

  const data = {
    labels: ['Energy Charges', 'GST', 'Fuel Price Adjustment', 'PTV Fee'],

    datasets: [
      {
        data: [energy, gst, fpa, tv],

        backgroundColor: ['#3D7FFF', '#60A5FA', '#93C5FD', '#BFDBFE'],

        borderColor: '#FFFFFF',
        borderWidth: 3,

        hoverOffset: 12,

        cutout: '72%',
      },
    ],
  }

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'bottom' as const,

        labels: {
          padding: 20,

          usePointStyle: true,

          pointStyle: 'circle',

          font: {
            size: 13,
          },
        },
      },

      tooltip: {
        callbacks: {
          label(context: TooltipItem<'doughnut'>) {
            const value = typeof context.raw === 'number' ? context.raw : 0
            return `${context.label}: Rs. ${value.toFixed(2)}`
          },
        },
      },
    },
  }

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-card p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-heading">Bill Distribution</h2>

          <p className="mt-3 text-body">
            See how your estimated electricity bill is divided among different charges.
          </p>
        </div>

        <div className="mx-auto mt-12 h-[420px] max-w-md">
          {total <= 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center p-6 rounded-2xl border border-dashed border-border bg-[#F8FBFF]">
              <p className="text-sm font-medium text-heading">No bill data available yet.</p>
              <p className="mt-1 text-xs text-muted">
                Enter your electricity units to view the bill distribution.
              </p>
            </div>
          ) : (
            <Doughnut data={data} options={options} />
          )}
        </div>
      </div>
    </section>
  )
}
