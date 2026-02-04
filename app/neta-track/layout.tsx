import { Metadata } from 'next'
import { Source_Serif_4, IBM_Plex_Sans } from 'next/font/google'
import './neta-track.css'

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
  title: {
    default: 'Neta Track - Political Promise Tracker',
    template: '%s | Neta Track',
  },
  description: 'Track political promises vs delivery. Fact-based, neutral analysis of what parties promised and what they delivered. Make informed voting decisions with real data.',
  keywords: [
    'political promises India',
    'election manifesto tracker',
    'BJP promises delivered',
    'Congress manifesto',
    'Indian elections',
    'vote informed',
    'political accountability',
    'manifesto vs delivery',
    'election promises',
    'Lok Sabha elections',
  ],
  authors: [{ name: 'Apurwa Sarwajit', url: 'https://apurwasarwajit.com' }],
  creator: 'Apurwa Sarwajit',
  publisher: 'Apurwa Sarwajit',
  alternates: {
    canonical: 'https://apurwasarwajit.com/neta-track',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://apurwasarwajit.com/neta-track',
    siteName: 'Neta Track',
    title: 'Neta Track - Political Promise Tracker',
    description: 'Track political promises vs delivery. Make informed voting decisions with fact-based, neutral analysis.',
    images: [
      {
        url: 'https://apurwasarwajit.com/og-neta-track.png',
        width: 1200,
        height: 630,
        alt: 'Neta Track - Political Promise Tracker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neta Track - Political Promise Tracker',
    description: 'Track political promises vs delivery. Make informed voting decisions.',
    creator: '@apurwasarwajit',
    images: ['https://apurwasarwajit.com/og-neta-track.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

function NetaTrackJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Neta Track',
    description: 'A fact-based political promise tracker for Indian elections. Compare what parties promised vs what they delivered.',
    url: 'https://apurwasarwajit.com/neta-track',
    applicationCategory: 'Civic Technology',
    author: {
      '@type': 'Person',
      name: 'Apurwa Sarwajit',
      url: 'https://apurwasarwajit.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    inLanguage: 'en',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function BreadcrumbJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://apurwasarwajit.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Neta Track',
        item: 'https://apurwasarwajit.com/neta-track',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function NetaTrackLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NetaTrackJsonLd />
      <BreadcrumbJsonLd />
      <div className={`${sourceSerif.variable} ${ibmPlex.variable} min-h-screen bg-[#FAF7F2] text-[#1a2e44] antialiased paper-texture`}>
        {children}
      </div>
    </>
  )
}
