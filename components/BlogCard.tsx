'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BlogPost } from '@/lib/blog'

interface BlogCardProps {
  post: BlogPost
  index?: number
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-200/50 hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:shadow-neutral-900/50"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 via-primary-400/0 to-primary-600/0 opacity-0 transition-opacity duration-300 group-hover:from-primary-500/5 group-hover:via-primary-400/5 group-hover:to-primary-600/5 group-hover:opacity-100" />

      <Link href={`/blog/${post.slug}`} className="relative block">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-500">
              <time dateTime={post.date}>{formattedDate}</time>
              <span>&middot;</span>
              <span>{post.readingTime}</span>
            </div>

            <h2 className="mt-2 text-xl font-semibold text-neutral-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
              {post.title}
            </h2>

            <p className="mt-2 line-clamp-2 text-neutral-600 dark:text-neutral-400">
              {post.description}
            </p>

            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600 transition-colors group-hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:group-hover:bg-neutral-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <motion.svg
            className="h-5 w-5 flex-shrink-0 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </motion.svg>
        </div>
      </Link>
    </motion.article>
  )
}
