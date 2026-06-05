import type { Metadata } from 'next'
import sources from '@/data/sources.json'

export const metadata: Metadata = {
  title: 'מקורות | 95° Guide',
  description: 'המקורות המחקריים והמקצועיים לעקרונות התכנון',
}

export default function SourcesPage() {
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
            מקורות
          </h1>
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--earth)',
              lineHeight: 'var(--leading-loose)',
              maxWidth: '600px',
              fontStyle: 'italic',
            }}
          >
            כל עקרון מסומן במקור המדויק שלו. מידע ללא מקור — אינו מידע.
          </p>
        </div>

        {/* Sources blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          {(sources as any).map((source: any, idx: number) => (
            <div
              key={source.id}
              style={{
                borderBottom: idx < sources.length - 1 ? 'var(--border)' : 'none',
                paddingBottom: 'var(--space-12)',
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-6)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--weight-bold)',
                    background: source.accentColor,
                    color: 'var(--white)',
                    padding: 'var(--space-2) var(--space-3)',
                    display: 'inline-block',
                  }}
                >
                  {source.id === 'urban95' ? 'U95' : source.id === 'moe' ? 'MOE' : 'POB'}
                </span>
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--weight-bold)',
                      color: 'var(--ink)',
                      margin: 0,
                    }}
                  >
                    {source.name}
                  </h2>
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--earth)',
                      margin: 0,
                      marginTop: 'var(--space-1)',
                    }}
                  >
                    {source.subtitle}
                  </p>
                </div>
              </div>

              {/* Year */}
              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--earth)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                שנת פרסום: {source.year}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: 'var(--text-base)',
                  lineHeight: 'var(--leading-loose)',
                  color: 'var(--earth)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                {source.description}
              </p>

              {/* Topics */}
              {source.topics && source.topics.length > 0 && (
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <div
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--weight-bold)',
                      marginBottom: 'var(--space-2)',
                      color: 'var(--ink)',
                    }}
                  >
                    נושאים:
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                    {source.topics.map((topic: string) => (
                      <span
                        key={topic}
                        style={{
                          fontSize: 'var(--text-sm)',
                          padding: 'var(--space-2) var(--space-3)',
                          border: '1px solid var(--fog)',
                          color: 'var(--earth)',
                          display: 'inline-block',
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--forest)',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      transition: 'var(--transition-base)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--ink)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--forest)'
                    }}
                  >
                    קישור למקור ←
                  </a>
                )}
                {source.pdfUrl && (
                  <a
                    href={source.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--forest)',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      transition: 'var(--transition-base)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--ink)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--forest)'
                    }}
                  >
                    הורד PDF ←
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div
          style={{
            marginTop: 'var(--space-12)',
            padding: 'var(--space-8)',
            background: 'var(--white)',
            border: 'var(--border)',
            fontStyle: 'italic',
            fontSize: 'var(--text-sm)',
            color: 'var(--earth)',
            lineHeight: 'var(--leading-loose)',
          }}
        >
          הפרויקט מבוסס על שלוש מערכות ידע עיקריות: Urban95 של קרן ברנרד ון ליר,
          הנחיות משרד החינוך לתכנון מוסדות חינוך, ופורטל הרשויות של משרד החינוך. כל
          עקרון מקושר למקורו כדי לאפשר אימות ועדכון עתידי.
        </div>
      </div>
    </div>
  )
}
