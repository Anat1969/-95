import { SOURCE_LABELS } from '@/types'
import type { SourceId } from '@/types'

interface SourceBadgeProps {
  sourceId: SourceId
}

export function SourceBadge({ sourceId }: SourceBadgeProps) {
  const label = SOURCE_LABELS[sourceId]

  return (
    <span className="u-src-badge" title={sourceId}>
      {label}
    </span>
  )
}
