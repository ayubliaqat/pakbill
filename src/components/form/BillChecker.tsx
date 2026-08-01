'use client'

import { useState, useEffect, useRef } from 'react'
import { discos, getDiscoByCode } from '@/data/discos'
import { buildBillUrl, isValidReference } from '@/lib/redirect'

type InputMode = 'reference' | 'customerId'
const PROGRESS_DURATION_MS = 10000
const LOADING_MESSAGES = [
  'Connecting to PITC…',
  'Fetching your latest bill…',
  'Almost there, hang tight…',
]

interface BillCheckerProps {
  lockedDiscoCode?: string
}

export default function BillChecker({ lockedDiscoCode }: BillCheckerProps) {
  const [discoCode, setDiscoCode] = useState(lockedDiscoCode ?? discos[0].code)
  const [mode, setMode] = useState<InputMode>('reference')
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<number | null>(null)
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const isLocked = !!lockedDiscoCode

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

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

    const intervalMs = 50
    const steps = PROGRESS_DURATION_MS / intervalMs
    let currentStep = 0

    setProgress(0)
    setLoadingMessage(LOADING_MESSAGES[0])

    timerRef.current = setInterval(() => {
      currentStep++

      const pct = Math.min(100, Math.round((currentStep / steps) * 100))
      setProgress(pct)

      const messageIndex = Math.min(
        LOADING_MESSAGES.length - 1,
        Math.floor((pct / 100) * LOADING_MESSAGES.length),
      )
      setLoadingMessage(LOADING_MESSAGES[messageIndex])

      if (pct >= 100) {
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }

        const form = document.createElement('form')
        form.method = 'POST'
        form.action = url
        form.target = '_blank'

        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = 'refno'
        input.value = value.trim()
        form.appendChild(input)

        document.body.appendChild(form)
        form.submit()
        document.body.removeChild(form)

        setProgress(null)
      }
    }, intervalMs)
  }

  const placeholder = isKE
    ? 'e.g. 1234567890123'
    : mode === 'reference'
      ? 'e.g. 11112160848600'
      : 'e.g. 1234567'
  const isLoading = progress !== null

  return (
    <div className="w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] rounded-2xl border border-brand-border bg-white p-2 sm:p-7 lg:p-8 shadow-[0_8px_40px_-5px_rgba(30,80,165,0.15)] bg-[radial-gradient(circle_at_50%_-20%,_rgba(235,244,255,0.8)_0%,_#ffffff_70%)]">
      <div className="mb-5 sm:mb-6 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-brand-accent/10">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1e50a5"
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
        disabled={isLoading}
        className="w-full rounded-lg bg-accent-blue py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-blue-dark disabled:opacity-70"
      >
        {isLoading ? 'Fetching your bill...' : isKE ? 'Go to K-Electric portal' : 'Show my bill'}
      </button>

      {isLoading && !isKE && (
        <div className="mt-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-brand-border">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-accent via-accent-blue to-cyan-400 bg-[length:200%_100%] animate-[shimmer_1.5s_linear_infinite] transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p
            key={loadingMessage}
            className="mt-2 text-center text-xs sm:text-sm font-medium text-accent-blue-dark animate-[fadeIn_0.3s_ease-in]"
          >
            {loadingMessage} <span className="text-brand-muted font-normal">({progress}%)</span>
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
