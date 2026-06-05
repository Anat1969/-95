interface DimensionBadgeProps {
  dimension: string
  accentColor: string
  large?: boolean
}

export default function DimensionBadge({ dimension, accentColor, large }: DimensionBadgeProps) {
  return (
    <span style={{
      display: 'inline-block',
      fontFamily: 'var(--font-mono)',
      fontSize: large ? 'var(--text-lg)' : 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--white)',
      background: accentColor,
      padding: large ? 'var(--space-3) var(--space-6)' : '4px 10px',
      letterSpacing: 'var(--tracking-tight)',
    }}>
      {dimension}
    </span>
  )
}
