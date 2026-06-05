'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import principles from '@/data/principles.json'
import { calcCompliance } from '@/lib/utils'
import type { ChecklistState } from '@/types'

const dimensionHebrew: Record<string, string> = {
  'sightline': '15 מ׳ מקס׳',
  'stroller-access': '120 ס״מ מינימום',
  'shade': '50% הצללה',
  'surface-texture': '3+ מרקמים',
  'adult-seating': '5 מ׳ רדיוס',
  'traffic-separation': '3 מ׳ חיץ',
  'walking-distance': '400 מ׳ הליכה',
  'window-height': '60 ס״מ אדן',
  'nature-element': '1 ל-200 מ״ר',
  'zoning-clarity': '80–120 ס״מ',
  'kindergarten-area': '55 מ״ר כיתה',
  'lighting-safety': '50 לוקס',
}

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
                background: `${principle.accentColor}12`,
                border: 'var(--border)',
                padding: 0,
                marginBottom: 'var(--space-4)',
                display: 'grid',
                gridTemplateColumns: '110px 1fr auto auto',
                alignItems: 'stretch',
                minHeight: '110px',
              }}
            >
              {/* Image thumbnail */}
              <Link
                href={`/principles/${principle.id}`}
                style={{
                  display: 'block',
                  width: '110px',
                  overflow: 'hidden',
                  alignSelf: 'stretch',
                }}
              >
                <img
                  src={`/images/principles/${principle.id}.png`}
                  alt={principle.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Link>

              {/* Title + summary */}
              <div style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Link
                  href={`/principles/${principle.id}`}
                  style={{
                    fontSize: 'var(--text-lg)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 'var(--weight-regular)',
                    color: 'var(--ink)',
                    marginBottom: 'var(--space-2)',
                    display: 'block',
                    textDecoration: 'none',
                  }}
                >
                  {principle.title}
                </Link>
                <div
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--earth)',
                    lineHeight: 'var(--leading-normal)',
                  }}
                >
                  {principle.summary}
                </div>
              </div>

              {/* Large dimension — no background, just big text */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'var(--space-4) var(--space-6)',
                  minWidth: '140px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-round)',
                    fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)',
                    fontWeight: 'var(--weight-bold)',
                    color: principle.accentColor,
                    lineHeight: 1.2,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {dimensionHebrew[principle.id] || principle.dimension}
                </span>
              </div>

              {/* Minimal check buttons — vertical stack */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', padding: 'var(--space-2) var(--space-3)' }}>
                <button
                  onClick={() => handleCheck(principle.id, checks[principle.id] === 'yes' ? null : 'yes')}
                  title="עמדה בדרישה"
                  style={{
                    width: '28px',
                    height: '28px',
                    background: checks[principle.id] === 'yes' ? 'var(--forest)' : 'transparent',
                    color: checks[principle.id] === 'yes' ? 'var(--white)' : 'var(--earth)',
                    border: checks[principle.id] === 'yes' ? '1px solid var(--forest)' : '1px solid var(--fog)',
                    fontSize: 'var(--text-xs)',
                    cursor: 'pointer',
                    transition: 'var(--transition-base)',
                    borderRadius: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                  }}
                >
                  ✓
                </button>

                <button
                  onClick={() => handleCheck(principle.id, checks[principle.id] === 'no' ? null : 'no')}
                  title="לא עמדה בדרישה"
                  style={{
                    width: '28px',
                    height: '28px',
                    background: checks[principle.id] === 'no' ? 'var(--error)' : 'transparent',
                    color: checks[principle.id] === 'no' ? 'var(--white)' : 'var(--earth)',
                    border: checks[principle.id] === 'no' ? '1px solid var(--error)' : '1px solid var(--fog)',
                    fontSize: 'var(--text-xs)',
                    cursor: 'pointer',
                    transition: 'var(--transition-base)',
                    borderRadius: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                  }}
                >
                  ✗
                </button>

                <button
                  onClick={() => handleCheck(principle.id, checks[principle.id] === 'na' ? null : 'na')}
                  title="לא רלוונטי"
                  style={{
                    width: '28px',
                    height: '28px',
                    background: checks[principle.id] === 'na' ? 'var(--earth)' : 'transparent',
                    color: checks[principle.id] === 'na' ? 'var(--white)' : 'var(--earth)',
                    border: checks[principle.id] === 'na' ? '1px solid var(--earth)' : '1px solid var(--fog)',
                    fontSize: '9px',
                    cursor: 'pointer',
                    transition: 'var(--transition-base)',
                    borderRadius: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                  }}
                >
                  —
                </button>
              </div>
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
            className="btn-cta"
          >
            חזרה לעקרונות →
          </Link>
        </div>
      </div>
    </div>
  )
}
