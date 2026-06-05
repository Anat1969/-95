import Link from 'next/link'
import type { CaseStudy } from '@/types'

interface CaseCardProps {
  caseStudy: CaseStudy
}

export default function CaseCard({ caseStudy }: CaseCardProps) {
  return (
    <Link href={`/cases/${caseStudy.id}`} style={{ textDecoration: 'none' }}>
      <article style={{
        background: caseStudy.accentColor,
        padding: 'var(--space-8)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        transition: 'var(--transition-base)',
        cursor: 'pointer',
        minHeight: '260px',
      }}>
        {/* City */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: 'var(--tracking-wider)',
        }}>
          {caseStudy.city}
        </span>

        {/* Name */}
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(22px, 3vw, 30px)',
          fontWeight: 'var(--weight-regular)',
          color: 'var(--white)',
          lineHeight: 'var(--leading-snug)',
          flexGrow: 1,
        }}>
          {caseStudy.name}
        </h2>

        {/* Type + year */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-xs)',
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: 'var(--tracking-wide)',
        }}>
          {caseStudy.type} · {caseStudy.year}
        </p>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 'var(--leading-normal)',
        }}>
          {caseStudy.description}
        </p>

        {/* Principle count */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: 'var(--tracking-wider)',
          borderTop: '1px solid rgba(255,255,255,0.2)',
          paddingTop: 'var(--space-4)',
        }}>
          {caseStudy.principleIds.length} עקרונות מיושמים
        </p>
      </article>
    </Link>
  )
}
