import Link from 'next/link'
import type { Principle } from '@/types'
import { DimensionBadge } from './DimensionBadge'
import { SourceBadge } from './SourceBadge'

interface PrincipleCardProps {
  principle: Principle
}

export function PrincipleCard({ principle }: PrincipleCardProps) {
  return (
    <Link
      href={`/principles/${principle.id}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div
        className="card"
        style={{
          background: 'var(--white)',
          border: 'var(--border)',
          padding: 'var(--space-6)',
          transition: 'var(--transition-base)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          height: '100%',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--ink)'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--fog)'
        }}
      >
        {/* Priority number */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-bold)',
            color: 'var(--earth)',
            textAlign: 'right',
          }}
        >
          #{principle.priority.toString().padStart(2, '0')}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--weight-regular)',
            lineHeight: 'var(--leading-snug)',
            color: 'var(--ink)',
            margin: 0,
          }}
        >
          {principle.title}
        </h3>

        {/* Summary */}
        <p
          style={{
            fontSize: 'var(--text-sm)',
            fontFamily: 'var(--font-sans)',
            color: 'var(--earth)',
            lineHeight: 'var(--leading-normal)',
            margin: 0,
          }}
        >
          {principle.summary}
        </p>

        {/* Dimension badge */}
        <div style={{ marginTop: 'auto' }}>
          <DimensionBadge
            dimension={principle.dimension}
            accentColor={principle.accentColor}
          />
        </div>

        {/* Tags */}
        {principle.tags && principle.tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-1)',
            }}
          >
            {principle.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 'var(--text-xs)',
                  padding: 'var(--space-1) var(--space-2)',
                  border: '1px solid var(--fog)',
                  color: 'var(--earth)',
                  display: 'inline-block',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Sources */}
        {principle.sources && principle.sources.length > 0 && (
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {principle.sources.map((sourceId) => (
              <SourceBadge key={sourceId} sourceId={sourceId} />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
