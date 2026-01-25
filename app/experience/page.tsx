import { Metadata } from 'next'
import { experiences } from '@/data/resume'
import Timeline from '@/components/Timeline'

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience and work history of Apurwa Sarwajit.',
}

export default function ExperiencePage() {
  return (
    <div className="section">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Work Experience</h1>
          <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400">
            5+ years building AI-powered products with measurable impact
          </p>
        </div>

        {/* Timeline */}
        <Timeline experiences={experiences} />

        {/* Summary Stats */}
        <div className="mt-16 grid gap-6 rounded-xl border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">5+</p>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">4</p>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Companies</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">$4M+</p>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Revenue Generated</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">100+</p>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Enterprise Clients</p>
          </div>
        </div>
      </div>
    </div>
  )
}
