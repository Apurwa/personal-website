import { Metadata } from 'next'
import TrendingRepos from '@/components/TrendingRepos'
import AINews from '@/components/AINews'

export const metadata: Metadata = {
  title: 'AI Trends',
  description: 'Latest trends in artificial intelligence - trending GitHub repos and AI news.',
}

export default function AIPage() {
  return (
    <div className="section">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight">AI Trends</h1>
          <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400">
            Latest in artificial intelligence
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Trending Repos */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-white">
              Trending Repos
            </h2>
            <TrendingRepos />
          </section>

          {/* AI News */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-white">
              AI News
            </h2>
            <AINews />
          </section>
        </div>
      </div>
    </div>
  )
}
