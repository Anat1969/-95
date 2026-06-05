import type { Metadata } from 'next'
import { PrinciplesList } from './client'

export const metadata: Metadata = {
  title: 'עקרונות | 95° Guide',
  description: '12 עקרונות לתכנון מרחב ידידותי לילדות',
  openGraph: {
    title: 'עקרונות תכנון',
    description: '12 עקרונות מחקריים לתכנון מרחב ידידותי לילדות',
    locale: 'he_IL',
  },
}

export default function PrinciplesPage() {
  return <PrinciplesList />
}
