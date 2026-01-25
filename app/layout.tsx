import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'Apurwa Sarwajit | Product Lead',
    template: '%s | Apurwa Sarwajit',
  },
  description:
    'Product Lead building AI-powered enterprise solutions. Previously generated $4M ARR at BureauID through AI-powered fraud detection.',
  keywords: [
    'Product Manager',
    'Product Lead',
    'AI',
    'Enterprise Software',
    'Fraud Detection',
    'Agentic AI',
  ],
  authors: [{ name: 'Apurwa Sarwajit' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://apurwasarwajit.com',
    siteName: 'Apurwa Sarwajit',
    title: 'Apurwa Sarwajit | Product Lead',
    description:
      'Product Lead building AI-powered enterprise solutions. Previously generated $4M ARR at BureauID through AI-powered fraud detection.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apurwa Sarwajit | Product Lead',
    description:
      'Product Lead building AI-powered enterprise solutions.',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
