'use client'

import Link from 'next/link'
import { useState } from 'react'

interface BackButtonProps {
  href?: string
  label?: string
}

export function BackButton({ href = '/', label = 'חזרה' }: BackButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        fontSize: 'var(--text-sm)',
        fontFamily: 'var(--font-sans)',
        color: isHovered ? 'var(--forest)' : 'var(--earth)',
        marginBottom: 'var(--space-6)',
        transition: 'var(--transition-base)',
        textDecoration: 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>→</span>
      <span>{label}</span>
    </Link>
  )
}
