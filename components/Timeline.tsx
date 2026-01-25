'use client'

import { useState } from 'react'
import { Experience } from '@/data/resume'

interface TimelineProps {
  experiences: Experience[]
}

export default function Timeline({ experiences }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id ?? null)

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 hidden h-full w-px bg-neutral-200 dark:bg-neutral-800 md:left-1/2 md:block md:-translate-x-1/2" />

      <div className="space-y-12">
        {experiences.map((experience, expIndex) => (
          <div key={experience.id} className="relative">
            {/* Timeline dot */}
            <div className="absolute left-0 top-6 hidden h-4 w-4 rounded-full border-4 border-primary-500 bg-white dark:bg-neutral-950 md:left-1/2 md:block md:-translate-x-1/2" />

            <div
              className={`md:w-[calc(50%-2rem)] ${
                expIndex % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
              }`}
            >
              <div className="card">
                {/* Company Header */}
                <button
                  onClick={() => toggleExpanded(experience.id)}
                  className="flex w-full items-start justify-between text-left"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                      {experience.company}
                    </h3>
                    <p className="mt-1 text-sm text-primary-600 dark:text-primary-400">
                      {experience.companyDescription}
                    </p>
                    <p className="text-sm text-neutral-500">{experience.location}</p>
                  </div>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-neutral-400 transition-transform ${
                      expandedId === experience.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Roles */}
                {expandedId === experience.id && (
                  <div className="mt-6 space-y-8">
                    {experience.roles.map((role, roleIndex) => (
                      <div
                        key={roleIndex}
                        className={
                          roleIndex > 0
                            ? 'border-t border-neutral-200 pt-6 dark:border-neutral-700'
                            : ''
                        }
                      >
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                          <h4 className="font-semibold text-neutral-900 dark:text-white">
                            {role.title}
                          </h4>
                          <span className="text-sm text-neutral-500">{role.period}</span>
                        </div>

                        <ul className="mt-4 space-y-3">
                          {role.achievements.map((achievement, achIndex) => (
                            <li
                              key={achIndex}
                              className="flex gap-3 text-neutral-600 dark:text-neutral-400"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Collapsed state - show first role period */}
                {expandedId !== experience.id && (
                  <p className="mt-4 text-sm text-neutral-500">
                    {experience.roles[0].period}
                    {experience.roles.length > 1 && ` • ${experience.roles.length} roles`}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
