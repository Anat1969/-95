// ============================================================
// 95° GUIDE — Utility Functions
// ============================================================

import type { Principle, FilterState, ChecklistState } from '@/types'

// סנן עקרונות לפי פילטר
export function filterPrinciples(
  principles: Principle[],
  filter: FilterState
): Principle[] {
  return principles.filter(p => {
    // סינון לפי סוג פרויקט
    if (filter.projectType && filter.projectType !== 'general') {
      const match =
        p.projectTypes.includes(filter.projectType) ||
        p.projectTypes.includes('general')
      if (!match) return false
    }

    // סינון לפי שלב
    if (filter.phase && filter.phase !== 'both') {
      const match =
        p.phase.includes(filter.phase as 'general' | 'execution') ||
        p.phase.includes('general')
      if (!match) return false
    }

    // סינון לפי תגית
    if (filter.tag && !p.tags.includes(filter.tag)) {
      return false
    }

    return true
  })
}

// חישוב אחוז עמידה
export function calcCompliance(
  principles: Principle[],
  checks: ChecklistState
): { pct: number; checked: number; failed: number; na: number; total: number } {
  const na      = Object.values(checks).filter(v => v === 'na').length
  const checked = Object.values(checks).filter(v => v === 'yes').length
  const failed  = Object.values(checks).filter(v => v === 'no').length
  const total   = principles.length - na
  const pct     = total > 0 ? Math.round((checked / total) * 100) : 0

  return { pct, checked, failed, na, total }
}

// כל התגיות הייחודיות
export function getAllTags(principles: Principle[]): string[] {
  return [...new Set(principles.flatMap(p => p.tags))].sort()
}

// עקרונות קשורים לפי תגיות משותפות
export function getRelatedPrinciples(
  principle: Principle,
  all: Principle[],
  limit = 3
): Principle[] {
  return all
    .filter(p => p.id !== principle.id)
    .filter(p => p.tags.some(t => principle.tags.includes(t)))
    .slice(0, limit)
}

export const DIMENSION_HEBREW: Record<string, string> = {
  'sightline': '15 מ׳ מקס׳',
  'stroller-access': '120 ס״מ מינימום',
  'shade': '50% הצללה',
  'surface-texture': '3+ מרקמים',
  'adult-seating': '5 מ׳ רדיוס',
  'traffic-separation': '3 מ׳ חיץ',
  'walking-distance': '400 מ׳ הליכה',
  'window-height': '60 ס״מ אדן',
  'nature-element': '1 ל-200 מ״ר',
  'zoning-clarity': '80–120 ס״מ',
  'kindergarten-area': '55 מ״ר כיתה',
  'lighting-safety': '50 לוקס',
}

// צבע רקע לתג מקור
export function getSourceColor(sourceId: string): string {
  const map: Record<string, string> = {
    urban95:         '#2D4A3E',
    moe:             '#3E5C8C',
    moeconstruction: '#8C5C3E',
  }
  return map[sourceId] ?? '#8C7B6B'
}
