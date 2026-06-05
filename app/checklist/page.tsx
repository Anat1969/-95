'use client'

import { useState } from 'react'
import principlesData from '@/data/principles.json'
import type { Principle, ChecklistState, CheckState } from '@/types'
import ChecklistItem from '@/components/ChecklistItem'
import { calcCompliance } from '@/lib/utils'

const principles = principlesData as Principle[]

export default function ChecklistPage() {
  const [checks, setChecks] = useState<ChecklistState>({})

  function handleChange(id: string, value: CheckState) {
    setChecks(prev => ({ ...prev, [id]: value }))
  }

  const { pct, checked, failed, na, total } = calcCompliance(principles, checks)

  return (
    <div style={{
      maxWidth: 'var(--content-width)',
      margin: '0 auto',
      padding: 'var(--space-16) var(--page-x)',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-12)', paddingBottom: 'var(--space-8)', borderBottom: 'var(--border)' }}>
        <p className="u-label" style={{ marginBottom: 'var(--space-4)' }}>בדיקת עמידה</p>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--weight-regular)',
          color: 'var(--ink)',
          lineHeight: 'var(--leading-tight)',
          marginBottom: 'var(--space-8)',
        }}>
          צ׳קליסט
        </h1>

        {/* Percentage */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '56px',
            fontWeight: 'var(--weight-medium)',
            color: 'var(--forest)',
            lineHeight: 1,
          }}>
            {pct}%
          </span>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--earth)',
            paddingBottom: '8px',
          }}>
            עמידה ({checked} מתוך {total} פעיל
            {na > 0 && `, ${na} לא רלוונטי`}
            {failed > 0 && `, ${failed} אינו עומד`})
          </span>
        </div>

        {/* Progress bar */}
        <div style={{
          height: 4,
          background: 'var(--fog)',
          width: '100%',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
            width: `${pct}%`,
            background: pct >= 80 ? 'var(--forest)' : pct >= 50 ? '#8C6E3E' : '#8C3E3E',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Items */}
      <div>
        {principles.map(p => (
          <ChecklistItem
            key={p.id}
            principle={p}
            state={checks[p.id] ?? null}
            onChange={handleChange}
          />
        ))}
      </div>

      {/* Summary */}
      <div style={{
        marginTop: 'var(--space-12)',
        borderTop: '3px solid var(--ink)',
        paddingTop: 'var(--space-8)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-4)',
      }}>
        <div>
          <p className="u-label" style={{ marginBottom: 'var(--space-2)' }}>סיכום</p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            color: 'var(--ink)',
          }}>
            {checked} עקרונות עומדים · {failed} אינם עומדים · {na} לא רלוונטי
          </p>
        </div>
        <button style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--weight-bold)',
          padding: 'var(--space-4) var(--space-8)',
          background: 'var(--ink)',
          color: 'var(--paper)',
          border: 'var(--border-ink)',
          cursor: 'not-allowed',
          opacity: 0.5,
        }} disabled>
          הורד דוח ← (בקרוב)
        </button>
      </div>
    </div>
  )
}
