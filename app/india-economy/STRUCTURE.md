# India Economy - Content Structure

A living document tracking all sections, their status, and planned content.

## Vision

An educational portal explaining India's economy to a 7th-grade audience (NCERT level) using:
- Simple language with Hindi terms where helpful
- Real data from official sources
- Visual explanations over dense text
- "Did you know" moments that make concepts memorable

---

## Sections Overview

| Section | Status | Route | Primary Sources |
|---------|--------|-------|-----------------|
| Landing Hub | ✅ Live | `/india-economy` | — |
| Union Budget | ✅ Live | `/india-economy/budget` | Ministry of Finance |
| RBI & Monetary Policy | ✅ Live | `/india-economy/rbi` | RBI |
| GDP & Growth | ✅ Live | `/india-economy/gdp` | MoSPI, World Bank |
| Inflation & Prices | 🔜 Planned | `/india-economy/inflation` | RBI, MoSPI |
| Trade & Exports | 📋 Backlog | `/india-economy/trade` | DGFT, Commerce Ministry |
| Banking System | 📋 Backlog | `/india-economy/banking` | RBI |
| Stock Markets | 📋 Backlog | `/india-economy/markets` | NSE, BSE, SEBI |
| Taxation | 📋 Backlog | `/india-economy/taxes` | Income Tax Dept, GST Council |
| Employment | 📋 Backlog | `/india-economy/employment` | Labour Ministry, NSSO |

**Status Legend:**
- ✅ Live — Published and accessible
- 🚧 In Progress — Currently being built
- 🔜 Planned — Next in queue
- 📋 Backlog — Future consideration

---

## Section Details

### 1. Union Budget (`/budget`)

**Status:** ✅ Live

**Content Outline:**
1. What is the Union Budget?
   - Definition with Hindi term
   - Revenue vs Capital budget
2. The Big Picture (key stats)
   - Total spending, revenue, deficit
3. Where money comes from
   - Tax revenue breakdown (bar chart)
   - Income Tax, GST, Corporate Tax, Customs, Excise
4. Where money goes
   - Top ministry allocations
   - Interest payments insight
5. Fiscal Deficit
   - Definition and current year
   - 10-year historical trend (bar chart)
   - Fiscal consolidation concept

**Data Files:**
- `budget-2024-25.json` — Current year detailed
- `budget-historical.json` — 10-year summary

**Future Additions:**
- [ ] Multi-year comparison toggle
- [ ] State-wise transfer breakdown
- [ ] Interactive budget calculator
- [ ] Ministry deep-dives

---

### 2. RBI & Monetary Policy (`/rbi`)

**Status:** ✅ Live

**Content Outline:**
1. What is RBI?
   - History, role, headquarters
   - "Bank of all banks" concept
2. Current Policy Rates Dashboard
   - Repo, Reverse Repo, CRR, SLR
3. Repo Rate Explained
   - Definition with Hindi term
   - How it affects EMI (increase vs decrease flow)
4. CRR Explained
   - Definition, example with ₹100 crore
   - COVID-19 response story
5. SLR Explained
   - Definition, why it exists
6. Quick Summary Table

**Data Files:**
- `rbi-rates.json` — Rate history with 22 repo changes

**Future Additions:**
- [ ] Repo rate timeline visualization
- [ ] Inflation targeting explanation
- [ ] MPC meeting calendar
- [ ] Rate change impact calculator

---

### 3. GDP & Growth (`/gdp`)

**Status:** ✅ Live

**Content Outline:**
1. What is GDP?
   - Definition with Hindi term
   - Real vs Nominal GDP explanation
   - GDP per capita calculation
2. India's GDP Story (1991-2024)
   - Key milestones timeline
   - Growth rate visualization (last 10 years)
3. Sector Breakdown
   - Agriculture, Industry, Services shares
   - Historical sector evolution chart
   - Services-led growth insight
4. Comparing with the World
   - Top 10 economies table
   - Asian economies comparison
   - IMF projections to 2030

**Data Files:**
- `gdp-historical.json` — 34 years of GDP data (1991-2025)
- `gdp-sectors.json` — Sector-wise breakdown with historical
- `gdp-global.json` — Global rankings and comparisons

**Future Additions:**
- [ ] Interactive GDP calculator
- [ ] State-wise GDP comparison
- [ ] GDP growth factors explainer

---

### 4. Inflation & Prices (`/inflation`)

**Status:** 🔜 Planned

**Content Outline:**
1. What is Inflation?
   - Definition with Hindi term
   - Good inflation vs bad inflation
2. How is Inflation Measured?
   - CPI (Consumer Price Index)
   - WPI (Wholesale Price Index)
   - The basket of goods concept
3. Current Inflation Dashboard
   - Latest CPI, food inflation, core inflation
4. Why Prices Rise
   - Demand-pull vs Cost-push
   - Real examples (onion, petrol)
5. RBI's Role in Controlling Inflation
   - Inflation targeting (4% ± 2%)
   - Link back to Repo Rate section
6. Historical Inflation Trends
   - Major spikes and their causes

**Data Needed:**
- [ ] Monthly CPI data (10 years)
- [ ] Category-wise inflation
- [ ] WPI series
- [ ] Commodity price trends

---

### 5. Trade & Exports (`/trade`)

**Status:** 📋 Backlog

**Topics to Cover:**
- Balance of Trade & Balance of Payments
- Major exports (IT services, pharma, textiles, gems)
- Major imports (oil, electronics, gold)
- Trade agreements (FTAs)
- Current account deficit
- Foreign exchange reserves

---

### 6. Banking System (`/banking`)

**Status:** 📋 Backlog

**Topics to Cover:**
- Types of banks (PSU, Private, Small Finance, Payments)
- How banks make money
- NPA (Non-Performing Assets) problem
- Banking reforms history
- Digital payments revolution (UPI)
- Deposit insurance

---

### 7. Stock Markets (`/markets`)

**Status:** 📋 Backlog

**Topics to Cover:**
- What is a stock exchange?
- NSE vs BSE
- Sensex and Nifty explained
- How to read stock prices
- IPOs explained
- SEBI's role
- FII and DII flows

---

### 8. Taxation (`/taxes`)

**Status:** 📋 Backlog

**Topics to Cover:**
- Direct vs Indirect taxes
- Income tax slabs and how they work
- GST structure (CGST, SGST, IGST)
- Tax-to-GDP ratio
- Black money and tax evasion
- Tax reforms history

---

### 9. Employment (`/employment`)

**Status:** 📋 Backlog

**Topics to Cover:**
- Unemployment rate measurement
- Formal vs Informal sector
- Gig economy
- MNREGA
- Skill India initiatives
- Labour law reforms

---

## Design System

### Typography
- **Headings:** Source Serif 4 (serif)
- **Body:** IBM Plex Sans (sans)

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Cream | `#FAF7F2` | Background |
| Deep Indigo | `#1a2e44` | Primary text |
| Terracotta | `#b85c38` | Accent, highlights |
| Muted Blue | `#4a6fa5` | Links |
| Slate | `#6b7c8f` | Captions, muted text |
| Warm Gray | `#e5e0d8` | Borders |
| Cream Yellow | `#FFF8E7` | Callout backgrounds |
| Sage Green | `#7a9e7e` | Positive indicators |
| Gold | `#d4a84b` | Key concepts |

### Components
- `SectionHeading` — With optional chapter number
- `Definition` — Term + Hindi + explanation
- `MarginNote` — Asymmetric callout
- `KeyConcept` — Yellow highlighted box
- `StatDisplay` — Big number with label
- `ContentCard` — Subtle bordered container
- `DataTable` — Clean data presentation
- `Pullquote` — Offset quotations

### Animations
- Staggered page load reveals
- Hover lift on cards
- Animated link underlines
- Line draw effects
- Reduced motion support

---

## Data Sources Registry

All sources tracked in `data/sources.json`. Each data file references its source via `sourceId`.

**Current Sources:**
1. Union Budget 2024-25 (Ministry of Finance)
2. Budget Historical Data (indiabudget.gov.in)
3. RBI Monetary Policy (rbi.org.in)
4. RBI Database on Indian Economy

**Adding New Sources:**
1. Add entry to `data/sources.json`
2. Create data file with `sourceId` reference
3. Update `data/index.ts` exports
4. Add to SourceFooter in relevant pages

---

## Content Guidelines

1. **Reading Level:** 7th grade (NCERT-like)
2. **Hindi Terms:** Include transliteration for key concepts
3. **Numbers:** Use lakh/crore, not million/billion
4. **Examples:** Use relatable Indian context
5. **Sources:** Always cite, always official
6. **Visuals:** Prefer charts over tables where possible
7. **Length:** Each section should take ~5 min to read

---

## Roadmap

### Phase 1 (Complete)
- [x] Landing page with topic cards
- [x] Union Budget section
- [x] RBI & Monetary Policy section
- [x] Design system and animations

### Phase 2 (In Progress)
- [x] GDP & Growth section
- [ ] Inflation & Prices section
- [ ] Cross-linking between sections

### Phase 3 (Future)
- [ ] Trade & Exports
- [ ] Banking System
- [ ] Interactive calculators
- [ ] Quiz/trivia mode

### Phase 4 (Aspirational)
- [ ] Stock Markets
- [ ] Taxation
- [ ] Employment
- [ ] State-level comparisons
- [ ] Mobile app version
