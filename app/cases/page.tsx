import casesData from '@/data/cases.json'
import type { CaseStudy } from '@/types'
import CaseCard from '@/components/CaseCard'

const cases = casesData as CaseStudy[]

export default function CasesPage() {
  return (
    <div style={{
      maxWidth: 'var(--max-width)',
      margin: '0 auto',
      padding: 'var(--space-16) var(--page-x)',
    }}>
      <div style={{ marginBottom: 'var(--space-12)' }}>
        <p className="u-label" style={{ marginBottom: 'var(--space-4)' }}>{cases.length} מקרים</p>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--weight-regular)',
          color: 'var(--ink)',
          lineHeight: 'var(--leading-tight)',
        }}>
          מקרי בוחן
        </h1>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--space-4)',
      }}>
        {cases.map(c => (
          <CaseCard key={c.id} caseStudy={c} />
        ))}
      </div>
    </div>
  )
}
