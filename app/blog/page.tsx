import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on product management, AI, and building enterprise software.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="section">
      <div className="container-narrow">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400">
            Thoughts on product management, AI, and building enterprise software
          </p>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-12 text-center dark:border-neutral-800 dark:bg-neutral-900">
            <svg
              className="mx-auto h-12 w-12 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h2 className="mt-4 text-lg font-semibold">Coming Soon</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              I&apos;m working on some articles about product management and AI.
              Check back soon!
            </p>
            <Link href="/contact" className="btn-primary mt-6">
              Get Notified
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
