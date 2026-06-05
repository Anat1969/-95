import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - var(--nav-height))',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'var(--page-x)',
        background: 'var(--paper)',
      }}
    >
      <div style={{ maxWidth: '600px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-hero)',
            fontWeight: 'var(--weight-regular)',
            color: 'var(--ink)',
            marginBottom: 'var(--space-4)',
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--weight-bold)',
            color: 'var(--ink)',
            marginBottom: 'var(--space-6)',
          }}
        >
          העמוד לא נמצא
        </h2>

        <p
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--earth)',
            lineHeight: 'var(--leading-loose)',
            marginBottom: 'var(--space-8)',
          }}
        >
          הנתיב שחיפשת אינו קיים. אנא חזור לעמוד הבית או נסה לנווט דרך התפריט.
        </p>

        <Link
          href="/"
          className="btn-cta"
        >
          חזור לבית →
        </Link>
      </div>
    </div>
  )
}
