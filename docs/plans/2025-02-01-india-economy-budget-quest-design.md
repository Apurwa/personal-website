# Budget Quest: India's Union Budget as a Retro Arcade Experience

**Date:** 2025-02-01
**Status:** Approved
**Route:** `/india-economy`

---

## Overview

An interactive infographic that presents India's Union Budget data through a retro arcade game aesthetic. The goal is to make complex fiscal information accessible and engaging for young adults (18-30) – first-time voters, students, and early-career professionals.

Data is fetched in real-time from official government sources (data.gov.in and RBI DBIE), ensuring the page stays current without manual updates.

---

## Core Concept

### Narrative Flow

The budget is presented as a 3-level arcade game:

1. **LEVEL 1: "WHERE DOES THE MONEY COME FROM?"** – Revenue breakdown
2. **LEVEL 2: "WHERE DOES IT GO?"** – Expenditure by ministry/sector
3. **LEVEL 3: "THE BOSS BATTLE"** – Fiscal deficit and debt
4. **HIGH SCORES** – Historical comparisons

### Game Elements

- **Score counter** – Total budget in crores, animates as user scrolls
- **Achievement badges** – Pop up when users learn key concepts ("🏆 Tax Expert!")
- **Health bar** – Visualizes fiscal deficit (more deficit = lower health)
- **Pixel art icons** – Each ministry represented by a 32x32 sprite
- **Sound effects** – Optional 8-bit sounds (coin collect, level-up chimes)

---

## Technical Architecture

### Project Structure

```
app/
  india-economy/
    page.tsx                 # Main entry point
    layout.tsx               # Arcade theme layout, sound toggle
    components/
      ArcadeScreen.tsx       # CRT scanline effects, pixel borders
      ScoreCounter.tsx       # Animated budget total display
      LevelSection.tsx       # Reusable level container
      AchievementBadge.tsx   # Pop-up achievement notifications
      HealthBar.tsx          # Deficit visualization
      PixelIcon.tsx          # Ministry sprite icons
      RevenueLevel.tsx       # Level 1 content
      ExpenditureLevel.tsx   # Level 2 content
      DeficitBoss.tsx        # Level 3 content
      HighScores.tsx         # Historical comparison
    data/
      budget-api.ts          # Fetches from data.gov.in + RBI
      transformers.ts        # Normalize API responses
      types.ts               # TypeScript interfaces
    hooks/
      useBudgetData.ts       # Data fetching with caching
      useAchievements.ts     # Track unlocked badges (localStorage)
      useSound.ts            # Audio management
    assets/
      sprites/               # Pixel art PNGs/SVGs
      sounds/                # 8-bit sound effects (.mp3/.ogg)
```

### Data Flow

1. **Server-side fetch** at build/request time from data.gov.in + RBI DBIE
2. **Fallback cache** – Store last successful response for API failures
3. **Client-side revalidation** – Refresh every 24 hours
4. **Transform layer** – Normalize both APIs into unified `BudgetData` type

### Data Sources

| Source | Purpose | Fallback |
|--------|---------|----------|
| data.gov.in | Primary budget datasets | Cached JSON |
| RBI DBIE | Fiscal indicators, historical data | Cached JSON |
| Manual JSON | Gap-filling if APIs lack data | N/A |

### Dependencies

Using existing stack where possible:
- **Framer Motion / GSAP** – Animations (already installed)
- **Next.js fetch caching** – Data management
- **Google Fonts** – "Press Start 2P" or "VT323" for pixel typography

No heavy new libraries required.

---

## Visual Design System

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background | Deep navy (CRT dark) | `#0f0f23` |
| Primary text | Phosphor green | `#00ff41` |
| Alt primary | Amber | `#ffb000` |
| Accent 1 | Cyan | `#00d4ff` |
| Accent 2 | Magenta | `#ff00ff` |
| Accent 3 | Yellow | `#ffff00` |
| UI chrome | Dark grays | `#1a1a2e`, `#2d2d44` |

### Typography

- **Primary:** "Press Start 2P" (Google Fonts) – authentic 8-bit
- **Fallback:** System monospace
- **Scale:** 8px, 16px, 24px, 32px (pixel-perfect increments)

### Visual Effects

- **CRT scanlines** – CSS overlay with horizontal lines + slight curvature
- **Pixel borders** – 4px chunky borders on containers
- **Glow effects** – `text-shadow` with neon colors on key numbers
- **Screen flicker** – Subtle animation (respects `prefers-reduced-motion`)

### Iconography

- 32x32 or 64x64 pixel art sprites
- 4-color palette per icon for consistency
- Ministry icons:
  - Defence → Shield/Sword
  - Education → Book
  - Health → Heart
  - Agriculture → Wheat
  - Infrastructure → Bridge
  - Finance → Coin stack

### Animations

- Numbers tick up like arcade scores (GSAP CountUp)
- Sections slide in with retro "whoosh"
- Achievements pop with screen shake + flash
- Scroll-triggered reveals via GSAP ScrollTrigger

---

## Content Structure

### LEVEL 1: Revenue ("WHERE DOES THE MONEY COME FROM?")

**Data displayed:**
- Total Revenue (big score counter)
- Tax Revenue breakdown:
  - GST
  - Income Tax
  - Corporate Tax
  - Customs Duty
  - Excise Duty
- Non-Tax Revenue:
  - Dividends from PSUs
  - Spectrum sales
  - Fees and fines
- Borrowings (shown as "CREDIT USED")

**Visual treatment:**
- Coin sprites falling into treasure chest
- Each coin type = different revenue source
- Proportional sizing based on actual amounts

### LEVEL 2: Expenditure ("WHERE DOES IT GO?")

**Data displayed:**
- Ministry-wise allocation (Top 10)
- Sector groupings: Defence, Education, Health, Agriculture, Infrastructure, Interest Payments
- Per-capita breakdown ("₹X per citizen goes to Y")

**Visual treatment:**
- Character select screen with ministry pixel avatars
- Power-up bars showing relative spending
- Tap/hover for detailed breakdown

### LEVEL 3: Fiscal Deficit ("THE BOSS BATTLE")

**Data displayed:**
- Revenue vs Expenditure (two health bars)
- Fiscal Deficit as percentage of GDP
- Debt-to-GDP ratio trend

**Visual treatment:**
- Boss monster representing deficit
- Size scales with deficit percentage
- Health bars face off in battle stance
- "Damage numbers" pop up showing the gap

### HIGH SCORES (Historical Context)

**Data displayed:**
- Last 5 years comparison
- "Best" and "Worst" years for key metrics
- Trend direction indicators

**Visual treatment:**
- Leaderboard style table
- Pixel sparkline charts
- Trophy icons for notable years

### API to Content Mapping

| API Field | Display Location |
|-----------|------------------|
| `gross_tax_revenue` | Level 1 total score |
| `gst_revenue` | Level 1 breakdown |
| `income_tax_revenue` | Level 1 breakdown |
| `total_expenditure` | Level 2 total |
| `ministry_allocations[]` | Level 2 characters |
| `fiscal_deficit_percent` | Level 3 boss HP |
| `debt_to_gdp` | Level 3 difficulty meter |

---

## Error Handling

### API Failures

| Scenario | Handling |
|----------|----------|
| Both APIs down | Show "CONNECTION LOST" screen with retry button, use cached data if available |
| One API fails | Show available data, display "PLAYER 2 DISCONNECTED" for missing section |
| Slow response | Show loading spinner, timeout after 10s and use cache |
| Data format changed | Transform layer handles gracefully, log error for manual fix |

### Loading States

- Pixel art spinning coin as loader
- Skeleton screens with scanline overlay
- Progressive reveal: structure first, then animate numbers in

### Caching Strategy

- **Server:** ISR with 1-hour revalidation
- **Client:** stale-while-revalidate, max 24 hours
- **Fallback JSON:** Bundled with build for zero-API scenario

---

## Accessibility

### Motion & Effects

- Respect `prefers-reduced-motion` – disable flicker, shake, rapid animations
- Sound off by default, opt-in with visible toggle
- Provide "Reduce effects" toggle in UI

### Readability

- "Readable mode" toggle switches to system fonts
- High contrast mode with adjusted palette
- Font scaling support (pixel fonts tested at 150%, 200%)

### Screen Readers

- Semantic HTML structure under visual layer
- ARIA labels for all data points:
  - "Level 1: Revenue sources. Total revenue: 30 lakh crore rupees"
- Skip links to jump between levels
- Live regions for achievement announcements

### Keyboard Navigation

- Tab through all interactive elements
- Enter/Space to expand details
- Escape to close modals
- Arrow keys for navigation within sections

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Initial JS bundle | < 200KB |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3s |

### Optimizations

- Lazy load sprites and sounds
- Preload pixel font (critical)
- Code-split by level section
- Compress audio files (< 50KB total)
- Use SVG sprites where possible

---

## Implementation Phases

### Phase 1: Foundation (MVP)

- [ ] Set up `/india-economy` route
- [ ] Create arcade shell (CRT effects, layout, score counter)
- [ ] Build data fetching layer for data.gov.in + RBI
- [ ] Implement Level 1 (Revenue) with basic animations
- [ ] Basic responsive layout
- [ ] No sound, minimal interactivity

**Exit criteria:** Page loads with real data, Level 1 is complete and animated.

### Phase 2: Full Experience

- [ ] Add Level 2 (Expenditure) with ministry characters
- [ ] Add Level 3 (Deficit Boss Battle)
- [ ] Pixel art sprites for all ministries
- [ ] Achievement system with localStorage
- [ ] High Scores historical section
- [ ] Sound effects with toggle
- [ ] Full keyboard navigation

**Exit criteria:** All levels complete, achievements work, sounds optional.

### Phase 3: Polish & Expansion

- [ ] Share functionality ("Share your budget knowledge score")
- [ ] Accessibility audit and fixes
- [ ] Performance optimization pass
- [ ] Analytics integration
- [ ] Consider: State budgets as "bonus levels"
- [ ] Consider: Quiz mode ("Guess which ministry spends more")

**Exit criteria:** Lighthouse scores > 90, accessibility audit passed.

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Government APIs unreliable/slow | High | High | Aggressive caching + bundled fallback JSON |
| Budget data format changes yearly | Medium | Medium | Transform layer abstracts raw API; annual review |
| Pixel fonts hard to read | Medium | Medium | "Readable mode" toggle |
| Scope creep | High | Medium | Strict Phase 1 MVP; expand only after launch |
| Sound files blocked/annoying | Low | Low | Off by default, small file sizes |

---

## Open Questions

1. **Exact API endpoints** – Need to research data.gov.in and RBI DBIE for specific budget datasets
2. **Sprite creation** – Create custom or use/modify existing pixel art assets?
3. **Sound licensing** – Source royalty-free 8-bit sounds or create custom?
4. **Analytics** – Track which achievements are most unlocked? Scroll depth?

---

## Success Metrics

- **Engagement:** Average scroll depth > 75%
- **Completion:** > 50% of users reach Level 3
- **Shares:** Track social share clicks
- **Return visits:** Users coming back during budget season
- **Accessibility:** Zero critical a11y violations

---

## References

- [data.gov.in](https://data.gov.in) – Government open data portal
- [RBI DBIE](https://dbie.rbi.org.in) – Reserve Bank database
- [India Budget Portal](https://www.indiabudget.gov.in) – Official budget documents
- [Press Start 2P Font](https://fonts.google.com/specimen/Press+Start+2P)
