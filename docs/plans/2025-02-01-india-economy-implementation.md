# Budget Quest: Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an interactive infographic presenting India's Union Budget through a retro arcade game aesthetic at `/india-economy`.

**Architecture:** Next.js page with arcade-themed components consuming static JSON budget data. Data derived from official government CSV sources (Open Budgets India). GSAP ScrollTrigger for scroll-based reveals, Framer Motion for micro-interactions.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP, Framer Motion, Google Fonts (Press Start 2P)

**Data Strategy:** Static JSON files updated annually from official CSV sources. More reliable than government APIs which lack proper REST endpoints.

---

## Phase 1: Foundation (MVP)

### Task 1: Create Route Structure

**Files:**
- Create: `app/india-economy/page.tsx`
- Create: `app/india-economy/layout.tsx`

**Step 1: Create the layout with arcade meta**

```tsx
// app/india-economy/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Budget Quest | India\'s Union Budget',
  description: 'Explore India\'s Union Budget through a retro arcade experience. Understand where your taxes go.',
  openGraph: {
    title: 'Budget Quest | India\'s Union Budget',
    description: 'Explore India\'s Union Budget through a retro arcade experience.',
  },
}

export default function IndiaEconomyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0f0f23] text-[#00ff41]">
      {children}
    </div>
  )
}
```

**Step 2: Create the page skeleton**

```tsx
// app/india-economy/page.tsx
export default function IndiaEconomyPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        BUDGET QUEST
      </h1>
      <p className="text-center text-[#ffb000]">
        INSERT COIN TO START
      </p>
    </main>
  )
}
```

**Step 3: Verify page loads**

Run: `npm run dev`
Navigate to: `http://localhost:3000/india-economy`
Expected: Dark page with green "BUDGET QUEST" heading and amber "INSERT COIN" text

**Step 4: Commit**

```bash
git add app/india-economy/
git commit -m "feat(india-economy): add route skeleton"
```

---

### Task 2: Add Arcade Font

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/india-economy/layout.tsx`

**Step 1: Import Press Start 2P font in root layout**

Add to `app/layout.tsx` imports:

```tsx
import { Press_Start_2P } from 'next/font/google'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-arcade',
  display: 'swap',
})
```

Add `pressStart2P.variable` to the body className.

**Step 2: Add font variable to Tailwind config**

Modify `tailwind.config.ts`:

```ts
// In theme.extend.fontFamily:
fontFamily: {
  arcade: ['var(--font-arcade)', 'monospace'],
},
```

**Step 3: Apply arcade font to india-economy layout**

Update `app/india-economy/layout.tsx`:

```tsx
<div className="min-h-screen bg-[#0f0f23] text-[#00ff41] font-arcade">
```

**Step 4: Verify font renders**

Run: `npm run dev`
Navigate to: `http://localhost:3000/india-economy`
Expected: Pixel-style 8-bit font on all text

**Step 5: Commit**

```bash
git add app/layout.tsx app/india-economy/layout.tsx tailwind.config.ts
git commit -m "feat(india-economy): add Press Start 2P arcade font"
```

---

### Task 3: Create Budget Data Types and Static Data

**Files:**
- Create: `app/india-economy/data/types.ts`
- Create: `app/india-economy/data/budget-2024-25.json`
- Create: `app/india-economy/data/index.ts`

**Step 1: Define TypeScript types**

```ts
// app/india-economy/data/types.ts
export interface RevenueBreakdown {
  gst: number
  incomeTax: number
  corporateTax: number
  customsDuty: number
  exciseDuty: number
  otherTaxes: number
}

export interface NonTaxRevenue {
  dividends: number
  interestReceipts: number
  otherNonTax: number
}

export interface MinistryAllocation {
  name: string
  allocation: number
  icon: string // sprite key
}

export interface BudgetData {
  fiscalYear: string
  lastUpdated: string
  source: string

  // Level 1: Revenue
  totalRevenue: number
  grossTaxRevenue: number
  taxRevenue: RevenueBreakdown
  nonTaxRevenue: NonTaxRevenue
  borrowings: number

  // Level 2: Expenditure
  totalExpenditure: number
  revenueExpenditure: number
  capitalExpenditure: number
  ministryAllocations: MinistryAllocation[]

  // Level 3: Deficit
  fiscalDeficit: number
  fiscalDeficitPercent: number
  revenueDeficit: number
  primaryDeficit: number
  debtToGdp: number

  // Historical (for High Scores)
  historical: {
    year: string
    fiscalDeficitPercent: number
    totalExpenditure: number
  }[]
}
```

**Step 2: Create initial budget data (2024-25 figures)**

```json
// app/india-economy/data/budget-2024-25.json
{
  "fiscalYear": "2024-25",
  "lastUpdated": "2024-07-23",
  "source": "Union Budget 2024-25, Ministry of Finance",

  "totalRevenue": 3201000,
  "grossTaxRevenue": 3839000,
  "taxRevenue": {
    "gst": 1068000,
    "incomeTax": 1146000,
    "corporateTax": 1024000,
    "customsDuty": 218000,
    "exciseDuty": 328000,
    "otherTaxes": 55000
  },
  "nonTaxRevenue": {
    "dividends": 235000,
    "interestReceipts": 27000,
    "otherNonTax": 78000
  },
  "borrowings": 1686000,

  "totalExpenditure": 4818000,
  "revenueExpenditure": 3727000,
  "capitalExpenditure": 1111000,
  "ministryAllocations": [
    { "name": "Defence", "allocation": 621940, "icon": "shield" },
    { "name": "Road Transport", "allocation": 278000, "icon": "road" },
    { "name": "Railways", "allocation": 255000, "icon": "train" },
    { "name": "Home Affairs", "allocation": 219643, "icon": "home" },
    { "name": "Education", "allocation": 120628, "icon": "book" },
    { "name": "Health", "allocation": 90171, "icon": "heart" },
    { "name": "Agriculture", "allocation": 151000, "icon": "wheat" },
    { "name": "Rural Development", "allocation": 182000, "icon": "village" },
    { "name": "Interest Payments", "allocation": 1145000, "icon": "coins" },
    { "name": "Others", "allocation": 1254418, "icon": "misc" }
  ],

  "fiscalDeficit": 1686000,
  "fiscalDeficitPercent": 4.9,
  "revenueDeficit": 526000,
  "primaryDeficit": 541000,
  "debtToGdp": 56.8,

  "historical": [
    { "year": "2020-21", "fiscalDeficitPercent": 9.2, "totalExpenditure": 3531000 },
    { "year": "2021-22", "fiscalDeficitPercent": 6.7, "totalExpenditure": 3761000 },
    { "year": "2022-23", "fiscalDeficitPercent": 6.4, "totalExpenditure": 4163000 },
    { "year": "2023-24", "fiscalDeficitPercent": 5.6, "totalExpenditure": 4503000 },
    { "year": "2024-25", "fiscalDeficitPercent": 4.9, "totalExpenditure": 4818000 }
  ]
}
```

Note: All figures in ₹ Crores (1 Crore = 10 Million). Source: Union Budget 2024-25 documents.

**Step 3: Create data export**

```ts
// app/india-economy/data/index.ts
import budgetData from './budget-2024-25.json'
import type { BudgetData } from './types'

export function getBudgetData(): BudgetData {
  return budgetData as BudgetData
}

export type { BudgetData, MinistryAllocation, RevenueBreakdown, NonTaxRevenue } from './types'
```

**Step 4: Verify data loads**

Update `app/india-economy/page.tsx` temporarily:

```tsx
import { getBudgetData } from './data'

export default function IndiaEconomyPage() {
  const budget = getBudgetData()
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        BUDGET QUEST
      </h1>
      <p className="text-center text-[#ffb000] text-xs">
        FY {budget.fiscalYear} | Total: ₹{budget.totalExpenditure.toLocaleString('en-IN')} Cr
      </p>
    </main>
  )
}
```

Run: `npm run dev`
Expected: Shows "FY 2024-25 | Total: ₹48,18,000 Cr"

**Step 5: Commit**

```bash
git add app/india-economy/data/
git commit -m "feat(india-economy): add budget data types and 2024-25 data"
```

---

### Task 4: Create CRT Screen Effect Component

**Files:**
- Create: `app/india-economy/components/ArcadeScreen.tsx`

**Step 1: Create the CRT screen wrapper**

```tsx
// app/india-economy/components/ArcadeScreen.tsx
'use client'

import { ReactNode } from 'react'

interface ArcadeScreenProps {
  children: ReactNode
  className?: string
}

export function ArcadeScreen({ children, className = '' }: ArcadeScreenProps) {
  return (
    <div className={`relative ${className}`}>
      {/* CRT Scanlines Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
        }}
        aria-hidden="true"
      />

      {/* Screen Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-lg"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0, 255, 65, 0.1)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  )
}
```

**Step 2: Apply to page**

Update `app/india-economy/page.tsx`:

```tsx
import { getBudgetData } from './data'
import { ArcadeScreen } from './components/ArcadeScreen'

export default function IndiaEconomyPage() {
  const budget = getBudgetData()
  return (
    <ArcadeScreen className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          BUDGET QUEST
        </h1>
        <p className="text-center text-[#ffb000] text-xs">
          FY {budget.fiscalYear} | Total: ₹{budget.totalExpenditure.toLocaleString('en-IN')} Cr
        </p>
      </main>
    </ArcadeScreen>
  )
}
```

**Step 3: Verify scanlines visible**

Run: `npm run dev`
Expected: Subtle horizontal scanlines overlay on the page

**Step 4: Commit**

```bash
git add app/india-economy/components/
git commit -m "feat(india-economy): add CRT screen effect component"
```

---

### Task 5: Create Score Counter Component

**Files:**
- Create: `app/india-economy/components/ScoreCounter.tsx`

**Step 1: Create animated score counter**

```tsx
// app/india-economy/components/ScoreCounter.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface ScoreCounterProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function ScoreCounter({
  value,
  label,
  prefix = '₹',
  suffix = ' Cr',
  duration = 2,
  className = '',
}: ScoreCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!counterRef.current || hasAnimated) return

    const counter = { value: 0 }

    gsap.to(counter, {
      value,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(counter.value).toLocaleString('en-IN')
        }
      },
      onComplete: () => setHasAnimated(true),
    })
  }, [value, duration, hasAnimated])

  return (
    <div className={`text-center ${className}`}>
      <div className="text-[#ffb000] text-xs mb-2 uppercase tracking-widest">
        {label}
      </div>
      <div className="text-2xl md:text-4xl">
        <span className="text-[#00d4ff]">{prefix}</span>
        <span ref={counterRef} className="text-[#00ff41]">0</span>
        <span className="text-[#00d4ff]">{suffix}</span>
      </div>
    </div>
  )
}
```

**Step 2: Add to page**

Update `app/india-economy/page.tsx`:

```tsx
import { getBudgetData } from './data'
import { ArcadeScreen } from './components/ArcadeScreen'
import { ScoreCounter } from './components/ScoreCounter'

export default function IndiaEconomyPage() {
  const budget = getBudgetData()
  return (
    <ArcadeScreen className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          BUDGET QUEST
        </h1>
        <p className="text-center text-[#ffb000] text-xs mb-8">
          FY {budget.fiscalYear}
        </p>
        <ScoreCounter
          value={budget.totalExpenditure}
          label="Total Budget"
        />
      </main>
    </ArcadeScreen>
  )
}
```

**Step 3: Verify counter animates**

Run: `npm run dev`
Expected: Number counts up from 0 to 48,18,000 over 2 seconds

**Step 4: Commit**

```bash
git add app/india-economy/components/ScoreCounter.tsx app/india-economy/page.tsx
git commit -m "feat(india-economy): add animated score counter component"
```

---

### Task 6: Create Level Section Component

**Files:**
- Create: `app/india-economy/components/LevelSection.tsx`

**Step 1: Create the level wrapper**

```tsx
// app/india-economy/components/LevelSection.tsx
'use client'

import { ReactNode, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface LevelSectionProps {
  level: number
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function LevelSection({
  level,
  title,
  subtitle,
  children,
  className = '',
}: LevelSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current || !headerRef.current) return

    gsap.from(headerRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`py-16 border-b-4 border-[#2d2d44] ${className}`}
    >
      <div ref={headerRef} className="mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="text-[#ff00ff] text-xs">★★★</div>
          <div className="text-[#ffff00] text-sm">LEVEL {level}</div>
          <div className="text-[#ff00ff] text-xs">★★★</div>
        </div>
        <h2 className="text-xl md:text-2xl text-center text-[#00ff41]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-center text-[#00d4ff] text-xs mt-2">
            {subtitle}
          </p>
        )}
      </div>
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </section>
  )
}
```

**Step 2: Add a test level to page**

Update `app/india-economy/page.tsx`:

```tsx
import { getBudgetData } from './data'
import { ArcadeScreen } from './components/ArcadeScreen'
import { ScoreCounter } from './components/ScoreCounter'
import { LevelSection } from './components/LevelSection'

export default function IndiaEconomyPage() {
  const budget = getBudgetData()
  return (
    <ArcadeScreen className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          BUDGET QUEST
        </h1>
        <p className="text-center text-[#ffb000] text-xs mb-8">
          FY {budget.fiscalYear}
        </p>
        <ScoreCounter
          value={budget.totalExpenditure}
          label="Total Budget"
        />

        <LevelSection
          level={1}
          title="WHERE DOES THE MONEY COME FROM?"
          subtitle="Revenue Sources"
        >
          <p className="text-center text-xs">Level content coming soon...</p>
        </LevelSection>
      </main>
    </ArcadeScreen>
  )
}
```

**Step 3: Verify level animates on scroll**

Run: `npm run dev`
Expected: Level header animates in when scrolling down

**Step 4: Commit**

```bash
git add app/india-economy/components/LevelSection.tsx app/india-economy/page.tsx
git commit -m "feat(india-economy): add level section component with scroll animation"
```

---

### Task 7: Create Revenue Level (Level 1) Content

**Files:**
- Create: `app/india-economy/components/RevenueLevel.tsx`
- Create: `app/india-economy/components/ProgressBar.tsx`

**Step 1: Create pixel-style progress bar**

```tsx
// app/india-economy/components/ProgressBar.tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ProgressBarProps {
  label: string
  value: number
  maxValue: number
  color?: string
  className?: string
}

export function ProgressBar({
  label,
  value,
  maxValue,
  color = '#00ff41',
  className = '',
}: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayValue, setDisplayValue] = useState(0)

  const percentage = (value / maxValue) * 100

  useEffect(() => {
    if (!barRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        {
          width: `${percentage}%`,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: function() {
            const progress = this.progress()
            setDisplayValue(Math.floor(value * progress))
          },
        }
      )
    })

    return () => ctx.revert()
  }, [percentage, value])

  return (
    <div ref={containerRef} className={`mb-4 ${className}`}>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[#00d4ff]">{label}</span>
        <span className="text-[#ffb000]">₹{displayValue.toLocaleString('en-IN')} Cr</span>
      </div>
      <div className="h-4 bg-[#1a1a2e] border-2 border-[#2d2d44] relative">
        <div
          ref={barRef}
          className="h-full"
          style={{ backgroundColor: color, width: '0%' }}
        />
        {/* Pixel notches */}
        <div className="absolute inset-0 flex">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex-1 border-r border-[#2d2d44] last:border-r-0" />
          ))}
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Create Revenue Level component**

```tsx
// app/india-economy/components/RevenueLevel.tsx
'use client'

import { BudgetData } from '../data/types'
import { ProgressBar } from './ProgressBar'
import { ScoreCounter } from './ScoreCounter'
import { LevelSection } from './LevelSection'

interface RevenueLevelProps {
  budget: BudgetData
}

export function RevenueLevel({ budget }: RevenueLevelProps) {
  const maxTaxValue = Math.max(
    budget.taxRevenue.gst,
    budget.taxRevenue.incomeTax,
    budget.taxRevenue.corporateTax,
    budget.taxRevenue.customsDuty,
    budget.taxRevenue.exciseDuty
  )

  return (
    <LevelSection
      level={1}
      title="WHERE DOES THE MONEY COME FROM?"
      subtitle="Government Revenue Sources"
    >
      <div className="mb-12">
        <ScoreCounter
          value={budget.totalRevenue}
          label="Total Revenue"
          className="mb-8"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Tax Revenue */}
        <div className="p-4 border-2 border-[#00ff41] bg-[#0f0f23]/80">
          <h3 className="text-sm text-[#00ff41] mb-4 text-center">
            💰 TAX REVENUE
          </h3>
          <ProgressBar
            label="GST"
            value={budget.taxRevenue.gst}
            maxValue={maxTaxValue}
            color="#00ff41"
          />
          <ProgressBar
            label="Income Tax"
            value={budget.taxRevenue.incomeTax}
            maxValue={maxTaxValue}
            color="#00d4ff"
          />
          <ProgressBar
            label="Corporate Tax"
            value={budget.taxRevenue.corporateTax}
            maxValue={maxTaxValue}
            color="#ff00ff"
          />
          <ProgressBar
            label="Customs Duty"
            value={budget.taxRevenue.customsDuty}
            maxValue={maxTaxValue}
            color="#ffff00"
          />
          <ProgressBar
            label="Excise Duty"
            value={budget.taxRevenue.exciseDuty}
            maxValue={maxTaxValue}
            color="#ffb000"
          />
        </div>

        {/* Non-Tax & Borrowings */}
        <div className="space-y-4">
          <div className="p-4 border-2 border-[#00d4ff] bg-[#0f0f23]/80">
            <h3 className="text-sm text-[#00d4ff] mb-4 text-center">
              📈 NON-TAX REVENUE
            </h3>
            <ProgressBar
              label="Dividends"
              value={budget.nonTaxRevenue.dividends}
              maxValue={budget.nonTaxRevenue.dividends}
              color="#00d4ff"
            />
            <ProgressBar
              label="Interest Receipts"
              value={budget.nonTaxRevenue.interestReceipts}
              maxValue={budget.nonTaxRevenue.dividends}
              color="#00d4ff"
            />
          </div>

          <div className="p-4 border-2 border-[#ff00ff] bg-[#0f0f23]/80">
            <h3 className="text-sm text-[#ff00ff] mb-4 text-center">
              🎮 CREDIT USED
            </h3>
            <ProgressBar
              label="Borrowings"
              value={budget.borrowings}
              maxValue={budget.borrowings}
              color="#ff00ff"
            />
            <p className="text-xs text-[#ffb000] text-center mt-2">
              {((budget.borrowings / budget.totalExpenditure) * 100).toFixed(1)}% of total spending
            </p>
          </div>
        </div>
      </div>
    </LevelSection>
  )
}
```

**Step 3: Update page to use RevenueLevel**

```tsx
// app/india-economy/page.tsx
import { getBudgetData } from './data'
import { ArcadeScreen } from './components/ArcadeScreen'
import { ScoreCounter } from './components/ScoreCounter'
import { RevenueLevel } from './components/RevenueLevel'

export default function IndiaEconomyPage() {
  const budget = getBudgetData()
  return (
    <ArcadeScreen className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Hero */}
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-4">
            BUDGET QUEST
          </h1>
          <p className="text-center text-[#ffb000] text-xs mb-8">
            INDIA&apos;S UNION BUDGET {budget.fiscalYear}
          </p>
          <ScoreCounter
            value={budget.totalExpenditure}
            label="Total Budget"
          />
          <p className="text-xs text-[#00d4ff] mt-8 animate-pulse">
            ↓ SCROLL TO BEGIN ↓
          </p>
        </div>

        {/* Level 1: Revenue */}
        <RevenueLevel budget={budget} />
      </main>
    </ArcadeScreen>
  )
}
```

**Step 4: Verify Level 1 displays correctly**

Run: `npm run dev`
Expected:
- Hero section with total budget counter
- Level 1 with animated progress bars for tax revenue
- Bars animate when scrolled into view

**Step 5: Commit**

```bash
git add app/india-economy/components/ProgressBar.tsx app/india-economy/components/RevenueLevel.tsx app/india-economy/page.tsx
git commit -m "feat(india-economy): add Level 1 revenue breakdown with animated bars"
```

---

### Task 8: Build and Verify Static Export

**Step 1: Run production build**

Run: `npm run build`
Expected: Build completes without errors, `/india-economy` appears in output

**Step 2: Test production build locally**

Run: `npx serve out`
Navigate to: `http://localhost:3000/india-economy`
Expected: Page loads with all animations working

**Step 3: Commit any build fixes if needed**

```bash
git add -A
git commit -m "fix(india-economy): ensure static export compatibility"
```

---

### Task 9: Phase 1 Complete - Review Checkpoint

**Step 1: Verify all Phase 1 requirements**

Checklist:
- [ ] `/india-economy` route works
- [ ] Arcade font (Press Start 2P) displays
- [ ] CRT scanline effect visible
- [ ] Score counter animates
- [ ] Level 1 (Revenue) displays with animated progress bars
- [ ] Responsive on mobile
- [ ] Static export builds successfully

**Step 2: Create Phase 1 completion commit**

```bash
git add -A
git commit -m "milestone: complete Phase 1 MVP for india-economy

- Arcade-themed route at /india-economy
- CRT scanline effects
- Animated score counter
- Level 1: Revenue breakdown with progress bars
- 2024-25 budget data from official sources
- Static export compatible"
```

---

## Phase 2: Full Experience (Future)

### Task 10: Add Level 2 - Expenditure (Ministry Allocations)
### Task 11: Add Level 3 - Deficit Boss Battle
### Task 12: Add Historical High Scores Section
### Task 13: Add Achievement System
### Task 14: Add Sound Effects (Optional Toggle)
### Task 15: Add Accessibility Features

---

## Data Sources

- **Primary:** [Open Budgets India](https://openbudgetsindia.org/) - CSV downloads
- **Reference:** [Union Budget Documents](https://www.indiabudget.gov.in/)
- **Historical:** [RBI DBIE](https://data.rbi.org.in/DBIE/) - Manual download

## Notes

- All amounts in ₹ Crores (1 Crore = 10 Million)
- Data derived from Union Budget 2024-25 documents
- Update `budget-2024-25.json` annually after new budget presentation (typically February)
