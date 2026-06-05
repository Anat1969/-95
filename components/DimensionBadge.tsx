import { DIMENSION_HEBREW } from '@/lib/utils'

interface DimensionBadgeProps {
  dimension: string
  accentColor?: string
  principleId?: string
  size?: 'sm' | 'lg'
}

export function DimensionBadge({
  dimension,
  accentColor = 'var(--forest)',
  principleId,
  size = 'sm',
}: DimensionBadgeProps) {
  const hebrewText = principleId ? DIMENSION_HEBREW[principleId] : null

  return (
    <span
      style={{
        fontFamily: 'var(--font-round)',
        fontSize: size === 'lg' ? 'clamp(1.4rem, 2.8vw, 2.2rem)' : 'var(--text-sm)',
        fontWeight: 'var(--weight-bold)',
        color: accentColor,
        display: 'inline-block',
        lineHeight: 1.2,
      }}
    >
      {hebrewText || dimension}
    </span>
  )
}
