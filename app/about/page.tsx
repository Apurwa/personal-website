import { Metadata } from 'next'
import Link from 'next/link'
import { personalInfo, education, skills, interests, leadershipExperiences } from '@/data/resume'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Apurwa Sarwajit - Product Lead building AI-powered enterprise solutions.',
}

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container-narrow">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
          <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400">
            {personalInfo.tagline}
          </p>
        </div>

        {/* Bio */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight">Background</h2>
          <div className="mt-6 space-y-4 text-neutral-600 dark:text-neutral-400">
            <p>
              I&apos;m a Product Lead with 5+ years of experience building AI-powered products
              that drive measurable business impact. Currently, I&apos;m leading the Product and
              Engineering teams at Redblock.ai, where we&apos;re building an agentic AI platform
              for enterprise security teams.
            </p>
            <p>
              My journey in product management has been focused on solving complex problems
              at the intersection of AI and enterprise software. At BureauID, I generated $4M ARR
              by launching AI-powered fraud detection solutions that were adopted by India&apos;s top
              6 banks and fintech companies.
            </p>
            <p>
              I&apos;m passionate about building products that create real value for users and
              businesses. I believe in data-driven decision making, rapid experimentation, and
              maintaining a deep understanding of both the technical and business aspects of
              product development.
            </p>
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight">Education</h2>
          <div className="card mt-6">
            <h3 className="text-lg font-semibold">{education.institution}</h3>
            <p className="mt-1 text-neutral-600 dark:text-neutral-400">{education.degree}</p>
            <p className="mt-1 text-sm text-neutral-500">{education.graduation}</p>
            <div className="mt-4 inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 dark:bg-primary-900/30 dark:text-primary-400">
              {education.highlight}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Leadership */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight">Leadership Experience</h2>
          <div className="mt-6 space-y-6">
            {leadershipExperiences.map((exp, index) => (
              <div key={index} className="card">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold">{exp.title}</h3>
                    <p className="text-primary-600 dark:text-primary-400">{exp.organization}</p>
                  </div>
                  <span className="text-sm text-neutral-500">{exp.period}</span>
                </div>
                {exp.description && (
                  <p className="mt-4 text-neutral-600 dark:text-neutral-400">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight">Interests</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {interests.map((interest) => (
              <span
                key={interest}
                className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              >
                {interest}
              </span>
            ))}
          </div>
        </section>

        {/* Resume Download */}
        <section className="rounded-xl border border-neutral-200 bg-neutral-50 p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-xl font-bold">Download My Resume</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Get a detailed overview of my experience and skills
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/experience" className="btn-primary">
              View Full Experience
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Me
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
