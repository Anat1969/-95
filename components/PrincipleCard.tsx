'use client'

import Link from 'next/link'
import type { Principle } from '@/types'
import DimensionBadge from './DimensionBadge'
import { SOURCE_LABELS } from '@/types'

interface PrincipleCardProps {
  principle: Principle
}

export default function PrincipleCard({ principle }: PrincipleCardProps) {
  return (
    <Link href={`/principles/${principle.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <article style={{
        border: 'var(--border)',
        padding: 'var(--space-6)',
        background: 'var(--white)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        height: '100%',
        cursor: 'pointer',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--earth)',
          letterSpacing: 'var(--tracking-wider)',
        }}>
          #{String(principle.priority).padStart(2, '0')}
        </span>

        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--weight-regular)',
          color: 'var(--ink)',
          lineHeight: 'var(--leading-snug)',
        }}>
          {principle.title}
        </h2>

        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          color: 'var(--earth)',
          lineHeight: 'var(--leading-normal)',
          flexGrow: 1,
        }}>
          {principle.summary}
        </p>

        <div>
          <DimensionBadge dimension={principle.dimension} accentColor={principle.accentColor} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
            {principle.tags.map(tag => (
              <span key={tag} className="u-tag">{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
            {principle.sources.map(src => (
              <span key={src} className="u-src-badge">{SOURCE_LABELS[src]}</span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
