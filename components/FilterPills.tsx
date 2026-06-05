'use client'

interface FilterPillsProps {
  options: string[]
  selected: string | null
  onChange: (value: string | null) => void
  allLabel?: string
}

export default function FilterPills({ options, selected, onChange, allLabel = 'הכל' }: FilterPillsProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
      <button
        onClick={() => onChange(null)}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-xs)',
          fontWeight: selected === null ? 'var(--weight-bold)' : 'var(--weight-regular)',
          padding: 'var(--space-2) var(--space-4)',
          background: selected === null ? 'var(--ink)' : 'transparent',
          color: selected === null ? 'var(--paper)' : 'var(--earth)',
          border: selected === null ? 'var(--border-ink)' : 'var(--border)',
          cursor: 'pointer',
          transition: 'var(--transition-base)',
          letterSpacing: 'var(--tracking-wide)',
        }}
      >
        {allLabel}
      </button>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(selected === opt ? null : opt)}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            fontWeight: selected === opt ? 'var(--weight-bold)' : 'var(--weight-regular)',
            padding: 'var(--space-2) var(--space-4)',
            background: selected === opt ? 'var(--ink)' : 'transparent',
            color: selected === opt ? 'var(--paper)' : 'var(--earth)',
            border: selected === opt ? 'var(--border-ink)' : 'var(--border)',
            cursor: 'pointer',
            transition: 'var(--transition-base)',
            letterSpacing: 'var(--tracking-wide)',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
