# Agent Playground - Design Document

**Date**: 2026-01-30
**Author**: Apurwa Sarwajit
**Status**: Approved

## Overview

A visual sandbox where visitors build simple agent workflows by connecting skill blocks, then watch step-by-step execution with animated state changes. Demonstrates agentic AI concepts while showcasing product thinking from Redblock.ai.

**Page**: `/experiments`

**Goals**:
1. Showcase technical depth in agentic AI
2. Demonstrate product thinking (turn AI into usable experiences)
3. Generate leads through engagement and CTA

## Core Concept

Visitors connect 3-4 skill blocks to build a workflow, configure inputs, and click "Run" to watch the agent execute each step with animations and real-time logging.

### The 4 Skills (v1)

| Skill | Icon | Description | What it shows |
|-------|------|-------------|---------------|
| Input | 📥 | User provides text prompt | User's input text |
| Analyze | 🔍 | Agent breaks down the task | Bullet points of identified elements |
| Process | ⚙️ | Agent performs core work | Streaming text of agent working |
| Output | 📤 | Final result with explanation | Completed result + summary |

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  🧪 Agent Playground                                        │
│  "See how agentic AI breaks down tasks into steps"          │
│  Built by Apurwa Sarwajit • Inspired by AI Studio           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Template: Summarize Text ▼]                               │
│                                                             │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐  │
│  │ 📥      │    │ 🔍      │    │ ⚙️      │    │ 📤      │  │
│  │ Input   │───▶│ Analyze │───▶│ Process │───▶│ Output  │  │
│  │         │    │         │    │         │    │         │  │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Enter your prompt:                                   │   │
│  │ [                                                  ] │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│                    [▶ Run Agent]                            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Execution Log                                              │
│  ─────────────────────────────────────────────────────────  │
│  ⏳ Step 1: Reading input...                                │
│  ⏳ Step 2: Analyzing task...                               │
│  ⏳ Step 3: Processing...                                   │
│  ⏳ Step 4: Generating output...                            │
└─────────────────────────────────────────────────────────────┘
```

## Interaction Design

### Building the Workflow
- Skills displayed as cards in a horizontal flow
- Click-to-add interaction (no drag-and-drop in v1)
- Connections auto-render between adjacent skills
- Clicking a skill card opens config panel (for Input skill: text area)

### Execution Animation (3-5 seconds total)
1. All skills dim slightly, "Run" button shows loading state
2. **Input** skill glows blue, shows "Reading input..." → checkmark ✓
3. **Analyze** skill glows, shows "Breaking down task..." → bullet points appear
4. **Process** skill glows, text streams in showing agent "working"
5. **Output** skill glows, final result appears
6. Success state with CTA

### Execution Log Panel
- Below the canvas
- Real-time updates at each step
- Shows timing ("Completed in 2.3s")
- Expandable to show input/output of each skill

### Mobile Behavior
- Skills stack vertically
- Same animation flow, linear layout
- Touch-friendly tap targets

## Pre-built Templates

| Template | Description | Skills Config |
|----------|-------------|---------------|
| Summarize Text | Condense long text into key points | Default |
| Extract Action Items | Pull tasks from meeting notes | Process configured for extraction |
| Explain Like I'm 5 | Simplify complex topics | Process configured for simplification |

## Technical Implementation

### Hybrid API Approach
- **Simulated by default**: Pre-built responses for common inputs
- **Real API for unique inputs**: Call Claude API for genuine responses
- **Detection logic**: Hash common inputs → cached response; else API call
- **Rate limiting**: 5 real API calls per session

### Component Structure
```
app/experiments/page.tsx           # Main page
components/experiments/
  ├── AgentPlayground.tsx          # Main container
  ├── SkillCard.tsx                # Skill block component
  ├── Canvas.tsx                   # Workflow canvas with connections
  ├── ExecutionLog.tsx             # Step-by-step output panel
  ├── SkillConfigModal.tsx         # Config popup for input
  ├── RunButton.tsx                # Execute button with states
  └── skills.ts                    # Skill definitions & mock responses
lib/
  └── agentRunner.ts               # Execution logic
app/api/agent/route.ts             # API route for Claude calls
```

### Dependencies
- `framer-motion` (already installed) - animations
- No additional libraries needed

### API Route (`app/api/agent/route.ts`)
- Accepts: workflow config + user input
- Rate limits by IP (in-memory counter)
- Calls Claude API or returns simulated response
- Returns structured response for each skill step

```typescript
// Request
{
  input: string,
  template: "summarize" | "extract" | "explain",
  useRealApi: boolean
}

// Response
{
  steps: [
    { skill: "input", output: "...", duration: 500 },
    { skill: "analyze", output: "...", duration: 800 },
    { skill: "process", output: "...", duration: 1500 },
    { skill: "output", output: "...", duration: 500 }
  ],
  totalDuration: 3300,
  usedRealApi: boolean
}
```

## Visual Design

### Theme Integration
- Dark/light mode using existing theme system
- Primary color (`primary-500`) for active states
- Neutral colors for inactive states

### Skill Card States
| State | Visual |
|-------|--------|
| Idle | Subtle border, neutral background |
| Active/Running | Blue glow, pulsing animation |
| Completed | Green checkmark, faded glow |
| Error | Red border, error icon |

### Connection Lines
- Idle: Dashed gray line
- Executing: Solid blue, animated flow direction
- Completed: Solid green

### Canvas
- Subtle dot grid background
- Rounded container with border

## UX Copy

### Header
- Title: "Agent Playground"
- Subtitle: "See how agentic AI breaks down tasks into steps"
- Badge: "Built by Apurwa Sarwajit • Inspired by AI Studio at Redblock"

### Empty State
```
Build your first agent workflow
[Start from scratch]  or  [Try a template ▼]
```

### Success CTA
```
✨ Your agent completed successfully!

Want to build agents like this for your enterprise? Let's talk.

[Get in Touch →]
```

### Error States
- API failure: "Using demo mode" (fallback to simulated)
- Rate limit: "You've run 5 agents! Want unlimited access? Get in touch."

## Lead Generation

- CTA displayed after successful execution
- Links to `/contact` page
- Optional: Email capture modal for "Get notified about new experiments"

## Out of Scope (v1)

- Drag-and-drop repositioning
- Custom skill creation
- Branching/conditional logic
- Save/share workflows
- User accounts

## Success Metrics

- Page visits
- Workflow executions (simulated vs real API)
- CTA click-through rate
- Contact form submissions from this page

## Implementation Order

1. Create page structure and layout
2. Build SkillCard component with states
3. Build Canvas with connection lines
4. Build ExecutionLog component
5. Implement animation sequence
6. Add simulated responses
7. Create API route with rate limiting
8. Add Claude API integration
9. Add templates
10. Add CTA and polish

---

**Next step**: Create implementation plan and set up isolated workspace.
