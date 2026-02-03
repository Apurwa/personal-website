# CLAUDE.md - Understanding India's Economy

This file provides guidance for working on the India Economy educational portal (`/india-economy`).

## Overview

An educational portal explaining India's economy at a 7th-grade reading level (NCERT-style). Uses simple language, real government data, and visual explanations to make economics accessible.

**URL:** https://apurwasarwajit.com/india-economy

**See [STRUCTURE.md](./STRUCTURE.md) for full content roadmap and section details.**

## Guiding Principles

1. **Transparency and authentic sourcing are paramount**
   - Always cite official government sources (Ministry of Finance, RBI, indiabudget.gov.in)
   - Display source attribution prominently in the UI
   - Register all sources in `data/sources.json` with full metadata
   - Never extrapolate or estimate figures — use only published data

2. **Accessibility over complexity**
   - Write for 7th-grade reading level
   - Include Hindi terms for key concepts
   - Use lakh/crore, not million/billion
   - Prefer visual explanations over dense text

3. **Distinctive design, not generic AI**
   - Follow the "Thoughtful Textbook" theme
   - Typography-driven, no emojis
   - Staggered animations and micro-interactions
   - Paper texture, warm colors, editorial feel

## Architecture

```
app/india-economy/
├── page.tsx              # Landing hub with topic cards
├── layout.tsx            # Theme wrapper (fonts, texture)
├── india-economy.css     # Animations, textures, effects
├── CLAUDE.md             # This file
├── STRUCTURE.md          # Content roadmap (sections, status)
├── budget/
│   └── page.tsx          # Union Budget section
├── rbi/
│   └── page.tsx          # RBI & Monetary Policy section
├── components/
│   ├── Breadcrumb.tsx
│   ├── TopicCard.tsx
│   ├── TopicTabs.tsx
│   ├── EducationalCards.tsx  # MarginNote, KeyConcept, Definition, etc.
│   └── SourceFooter.tsx
└── data/
    ├── index.ts              # Data exports and helpers
    ├── types.ts              # TypeScript interfaces
    ├── sources.json          # Centralized source registry
    ├── budget-2024-25.json   # Current year budget
    ├── budget-historical.json # 10-year budget summary
    └── rbi-rates.json        # RBI monetary policy history
```

## Design System

### Theme: "Thoughtful Textbook"

**Typography:**
- Headers: Source Serif 4 (elegant, readable serif)
- Body: IBM Plex Sans (humanist, not cold)

**Color Palette:**
| Usage | Color | Hex |
|-------|-------|-----|
| Background | Warm cream | `#FAF7F2` |
| Primary text | Deep indigo | `#1a2e44` |
| Accent | Terracotta | `#b85c38` |
| Links | Muted blue | `#4a6fa5` |
| Captions | Slate | `#6b7c8f` |
| Borders | Warm gray | `#e5e0d8` |
| Callouts | Cream yellow | `#FFF8E7` |
| Positive | Sage green | `#7a9e7e` |
| Highlight | Gold | `#d4a84b` |

### Components

```tsx
// Section heading with optional chapter number
<SectionHeading chapter={1} subtitle="Government's annual plan">
  What is the Union Budget?
</SectionHeading>

// Definition with Hindi translation
<Definition term="Fiscal Deficit" hindi="राजकोषीय घाटा">
  The difference between what the government spends and earns.
</Definition>

// Margin note (asymmetric callout)
<MarginNote label="Did you know">
  Interesting fact here...
</MarginNote>

// Key concept box
<KeyConcept title="Key Takeaway">
  Important insight...
</KeyConcept>

// Stats display
<StatDisplay value="₹48.2L Cr" label="Total Budget" sublabel="FY 2024-25" />
```

### Animations (CSS-only)

| Class | Effect |
|-------|--------|
| `animate-fade-in-up` | Rise up with fade |
| `animate-fade-in` | Simple fade |
| `animate-slide-in-left` | Slide from left |
| `animate-draw-line` | Line draws itself |
| `delay-1` to `delay-8` | Stagger timing |
| `hover-lift` | Card lifts on hover |
| `link-animated` | Underline grows on hover |
| `paper-texture` | Subtle grain overlay |

All animations respect `prefers-reduced-motion`.

## Data Management

### Sources System

All data sources registered in `data/sources.json`:

```typescript
interface Source {
  id: string              // e.g., "union-budget-2024-25"
  title: string           // "Union Budget 2024-25"
  publisher: string       // "Ministry of Finance"
  url: string             // Link to source
  type: 'official' | 'news' | 'analysis'
  publishedDate: string
  accessedDate: string
  coversData: string[]    // Data files this source supports
}
```

### Adding New Data

1. Add source to `data/sources.json`
2. Create data file with `sourceId` reference
3. Export from `data/index.ts`
4. Add to SourceFooter in relevant pages

### Helper Functions

```tsx
import {
  getBudgetData,
  getBudgetHistorical,
  getCurrentRates,
  getSourceById,
  getSources
} from './data'
```

## Content Guidelines

| Guideline | Example |
|-----------|---------|
| Reading level | 7th grade (NCERT) |
| Numbers | ₹48 lakh crore, not ₹480 billion |
| Hindi terms | Include in parentheses: Fiscal Deficit (राजकोषीय घाटा) |
| Examples | Indian context: EMI, petrol prices, onion prices |
| Section length | ~5 minute read |
| Emojis | Never use emojis |

## Adding a New Section

1. Create route folder: `app/india-economy/{section}/page.tsx`
2. Update `STRUCTURE.md` with content outline
3. Add to landing page topics array
4. Create data files with sources
5. Use existing components for consistency

## Current Status

- ✅ Landing page with animations
- ✅ Union Budget section
- ✅ RBI & Monetary Policy section
- 🔜 GDP & Growth (planned)
- 🔜 Inflation & Prices (planned)

See `STRUCTURE.md` for full roadmap.
