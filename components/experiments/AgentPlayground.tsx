'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { skills, templates, StepResult } from './skills'
import SkillCard from './SkillCard'

export default function AgentPlayground() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [input, setInput] = useState('')
  const [steps, setSteps] = useState<StepResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = async () => {
    if (!input.trim() || isRunning) return
    // Will implement execution in next task
    console.log('Running with input:', input)
  }

  return (
    <div className="space-y-8">
      {/* Template selector */}
      <div className="flex flex-wrap justify-center gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedTemplate.id === template.id
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
            }`}
          >
            {template.name}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900/50">
        {/* Workflow */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:flex-nowrap">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              step={steps.find((s) => s.skill === skill.id)}
              isLast={index === skills.length - 1}
            />
          ))}
        </div>

        {/* Input area */}
        <div className="mx-auto mt-8 max-w-2xl">
          <label htmlFor="prompt" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {selectedTemplate.description}
          </label>
          <textarea
            id="prompt"
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here..."
            disabled={isRunning}
            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-400"
          />
        </div>

        {/* Run button */}
        <div className="mt-6 text-center">
          <motion.button
            onClick={handleRun}
            disabled={!input.trim() || isRunning}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isRunning ? (
              <>
                <motion.div
                  className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Running...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Run Agent
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
