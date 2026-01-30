# Agent Playground Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a visual sandbox at `/experiments` where visitors can run pre-built agent workflows and watch step-by-step execution with animations.

**Architecture:** React components with Framer Motion animations, simulated responses by default with optional Claude API calls via Next.js API route. State managed locally in React, no external state library needed.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Framer Motion, Tailwind CSS, Anthropic Claude API (optional)

---

## Task 1: Create Page Structure and Skills Data

**Files:**
- Create: `app/experiments/page.tsx`
- Create: `components/experiments/skills.ts`

**Step 1: Create skills data file**

Create `components/experiments/skills.ts`:

```typescript
export interface Skill {
  id: string
  name: string
  icon: string
  description: string
}

export const skills: Skill[] = [
  { id: 'input', name: 'Input', icon: '📥', description: 'Provide your prompt' },
  { id: 'analyze', name: 'Analyze', icon: '🔍', description: 'Break down the task' },
  { id: 'process', name: 'Process', icon: '⚙️', description: 'Perform the work' },
  { id: 'output', name: 'Output', icon: '📤', description: 'Generate result' },
]

export interface Template {
  id: string
  name: string
  description: string
  systemPrompt: string
}

export const templates: Template[] = [
  {
    id: 'summarize',
    name: 'Summarize Text',
    description: 'Condense long text into key points',
    systemPrompt: 'Summarize the following text into 3-5 key bullet points.',
  },
  {
    id: 'extract',
    name: 'Extract Action Items',
    description: 'Pull tasks from meeting notes',
    systemPrompt: 'Extract all action items and tasks from the following text. Format as a numbered list.',
  },
  {
    id: 'explain',
    name: 'Explain Like I\'m 5',
    description: 'Simplify complex topics',
    systemPrompt: 'Explain the following concept in simple terms that a 5-year-old could understand.',
  },
]

export interface StepResult {
  skill: string
  output: string
  duration: number
  status: 'pending' | 'running' | 'completed' | 'error'
}

export interface ExecutionResult {
  steps: StepResult[]
  totalDuration: number
  usedRealApi: boolean
}
```

**Step 2: Create basic page structure**

Create `app/experiments/page.tsx`:

```typescript
import { Metadata } from 'next'
import AgentPlayground from '@/components/experiments/AgentPlayground'

export const metadata: Metadata = {
  title: 'Agent Playground | Apurwa Sarwajit',
  description: 'See how agentic AI breaks down tasks into steps. Build and run simple agent workflows.',
}

export default function ExperimentsPage() {
  return (
    <div className="section">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Agent Playground</h1>
          <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400">
            See how agentic AI breaks down tasks into steps
          </p>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
            Built by Apurwa Sarwajit • Inspired by AI Studio at Redblock
          </p>
        </div>

        <AgentPlayground />
      </div>
    </div>
  )
}
```

**Step 3: Create placeholder AgentPlayground component**

Create `components/experiments/AgentPlayground.tsx`:

```typescript
'use client'

export default function AgentPlayground() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="text-center text-neutral-500">Agent Playground coming soon...</p>
    </div>
  )
}
```

**Step 4: Verify page loads**

Run: `npm run dev`
Visit: `http://localhost:3000/experiments`
Expected: Page loads with header and placeholder

**Step 5: Commit**

```bash
git add app/experiments/page.tsx components/experiments/skills.ts components/experiments/AgentPlayground.tsx
git commit -m "feat: add experiments page structure and skills data"
```

---

## Task 2: Build SkillCard Component

**Files:**
- Create: `components/experiments/SkillCard.tsx`
- Modify: `components/experiments/AgentPlayground.tsx`

**Step 1: Create SkillCard component**

Create `components/experiments/SkillCard.tsx`:

```typescript
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
```

**Step 2: Update AgentPlayground to show skills**

Update `components/experiments/AgentPlayground.tsx`:

```typescript
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
```

**Step 3: Verify skills display**

Run: `npm run dev`
Visit: `http://localhost:3000/experiments`
Expected: Four skill cards displayed horizontally with template buttons above

**Step 4: Commit**

```bash
git add components/experiments/SkillCard.tsx components/experiments/AgentPlayground.tsx
git commit -m "feat: add SkillCard component with status states"
```

---

## Task 3: Add Input and Run Button

**Files:**
- Modify: `components/experiments/AgentPlayground.tsx`

**Step 1: Add input field and run button**

Update `components/experiments/AgentPlayground.tsx`:

```typescript
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
```

**Step 2: Verify input and button work**

Run: `npm run dev`
Visit: `http://localhost:3000/experiments`
Expected: Text area and Run button visible, button disabled when empty

**Step 3: Commit**

```bash
git add components/experiments/AgentPlayground.tsx
git commit -m "feat: add input field and run button to playground"
```

---

## Task 4: Build Execution Log Component

**Files:**
- Create: `components/experiments/ExecutionLog.tsx`
- Modify: `components/experiments/AgentPlayground.tsx`

**Step 1: Create ExecutionLog component**

Create `components/experiments/ExecutionLog.tsx`:

```typescript
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { StepResult, skills } from './skills'

interface ExecutionLogProps {
  steps: StepResult[]
  totalDuration?: number
}

export default function ExecutionLog({ steps, totalDuration }: ExecutionLogProps) {
  if (steps.length === 0) return null

  const getSkillName = (skillId: string) => {
    return skills.find((s) => s.id === skillId)?.name || skillId
  }

  const getSkillIcon = (skillId: string) => {
    return skills.find((s) => s.id === skillId)?.icon || '⚡'
  }

  const statusIcon = (status: StepResult['status']) => {
    switch (status) {
      case 'pending':
        return <span className="text-neutral-400">○</span>
      case 'running':
        return (
          <motion.span
            className="inline-block text-primary-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            ◐
          </motion.span>
        )
      case 'completed':
        return <span className="text-green-500">✓</span>
      case 'error':
        return <span className="text-red-500">✗</span>
    }
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-neutral-900 dark:text-white">Execution Log</h3>
        {totalDuration && (
          <span className="text-sm text-neutral-500">
            Completed in {(totalDuration / 1000).toFixed(1)}s
          </span>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {steps.map((step, index) => (
            <motion.div
              key={step.skill}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{statusIcon(step.status)}</span>
                <span className="text-lg">{getSkillIcon(step.skill)}</span>
                <span className="font-medium text-neutral-900 dark:text-white">
                  {getSkillName(step.skill)}
                </span>
                {step.duration > 0 && (
                  <span className="ml-auto text-xs text-neutral-500">
                    {step.duration}ms
                  </span>
                )}
              </div>

              {step.output && step.status === 'completed' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 border-t border-neutral-200 pt-3 dark:border-neutral-700"
                >
                  <p className="whitespace-pre-wrap text-sm text-neutral-600 dark:text-neutral-400">
                    {step.output}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
```

**Step 2: Add ExecutionLog to AgentPlayground**

Add import at top of `components/experiments/AgentPlayground.tsx`:
```typescript
import ExecutionLog from './ExecutionLog'
```

Add after the canvas closing div (before the final closing div of the component):
```typescript
      {/* Execution Log */}
      {steps.length > 0 && (
        <ExecutionLog steps={steps} totalDuration={steps.every(s => s.status === 'completed') ? steps.reduce((acc, s) => acc + s.duration, 0) : undefined} />
      )}
```

**Step 3: Verify component renders**

Run: `npm run dev`
(Component won't show yet until we implement execution)

**Step 4: Commit**

```bash
git add components/experiments/ExecutionLog.tsx components/experiments/AgentPlayground.tsx
git commit -m "feat: add ExecutionLog component"
```

---

## Task 5: Implement Simulated Execution

**Files:**
- Create: `lib/agentRunner.ts`
- Modify: `components/experiments/AgentPlayground.tsx`

**Step 1: Create agent runner with simulated responses**

Create `lib/agentRunner.ts`:

```typescript
import { StepResult, Template } from '@/components/experiments/skills'

const simulatedResponses: Record<string, Record<string, string>> = {
  summarize: {
    analyze: '• Identified main topic and key themes\n• Found 3-5 important points\n• Detected supporting details',
    process: 'Processing text to extract essential information and condense into digestible points...',
  },
  extract: {
    analyze: '• Scanning for action verbs (do, complete, send, review)\n• Identifying assignees and deadlines\n• Categorizing by priority',
    process: 'Extracting actionable items and organizing by importance...',
  },
  explain: {
    analyze: '• Breaking down complex terms\n• Finding relatable analogies\n• Simplifying technical jargon',
    process: 'Translating into simple, everyday language...',
  },
}

const generateSimulatedOutput = (template: Template, input: string): string => {
  const wordCount = input.split(' ').length

  switch (template.id) {
    case 'summarize':
      return `Key Points:\n\n• The main idea focuses on the core concepts presented\n• ${wordCount} words condensed into essential takeaways\n• Important context and details preserved\n• Ready for quick review and action`
    case 'extract':
      return `Action Items:\n\n1. Review the main points discussed\n2. Follow up on key decisions\n3. Share summary with stakeholders\n4. Schedule next steps`
    case 'explain':
      return `Simple Explanation:\n\nImagine you have a big box of toys, and you want to tell your friend what's inside without showing them everything. That's kind of what this is about - taking something complicated and making it easy to understand, like explaining that a computer is like a really smart helper that remembers things for you!`
    default:
      return 'Processing complete.'
  }
}

export async function runAgent(
  input: string,
  template: Template,
  onStepUpdate: (steps: StepResult[]) => void
): Promise<StepResult[]> {
  const steps: StepResult[] = [
    { skill: 'input', output: '', duration: 0, status: 'pending' },
    { skill: 'analyze', output: '', duration: 0, status: 'pending' },
    { skill: 'process', output: '', duration: 0, status: 'pending' },
    { skill: 'output', output: '', duration: 0, status: 'pending' },
  ]

  onStepUpdate([...steps])

  // Step 1: Input
  steps[0].status = 'running'
  onStepUpdate([...steps])
  await delay(600)
  steps[0].status = 'completed'
  steps[0].output = `Received: "${input.slice(0, 100)}${input.length > 100 ? '...' : ''}"`
  steps[0].duration = 600
  onStepUpdate([...steps])

  // Step 2: Analyze
  steps[1].status = 'running'
  onStepUpdate([...steps])
  await delay(900)
  steps[1].status = 'completed'
  steps[1].output = simulatedResponses[template.id]?.analyze || 'Analysis complete.'
  steps[1].duration = 900
  onStepUpdate([...steps])

  // Step 3: Process
  steps[2].status = 'running'
  onStepUpdate([...steps])
  await delay(1200)
  steps[2].status = 'completed'
  steps[2].output = simulatedResponses[template.id]?.process || 'Processing complete.'
  steps[2].duration = 1200
  onStepUpdate([...steps])

  // Step 4: Output
  steps[3].status = 'running'
  onStepUpdate([...steps])
  await delay(800)
  steps[3].status = 'completed'
  steps[3].output = generateSimulatedOutput(template, input)
  steps[3].duration = 800
  onStepUpdate([...steps])

  return steps
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
```

**Step 2: Wire up execution in AgentPlayground**

Update the handleRun function in `components/experiments/AgentPlayground.tsx`:

Add import at top:
```typescript
import { runAgent } from '@/lib/agentRunner'
```

Replace the handleRun function:
```typescript
  const handleRun = async () => {
    if (!input.trim() || isRunning) return

    setIsRunning(true)
    setSteps([])

    try {
      await runAgent(input, selectedTemplate, setSteps)
    } catch (error) {
      console.error('Execution failed:', error)
    } finally {
      setIsRunning(false)
    }
  }
```

**Step 3: Test the full execution flow**

Run: `npm run dev`
Visit: `http://localhost:3000/experiments`
Enter text, click Run Agent
Expected: Skills animate in sequence, log shows step-by-step progress

**Step 4: Commit**

```bash
git add lib/agentRunner.ts components/experiments/AgentPlayground.tsx
git commit -m "feat: implement simulated agent execution with step animations"
```

---

## Task 6: Add Success CTA

**Files:**
- Create: `components/experiments/SuccessCTA.tsx`
- Modify: `components/experiments/AgentPlayground.tsx`

**Step 1: Create SuccessCTA component**

Create `components/experiments/SuccessCTA.tsx`:

```typescript
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SuccessCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6 text-center dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20"
    >
      <span className="text-3xl">✨</span>
      <h3 className="mt-2 text-lg font-semibold text-neutral-900 dark:text-white">
        Your agent completed successfully!
      </h3>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Want to build agents like this for your enterprise? Let's talk.
      </p>
      <Link
        href="/contact"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-primary-700"
      >
        Get in Touch
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </motion.div>
  )
}
```

**Step 2: Add SuccessCTA to AgentPlayground**

Add import:
```typescript
import SuccessCTA from './SuccessCTA'
```

Add state to track completion:
```typescript
const [showSuccess, setShowSuccess] = useState(false)
```

Update handleRun to show success:
```typescript
  const handleRun = async () => {
    if (!input.trim() || isRunning) return

    setIsRunning(true)
    setSteps([])
    setShowSuccess(false)

    try {
      await runAgent(input, selectedTemplate, setSteps)
      setShowSuccess(true)
    } catch (error) {
      console.error('Execution failed:', error)
    } finally {
      setIsRunning(false)
    }
  }
```

Add after ExecutionLog:
```typescript
      {/* Success CTA */}
      {showSuccess && <SuccessCTA />}
```

**Step 3: Test success flow**

Run execution to completion
Expected: Success CTA appears with link to contact page

**Step 4: Commit**

```bash
git add components/experiments/SuccessCTA.tsx components/experiments/AgentPlayground.tsx
git commit -m "feat: add success CTA after agent completion"
```

---

## Task 7: Add Navigation Link and Final Polish

**Files:**
- Modify: `components/Header.tsx`
- Modify: `app/experiments/page.tsx`

**Step 1: Add Experiments to navigation**

In `components/Header.tsx`, find the navigation array and add:
```typescript
{ name: 'Experiments', href: '/experiments' },
```

**Step 2: Add reset functionality**

In `components/experiments/AgentPlayground.tsx`, add a reset button after the Run button:

```typescript
          {showSuccess && (
            <button
              onClick={() => {
                setSteps([])
                setShowSuccess(false)
                setInput('')
              }}
              className="ml-4 inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-3 font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              Try Again
            </button>
          )}
```

**Step 3: Build and verify**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 4: Final commit**

```bash
git add components/Header.tsx components/experiments/AgentPlayground.tsx
git commit -m "feat: add experiments to nav and reset functionality"
```

---

## Task 8: Deploy

**Step 1: Push to main**

```bash
git push origin main
```

**Step 2: Verify deployment**

Wait for Vercel to deploy, then visit:
`https://apurwasarwajit.com/experiments`

Expected: Full Agent Playground working with animations

---

## Summary

After completing all tasks, you will have:
- `/experiments` page with Agent Playground
- 4 skill cards with animated states
- Template selector (Summarize, Extract, Explain)
- Text input with run button
- Step-by-step execution animation
- Execution log with timing
- Success CTA linking to contact
- Navigation link in header
- Fully deployed to production
