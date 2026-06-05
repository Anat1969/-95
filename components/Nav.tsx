'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
        style={{
          fontSize: 'var(--text-2xl)',
          fontFamily: 'var(--font-serif)',
          fontWeight: 'var(--weight-regular)',
          color: 'var(--ink)',
          transition: 'var(--transition-base)',
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.color = 'var(--forest)'
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.color = 'var(--ink)'
        }}
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
            style={{
              fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-sans)',
              fontWeight: 'var(--weight-regular)',
              color: isActive(item.href) ? 'var(--ink)' : 'var(--earth)',
              borderBottom: isActive(item.href)
                ? 'var(--border-ink)'
                : '1px solid transparent',
              paddingBottom: '6px',
              transition: 'var(--transition-base)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLElement
              el.style.color = 'var(--forest)'
              el.style.borderBottomColor = 'var(--forest)'
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLElement
              el.style.color = isActive(item.href)
                ? 'var(--ink)'
                : 'var(--earth)'
              el.style.borderBottomColor = isActive(item.href)
                ? 'var(--ink)'
                : 'transparent'
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
