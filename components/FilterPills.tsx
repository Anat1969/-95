'use client'

interface FilterPillsProps {
  items: string[]
  selected: string | null
  onChange: (item: string | null) => void
  label?: string
}

export function FilterPills({
  items,
  selected,
  onChange,
  label = 'סנן:',
}: FilterPillsProps) {
  if (items.length === 0) return null

  return (
    <div style={{ marginBottom: 'var(--space-6)' }}>
      {label && (
        <div
          style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-bold)',
            marginBottom: 'var(--space-3)',
            color: 'var(--ink)',
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
        }}
      >
        {/* Clear button */}
        <button
          onClick={() => onChange(null)}
          className={selected === null ? 'u-tag active' : 'u-tag'}
          style={{
            borderColor:
              selected === null ? 'var(--ink)' : 'var(--fog)',
            color: selected === null ? 'var(--ink)' : 'var(--earth)',
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
            el.style.borderColor =
              selected === null ? 'var(--ink)' : 'var(--fog)'
            el.style.color =
              selected === null ? 'var(--ink)' : 'var(--earth)'
          }}
        >
          הכל
        </button>

        {/* Item pills */}
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onChange(selected === item ? null : item)}
            className={selected === item ? 'u-tag active' : 'u-tag'}
            style={{
              borderColor:
                selected === item ? 'var(--ink)' : 'var(--fog)',
              color: selected === item ? 'var(--ink)' : 'var(--earth)',
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
              el.style.borderColor =
                selected === item ? 'var(--ink)' : 'var(--fog)'
              el.style.color =
                selected === item ? 'var(--ink)' : 'var(--earth)'
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
