'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/principles', label: 'עקרונות' },
  { href: '/checklist', label: 'צ׳קליסט' },
  { href: '/cases', label: 'מקרי בוחן' },
  { href: '/sources', label: 'מקורות' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      height: 'var(--nav-height)',
      background: 'var(--paper)',
      borderBottom: 'var(--border)',
      zIndex: 'var(--z-nav)' as any,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 'var(--page-x)',
      paddingLeft: 'var(--page-x)',
    }}>
      <Link href="/" style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--text-xl)',
        color: 'var(--ink)',
        textDecoration: 'none',
      }}>
        95°
      </Link>

      <div style={{ display: 'flex', gap: 'var(--space-8)' }}>
        {links.map(link => {
          const active = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                fontWeight: active ? 'var(--weight-bold)' : 'var(--weight-regular)',
                color: 'var(--ink)',
                textDecoration: 'none',
                paddingBottom: '2px',
                borderBottom: active ? 'var(--border-ink)' : '1px solid transparent',
                transition: 'var(--transition-base)',
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
