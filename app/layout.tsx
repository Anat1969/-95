import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import './globals.css'

export const metadata: Metadata = {
  title: '95° Guide | מדריך תכנון ידידותי לילדות',
  description: 'כלי עבודה דיגיטלי לתכנון מרחב ידידותי לילדים ולמשפחותיהם בישראל',
  keywords: [
    'תכנון אורבני',
    'ילדים',
    'אדריכלות',
    'מרחב ציבורי',
    'תכנון עירוני',
    'ישראל',
  ],
  openGraph: {
    title: '95° Guide',
    description: 'כלי עבודה לתכנון מרחב ידידותי לילדות',
    locale: 'he_IL',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#F0EDE6" />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
