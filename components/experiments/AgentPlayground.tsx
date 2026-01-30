'use client'

import { useState } from 'react'
import { skills, templates, StepResult } from './skills'
import SkillCard from './SkillCard'

export default function AgentPlayground() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [steps, setSteps] = useState<StepResult[]>([])

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
      </div>
    </div>
  )
}
