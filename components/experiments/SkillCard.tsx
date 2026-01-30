'use client'

import { motion } from 'framer-motion'
import { Skill, StepResult } from './skills'

interface SkillCardProps {
  skill: Skill
  step?: StepResult
  isLast?: boolean
}

export default function SkillCard({ skill, step, isLast = false }: SkillCardProps) {
  const status = step?.status || 'pending'

  const statusColors = {
    pending: 'border-neutral-200 dark:border-neutral-700',
    running: 'border-primary-500 shadow-lg shadow-primary-500/20',
    completed: 'border-green-500',
    error: 'border-red-500',
  }

  const statusBg = {
    pending: 'bg-white dark:bg-neutral-800',
    running: 'bg-primary-50 dark:bg-primary-900/20',
    completed: 'bg-green-50 dark:bg-green-900/20',
    error: 'bg-red-50 dark:bg-red-900/20',
  }

  return (
    <div className="flex items-center">
      <motion.div
        className={`relative w-32 rounded-xl border-2 p-4 transition-colors ${statusColors[status]} ${statusBg[status]}`}
        animate={status === 'running' ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 1, repeat: status === 'running' ? Infinity : 0 }}
      >
        {/* Status indicator */}
        {status === 'completed' && (
          <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {status === 'running' && (
          <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-500">
            <motion.div
              className="h-3 w-3 rounded-full bg-white"
              animate={{ scale: [1, 0.5, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        )}

        <div className="text-center">
          <span className="text-2xl">{skill.icon}</span>
          <h3 className="mt-1 font-semibold text-neutral-900 dark:text-white">{skill.name}</h3>
          <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{skill.description}</p>
        </div>
      </motion.div>

      {/* Connection arrow */}
      {!isLast && (
        <div className="flex w-8 items-center justify-center">
          <motion.div
            className={`h-0.5 w-full ${status === 'completed' ? 'bg-green-500' : 'bg-neutral-300 dark:bg-neutral-600'}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
          <svg
            className={`-ml-1 h-4 w-4 ${status === 'completed' ? 'text-green-500' : 'text-neutral-300 dark:text-neutral-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
