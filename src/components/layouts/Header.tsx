'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/news', label: 'News' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on route change for better UX
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full py-3 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Optimized for LCP */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="PakBill Home">
            <Image
              src="/logos/logo.png"
              alt="PakBill Logo"
              width={36}
              height={36}
              priority
              fetchPriority="high" // Critical for reducing LCP
              className="h-9 w-9"
              sizes="36px"
            />
            <span className="text-lg font-bold text-heading">
              Pak<span className="text-accent-blue">Bill</span>
            </span>
          </Link>

          {/* Nav - Desktop */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent-blue ${
                  pathname === link.href ? 'text-accent-blue' : 'text-body'
                }`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA - Right */}
          <div className="hidden md:flex items-center">
            <Link
              href="/#checker"
              className="inline-flex items-center justify-center rounded-lg bg-accent-blue px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-blue-dark active:scale-95"
            >
              Check Bill Now
            </Link>
          </div>

          {/* Mobile menu button - Minimized main thread impact */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-heading hover:bg-off-white"
          >
            {/* SVG code kept as-is, optimized for visual stability */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Simplified for Performance */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden border-t border-border bg-card animate-in fade-in slide-in-from-top-2"
        >
          <div className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname === link.href
                    ? 'bg-off-white text-accent-blue'
                    : 'text-body hover:bg-off-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
