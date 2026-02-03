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
  title: {
    default: 'Understanding India\'s Economy - Learn Economics Simply',
    template: '%s | India Economy Guide',
  },
  description: 'Free educational guide to India\'s economy. Learn about Union Budget, RBI, GDP, inflation, taxation, stock markets, banking, trade & employment with real government data. Written for students and curious adults.',
  keywords: [
    'India economy',
    'Indian economy explained',
    'Union Budget India',
    'RBI monetary policy',
    'India GDP',
    'inflation India',
    'GST India',
    'income tax India',
    'Sensex Nifty',
    'Indian stock market',
    'UPI payments',
    'India banking system',
    'India trade exports',
    'MGNREGA',
    'India employment',
    'economics for students',
    'NCERT economics',
    'learn economics free',
  ],
  authors: [{ name: 'Apurwa Sarwajit', url: 'https://apurwasarwajit.com' }],
  creator: 'Apurwa Sarwajit',
  publisher: 'Apurwa Sarwajit',
  alternates: {
    canonical: 'https://apurwasarwajit.com/india-economy',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://apurwasarwajit.com/india-economy',
    siteName: 'Understanding India\'s Economy',
    title: 'Understanding India\'s Economy - Free Educational Guide',
    description: 'Learn how India\'s economy works through simple explanations, real government data, and easy-to-understand visualizations. Budget, RBI, GDP, taxes, markets & more.',
    images: [
      {
        url: 'https://apurwasarwajit.com/og-india-economy.png',
        width: 1200,
        height: 630,
        alt: 'Understanding India\'s Economy - Educational Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Understanding India\'s Economy - Free Educational Guide',
    description: 'Learn Indian economics simply: Budget, RBI, GDP, inflation, taxes, stock markets & more. Real data, easy explanations.',
    creator: '@apurwasarwajit',
    images: ['https://apurwasarwajit.com/og-india-economy.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// JSON-LD structured data for the educational content
function IndiaEconomyJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Understanding India\'s Economy',
    description: 'A free educational guide to India\'s economy covering Union Budget, RBI monetary policy, GDP, inflation, taxation, stock markets, banking, trade, and employment.',
    provider: {
      '@type': 'Person',
      name: 'Apurwa Sarwajit',
      url: 'https://apurwasarwajit.com',
    },
    url: 'https://apurwasarwajit.com/india-economy',
    educationalLevel: 'Beginner',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: 'Students, General Public, Economics Enthusiasts',
    },
    inLanguage: 'en',
    isAccessibleForFree: true,
    teaches: [
      'Union Budget and Government Finances',
      'RBI Monetary Policy and Interest Rates',
      'GDP and Economic Growth',
      'Inflation and Consumer Prices',
      'Taxation System (Income Tax, GST)',
      'Stock Markets (Sensex, Nifty)',
      'Banking System and UPI',
      'International Trade',
      'Employment and Labour Markets',
    ],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT2H',
    },
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
        name: 'India Economy',
        item: 'https://apurwasarwajit.com/india-economy',
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

export default function IndiaEconomyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <IndiaEconomyJsonLd />
      <BreadcrumbJsonLd />
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
    </>
  )
}
