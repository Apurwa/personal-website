'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  topics: string[]
}

function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString()
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
            <div className="h-5 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="mt-3 h-4 w-full rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="mt-2 h-4 w-2/3 rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="mt-4 flex gap-2">
              <div className="h-6 w-16 rounded-full bg-neutral-200 dark:bg-neutral-700" />
              <div className="h-6 w-20 rounded-full bg-neutral-200 dark:bg-neutral-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function TrendingRepos() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(
          'https://api.github.com/search/repositories?q=topic:artificial-intelligence+topic:machine-learning&sort=stars&order=desc&per_page=6'
        )

        if (response.status === 403) {
          setError('Rate limited. Please try again later.')
          return
        }

        if (!response.ok) {
          throw new Error('Failed to fetch repos')
        }

        const data = await response.json()
        setRepos(data.items || [])
      } catch {
        setError('Unable to load trending repos')
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
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
      {repos.map((repo, index) => (
        <motion.a
          key={repo.id}
          href={repo.html_url}
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
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-neutral-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                {repo.full_name}
              </h3>
              <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium">{formatStars(repo.stargazers_count)}</span>
              </div>
            </div>

            {repo.description && (
              <p className="mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                {repo.description}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {repo.language && (
                <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                  {repo.language}
                </span>
              )}
              {repo.topics.slice(0, 2).map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center rounded-md bg-primary-100 px-2 py-1 text-xs text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  )
}
