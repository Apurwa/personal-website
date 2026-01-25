import { Metadata } from 'next'
import { projects } from '@/data/resume'
import ProjectCard from '@/components/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Featured projects and products built by Apurwa Sarwajit.',
}

const categories = ['All', 'AI', 'Fraud', 'Platform', 'E-commerce']

export default function ProjectsPage() {
  return (
    <div className="section">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
          <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400">
            Key products and initiatives I&apos;ve built and led
          </p>
        </div>

        {/* Category filters - visual only for now */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                category === 'All'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}
