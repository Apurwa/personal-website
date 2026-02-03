# CLAUDE.md - Budget Quest (India Economy)

This file provides guidance for working on the Budget Quest feature (`/india-economy`).

## Overview

An arcade-themed interactive visualization of India's Union Budget. Users explore revenue sources, expenditure allocations, and fiscal deficits through a gamified "levels" experience.

**URL:** https://apurwasarwajit.com/india-economy

## Guiding Principles

**Transparency and authentic sourcing are paramount.**

- Always cite official government sources (Ministry of Finance, RBI, indiabudget.gov.in)
- Display source attribution prominently in the UI
- Register all sources in `data/sources.json` with full metadata
- Link data files to sources via `sourceId` field
- Never extrapolate or estimate figures - use only published data
- When data is contested or revised, note the revision date

## Architecture

```
app/india-economy/
├── page.tsx              # Main page (Server Component)
├── layout.tsx            # Arcade theme wrapper + metadata
├── CLAUDE.md             # This file
├── components/
│   ├── ClientWrapper.tsx # CurrencyProvider wrapper
│   ├── ArcadeScreen.tsx  # Retro CRT effect container
│   ├── ScoreCounter.tsx  # Animated number display
│   ├── CurrencyToggle.tsx# INR/USD switcher
│   ├── RevenueLevel.tsx  # Level 1: Tax & non-tax revenue
│   ├── ExpenditureLevel.tsx # Level 2: Ministry allocations
│   ├── DeficitLevel.tsx  # Level 3: Fiscal deficit "boss"
│   ├── Drawer.tsx        # Slide-out detail panels
│   ├── Accordion.tsx     # Expandable sections in drawers
│   ├── *Detail.tsx       # Detail views for each category
│   └── ...
├── context/
│   └── CurrencyContext.tsx # INR/USD state + exchange rate
├── hooks/
│   └── useAchievements.ts  # Achievement unlock system
└── data/
    ├── index.ts          # Data exports and source helpers
    ├── types.ts          # TypeScript interfaces
    ├── sources.json      # Centralized source registry
    └── budget-2024-25.json # Budget data (references sourceId)
```

## Data Structure

All values in **Crores of Rupees** (₹1 Cr = ₹10,000,000).

```typescript
interface BudgetData {
  fiscalYear: string           // "2024-25"
  totalRevenue: number         // Tax + Non-tax revenue
  grossTaxRevenue: number      // Before state transfers
  taxRevenue: {
    gst, incomeTax, corporateTax, customsDuty, exciseDuty, otherTaxes
  }
  nonTaxRevenue: {
    dividends, interestReceipts, otherNonTax
  }
  borrowings: number           // Fiscal deficit financing
  totalExpenditure: number     // Revenue + Capital
  revenueExpenditure: number   // Recurring expenses
  capitalExpenditure: number   // Asset creation
  ministryAllocations: Array<{ name, allocation, icon }>
  fiscalDeficit: number
  fiscalDeficitPercent: number // As % of GDP
  historical: Array<{ year, fiscalDeficitPercent, totalExpenditure }>
}
```

## Sources System

All data sources are registered in `data/sources.json`:

```typescript
interface Source {
  id: string              // Unique identifier, e.g., "union-budget-2024-25"
  title: string           // "Union Budget 2024-25"
  publisher: string       // "Ministry of Finance, Government of India"
  url: string             // Link to source document
  type: 'official' | 'news' | 'analysis'
  publishedDate: string   // When source was published
  accessedDate: string    // When we retrieved the data
  coversData: string[]    // Data files this source supports
  notes?: string          // Additional context
}
```

**Helper functions in `data/index.ts`:**

```tsx
import { getSources, getSourceById, getSourcesForDataFile } from './data'

// Get all sources
const sources = getSources()

// Get specific source
const source = getSourceById('union-budget-2024-25')

// Get sources for a data file
const sources = getSourcesForDataFile('budget-2024-25.json')
```

## Adding a New Budget Year

1. **Add source to `sources.json`** with full metadata
2. Create `data/budget-YYYY-YY.json` with `sourceId` referencing the source
3. Update `data/index.ts` to import the new file
4. Optionally add year selector UI if supporting multiple years

**Primary sources:**

- Union Budget documents: https://www.indiabudget.gov.in
- Ministry of Finance budget highlights PDF
- RBI Handbook of Statistics: https://rbi.org.in

## Key Patterns

### Currency Toggle

Uses `CurrencyContext` for INR/USD conversion:

```tsx
import { useCurrency } from '../context/CurrencyContext'

function MyComponent() {
  const { formatCurrency } = useCurrency()
  return <span>{formatCurrency(48200)}</span> // "₹48,200 Cr" or "$5.8B"
}
```

### Achievement System

Achievements unlock based on user interactions:

```tsx
import { useAchievements } from '../hooks/useAchievements'

function Level() {
  const { unlock } = useAchievements()

  useEffect(() => {
    unlock('revenue') // Unlocks "Tax Expert" achievement
  }, [])
}
```

**Achievement IDs:** `welcome`, `revenue`, `expenditure`, `deficit`, `complete`

### Drawer Pattern

Detail views use slide-out drawers:

```tsx
<Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Tax Revenue">
  <Accordion title="GST" defaultOpen>
    <p>Details...</p>
  </Accordion>
</Drawer>
```

## Styling

- **Theme:** Dark background (`#0f0f23`), green text (`#00ff41`), cyan accents (`#00d4ff`)
- **Font:** `font-arcade` class (defined in Tailwind config)
- **Effects:** CRT scanlines, glow effects, pixel-art aesthetic
- Scoped to this feature via `layout.tsx` wrapper

## localStorage Keys

| Key | Purpose |
|-----|---------|
| `budget-quest-achievements` | Unlocked achievements |
| `budget-quest-currency` | Currency preference (INR/USD) |
| `budget-quest-exchange-rate` | Cached exchange rate + timestamp |

## Future Ideas

- [ ] Multi-year comparison view
- [ ] State budget data
- [ ] Budget quiz/trivia mode
- [ ] Share achievement cards
- [ ] Animated transitions between levels
