import { notFound } from 'next/navigation'
import Link from 'next/link'
import principlesData from '@/data/principles.json'
import casesData from '@/data/cases.json'
import type { Principle, CaseStudy } from '@/types'
import { SOURCE_LABELS, SOURCE_NAMES } from '@/types'
import DimensionBadge from '@/components/DimensionBadge'
import BackButton from '@/components/BackButton'
import { getRelatedPrinciples } from '@/lib/utils'

const principles = principlesData as Principle[]
const cases = casesData as CaseStudy[]

export function generateStaticParams() {
  return principles.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const p = principles.find(p => p.id === params.id)
  if (!p) return {}
  return { title: `${p.title} — 95° Guide`, description: p.summary }
}

export default function PrinciplePage({ params }: { params: { id: string } }) {
  const principle = principles.find(p => p.id === params.id)
  if (!principle) notFound()

  const caseStudy = principle.caseStudy ? cases.find(c => c.id === principle.caseStudy) : null
  const related = getRelatedPrinciples(principle, principles, 3)

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: 'var(--space-12) var(--page-x)' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <BackButton href="/principles" label="חזרה לעקרונות" />
      </div>

      {/* Hero */}
      <div style={{
        borderTop: '3px solid ' + principle.accentColor,
        paddingTop: 'var(--space-8)',
        marginBottom: 'var(--space-12)',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-sm)',
          color: 'var(--earth)',
          letterSpacing: 'var(--tracking-wider)',
          marginBottom: 'var(--space-4)',
        }}>
          PRIORITY #{String(principle.priority).padStart(2, '0')}
        </p>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(36px, 6vw, 60px)',
          fontWeight: 'var(--weight-regular)',
          color: 'var(--ink)',
          lineHeight: 'var(--leading-tight)',
          letterSpacing: 'var(--tracking-tight)',
          marginBottom: 'var(--space-6)',
        }}>
          {principle.title}
        </h1>

        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-md)',
          color: 'var(--earth)',
          maxWidth: '600px',
          lineHeight: 'var(--leading-normal)',
          marginBottom: 'var(--space-6)',
        }}>
          {principle.summary}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {principle.tags.map(tag => (
            <span key={tag} className="u-tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Two-column grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-8)',
        marginBottom: 'var(--space-12)',
      }}>
        <div style={{ borderTop: 'var(--border)', paddingTop: 'var(--space-6)' }}>
          <p className="u-label" style={{ marginBottom: 'var(--space-4)' }}>מדוע זה חשוב</p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            color: 'var(--ink)',
            lineHeight: 'var(--leading-loose)',
          }}>
            {principle.why}
          </p>
        </div>

        <div style={{
          background: 'var(--ink)',
          padding: 'var(--space-8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
        }}>
          <DimensionBadge dimension={principle.dimension} accentColor={principle.accentColor} large />
          <div>
            <p className="u-label" style={{ color: 'var(--earth)', marginBottom: 'var(--space-3)' }}>מקורות</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {principle.sources.map(src => (
                <div key={src} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: 'var(--tracking-wider)',
                    padding: '2px 6px',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'var(--fog)',
                  }}>{SOURCE_LABELS[src]}</span>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--fog)',
                  }}>{SOURCE_NAMES[src]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Minimum requirement */}
      <div style={{
        background: 'var(--ink)',
        padding: 'var(--space-8)',
        marginBottom: 'var(--space-12)',
      }}>
        <p className="u-label" style={{ color: 'var(--earth)', marginBottom: 'var(--space-4)' }}>דרישת מינימום</p>
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-base)',
          color: 'var(--paper)',
          lineHeight: 'var(--leading-loose)',
        }}>
          {principle.requirement.split('|').map((req, i) => (
            <p key={i} style={{ marginBottom: 'var(--space-2)' }}>— {req.trim()}</p>
          ))}
        </div>
      </div>

      {/* Case study link */}
      {caseStudy && (
        <div style={{
          border: 'var(--border)',
          padding: 'var(--space-6)',
          marginBottom: 'var(--space-12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <p className="u-label" style={{ marginBottom: 'var(--space-2)' }}>מקרה בוחן</p>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-lg)',
              color: 'var(--ink)',
            }}>
              {caseStudy.name} — {caseStudy.city}
            </p>
          </div>
          <Link href={`/cases/${caseStudy.id}`} style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--ink)',
            textDecoration: 'none',
            borderBottom: 'var(--border-ink)',
          }}>
            לדף המקרה ←
          </Link>
        </div>
      )}

      {/* Related principles */}
      {related.length > 0 && (
        <div>
          <p className="u-label" style={{ marginBottom: 'var(--space-6)' }}>עקרונות קשורים</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 'var(--space-4)',
          }}>
            {related.map(rp => (
              <Link key={rp.id} href={`/principles/${rp.id}`} style={{
                display: 'block',
                border: 'var(--border)',
                padding: 'var(--space-5)',
                textDecoration: 'none',
              }}>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--earth)',
                  marginBottom: 'var(--space-2)',
                }}>
                  #{String(rp.priority).padStart(2, '0')}
                </p>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-md)',
                  color: 'var(--ink)',
                }}>
                  {rp.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
