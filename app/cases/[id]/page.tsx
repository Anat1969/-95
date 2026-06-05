import { notFound } from 'next/navigation'
import Link from 'next/link'
import casesData from '@/data/cases.json'
import principlesData from '@/data/principles.json'
import type { CaseStudy, Principle } from '@/types'
import BackButton from '@/components/BackButton'

const cases = casesData as CaseStudy[]
const principles = principlesData as Principle[]

export function generateStaticParams() {
  return cases.map(c => ({ id: c.id }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const c = cases.find(c => c.id === params.id)
  if (!c) return {}
  return { title: `${c.name} — 95° Guide`, description: c.description }
}

export default function CasePage({ params }: { params: { id: string } }) {
  const caseStudy = cases.find(c => c.id === params.id)
  if (!caseStudy) notFound()

  const relatedPrinciples = principles.filter(p => caseStudy.principleIds.includes(p.id))

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: caseStudy.accentColor,
        padding: 'var(--space-20) var(--page-x)',
        marginBottom: 'var(--space-12)',
      }}>
        <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <BackButton href="/cases" label="חזרה למקרי בוחן" />
          </div>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: 'var(--tracking-wider)',
            marginBottom: 'var(--space-4)',
          }}>
            {caseStudy.city} · {caseStudy.type} · {caseStudy.year}
          </p>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 'var(--weight-regular)',
            color: 'var(--white)',
            lineHeight: 'var(--leading-tight)',
            letterSpacing: 'var(--tracking-tight)',
            marginBottom: 'var(--space-8)',
          }}>
            {caseStudy.name}
          </h1>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-md)',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '600px',
            lineHeight: 'var(--leading-normal)',
          }}>
            {caseStudy.longDescription}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto', padding: '0 var(--page-x) var(--space-20)' }}>
        {/* Related principles */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <p className="u-label" style={{ marginBottom: 'var(--space-6)' }}>
            עקרונות מיושמים — {relatedPrinciples.length}
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 'var(--space-3)',
          }}>
            {relatedPrinciples.map(p => (
              <Link key={p.id} href={`/principles/${p.id}`} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                padding: 'var(--space-5)',
                border: 'var(--border)',
                textDecoration: 'none',
                background: 'var(--white)',
              }}
              className="hover-border"
              >
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--earth)',
                }}>
                  #{String(p.priority).padStart(2, '0')}
                </span>
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-md)',
                  color: 'var(--ink)',
                }}>
                  {p.title}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--white)',
                  background: p.accentColor,
                  padding: '2px 8px',
                  alignSelf: 'flex-start',
                }}>
                  {p.dimension}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Source */}
        <div style={{
          borderTop: 'var(--border)',
          paddingTop: 'var(--space-6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}>
          <div>
            <p className="u-label" style={{ marginBottom: 'var(--space-2)' }}>מקור</p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-base)',
              color: 'var(--ink)',
            }}>
              {caseStudy.source}
            </p>
          </div>
          <Link href="/sources" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--earth)',
            textDecoration: 'none',
            borderBottom: 'var(--border)',
          }}>
            כל המקורות
          </Link>
        </div>
      </div>
    </div>
  )
}
