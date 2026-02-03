---
name: next-app-router-patterns
description: Use when adding features to this Next.js 14 App Router project - covers Server vs Client components, co-location patterns, and API route design
---

# Next.js App Router Patterns

## Server vs Client Components

```
┌─────────────────────────────────────────────────────────────┐
│ Does it need browser APIs, hooks, or interactivity?         │
│                                                             │
│   YES → 'use client' at top of file                         │
│   NO  → Server Component (default, no directive needed)     │
└─────────────────────────────────────────────────────────────┘
```

### Use Server Components (default) for:

- Data fetching (`async` components that await data)
- Accessing backend resources directly
- Static content rendering
- SEO-critical content

### Use Client Components ('use client') for:

- React hooks (`useState`, `useEffect`, `useContext`)
- Browser APIs (`localStorage`, `window`, event listeners)
- Interactivity (onClick, onChange, animations)
- Third-party client libraries (Framer Motion, GSAP)

## Co-location Pattern

This project uses **feature co-location** for self-contained features:

```
app/
  india-economy/           # Feature directory
    page.tsx               # Entry point (can be Server Component)
    layout.tsx             # Feature-specific layout
    components/            # Feature-specific components
      ClientWrapper.tsx    # 'use client' wrapper for providers
      RevenueLevel.tsx
      ExpenditureLevel.tsx
    context/               # Feature-specific React contexts
      CurrencyContext.tsx
    hooks/                 # Feature-specific hooks
      useAchievements.ts
    data/                  # Feature-specific data
      budget-2024-25.json
      types.ts
```

**When to co-locate vs use shared directories:**

| Location | Use for |
|----------|---------|
| `app/[feature]/components/` | Components only used by this feature |
| `app/[feature]/hooks/` | Hooks only used by this feature |
| `components/` (root) | Shared across multiple pages (Header, Footer) |
| `lib/` (root) | Shared utilities and backend logic |

## Client Wrapper Pattern

When a page needs client-side providers but you want the page itself to remain a Server Component:

```tsx
// app/feature/components/ClientWrapper.tsx
'use client'

import { SomeProvider } from '../context/SomeContext'

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <SomeProvider>{children}</SomeProvider>
}

// app/feature/page.tsx (Server Component - no 'use client')
import { ClientWrapper } from './components/ClientWrapper'
import { getData } from './data'

export default function Page() {
  const data = getData()  // Can run on server
  return (
    <ClientWrapper>
      <main>{/* Client components can go here */}</main>
    </ClientWrapper>
  )
}
```

## API Routes with Zod Validation

Pattern used in `app/api/market-size/route.ts`:

```tsx
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// 1. Define schema with helpful error messages
const InputSchema = z.object({
  field: z.string().min(3, 'Field must be at least 3 characters'),
  option: z.enum(['a', 'b', 'c']),
  optional: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 2. Validate with safeParse (doesn't throw)
    const result = InputSchema.safeParse(body)
    if (!result.success) {
      const firstError = result.error.issues[0]
      return NextResponse.json(
        { error: firstError?.message || 'Invalid input' },
        { status: 400 }
      )
    }

    // 3. Use validated data (fully typed)
    const input = result.data

    // 4. Process and return
    const output = await processData(input)
    return NextResponse.json(output)

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
```

## Context Provider Pattern

Pattern from `CurrencyContext.tsx`:

```tsx
'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

// 1. Define types
interface MyContextType {
  value: string
  setValue: (v: string) => void
  derivedValue: string
}

// 2. Create context with undefined default
const MyContext = createContext<MyContextType | undefined>(undefined)

// 3. Provider with localStorage persistence (optional)
export function MyProvider({ children }: { children: ReactNode }) {
  const [value, setValueState] = useState('default')

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('my-key')
    if (saved) setValueState(saved)
  }, [])

  // Memoized setter that also persists
  const setValue = useCallback((newValue: string) => {
    setValueState(newValue)
    localStorage.setItem('my-key', newValue)
  }, [])

  // Memoized derived values
  const derivedValue = useMemo(() => transform(value), [value])

  return (
    <MyContext.Provider value={{ value, setValue, derivedValue }}>
      {children}
    </MyContext.Provider>
  )
}

// 4. Hook with error boundary
export function useMyContext() {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error('useMyContext must be used within MyProvider')
  }
  return context
}
```
