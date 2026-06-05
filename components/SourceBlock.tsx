import type { Source } from '@/types'

interface SourceBlockProps {
  source: Source
}

export default function SourceBlock({ source }: SourceBlockProps) {
  return (
    <div style={{
      border: 'var(--border)',
      padding: 'var(--space-8)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <span style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-wider)',
            padding: '3px 10px',
            background: source.accentColor,
            color: 'var(--white)',
            marginBottom: 'var(--space-3)',
          }}>
            {source.tag}
          </span>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--weight-regular)',
            color: 'var(--ink)',
            lineHeight: 'var(--leading-snug)',
            marginBottom: 'var(--space-1)',
          }}>
            {source.name}
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--earth)',
          }}>
            {source.subtitle}
          </p>
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--earth)',
          letterSpacing: 'var(--tracking-wide)',
        }}>
          {source.year}
        </span>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-base)',
        color: 'var(--ink)',
        lineHeight: 'var(--leading-normal)',
        marginBottom: 'var(--space-6)',
      }}>
        {source.description}
      </p>

      {/* Topics */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
        {source.topics.map(topic => (
          <span key={topic} className="u-tag">{topic}</span>
        ))}
      </div>

      {/* Link */}
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--weight-bold)',
          color: 'var(--ink)',
          textDecoration: 'none',
          borderBottom: 'var(--border-ink)',
          transition: 'var(--transition-base)',
        }}
      >
        עבור למקור המלא ←
      </a>
    </div>
  )
}
