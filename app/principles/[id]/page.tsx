import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import principles from '@/data/principles.json'
import cases from '@/data/cases.json'
import { DimensionBadge } from '@/components/DimensionBadge'
import { SourceBadge } from '@/components/SourceBadge'
import { PrincipleCard } from '@/components/PrincipleCard'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getRelatedPrinciples } from '@/lib/utils'

export async function generateStaticParams() {
  return (principles as any).map((p: any) => ({
    id: p.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const principle = (principles as any).find((p: any) => p.id === params.id)

  if (!principle) {
    return { title: 'לא נמצא' }
  }

  return {
    title: `${principle.title} | 95° Guide`,
    description: principle.summary,
  }
}

export default function PrincipleDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const principle = (principles as any).find((p: any) => p.id === params.id)

  if (!principle) {
    notFound()
  }

  const relatedPrinciples = getRelatedPrinciples(principle, principles as any, 3)
  const caseStudy = principle.caseStudy
    ? (cases as any).find((c: any) => c.id === principle.caseStudy)
    : null

  const requirementLines = principle.requirement.split('|').map((line: string) => line.trim())

  return (
    <div style={{ padding: 'var(--page-x)' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <div style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
          <Breadcrumbs
            items={[
              { label: '95° Guide', href: '/' },
              { label: 'עקרונות', href: '/principles' },
              { label: principle.title, href: `/principles/${principle.id}` },
            ]}
          />
        </div>

        {/* Hero section */}
        <div
          style={{
            marginBottom: 'var(--space-12)',
            paddingBottom: 'var(--space-12)',
            borderBottom: 'var(--border)',
          }}
        >
          <div
            style={{
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 'var(--weight-bold)',
              color: 'var(--earth)',
              marginBottom: 'var(--space-2)',
              textAlign: 'right',
            }}
          >
            PRIORITY #{principle.priority.toString().padStart(2, '0')}
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--weight-regular)',
              lineHeight: 'var(--leading-snug)',
              marginBottom: 'var(--space-6)',
              color: 'var(--ink)',
            }}
          >
            {principle.title}
          </h1>

          <p
            style={{
              fontSize: 'var(--text-lg)',
              fontFamily: 'var(--font-sans)',
              color: 'var(--earth)',
              lineHeight: 'var(--leading-loose)',
              marginBottom: 'var(--space-6)',
            }}
          >
            {principle.summary}
          </p>

          {/* Tags */}
          {principle.tags && principle.tags.length > 0 && (
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {principle.tags.map((tag: string) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 'var(--text-sm)',
                    padding: 'var(--space-2) var(--space-3)',
                    border: '1px solid var(--forest)',
                    color: 'var(--forest)',
                    display: 'inline-block',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Two-column content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-10)',
            marginBottom: 'var(--space-12)',
          }}
        >
          {/* Left: Why */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--weight-bold)',
                marginBottom: 'var(--space-4)',
                color: 'var(--ink)',
              }}
            >
              מדוע זה חשוב?
            </h2>
            <p
              style={{
                fontSize: 'var(--text-base)',
                lineHeight: 'var(--leading-loose)',
                color: 'var(--earth)',
              }}
            >
              {principle.why}
            </p>
          </div>

          {/* Right: Dimension + Sources */}
          <div>
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <DimensionBadge
                dimension={principle.dimension}
                accentColor={principle.accentColor}
              />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--weight-bold)',
                marginBottom: 'var(--space-3)',
                color: 'var(--ink)',
              }}
            >
              מקורות
            </h3>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {principle.sources && principle.sources.length > 0
                ? principle.sources.map((sourceId: string) => (
                    <SourceBadge key={sourceId} sourceId={sourceId as any} />
                  ))
                : null}
            </div>
          </div>
        </div>

        {/* Requirement block */}
        <div
          style={{
            background: 'var(--ink)',
            color: 'var(--white)',
            padding: 'var(--space-8)',
            marginBottom: 'var(--space-12)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--weight-bold)',
              marginBottom: 'var(--space-4)',
              color: 'var(--white)',
            }}
          >
            דרישת מינימום
          </h2>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {requirementLines.map((line: string, idx: number) => (
              <li
                key={idx}
                style={{
                  fontSize: 'var(--text-base)',
                  lineHeight: 'var(--leading-loose)',
                  marginBottom: 'var(--space-3)',
                  display: 'flex',
                  gap: 'var(--space-3)',
                }}
              >
                <span style={{ color: 'var(--lime)', fontWeight: 'var(--weight-bold)' }}>
                  •
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related case study */}
        {caseStudy && (
          <div style={{ marginBottom: 'var(--space-12)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--weight-bold)',
                marginBottom: 'var(--space-4)',
                color: 'var(--ink)',
              }}
            >
              מקרה בוחן
            </h2>
            <p
              style={{
                fontSize: 'var(--text-base)',
                marginBottom: 'var(--space-4)',
                color: 'var(--earth)',
              }}
            >
              {caseStudy.name}
            </p>
            <Link
              href={`/cases/${caseStudy.id}`}
              className="btn-cta"
            >
              קראי עוד על המקרה →
            </Link>
          </div>
        )}

        {/* Related principles */}
        {relatedPrinciples.length > 0 && (
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--weight-bold)',
                marginBottom: 'var(--space-6)',
                color: 'var(--ink)',
              }}
            >
              עקרונות קשורים
            </h2>
            <div className="grid grid-3">
              {relatedPrinciples.map((relatedPrinciple: any) => (
                <PrincipleCard key={relatedPrinciple.id} principle={relatedPrinciple} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
