import { Metadata } from 'next'
import { Source_Serif_4, IBM_Plex_Sans } from 'next/font/google'
import './india-economy.css'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Understanding India\'s Economy',
  description: 'Learn how India\'s economy works through data and easy-to-understand explanations.',
  openGraph: {
    title: 'Understanding India\'s Economy',
    description: 'Learn how India\'s economy works through data, visualizations, and easy-to-understand explanations.',
  },
}

export default function IndiaEconomyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${sourceSerif.variable} ${ibmPlex.variable} min-h-screen bg-[#FAF7F2] text-[#1a2e44] antialiased paper-texture`}>
      {/*
        Thoughtful Textbook Theme
        -------------------------
        Background: #FAF7F2 (warm cream, like paper)
        Text: #1a2e44 (deep indigo, not harsh black)
        Accent: #b85c38 (terracotta/rust)
        Secondary: #4a6fa5 (muted blue for links)
        Muted: #6b7c8f (slate for captions)
        Border: #e5e0d8 (warm gray)
        Highlight bg: #FFF8E7 (cream yellow for callouts)

        Typography:
        - Headers: Source Serif 4 (elegant, readable serif)
        - Body: IBM Plex Sans (humanist, not cold)
      */}
      {children}
    </div>
  )
}
