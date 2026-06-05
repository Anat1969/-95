'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service here
    console.error(error)
  }, [error])

  return (
    <div
      style={{
        minHeight: 'calc(100vh - var(--nav-height))',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'var(--page-x)',
        background: 'var(--paper)',
      }}
    >
      <div style={{ maxWidth: '600px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-hero)',
            fontWeight: 'var(--weight-regular)',
            color: 'var(--ink)',
            marginBottom: 'var(--space-4)',
          }}
        >
          שגיאה
        </h1>

        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--weight-bold)',
            color: 'var(--ink)',
            marginBottom: 'var(--space-6)',
          }}
        >
          משהו השתבש
        </h2>

        <p
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--earth)',
            lineHeight: 'var(--leading-loose)',
            marginBottom: 'var(--space-8)',
          }}
        >
          מצטערים, אירעה שגיאה בעת טעינת העמוד. נסו להטעין שוב או חזרו לעמוד הבית.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={reset}
            style={{
              padding: 'var(--space-4) var(--space-8)',
              background: 'var(--lime)',
              color: 'var(--ink)',
              fontWeight: 'var(--weight-bold)',
              textDecoration: 'none',
              transition: 'var(--transition-base)',
              cursor: 'pointer',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-base)',
              borderRadius: '0',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'var(--paper)'
              el.style.border = '1px solid var(--ink)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'var(--lime)'
              el.style.border = 'none'
            }}
          >
            נסה שוב
          </button>

          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: 'var(--space-4) var(--space-8)',
              background: 'transparent',
              color: 'var(--ink)',
              fontWeight: 'var(--weight-bold)',
              textDecoration: 'none',
              transition: 'var(--transition-base)',
              cursor: 'pointer',
              border: '1px solid var(--fog)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-base)',
              borderRadius: '0',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--ink)'
              el.style.color = 'var(--forest)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--fog)'
              el.style.color = 'var(--ink)'
            }}
          >
            חזור לבית →
          </Link>
        </div>
      </div>
    </div>
  )
}
