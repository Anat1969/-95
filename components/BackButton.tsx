import Link from 'next/link'

interface BackButtonProps {
  href?: string
  label?: string
}

export function BackButton({ href = '/', label = 'חזרה' }: BackButtonProps) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        fontSize: 'var(--text-sm)',
        fontFamily: 'var(--font-sans)',
        color: 'var(--earth)',
        marginBottom: 'var(--space-6)',
        transition: 'var(--transition-base)',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = 'var(--forest)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = 'var(--earth)'
      }}
    >
      <span>→</span>
      <span>{label}</span>
    </Link>
  )
}
