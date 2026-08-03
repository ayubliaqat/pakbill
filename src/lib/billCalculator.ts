export interface BillCalculationResult {
  units: number
  energy: number
  gst: number
  fpa: number
  tv: number
  incomeTax: number
  taxes: number // Combined total of taxes/surcharges
  total: number
}

export function calculateBill(inputUnits: number | string): BillCalculationResult {
  const units = typeof inputUnits === 'string' ? parseFloat(inputUnits) : inputUnits

  if (isNaN(units) || units <= 0) {
    return {
      units: 0,
      energy: 0,
      gst: 0,
      fpa: 0,
      tv: 0,
      incomeTax: 0,
      taxes: 0,
      total: 0,
    }
  }

  // Example progressive tariff calculation logic (Adjust rates according to standard DISCO slabs if needed)
  let energy = 0
  if (units <= 100) {
    energy = units * 18.98
  } else if (units <= 200) {
    energy = 100 * 18.98 + (units - 100) * 22.14
  } else if (units <= 300) {
    energy = 100 * 18.98 + 100 * 22.14 + (units - 200) * 25.53
  } else {
    energy = 100 * 18.98 + 100 * 22.14 + 100 * 25.53 + (units - 300) * 32.0
  }

  const gst = Math.round(energy * 0.18)
  const fpa = Math.round(units * 1.5)
  const tv = 35
  const incomeTax = units > 400 ? Math.round(energy * 0.05) : 0

  const taxes = gst + fpa + tv + incomeTax
  const total = Math.round(energy + taxes)

  return {
    units,
    energy: Math.round(energy),
    gst,
    fpa,
    tv,
    incomeTax,
    taxes,
    total,
  }
}
