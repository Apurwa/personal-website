import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '@/data/resume'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.id === slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.id === slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="section">
      <div className="container-narrow">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mt-8">
          <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 dark:bg-primary-900/30 dark:text-primary-400">
            {project.category}
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">{project.title}</h1>
          <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="mt-8 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md bg-neutral-100 px-3 py-1 text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Long Description */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
          <div className="mt-4 space-y-4 text-neutral-600 dark:text-neutral-400">
            {project.longDescription.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight">Key Achievements</h2>
          <ul className="mt-4 space-y-3">
            {project.achievements.map((achievement, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-neutral-600 dark:text-neutral-400"
              >
                <svg
                  className="mt-1 h-5 w-5 flex-shrink-0 text-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {achievement}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-xl border border-neutral-200 bg-neutral-50 p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-xl font-bold">Interested in learning more?</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Let&apos;s discuss how I approached this project and the lessons learned.
          </p>
          <Link href="/contact" className="btn-primary mt-6">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  )
}
