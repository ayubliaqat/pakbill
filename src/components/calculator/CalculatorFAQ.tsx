'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How accurate is the electricity bill calculator?',
    answer:
      'The calculator provides an estimated electricity bill based on the latest available tariff rates and common electricity charges. Your actual bill may differ depending on taxes, fuel price adjustments (FPA), quarterly tariff adjustments (QTA), and other government charges.',
  },
  {
    question: 'Does this calculator work for all DISCOs?',
    answer:
      'Yes. It can be used to estimate bills for LESCO, MEPCO, FESCO, IESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, HAZECO, and K-Electric. Actual charges may vary depending on your electricity provider.',
  },
  {
    question: 'What are electricity units?',
    answer:
      'One electricity unit is equal to one kilowatt-hour (kWh). Your monthly bill is primarily calculated based on the number of units consumed during the billing period.',
  },
  {
    question: 'Why is my actual bill different?',
    answer:
      'Your official electricity bill may include additional taxes, meter rent, arrears, surcharges, fuel price adjustments, quarterly tariff adjustments, and other applicable charges that may not be reflected in the estimate.',
  },
  {
    question: 'Is this calculator free?',
    answer:
      'Yes. PakBill provides this electricity bill calculator completely free of charge. No registration or login is required.',
  },
  {
    question: 'Does PakBill store my information?',
    answer:
      'No. Your calculations are performed directly in your browser. PakBill does not store your electricity units or personal information.',
  },
]

export default function CalculatorFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-card px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="rounded-full border border-border bg-off-white px-4 py-2 text-sm font-medium text-accent-blue">
            Frequently Asked Questions
          </span>

          <h2 className="mt-5 text-4xl font-bold text-heading">Electricity Bill Calculator FAQs</h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-body">
            Find answers to the most common questions about estimating your electricity bill in
            Pakistan.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-heading">{faq.question}</span>

                <ChevronDown
                  className={`h-5 w-5 text-accent-blue transition-transform duration-300 ${
                    open === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {open === index && (
                <div className="border-t border-border px-6 py-5">
                  <p className="leading-7 text-body">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
