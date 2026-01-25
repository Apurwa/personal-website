'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Experience } from '@/data/resume'

interface TimelineProps {
  experiences: Experience[]
}

export default function Timeline({ experiences }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id ?? null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(timelineRef, { once: true, amount: 0.1 })

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="relative" ref={timelineRef}>
      {/* Timeline line with draw animation */}
      <motion.div
        className="absolute left-0 top-0 hidden w-px bg-gradient-to-b from-primary-500 via-primary-400 to-primary-300 md:left-1/2 md:block md:-translate-x-1/2"
        initial={{ height: 0 }}
        animate={isInView ? { height: '100%' } : { height: 0 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <div className="space-y-12">
        {experiences.map((experience, expIndex) => (
          <motion.div
            key={experience.id}
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: expIndex * 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {/* Timeline dot with pulse animation */}
            <motion.div
              className="absolute left-0 top-6 hidden h-4 w-4 md:left-1/2 md:block"
              style={{ marginLeft: '-8px' }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                delay: expIndex * 0.15 + 0.2,
              }}
            >
              <div className="relative h-4 w-4">
                <div className="absolute inset-0 rounded-full border-4 border-primary-500 bg-white dark:bg-neutral-950" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary-500"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>

            <div
              className={`md:w-[calc(50%-2rem)] ${
                expIndex % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
              }`}
            >
              <motion.div
                className="overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                {/* Company Header */}
                <button
                  onClick={() => toggleExpanded(experience.id)}
                  className="flex w-full items-start justify-between p-6 text-left"
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
                  <motion.svg
                    className="h-5 w-5 flex-shrink-0 text-neutral-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: expandedId === experience.id ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>

                {/* Roles */}
                <AnimatePresence initial={false}>
                  {expandedId === experience.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-6 border-t border-neutral-200 px-6 pb-6 pt-4 dark:border-neutral-700">
                        {experience.roles.map((role, roleIndex) => (
                          <motion.div
                            key={roleIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: roleIndex * 0.1,
                            }}
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
                                <motion.li
                                  key={achIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: roleIndex * 0.1 + achIndex * 0.05,
                                  }}
                                  className="flex gap-3 text-neutral-600 dark:text-neutral-400"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                                  <span>{achievement}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapsed state - show first role period */}
                <AnimatePresence>
                  {expandedId !== experience.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-t border-neutral-200 px-6 py-4 dark:border-neutral-700"
                    >
                      <p className="text-sm text-neutral-500">
                        {experience.roles[0].period}
                        {experience.roles.length > 1 && ` • ${experience.roles.length} roles`}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
