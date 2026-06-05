import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import cases from '@/data/cases.json'
import principles from '@/data/principles.json'
import { BackButton } from '@/components/BackButton'
import { PrincipleCard } from '@/components/PrincipleCard'

export async function generateStaticParams() {
  return (cases as any).map((c: any) => ({
    id: c.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const caseStudy = (cases as any).find((c: any) => c.id === params.id)

  if (!caseStudy) {
    return { title: 'לא נמצא' }
  }

  return {
    title: `${caseStudy.name} | 95° Guide`,
    description: caseStudy.description,
  }
}

export default function CaseDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const caseStudy = (cases as any).find((c: any) => c.id === params.id)

  if (!caseStudy) {
    notFound()
  }

  const relatedPrinciples = (principles as any)
    .filter((p: any) => caseStudy.principleIds.includes(p.id))
    .slice(0, 6)

  return (
    <div style={{ padding: 'var(--page-x)' }}>
      <div className="container">
        {/* Back button */}
        <div style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
          <BackButton href="/cases" label="חזרה למקרי בוחן" />
        </div>

        {/* Hero section */}
        <div
          style={{
            background: caseStudy.accentColor,
            color: 'var(--white)',
            padding: 'var(--space-12)',
            marginBottom: 'var(--space-12)',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-mono)',
              marginBottom: 'var(--space-4)',
              opacity: 0.8,
            }}
          >
            {caseStudy.city} · {caseStudy.year}
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-hero)',
              fontWeight: 'var(--weight-regular)',
              lineHeight: 'var(--leading-snug)',
              marginBottom: 'var(--space-6)',
            }}
          >
            {caseStudy.name}
          </h1>

          <p
            style={{
              fontSize: 'var(--text-lg)',
              lineHeight: 'var(--leading-loose)',
              maxWidth: '700px',
              opacity: 0.95,
            }}
          >
            {caseStudy.description}
          </p>
        </div>

        {/* Content */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--weight-bold)',
              marginBottom: 'var(--space-6)',
              color: 'var(--ink)',
            }}
          >
            על המקרה
          </h2>
          <div
            style={{
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--earth)',
              maxWidth: '700px',
            }}
          >
            <p style={{ marginBottom: 'var(--space-6)' }}>{caseStudy.longDescription}</p>
            <p style={{ marginBottom: 'var(--space-6)' }}>
              <strong>סוג פרויקט:</strong> {caseStudy.type}
            </p>
            {caseStudy.sourceId && (
              <p>
                <strong>מקור:</strong> {caseStudy.source}
              </p>
            )}
          </div>
        </div>

        {/* Related principles */}
        {relatedPrinciples.length > 0 && (
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--weight-bold)',
                marginBottom: 'var(--space-6)',
                color: 'var(--ink)',
              }}
            >
              עקרונות שהוחלו
            </h2>
            <div className="grid grid-3">
              {relatedPrinciples.map((principle: any) => (
                <PrincipleCard key={principle.id} principle={principle} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
