interface DimensionBadgeProps {
  dimension: string
  accentColor?: string
}

export function DimensionBadge({
  dimension,
  accentColor = 'var(--forest)',
}: DimensionBadgeProps) {
  return (
    <span
      className="u-dim"
      style={{
        background: accentColor,
      }}
    >
      {dimension}
    </span>
  )
}
