import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: '95° Guide — מדריך תכנון ידידותי לילדות',
  description: 'כלי עבודה לאדריכלים ומתכנני ערים — להבנה, יישום וביקורת של תכנון מרחב ידידותי לילדים.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <Nav />
        <main style={{ paddingTop: 'var(--nav-height)' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
