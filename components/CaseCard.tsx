import Link from 'next/link'
import type { CaseStudy } from '@/types'

interface CaseCardProps {
  caseStudy: CaseStudy
}

export function CaseCard({ caseStudy }: CaseCardProps) {
  return (
    <Link
      href={`/cases/${caseStudy.id}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div
        style={{
          background: caseStudy.accentColor,
          color: 'var(--white)',
          padding: 'var(--space-8)',
          border: 'none',
          transition: 'var(--transition-base)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          minHeight: '280px',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.opacity = '0.85'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.opacity = '1'
        }}
      >
        {/* Meta info */}
        <div
          style={{
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)',
            marginBottom: 'var(--space-3)',
            opacity: 0.8,
          }}
        >
          {caseStudy.city} · {caseStudy.year}
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--weight-regular)',
            lineHeight: 'var(--leading-snug)',
            marginBottom: 'var(--space-3)',
            margin: 0,
          }}
        >
          {caseStudy.name}
        </h2>

        {/* Type */}
        <p
          style={{
            fontSize: 'var(--text-sm)',
            fontFamily: 'var(--font-sans)',
            margin: 0,
            opacity: 0.9,
          }}
        >
          {caseStudy.type}
        </p>
      </div>
    </Link>
  )
}
