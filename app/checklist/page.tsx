'use client'

import { useState, useEffect, useMemo } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import principles from '@/data/principles.json'
import { calcCompliance } from '@/lib/utils'
import type { ChecklistState } from '@/types'

export default function ChecklistPage() {
  const [checks, setChecks] = useState<ChecklistState>({})
  const [compliance, setCompliance] = useState({ pct: 0, checked: 0, failed: 0, na: 0, total: 0 })

  // Calculate compliance on checks change
  useEffect(() => {
    const result = calcCompliance(principles as any, checks)
    setCompliance(result)
  }, [checks])

  const handleCheck = (principleId: string, state: 'yes' | 'no' | 'na' | null) => {
    setChecks((prev) => ({
      ...prev,
      [principleId]: state,
    }))
  }

  const handleReset = () => {
    setChecks({})
  }

  const sortedPrinciples = useMemo(() => {
    return [...(principles as any)].sort((a: any, b: any) => a.priority - b.priority)
  }, [])

  return (
    <div style={{ padding: 'var(--page-x)', minHeight: 'calc(100vh - var(--nav-height))' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--weight-regular)',
              marginBottom: 'var(--space-6)',
              color: 'var(--ink)',
            }}
          >
            צ׳קליסט בדיקה
          </h1>
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--earth)',
              lineHeight: 'var(--leading-loose)',
              maxWidth: '600px',
            }}
          >
            בדוק אם תוכניתך עומדת בעקרונות התכנון. בחר לכל עקרון: עמידה, אי-עמידה, או לא רלוונטי.
          </p>
        </div>

        {/* Compliance meter */}
        <div
          style={{
            background: 'var(--white)',
            border: 'var(--border)',
            padding: 'var(--space-8)',
            marginBottom: 'var(--space-12)',
          }}
        >
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <div
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--earth)',
                marginBottom: 'var(--space-2)',
              }}
            >
              עמידה בעקרונות:
            </div>
            <div
              style={{
                fontSize: 'var(--text-hero)',
                fontFamily: 'var(--font-serif)',
                color: 'var(--forest)',
                fontWeight: 'var(--weight-regular)',
              }}
            >
              {compliance.pct}%
            </div>
          </div>

          {/* Progress bar */}
          <div
            style={{
              background: 'var(--fog)',
              height: '6px',
              overflow: 'hidden',
              marginBottom: 'var(--space-4)',
              borderRadius: '0',
            }}
          >
            <div
              style={{
                background: 'var(--forest)',
                height: '100%',
                width: `${compliance.pct}%`,
                transition: 'width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
              }}
            />
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-6)',
              fontSize: 'var(--text-sm)',
              color: 'var(--earth)',
            }}
          >
            <div>
              <span style={{ color: 'var(--forest)', fontWeight: 'var(--weight-bold)' }}>
                {compliance.checked}
              </span>{' '}
              עמדו
            </div>
            <div>
              <span style={{ color: 'var(--error)', fontWeight: 'var(--weight-bold)' }}>
                {compliance.failed}
              </span>{' '}
              לא עמדו
            </div>
            <div>
              <span style={{ color: 'var(--earth)', fontWeight: 'var(--weight-bold)' }}>
                {compliance.na}
              </span>{' '}
              לא רלוונטיים
            </div>
          </div>

          {/* Reset button */}
          <div style={{ marginTop: 'var(--space-6)' }}>
            <button
              onClick={handleReset}
              style={{
                padding: 'var(--space-2) var(--space-4)',
                background: 'transparent',
                border: '1px solid var(--fog)',
                color: 'var(--earth)',
                fontSize: 'var(--text-sm)',
                cursor: 'pointer',
                transition: 'var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--ink)'
                el.style.color = 'var(--ink)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--fog)'
                el.style.color = 'var(--earth)'
              }}
            >
              אפס בדיקה
            </button>
          </div>
        </div>

        {/* Checklist items */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          {sortedPrinciples.map((principle: any) => (
            <div
              key={principle.id}
              style={{
                background: 'var(--white)',
                border: 'var(--border)',
                padding: 'var(--space-6)',
                marginBottom: 'var(--space-4)',
                display: 'grid',
                gridTemplateColumns: '1fr auto auto auto auto',
                gap: 'var(--space-4)',
                alignItems: 'center',
              }}
            >
              {/* Left: Title + requirement */}
              <div>
                <div
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--ink)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {principle.title}
                </div>
                <div
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--earth)',
                    lineHeight: 'var(--leading-normal)',
                  }}
                >
                  {principle.summary}
                </div>
              </div>

              {/* Dimension badge */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--weight-bold)',
                  background: principle.accentColor,
                  color: 'var(--white)',
                  padding: 'var(--space-2) var(--space-3)',
                }}
              >
                {principle.dimension}
              </div>

              {/* Buttons: Yes, No, NA */}
              <button
                onClick={() => handleCheck(principle.id, 'yes')}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  background: checks[principle.id] === 'yes' ? 'var(--forest)' : 'var(--fog)',
                  color: checks[principle.id] === 'yes' ? 'var(--white)' : 'var(--ink)',
                  border: 'none',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--weight-bold)',
                  cursor: 'pointer',
                  transition: 'var(--transition-base)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  if (checks[principle.id] !== 'yes') {
                    el.style.background = 'var(--forest)'
                    el.style.color = 'var(--white)'
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  if (checks[principle.id] !== 'yes') {
                    el.style.background = 'var(--fog)'
                    el.style.color = 'var(--ink)'
                  }
                }}
              >
                ✓
              </button>

              <button
                onClick={() => handleCheck(principle.id, 'no')}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  background: checks[principle.id] === 'no' ? 'var(--error)' : 'var(--fog)',
                  color: checks[principle.id] === 'no' ? 'var(--white)' : 'var(--ink)',
                  border: 'none',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--weight-bold)',
                  cursor: 'pointer',
                  transition: 'var(--transition-base)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  if (checks[principle.id] !== 'no') {
                    el.style.background = 'var(--error)'
                    el.style.color = 'var(--white)'
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  if (checks[principle.id] !== 'no') {
                    el.style.background = 'var(--fog)'
                    el.style.color = 'var(--ink)'
                  }
                }}
              >
                ✗
              </button>

              <button
                onClick={() => handleCheck(principle.id, 'na')}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  background: checks[principle.id] === 'na' ? 'var(--earth)' : 'var(--fog)',
                  color: checks[principle.id] === 'na' ? 'var(--white)' : 'var(--ink)',
                  border: 'none',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--weight-bold)',
                  cursor: 'pointer',
                  transition: 'var(--transition-base)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  if (checks[principle.id] !== 'na') {
                    el.style.background = 'var(--earth)'
                    el.style.color = 'var(--white)'
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  if (checks[principle.id] !== 'na') {
                    el.style.background = 'var(--fog)'
                    el.style.color = 'var(--ink)'
                  }
                }}
              >
                ל״ר
              </button>

              {/* Link to detail */}
              <Link
                href={`/principles/${principle.id}`}
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--forest)',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                →
              </Link>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--space-12)',
            background: 'var(--white)',
            border: 'var(--border)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--weight-bold)',
              marginBottom: 'var(--space-4)',
              color: 'var(--ink)',
            }}
          >
            סיימת את הבדיקה?
          </h3>
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--earth)',
              marginBottom: 'var(--space-6)',
            }}
          >
            כל שלא עמדת בו — ללמוד עוד בעמוד העקרונות.
          </p>
          <Link
            href="/principles"
            style={{
              display: 'inline-block',
              padding: 'var(--space-4) var(--space-8)',
              background: 'var(--lime)',
              color: 'var(--ink)',
              fontWeight: 'var(--weight-bold)',
              textDecoration: 'none',
              transition: 'var(--transition-base)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'var(--paper)'
              el.style.border = 'var(--border-ink)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'var(--lime)'
              el.style.border = 'none'
            }}
          >
            חזרה לעקרונות →
          </Link>
        </div>
      </div>
    </div>
  )
}
