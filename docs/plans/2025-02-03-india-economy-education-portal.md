# India Economy Education Portal - Design Document

**Date:** 2025-02-03
**Status:** Approved
**Author:** Apurwa Sarwajit + Claude

## Overview

Transform the India Economy section from an arcade-style budget visualization into a comprehensive educational portal teaching India's economy through facts, figures, and easy-to-understand storytelling.

### Guiding Principles

- Transparency and authentic sourcing are paramount
- Educational content should be accessible to non-experts
- Data-driven with clear source attribution

## Information Architecture

### Routes

| Route | Purpose |
|-------|---------|
| `/india-economy` | Landing hub with topic cards |
| `/india-economy/budget` | Union Budget deep-dive |
| `/india-economy/rbi` | RBI & Monetary Policy |
| `/india-economy/gdp` | (Future) GDP & Growth Story |
| `/india-economy/inflation` | (Future) Inflation & Prices |

### File Structure

```
app/india-economy/
├── page.tsx                    # Landing page (hub)
├── layout.tsx                  # Shared layout + dark theme
├── CLAUDE.md                   # Feature documentation
├── components/
│   ├── TopicCard.tsx           # Card for landing page
│   ├── Breadcrumb.tsx          # Navigation breadcrumb
│   ├── TopicTabs.tsx           # Sub-navigation tabs
│   ├── SourceFooter.tsx        # Source attribution
│   └── ... (existing components)
├── budget/
│   └── page.tsx                # Budget topic page
├── rbi/
│   └── page.tsx                # RBI topic page
├── context/
│   └── CurrencyContext.tsx     # INR/USD toggle (existing)
├── hooks/
│   └── useAchievements.ts      # Achievement system (existing)
└── data/
    ├── sources.json            # Source registry
    ├── budget-2024-25.json     # Current year budget
    ├── budget-historical.json  # 10-year budget data
    └── rbi-rates.json          # RBI monetary policy
```

## Page Designs

### 1. Landing Page (`/india-economy`)

```
┌─────────────────────────────────────────────────┐
│  Header (existing site header)                  │
├─────────────────────────────────────────────────┤
│  Hero Section                                   │
│  "Understanding India's Economy"                │
│  Brief tagline about learning through data      │
├─────────────────────────────────────────────────┤
│  Topic Cards Grid (2x2 desktop, 1 col mobile)   │
│  ┌──────────┐  ┌──────────┐                     │
│  │ 📊 Budget │  │ 🏦 RBI    │                    │
│  │ Where     │  │ Monetary │                     │
│  │ money     │  │ Policy   │                     │
│  │ goes      │  │          │                     │
│  └──────────┘  └──────────┘                     │
│  ┌──────────┐  ┌──────────┐                     │
│  │ 📈 GDP    │  │ 💰 More   │                    │
│  │ Growth   │  │ Coming   │                     │
│  │ Story    │  │ Soon     │                     │
│  └──────────┘  └──────────┘                     │
├─────────────────────────────────────────────────┤
│  Data Sources Footer                            │
│  "All data from official sources: RBI, MoF"    │
└─────────────────────────────────────────────────┘
```

**TopicCard component props:**
- `title`: Topic name
- `description`: One-line description
- `href`: Link to topic page
- `icon`: Visual identifier
- `comingSoon`: Boolean for future topics

### 2. Budget Page (`/india-economy/budget`)

```
┌─────────────────────────────────────────────────┐
│  Breadcrumb: India Economy > Budget             │
├─────────────────────────────────────────────────┤
│  Topic Header                                   │
│  "Union Budget 2024-25"                         │
│  Key stat: ₹48.2 lakh crore total expenditure  │
├─────────────────────────────────────────────────┤
│  Tabs: [Overview] [Revenue] [Expenditure]       │
│        [Deficit] [10-Year Trends]               │
├─────────────────────────────────────────────────┤
│  Content Area (varies by tab)                   │
├─────────────────────────────────────────────────┤
│  Source: Union Budget 2024-25, Ministry of     │
│  Finance | Last updated: July 2024              │
└─────────────────────────────────────────────────┘
```

**Tab content:**

| Tab | Content |
|-----|---------|
| Overview | What is Union Budget? Key takeaways for 2024-25 |
| Revenue | Tax & non-tax revenue breakdown (existing arcade viz) |
| Expenditure | Ministry allocations (existing arcade viz) |
| Deficit | Fiscal deficit explanation (existing arcade viz) |
| 10-Year Trends | Historical charts using `budget-historical.json` |

### 3. RBI Page (`/india-economy/rbi`)

```
┌─────────────────────────────────────────────────┐
│  Breadcrumb: India Economy > RBI Policy         │
├─────────────────────────────────────────────────┤
│  Topic Header                                   │
│  "RBI & Monetary Policy"                        │
│  "How India's central bank manages the economy" │
├─────────────────────────────────────────────────┤
│  Tabs: [Overview] [Repo Rate] [CRR & SLR]       │
│        [Timeline]                               │
├─────────────────────────────────────────────────┤
│  Content Area (varies by tab)                   │
├─────────────────────────────────────────────────┤
│  Source: Reserve Bank of India                  │
└─────────────────────────────────────────────────┘
```

**Tab content:**

| Tab | Content |
|-----|---------|
| Overview | What is RBI? Current rates dashboard. Real-world impact. |
| Repo Rate | Explanation + current rate + EMI impact |
| CRR & SLR | What banks must keep in reserve |
| Timeline | Interactive 10-year rate history with key events |

## Shared Components

### Breadcrumb

```tsx
<Breadcrumb
  items={[
    { label: 'India Economy', href: '/india-economy' },
    { label: 'Budget', href: '/india-economy/budget' },
  ]}
/>
```

### TopicTabs

```tsx
<TopicTabs
  tabs={[
    { id: 'overview', label: 'Overview' },
    { id: 'revenue', label: 'Revenue' },
    // ...
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
/>
```

### SourceFooter

```tsx
<SourceFooter sourceIds={['union-budget-2024-25']} />
// Renders: "Source: Union Budget 2024-25, Ministry of Finance"
// With link to official source
```

## Implementation Phases

### Phase 1: Navigation Infrastructure
- [ ] Create `Breadcrumb.tsx`
- [ ] Create `TopicTabs.tsx`
- [ ] Create `TopicCard.tsx`
- [ ] Create `SourceFooter.tsx`
- [ ] Update `/india-economy/page.tsx` to landing hub

### Phase 2: Budget Section Migration
- [ ] Create `/india-economy/budget/page.tsx`
- [ ] Move existing arcade content into tabs
- [ ] Add Overview tab with educational intro
- [ ] Add 10-Year Trends tab with historical charts

### Phase 3: RBI Section
- [ ] Create `/india-economy/rbi/page.tsx`
- [ ] Build Overview tab with current rates
- [ ] Build Repo Rate explainer tab
- [ ] Build CRR & SLR explainer tab
- [ ] Build Timeline tab with rate history

### Phase 4: Polish
- [ ] Mobile-responsive tabs
- [ ] Source attribution on all pages
- [ ] Update CLAUDE.md
- [ ] Test all navigation paths

## Data Sources

All data sourced from official government sources:

| Data | Source |
|------|--------|
| Budget 2024-25 | Ministry of Finance, indiabudget.gov.in |
| Historical Budget | Previous Union Budgets archive |
| RBI Rates | Reserve Bank of India, rbi.org.in |

## Visual Style

- Maintain dark arcade theme (`#0f0f23` background, `#00ff41` green text)
- Cards and tabs use cyan accents (`#00d4ff`)
- Educational content uses slightly muted tones for readability
- Existing arcade visualizations preserved within tabs
