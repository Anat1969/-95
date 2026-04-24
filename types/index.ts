// ============================================================
// 95° GUIDE — TypeScript Interfaces
// כל ה-types של הפרויקט. לא לשנות ללא עדכון ב-JSON.
// ============================================================

export type SourceId = 'urban95' | 'moe' | 'moeconstruction'

export type ProjectType =
  | 'garden'
  | 'kindergarten'
  | 'daycare'
  | 'school'
  | 'public'
  | 'street'
  | 'general'

export type Phase = 'general' | 'execution'

export type CheckState = 'yes' | 'no' | 'na' | null

// ---- Principle ----

export interface Principle {
  id: string
  priority: number
  title: string
  summary: string
  why: string
  requirement: string
  dimension: string
  unit: string
  value: number
  sources: SourceId[]
  projectTypes: ProjectType[]
  phase: Phase[]
  caseStudy: string | null
  tags: string[]
  accentColor: string
  relatedPrinciples: string[]
}

// ---- Case Study ----

export interface CaseStudy {
  id: string
  name: string
  city: string
  type: string
  year: string
  description: string
  longDescription: string
  principleIds: string[]
  source: string
  sourceId: SourceId
  accentColor: string
  imageAlt: string
}

// ---- Source ----

export interface Source {
  id: SourceId
  tag: string
  name: string
  subtitle: string
  year: string
  description: string
  url: string
  pdfUrl: string | null
  topics: string[]
  accentColor: string
  principleIds: string[]
}

// ---- Project Type Meta ----

export interface ProjectTypeMeta {
  id: ProjectType
  label: string
  sub: string
}

// ---- Checklist State ----

export interface ChecklistState {
  [principleId: string]: CheckState
}

// ---- Filter State ----

export interface FilterState {
  projectType: ProjectType | null
  phase: Phase | 'both' | null
  tag: string | null
}

// ---- Source Label Map ----

export const SOURCE_LABELS: Record<SourceId, string> = {
  urban95: 'U95',
  moe: 'MOE',
  moeconstruction: 'POB',
}

export const SOURCE_NAMES: Record<SourceId, string> = {
  urban95: 'Urban95 — קרן ון ליר',
  moe: 'משרד החינוך — אגף מיפוי ותכנון',
  moeconstruction: 'משרד החינוך — פורטל רשויות',
}

// ---- Project Types ----

export const PROJECT_TYPES: ProjectTypeMeta[] = [
  { id: 'garden',       label: 'גן ציבורי',     sub: 'פארק / שטח פתוח' },
  { id: 'kindergarten', label: 'גן ילדים',       sub: 'מוסד חינוך קדם-יסודי' },
  { id: 'daycare',      label: 'מעון יום',        sub: 'גיל לידה עד 3' },
  { id: 'school',       label: 'בית ספר',         sub: 'יסודי / על-יסודי' },
  { id: 'public',       label: 'מרחב ציבורי',     sub: 'כיכר / רחבה / שדרה' },
  { id: 'street',       label: 'רחוב ותנועה',     sub: 'ניידות / תחבורה' },
]
