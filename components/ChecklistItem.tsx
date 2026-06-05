import Link from 'next/link'
import type { Principle } from '@/types'
import type { CheckState } from '@/types'

interface ChecklistItemProps {
  principle: Principle
  state: CheckState
  onChange: (id: string, value: CheckState) => void
}

export default function ChecklistItem({ principle, state, onChange }: ChecklistItemProps) {
  const isNA = state === 'na'

  return (
    <div style={{
      borderTop: 'var(--border)',
      paddingTop: 'var(--space-5)',
      paddingBottom: 'var(--space-5)',
      opacity: isNA ? 0.4 : 1,
      transition: 'var(--transition-base)',
    }}>
      <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'flex-start' }}>
        {/* Check buttons */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexShrink: 0, paddingTop: '2px' }}>
          <button
            onClick={() => onChange(principle.id, state === 'yes' ? null : 'yes')}
            title="עומד בדרישה"
            style={{
              width: 32,
              height: 32,
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--weight-bold)',
              background: state === 'yes' ? '#2D4A3E' : 'transparent',
              color: state === 'yes' ? 'var(--lime)' : 'var(--earth)',
              border: state === 'yes' ? '1px solid #2D4A3E' : 'var(--border)',
              cursor: 'pointer',
              transition: 'var(--transition-base)',
            }}
          >
            ✓
          </button>
          <button
            onClick={() => onChange(principle.id, state === 'no' ? null : 'no')}
            title="אינו עומד בדרישה"
            style={{
              width: 32,
              height: 32,
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--weight-bold)',
              background: state === 'no' ? '#8C3E3E' : 'transparent',
              color: state === 'no' ? '#F0A090' : 'var(--earth)',
              border: state === 'no' ? '1px solid #8C3E3E' : 'var(--border)',
              cursor: 'pointer',
              transition: 'var(--transition-base)',
            }}
          >
            ✗
          </button>
        </div>

        {/* Content */}
        <div style={{ flexGrow: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--earth)',
            }}>#{String(principle.priority).padStart(2, '0')}</span>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--weight-regular)',
              color: 'var(--ink)',
              lineHeight: 1,
            }}>{principle.title}</h3>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              padding: '2px 8px',
              background: principle.accentColor,
              color: 'var(--white)',
            }}>{principle.dimension}</span>
          </div>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--earth)',
            lineHeight: 'var(--leading-normal)',
            marginBottom: 'var(--space-3)',
          }}>
            {principle.requirement}
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Link href={`/principles/${principle.id}`} style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              color: 'var(--forest)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--forest)',
            }}>
              הסבר מלא
            </Link>
            <button
              onClick={() => onChange(principle.id, state === 'na' ? null : 'na')}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                color: 'var(--earth)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: isNA ? 'line-through' : 'none',
                padding: 0,
              }}
            >
              לא רלוונטי לפרויקט
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
