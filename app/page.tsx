import Link from 'next/link'
import { personalInfo, projects, experiences } from '@/data/resume'
import ProjectCard from '@/components/ProjectCard'

export default function Home() {
  const featuredProjects = projects.slice(0, 3)
  const latestExperience = experiences[0]

  return (
    <>
      {/* Hero Section */}
      <section className="section">
        <div className="container-narrow">
          <div className="animate-fade-in">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
              Product Lead at Redblock.ai
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {personalInfo.name}
            </h1>
            <p className="mt-6 text-xl text-neutral-600 dark:text-neutral-400">
              {personalInfo.tagline}
            </p>
            <p className="mt-4 max-w-2xl text-neutral-600 dark:text-neutral-400">
              {personalInfo.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Get in Touch
              </Link>
              <Link href="/experience" className="btn-secondary">
                View Experience
              </Link>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                aria-label="Email"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-12 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">$4M+</p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">ARR Generated</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">$12M</p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Fraud Prevented</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">50M+</p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Monthly Transactions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">6</p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Top Banks as Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Role Highlight */}
      <section className="section">
        <div className="container-wide">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Current Role</h2>
            <Link
              href="/experience"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              View all experience &rarr;
            </Link>
          </div>

          <div className="card mt-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-xl font-semibold">{latestExperience.roles[0].title}</h3>
                <p className="mt-1 text-primary-600 dark:text-primary-400">
                  {latestExperience.company}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-500">
                  {latestExperience.companyDescription}
                </p>
              </div>
              <span className="text-sm text-neutral-500 dark:text-neutral-500">
                {latestExperience.roles[0].period}
              </span>
            </div>
            <ul className="mt-6 space-y-3">
              {latestExperience.roles[0].achievements.slice(0, 3).map((achievement, index) => (
                <li key={index} className="flex gap-3 text-neutral-600 dark:text-neutral-400">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="container-wide">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              View all projects &rarr;
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-narrow text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Interested in working together?
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            I&apos;m always open to discussing product opportunities, collaborations,
            or just having a chat about AI and technology.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
