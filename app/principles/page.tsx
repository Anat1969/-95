'use client'

import { useState, useMemo } from 'react'
import type { Metadata } from 'next'
import principles from '@/data/principles.json'
import { filterPrinciples, getAllTags } from '@/lib/utils'
import { PrincipleCard } from '@/components/PrincipleCard'
import { FilterPills } from '@/components/FilterPills'
import type { FilterState, ProjectType } from '@/types'
import { PROJECT_TYPES } from '@/types'

export const metadata: Metadata = {
  title: 'עקרונות | 95° Guide',
  description: '12 עקרונות לתכנון מרחב ידידותי לילדות',
}

export default function PrinciplesPage() {
  const [filters, setFilters] = useState<FilterState>({
    projectType: null,
    phase: null,
    tag: null,
  })

  const allTags = useMemo(() => getAllTags(principles as any), [])
  const projectTypeLabels = useMemo(
    () => PROJECT_TYPES.map((pt) => pt.label),
    []
  )

  const filtered = useMemo(() => {
    return filterPrinciples(principles as any, filters)
  }, [filters])

  return (
    <div style={{ padding: 'var(--page-x)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--weight-regular)',
              marginBottom: 'var(--space-6)',
              color: 'var(--ink)',
            }}
          >
            עקרונות תכנון
          </h1>
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--earth)',
              lineHeight: 'var(--leading-loose)',
              maxWidth: '700px',
              marginBottom: 'var(--space-4)',
            }}
          >
            12 עקרונות מחקריים לתכנון מרחב בגובה עיני הילד בן 3. כל עקרון נתמך
            בנתונים ממקורות מקצועיים. בחרו סוג פרויקט כדי לראות את העקרונות הרלוונטיים.
          </p>
          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--forest)',
              fontStyle: 'italic',
              lineHeight: 'var(--leading-loose)',
            }}
          >
            💡 לחצו על כל עקרון כדי לקרוא את המלא — מדוע חשוב, דרישות מינימום, ומקרי בוחן בפועל.
          </p>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <FilterPills
            items={projectTypeLabels}
            selected={
              filters.projectType
                ? PROJECT_TYPES.find((pt) => pt.id === filters.projectType)?.label || null
                : null
            }
            onChange={(label) => {
              const projectType = label
                ? PROJECT_TYPES.find((pt) => pt.label === label)?.id || null
                : null
              setFilters((prev) => ({ ...prev, projectType: projectType as ProjectType | null }))
            }}
            label="לפי סוג פרויקט:"
          />

          <FilterPills
            items={['כללי', 'ביצוע']}
            selected={
              filters.phase === 'general'
                ? 'כללי'
                : filters.phase === 'execution'
                  ? 'ביצוע'
                  : null
            }
            onChange={(label) => {
              const phase = label === 'כללי' ? 'general' : label === 'ביצוע' ? 'execution' : null
              setFilters((prev) => ({ ...prev, phase: phase as any }))
            }}
            label="לפי שלב פרויקט:"
          />

          <FilterPills
            items={allTags}
            selected={filters.tag}
            onChange={(tag) => {
              setFilters((prev) => ({ ...prev, tag }))
            }}
            label="לפי תגית:"
          />
        </div>

        {/* Results counter */}
        <div
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--earth)',
            marginBottom: 'var(--space-6)',
          }}
        >
          מוצגים {filtered.length} מתוך {principles.length} עקרונות
        </div>

        {/* Grid */}
        <div className="grid grid-3">
          {filtered.length > 0 ? (
            filtered.map((principle, idx) => (
              <div
                key={principle.id}
                style={{
                  animation: `slideInUp 0.4s ease-out ${idx * 0.05}s backwards`,
                }}
              >
                <PrincipleCard
                  principle={principle as any}
                />
              </div>
            ))
          ) : (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: 'var(--space-12)',
                color: 'var(--earth)',
                animation: 'fadeIn 0.4s ease-out',
              }}
            >
              <p style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-bold)', marginBottom: 'var(--space-3)' }}>
                לא נמצאו עקרונות
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--earth)' }}>
                נסה לשנות את הסינון כדי לראות תוצאות שונות
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
