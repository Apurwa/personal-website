'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '@/data/resume'

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link
        href={`/projects/${project.id}`}
        className="group relative block overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-200/50 hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:shadow-neutral-900/50"
      >
        {/* Gradient border effect on hover */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 via-primary-400/0 to-primary-600/0 opacity-0 transition-opacity duration-300 group-hover:from-primary-500/10 group-hover:via-primary-400/10 group-hover:to-primary-600/10 group-hover:opacity-100" />

        <div className="relative">
          <div className="mb-4 flex items-start justify-between">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900/30 dark:text-primary-400"
            >
              {project.category}
            </motion.span>
            <motion.svg
              className="h-5 w-5 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </div>

          <h3 className="text-lg font-semibold text-neutral-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-neutral-600 dark:text-neutral-400">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600 transition-colors group-hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:group-hover:bg-neutral-700"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {project.achievements.length > 0 && (
            <div className="mt-4 border-t border-neutral-200 pt-4 dark:border-neutral-700">
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {project.achievements[0]}
              </p>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
