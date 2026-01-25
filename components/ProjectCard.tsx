import Link from 'next/link'
import { Project } from '@/data/resume'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="card group transition-all hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900/30 dark:text-primary-400">
          {project.category}
        </span>
        <svg
          className="h-5 w-5 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-600 dark:group-hover:text-primary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
        {project.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-neutral-600 dark:text-neutral-400">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
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
    </Link>
  )
}
