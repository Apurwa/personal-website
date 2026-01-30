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
    name: "Explain Like I'm 5",
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
