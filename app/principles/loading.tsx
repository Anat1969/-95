export default function Loading() {
  return (
    <div style={{ padding: 'var(--page-x)' }}>
      <div className="container">
        {/* Header skeleton */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <div
            style={{
              height: '48px',
              background: 'var(--fog)',
              marginBottom: 'var(--space-4)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
          <div
            style={{
              height: '100px',
              background: 'var(--fog)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        </div>

        {/* Filters skeleton */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: '36px',
                background: 'var(--fog)',
                marginBottom: 'var(--space-4)',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />
          ))}
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                height: '280px',
                background: 'var(--white)',
                border: 'var(--border)',
                padding: 'var(--space-6)',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
