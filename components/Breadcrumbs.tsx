import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="breadcrumbs"
      style={{
        fontSize: 'var(--text-sm)',
        marginBottom: 'var(--space-6)',
        display: 'flex',
        gap: 'var(--space-2)',
        flexWrap: 'wrap',
      }}
    >
      {items.map((item, idx) => (
        <div
          key={item.href}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          <Link
            href={item.href}
            className="breadcrumb-link"
          >
            {item.label}
          </Link>
          {idx < items.length - 1 && (
            <span style={{ color: 'var(--fog)' }}>›</span>
          )}
        </div>
      ))}
    </nav>
  )
}
