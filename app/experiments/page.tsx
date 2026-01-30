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
