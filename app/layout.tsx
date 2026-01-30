import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import GSAPProvider from '@/components/GSAPProvider'
import { PersonJsonLd, WebsiteJsonLd } from '@/components/JsonLd'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://apurwasarwajit.com'),
  title: {
    default: 'Apurwa Sarwajit | Product Lead at Redblock.ai',
    template: '%s | Apurwa Sarwajit',
  },
  description:
    'Apurwa Sarwajit is a Product Lead at Redblock.ai building AI-powered enterprise solutions. Previously generated $4M ARR at BureauID through AI-powered fraud detection. IIT Roorkee alumnus.',
  keywords: [
    'Apurwa Sarwajit',
    'Apurva Sarwajit',
    'Product Lead',
    'Product Manager',
    'Redblock.ai',
    'BureauID',
    'AI',
    'Agentic AI',
    'Enterprise Software',
    'Fraud Detection',
    'IIT Roorkee',
    'Bangalore',
    'India',
    'Fintech',
    'Machine Learning',
  ],
  authors: [{ name: 'Apurwa Sarwajit', url: 'https://apurwasarwajit.com' }],
  creator: 'Apurwa Sarwajit',
  publisher: 'Apurwa Sarwajit',
  formatDetection: {
    email: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://apurwasarwajit.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://apurwasarwajit.com',
    siteName: 'Apurwa Sarwajit',
    title: 'Apurwa Sarwajit | Product Lead at Redblock.ai',
    description:
      'Apurwa Sarwajit is a Product Lead building AI-powered enterprise solutions. Expert in fraud detection, agentic AI, and enterprise software. IIT Roorkee alumnus.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apurwa Sarwajit | Product Lead at Redblock.ai',
    description:
      'Product Lead building AI-powered enterprise solutions. Expert in fraud detection and agentic AI.',
    creator: '@apurwasarwajit',
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://apurwasarwajit.com" />
        <PersonJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <GSAPProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </GSAPProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
