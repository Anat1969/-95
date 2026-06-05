import Link from 'next/link'

interface BackButtonProps {
  href?: string
  label?: string
}

export function BackButton({ href = '/', label = 'חזרה' }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="back-link"
    >
      <span>→</span>
      <span>{label}</span>
    </Link>
  )
}
