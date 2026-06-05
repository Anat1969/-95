import type { Metadata } from 'next'
import cases from '@/data/cases.json'
import { CaseCard } from '@/components/CaseCard'

export const metadata: Metadata = {
  title: 'מקרי בוחן | 95° Guide',
  description: '4 מקרי בוחן של מימוש עקרונות תכנון ידידותי לילדות',
}

export default function CasesPage() {
  return (
    <div style={{ padding: 'var(--page-x)' }}>
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
            מקרי בוחן
          </h1>
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--earth)',
              lineHeight: 'var(--leading-loose)',
              maxWidth: '700px',
            }}
          >
            דוגמאות מעשיות של פרויקטים בישראל שהיישמו את העקרונות בהצלחה. כל מקרה מציג
            יישום אמיתי, המאתגרים, והעקרונות המרכזיים שהשפיעו על התיכנון.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-2">
          {(cases as any).map((caseStudy: any) => (
            <CaseCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </div>
  )
}
