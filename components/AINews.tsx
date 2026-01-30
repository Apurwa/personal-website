'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface NewsItem {
  title: string
  link: string
  pubDate: string
  source: string
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateString
  }
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="animate-pulse">
            <div className="h-5 w-full rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="mt-2 h-5 w-2/3 rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="mt-3 flex gap-3">
              <div className="h-4 w-20 rounded bg-neutral-200 dark:bg-neutral-700" />
              <div className="h-4 w-24 rounded bg-neutral-200 dark:bg-neutral-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function parseRSSXml(xml: string): NewsItem[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')
  const items = doc.querySelectorAll('item')
  const news: NewsItem[] = []

  items.forEach((item, index) => {
    if (index >= 6) return // Limit to 6 items

    const title = item.querySelector('title')?.textContent || ''
    const link = item.querySelector('link')?.textContent || ''
    const pubDate = item.querySelector('pubDate')?.textContent || ''

    if (title && link) {
      news.push({
        title,
        link,
        pubDate,
        source: 'Hacker News',
      })
    }
  })

  return news
}

export default function AINews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        // Use allorigins as CORS proxy for HN RSS feed
        const rssUrl = 'https://hnrss.org/newest?q=AI+OR+LLM+OR+GPT'
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`

        const response = await fetch(proxyUrl)

        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }

        const data = await response.json()

        if (data.contents) {
          const parsedNews = parseRSSXml(data.contents)
          setNews(parsedNews)
        } else {
          throw new Error('Invalid response format')
        }
      } catch {
        setError('Unable to load AI news')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-neutral-600 dark:text-neutral-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {news.map((item, index) => (
        <motion.a
          key={`${item.link}-${index}`}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="group relative block overflow-hidden rounded-xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-200/50 hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:shadow-neutral-900/50"
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 via-primary-400/0 to-primary-600/0 opacity-0 transition-opacity duration-300 group-hover:from-primary-500/10 group-hover:via-primary-400/10 group-hover:to-primary-600/10 group-hover:opacity-100" />

          <div className="relative">
            <h3 className="font-semibold text-neutral-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 line-clamp-2">
              {item.title}
            </h3>

            <div className="mt-3 flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
              <span className="inline-flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                {item.source}
              </span>
              {item.pubDate && (
                <span className="inline-flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatDate(item.pubDate)}
                </span>
              )}
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  )
}
