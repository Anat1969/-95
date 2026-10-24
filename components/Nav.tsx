'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'ai-menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { chat?: string; research?: string }
    }
  }
}

export function Nav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/principles', label: 'עקרונות' },
    { href: '/checklist', label: 'צ׳קליסט' },
    { href: '/cases', label: 'מקרי בוחן' },
    { href: '/sources', label: 'מקורות' },
  ]

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        height: 'var(--nav-height)',
        background: 'var(--paper)',
        borderBottom: 'var(--border)',
        zIndex: 'var(--z-nav)',
        display: 'flex',
        alignItems: 'center',
        paddingInline: 'var(--page-x)',
      }}
    >
      <Link
        href="/"
        className="nav-logo"
      >
        95°
      </Link>

      <div style={{ flex: 1 }} />

      <div
        style={{
          display: 'flex',
          gap: 'var(--space-8)',
          alignItems: 'center',
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link ${isActive(item.href) ? 'nav-link-active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <ai-menu style={{ marginInlineStart: 'var(--space-8)' }} />
    </nav>
  )
}
