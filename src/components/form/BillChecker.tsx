'use client'

import { useState } from 'react'
import { discos, getDiscoByCode } from '@/data/discos'
import { buildBillUrl, isValidReference } from '@/lib/redirect'

type InputMode = 'reference' | 'customerId'

interface BillCheckerProps {
  lockedDiscoCode?: string
}

export default function BillChecker({ lockedDiscoCode }: BillCheckerProps) {
  const [discoCode, setDiscoCode] = useState(lockedDiscoCode ?? discos[0].code)
  const [mode, setMode] = useState<InputMode>('reference')
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isLocked = !!lockedDiscoCode

  const selectedDisco = getDiscoByCode(discoCode)
  const isKE = selectedDisco?.code === 'ke'

  function handleShowBill() {
    setError(null)

    if (!isValidReference(value, discoCode)) {
      setError(
        selectedDisco?.idLabel
          ? `Enter a valid ${selectedDisco.idLabel.toLowerCase()} (digits only).`
          : mode === 'reference'
            ? 'Enter a valid reference number (digits only).'
            : 'Enter a valid customer ID (digits only).',
      )
      return
    }

    const url = buildBillUrl(discoCode, value)

    if (!url) {
      setError('Something went wrong. Try selecting your DISCO again.')
      return
    }

    setIsSubmitting(true)

    // Open the tab synchronously, right here inside the click handler.
    // This is what satisfies browser popup blockers — they only allow
    // window.open() when it's a direct, synchronous result of a user
    // gesture.
    const billTab = window.open('', 'pakbill-result')

    if (!billTab) {
      setError('Please allow popups for this site, then tap "Show my bill" again.')
      setIsSubmitting(false)
      return
    }

    // Give the tab real content immediately instead of leaving it blank —
    // this loading screen IS the loading state now (no separate fake
    // progress bar on the main page). It gets replaced the instant the
    // form below submits into this same tab.
    billTab.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Fetching your bill… | PakBill</title>
          <style>
            body {
              margin: 0;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: -apple-system, system-ui, sans-serif;
              background: #F7F8FA;
              color: #334155;
            }
            .box { text-align: center; max-width: 320px; padding: 0 20px; }
            .spinner {
              width: 40px;
              height: 40px;
              margin: 0 auto 16px;
              border: 4px solid #CBD5E1;
              border-top-color: #1D4ED8;
              border-radius: 50%;
              animation: spin 0.8s linear infinite;
            }
            .tip {
              margin-top: 12px;
              font-size: 13px;
              color: #64748B;
            }
            @keyframes spin { to { transform: rotate(360deg); } }
          </style>
        </head>
        <body>
          <div class="box">
            <div class="spinner"></div>
            <p>Connecting to PITC and fetching your bill…</p>
            <p class="tip">Once your bill appears, use your browser's Print option and choose "Save as PDF" to download it.</p>
          </div>
        </body>
      </html>
    `)
    billTab.document.close()

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = url
    form.target = 'pakbill-result'
    form.setAttribute('rel', 'noopener noreferrer')

    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = 'refno'
    input.value = value.trim()
    form.appendChild(input)

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)

    // Cosmetic-only progress animation, purely visual. Does NOT gate or
    // delay the tab open / form submit above — those already happened
    // synchronously. This just gives the button/main page a "processing"
    // feel for ~1.6s, then resets automatically.
    setTimeout(() => setIsSubmitting(false), 1600)
  }

  const placeholder = isKE
    ? 'e.g. 1234567890123'
    : mode === 'reference'
      ? 'e.g. 11112160848600'
      : 'e.g. 1234567'

  return (
    <div className="w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] rounded-2xl border border-brand-border bg-white p-5 sm:p-7 lg:p-8 shadow-[0_8px_40px_-5px_rgba(30,80,165,0.15)] bg-[radial-gradient(circle_at_50%_-20%,_rgba(235,244,255,0.8)_0%,_#ffffff_70%)]">
      <div className="mb-5 sm:mb-6 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-brand-accent/10">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-accent-blue)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <h1 className="text-lg sm:text-xl font-semibold text-brand-ink">
          {isLocked ? `Check your ${selectedDisco?.name} bill` : 'Check your bill'}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-brand-muted">
          {isLocked ? selectedDisco?.fullName : 'All 11 DISCOs plus K-Electric'}
        </p>
      </div>

      {!isLocked && (
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-medium text-brand-muted">
            Select your provider
          </label>
          <select
            value={discoCode}
            onChange={(e) => setDiscoCode(e.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-brand-border bg-brand-surface px-3 py-2.5 text-sm text-brand-ink outline-none focus:border-brand-accent disabled:opacity-60"
          >
            {discos.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name} — {d.region.split(',')[0]}
              </option>
            ))}
          </select>
        </div>
      )}

      {isKE && (
        <p className="mb-4 rounded-lg border border-brand-border bg-brand-bg px-3 py-2.5 text-xs text-brand-muted">
          K-Electric isn&apos;t part of the PITC network — you&apos;ll enter your account number
          directly on their portal.
        </p>
      )}

      {!isKE && (
        <div className="mb-4 flex gap-2">
          <button
            type="button"
            onClick={() => setMode('reference')}
            disabled={isSubmitting}
            className={`flex-1 rounded-lg border px-2.5 sm:px-3 py-2 text-xs sm:text-sm transition-colors ${
              mode === 'reference'
                ? 'border-brand-accent bg-brand-accent/5 text-brand-accent'
                : 'border-brand-border text-brand-muted'
            }`}
          >
            Reference no.
          </button>
          <button
            type="button"
            onClick={() => setMode('customerId')}
            disabled={isSubmitting}
            className={`flex-1 rounded-lg border px-2.5 sm:px-3 py-2 text-xs sm:text-sm transition-colors ${
              mode === 'customerId'
                ? 'border-brand-accent bg-brand-accent/5 text-brand-accent'
                : 'border-brand-border text-brand-muted'
            }`}
          >
            Customer ID
          </button>
        </div>
      )}

      {!isKE && (
        <div className="mb-5">
          <label className="mb-1.5 block text-xs font-medium text-brand-muted">
            {mode === 'reference' ? '14-digit reference number' : 'Customer ID'}
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-brand-border px-3 py-2.5 font-mono text-sm tracking-wide text-brand-ink outline-none focus:border-brand-accent disabled:opacity-60"
          />
          {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
        </div>
      )}

      <button
        type="button"
        onClick={
          isKE
            ? () => window.open(buildBillUrl('ke', '')!, '_blank', 'noopener,noreferrer')
            : handleShowBill
        }
        disabled={isSubmitting}
        className="w-full rounded-lg bg-accent-blue py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-blue-dark disabled:opacity-70"
      >
        {isSubmitting ? 'Opening your bill…' : isKE ? 'Go to K-Electric portal' : 'Show my bill'}
      </button>

      {isSubmitting && !isKE && (
        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-border">
            <div className="h-full w-full origin-left rounded-full bg-accent-blue animate-[fillBar_1.6s_ease-out_forwards]" />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fillBar {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  )
}
