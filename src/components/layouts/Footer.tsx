import Link from 'next/link'

const PUNJAB = [
  { href: '/lesco', label: 'LESCO' },
  { href: '/mepco', label: 'MEPCO' },
  { href: '/fesco', label: 'FESCO' },
  { href: '/iesco', label: 'IESCO' },
  { href: '/gepco', label: 'GEPCO' },
]

const KPK = [
  { href: '/pesco', label: 'PESCO' },
  { href: '/hazeco', label: 'HAZECO' },
  { href: '/tesco', label: 'TESCO' },
]

const SOUTH = [
  { href: '/hesco', label: 'HESCO' },
  { href: '/sepco', label: 'SEPCO' },
  { href: '/qesco', label: 'QESCO' },
  { href: '/ke', label: 'K-Electric' },
]

const NAVIGATION = [
  { href: '/', label: 'Home' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/news', label: 'News' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

const RESOURCES = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    // Updated: Uses 'bg-card' for dark-mode compatibility instead of hardcoded 'bg-white'
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-5 lg:text-left">
          {/* Company - SEO: This establishes your brand authority for AI crawlers */}
          <div>
            <Link href="/" className="inline-block">
              <h2 className="text-xl font-bold text-heading transition-colors hover:text-accent-blue">
                Pak<span className="text-accent-blue">Bill</span>
              </h2>
            </Link>

            <p className="mt-4 text-sm leading-6 text-body">
              Check electricity bills online for all major Pakistani DISCOs. Fast, free, secure, and
              powered by official utility sources.
            </p>

            {/* SEO: Trust Signals for AI Overviews */}
            <div className="mt-4 space-y-1 text-xs text-muted">
              <p>✓ Official PITC Lookup</p>
              <p>✓ No Registration Required</p>
              <p>✓ Secure Data Handling</p>
            </div>
          </div>

          {/* Dynamic Link Blocks */}
          {[
            { title: 'Punjab', links: PUNJAB },
            { title: 'KPK', links: KPK },
            { title: 'South', links: SOUTH },
            { title: 'Navigation', links: NAVIGATION },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-heading">
                {section.title}
              </h3>
              <nav className="space-y-2">
                {section.links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-body transition-colors hover:text-accent-blue"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom - Legal Disclaimer (IEO/AEO: Important for AI trust/citations) */}
        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted">
            © {year} PakBill. Independent utility lookup service. Not affiliated with PITC, WAPDA,
            or NEPRA.
          </p>
        </div>
      </div>
    </footer>
  )
}
