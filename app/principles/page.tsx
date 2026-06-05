'use client'

import { useState } from 'react'
import principlesData from '@/data/principles.json'
import type { Principle, FilterState } from '@/types'
import PrincipleCard from '@/components/PrincipleCard'
import FilterPills from '@/components/FilterPills'
import { getAllTags, filterPrinciples } from '@/lib/utils'

const principles = principlesData as Principle[]
const allTags = getAllTags(principles)

export default function PrinciplesPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filter: FilterState = { projectType: null, phase: null, tag: activeTag }
  const filtered = filterPrinciples(principles, filter)

  return (
    <div style={{
      maxWidth: 'var(--max-width)',
      margin: '0 auto',
      padding: 'var(--space-16) var(--page-x)',
    }}>
      <div style={{ marginBottom: 'var(--space-12)' }}>
        <p className="u-label" style={{ marginBottom: 'var(--space-4)' }}>
          {filtered.length} עקרונות
        </p>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--weight-regular)',
          color: 'var(--ink)',
          lineHeight: 'var(--leading-tight)',
          marginBottom: 'var(--space-8)',
        }}>
          עקרונות
        </h1>
        <FilterPills options={allTags} selected={activeTag} onChange={setActiveTag} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 'var(--space-4)',
      }}>
        {filtered.map(p => (
          <PrincipleCard key={p.id} principle={p} />
        ))}
      </div>
    </div>
  )
}
