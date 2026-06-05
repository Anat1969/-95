'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - var(--nav-height))',
        background: 'var(--ink)',
        color: 'var(--white)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background text */}
      <div
        style={{
          position: 'absolute',
          fontSize: '300px',
          fontFamily: 'var(--font-serif)',
          opacity: 0.04,
          pointerEvents: 'none',
          transform: 'rotate(-15deg)',
          zIndex: 0,
        }}
      >
        95°
      </div>

      {/* Hero content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px',
          paddingInline: 'var(--page-x)',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-block',
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: 'var(--space-2) var(--space-4)',
            marginBottom: 'var(--space-6)',
            color: 'var(--lime)',
            letterSpacing: '0.05em',
          }}
        >
          מדריך תכנון ישראלי לילדות
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: 'var(--text-hero)',
            fontFamily: 'var(--font-serif)',
            fontWeight: 'var(--weight-regular)',
            lineHeight: 'var(--leading-tight)',
            marginBottom: 'var(--space-8)',
            color: 'var(--white)',
          }}
        >
          מה גובה{' '}
          <span
            style={{
              color: 'var(--lime)',
              fontStyle: 'italic',
            }}
          >
            נקודת המבט
          </span>{' '}
          שלך?
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'var(--text-lg)',
            fontFamily: 'var(--font-sans)',
            lineHeight: 'var(--leading-loose)',
            marginBottom: 'var(--space-12)',
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          95 ס״מ — גובה עיניו של ילד בן 3. מנקודת מבט זו, העיר היא מקום אחר לגמרי.
          בואו נתכננו אותה כך שתהיה ידידותית לילדים, למשפחות ולחברה כולה.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            alignItems: 'center',
          }}
        >
          <Link
            href="/principles"
            style={{
              display: 'inline-block',
              background: 'var(--lime)',
              color: 'var(--ink)',
              padding: 'var(--space-4) var(--space-8)',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-sans)',
              fontWeight: 'var(--weight-bold)',
              border: 'none',
              cursor: 'pointer',
              transition: 'var(--transition-base)',
              textDecoration: 'none',
              borderRadius: '0',
              minWidth: '280px',
            }}
          >
            אני מתכננת פרויקט
          </Link>

          <Link
            href="/checklist"
            style={{
              display: 'inline-block',
              background: 'transparent',
              color: 'var(--white)',
              padding: 'var(--space-4) var(--space-8)',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-sans)',
              fontWeight: 'var(--weight-bold)',
              border: '1px solid var(--white)',
              cursor: 'pointer',
              transition: 'var(--transition-base)',
              textDecoration: 'none',
              borderRadius: '0',
              minWidth: '280px',
            }}
          >
            אני בודקת תוכנית מוגשת
          </Link>

          <Link
            href="/principles"
            style={{
              display: 'inline-block',
              background: 'transparent',
              color: 'var(--white)',
              padding: 'var(--space-4) var(--space-8)',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-sans)',
              fontWeight: 'var(--weight-bold)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              transition: 'var(--transition-base)',
              textDecoration: 'none',
              borderRadius: '0',
              minWidth: '280px',
            }}
          >
            אני רוצה ללמוד
          </Link>
        </div>
      </div>

      {/* Footer attribution */}
      <div
        style={{
          position: 'absolute',
          bottom: 'var(--space-6)',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 'var(--text-xs)',
          color: 'rgba(255, 255, 255, 0.5)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        Urban95 — קרן ברנרד ון ליר · משרד החינוך
      </div>
    </div>
  )
}
