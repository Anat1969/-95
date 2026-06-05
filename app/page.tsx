import Link from 'next/link'

export default function Home() {
  return (
    <div style={{
      minHeight: 'calc(100vh - var(--nav-height))',
      background: 'var(--ink)',
      color: 'var(--paper)',
      padding: 'var(--space-20) var(--page-x)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Watermark */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -60%)',
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(200px, 40vw, 500px)',
        fontWeight: 'var(--weight-regular)',
        color: 'var(--paper)',
        opacity: 0.04,
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        95°
      </div>

      <div style={{ position: 'relative', maxWidth: 'var(--content-width)' }}>
        <p className="u-label" style={{ color: 'var(--earth)', marginBottom: 'var(--space-8)', letterSpacing: 'var(--tracking-widest)' }}>
          מדריך תכנון ידידותי לילדות — ישראל
        </p>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-hero)',
          fontWeight: 'var(--weight-regular)',
          lineHeight: 'var(--leading-tight)',
          color: 'var(--lime)',
          marginBottom: 'var(--space-8)',
          letterSpacing: 'var(--tracking-tight)',
        }}>
          מה גובה<br />
          <em>נקודת המבט</em><br />
          שלך?
        </h1>

        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-md)',
          fontWeight: 'var(--weight-light)',
          color: 'var(--fog)',
          maxWidth: '520px',
          lineHeight: 'var(--leading-normal)',
          marginBottom: 'var(--space-16)',
        }}>
          כלי עבודה לאדריכלים ומתכנני ערים — להבנה, יישום וביקורת של תכנון מרחב ידידותי לילדים.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '380px' }}>
          <Link href="/principles" style={{
            display: 'block',
            textAlign: 'center',
            padding: 'var(--space-5) var(--space-8)',
            background: 'var(--lime)',
            color: 'var(--ink)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--weight-bold)',
            textDecoration: 'none',
            border: '1px solid var(--lime)',
            transition: 'var(--transition-base)',
          }}>
            אני מתכנן פרויקט
          </Link>

          <Link href="/checklist" style={{
            display: 'block',
            textAlign: 'center',
            padding: 'var(--space-5) var(--space-8)',
            background: 'transparent',
            color: 'var(--paper)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--weight-regular)',
            textDecoration: 'none',
            border: 'var(--border-dark)',
            transition: 'var(--transition-base)',
          }}>
            אני בודק תוכנית מוגשת
          </Link>

          <Link href="/principles" style={{
            display: 'block',
            textAlign: 'center',
            padding: 'var(--space-5) var(--space-8)',
            background: 'transparent',
            color: 'var(--paper)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--weight-regular)',
            textDecoration: 'none',
            border: 'var(--border-dark)',
            transition: 'var(--transition-base)',
          }}>
            אני רוצה ללמוד את העקרונות
          </Link>
        </div>
      </div>

      <p style={{
        position: 'relative',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        color: 'var(--earth)',
        letterSpacing: 'var(--tracking-wide)',
        marginTop: 'var(--space-16)',
      }}>
        Urban95 — קרן ון ליר &nbsp;·&nbsp; משרד החינוך — אגף מיפוי ותכנון
      </p>
    </div>
  )
}
