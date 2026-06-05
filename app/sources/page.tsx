import sourcesData from '@/data/sources.json'
import type { Source } from '@/types'
import SourceBlock from '@/components/SourceBlock'

const sources = sourcesData as Source[]

export default function SourcesPage() {
  return (
    <div style={{
      maxWidth: 'var(--content-width)',
      margin: '0 auto',
      padding: 'var(--space-16) var(--page-x)',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-12)' }}>
        <p className="u-label" style={{ marginBottom: 'var(--space-4)' }}>{sources.length} מקורות</p>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--weight-regular)',
          color: 'var(--ink)',
          lineHeight: 'var(--leading-tight)',
          marginBottom: 'var(--space-4)',
        }}>
          מקורות
        </h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-md)',
          color: 'var(--earth)',
          fontStyle: 'italic',
          maxWidth: '500px',
          lineHeight: 'var(--leading-normal)',
        }}>
          כל עיקרון מסומן במקור המדויק שלו. מידע ללא מקור — אינו מידע.
        </p>
      </div>

      {/* Source blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {sources.map(source => (
          <SourceBlock key={source.id} source={source} />
        ))}
      </div>

      {/* Transparency declaration */}
      <div style={{
        marginTop: 'var(--space-16)',
        borderTop: 'var(--border)',
        paddingTop: 'var(--space-8)',
      }}>
        <p className="u-label" style={{ marginBottom: 'var(--space-4)' }}>הצהרת שקיפות</p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          color: 'var(--earth)',
          lineHeight: 'var(--leading-loose)',
          maxWidth: '600px',
        }}>
          כל התוכן במדריך זה מבוסס אך ורק על המקורות המתועדים לעיל. אין תוכן ממוצא לא ידוע, אין עמדות
          עצמאיות ואין המלצות שאינן נסמכות על מחקר מאומת. הכלי נועד להנגיש ידע קיים — לא לייצר ידע חדש.
        </p>
      </div>
    </div>
  )
}
