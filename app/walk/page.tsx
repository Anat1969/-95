'use client'

import Script from 'next/script'
import { useEffect, useRef } from 'react'
import plan from '@/data/walk.json'
import { asset } from '@/lib/utils'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'space-walk': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'ref-base'?: string }
    }
  }
}

type WalkElement = HTMLElement & { plan?: unknown }

const WALK_JS = 'https://appofapp-gh.vercel.app/walk.js'
// same file from the portfolio's GitHub Pages, for days when Vercel is rate-limited
const WALK_JS_PAGES = 'https://anat1969.github.io/AppOfApp-GH/walk.js'

function fallback() {
  if (customElements.get('space-walk') || document.querySelector(`script[src="${WALK_JS_PAGES}"]`)) return
  const s = document.createElement('script')
  s.src = WALK_JS_PAGES
  document.head.appendChild(s)
}

// The shared <space-walk> component (appofapp-gh/walk.js) draws the plan in 3D and walks it at eye height.
// State lives in the address (?eye=95&v=guide&view=top), so the A&I "copy link" keeps it.
export default function WalkPage() {
  const ref = useRef<WalkElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const q = new URLSearchParams(window.location.search)
    const eye = q.get('eye')
    const v = q.get('v')
    const view = q.get('view')
    if (eye) el.setAttribute('eye', eye)
    if (v) el.setAttribute('variant', v)
    if (view) el.setAttribute('view', view)
    el.plan = plan
    const onChange = (e: Event) => {
      const d = (e as CustomEvent<{ eye: number; variant: string; view: string }>).detail
      const next = new URLSearchParams({ eye: String(d.eye), v: d.variant })
      if (d.view === 'top') next.set('view', 'top')
      window.history.replaceState(null, '', `${window.location.pathname}?${next}`)
    }
    el.addEventListener('walkchange', onChange)
    return () => el.removeEventListener('walkchange', onChange)
  }, [])

  return (
    <div className="walk-page">
      <Script src={WALK_JS} strategy="afterInteractive" onLoad={fallback} onError={fallback} />
      <space-walk ref={ref} ref-base={asset('/principles/')} />
    </div>
  )
}
