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
| Inflation & Prices | ✅ Live | `/india-economy/inflation` | RBI, MoSPI |
| Trade & Exports | ✅ Live | `/india-economy/trade` | DGFT, Commerce Ministry, RBI |
| Banking System | ✅ Live | `/india-economy/banking` | RBI, NPCI, DICGC |
| Stock Markets | ✅ Live | `/india-economy/markets` | NSE, BSE, SEBI |
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

**Status:** ✅ Live

**Content Outline:**
1. What is Inflation?
   - Definition with Hindi term
   - Good vs bad inflation, deflation
2. How is Inflation Measured?
   - CPI basket breakdown (6 categories)
   - CPI vs WPI comparison table
3. Why Prices Rise
   - Demand-pull vs Cost-push with examples
   - Famous price spikes (onion, tomato, petrol, cooking oil)
4. Historical Inflation (2014-2024)
   - Visual chart with RBI target band overlay
   - Year-by-year data with annotations
5. RBI's Inflation Targeting
   - 4% ± 2% framework visualization
   - Tools to control inflation (links to RBI section)
6. Food Inflation Breakdown
   - Sub-category analysis with volatility markers

**Data Files:**
- `inflation-data.json` — CPI data, categories, historical, price spikes

**Future Additions:**
- [ ] Monthly inflation tracker
- [ ] Inflation calculator (purchasing power over time)
- [ ] State-wise inflation comparison

---

### 5. Trade & Exports (`/trade`)

**Status:** ✅ Live

**Content Outline:**
1. What is Trade?
   - Definition with Hindi term
   - Exports vs Imports explanation
   - Balance of Trade concept
2. India's Trade Summary (FY 2024-25)
   - Total exports, imports, deficit
   - Merchandise vs Services breakdown
   - Services surplus insight
3. Top Exports
   - 10 major export categories
   - Electronics growth story (highlighted)
   - Sector shares visualization
4. Top Imports
   - 10 major import categories
   - Oil import dependency (critical)
   - Electronics import bill
5. Trading Partners
   - Top export destinations
   - Top import sources (with deficit/surplus)
   - China deficit insight
6. Services Exports
   - IT/Business services dominance
   - Category breakdown
7. Forex Reserves
   - Current reserves and all-time high
   - Component breakdown (FCA, Gold, SDRs)
   - Import cover concept
8. Current Account Deficit
   - Definition with Hindi term
   - Historical CAD visualization
   - COVID surplus anomaly
9. Historical Trade (2014-2025)
   - 11-year trend visualization
   - Key events annotations

**Data Files:**
- `trade-data.json` — Comprehensive trade data (FY 2024-25)

**Future Additions:**
- [ ] Interactive trade balance calculator
- [ ] Country-wise trade explorer
- [ ] Commodity price tracker
- [ ] FTA impact analysis

---

### 6. Banking System (`/banking`)

**Status:** ✅ Live

**Content Outline:**
1. What is a Bank?
   - Definition with Hindi term
   - Role in economy
2. Types of Banks in India
   - Public Sector Banks (12)
   - Private Sector Banks (21)
   - Small Finance Banks (12)
   - Payments Banks (6)
   - Regional Rural Banks (43)
   - Foreign Banks (45)
3. Top 10 Banks by Assets
   - SBI dominance
   - PSU vs Private comparison
4. How Banks Make Money
   - Net Interest Income (65%)
   - Fee Income (18%)
   - Trading Income (10%)
   - Net Interest Margin explained
5. The NPA Problem
   - Definition and measurement
   - 10-year NPA trend (peak 11.2% in 2017-18)
   - Sector-wise NPA breakdown
   - IBC recovery impact
6. Digital Payments Revolution
   - UPI statistics and growth
   - UPI timeline (2016-2024)
   - Global comparison (#1 in real-time payments)
   - UPI international expansion
7. Deposit Insurance
   - ₹5 lakh coverage
   - DICGC role
   - What's covered/not covered
8. Key Banking Reforms
   - 1969: Nationalization
   - 1991: Liberalization
   - 2014: Jan Dhan Yojana
   - 2016: IBC
   - 2017: Bank Mergers
   - 2020: Deposit Insurance Increase
9. Financial Inclusion
   - Jan Dhan statistics
   - Banking access points
   - Rural banking coverage
10. Interest Rates Guide
    - Deposit rates comparison
    - Loan rates reference

**Data Files:**
- `banking-data.json` — Comprehensive banking system data

**Future Additions:**
- [ ] Bank comparison tool
- [ ] EMI calculator
- [ ] FD interest calculator
- [ ] Bank branch locator

---

### 7. Stock Markets (`/markets`)

**Status:** ✅ Live

**Content Outline:**
1. What is the Stock Market?
   - Definition with Hindi term
   - How shares represent ownership
2. BSE vs NSE
   - Founded dates, market share
   - Flagship indices comparison
   - Trading volume differences
3. Sensex & Nifty Explained
   - Index composition and calculation
   - Top constituents and weights
   - Sector composition visualization
4. Stock Market History
   - Timeline from 1875 to 2024
   - Key milestones and Sensex levels
5. SEBI: The Market Regulator
   - Role and responsibilities
   - Recent reforms (T+1, ASBA, F&O rules)
6. Who Invests in the Market?
   - FII/FPI statistics and trends
   - DII including mutual funds and SIPs
   - Retail investor explosion since COVID
7. IPOs: How Companies Go Public
   - 6-step IPO process
   - Retail/HNI/QIB categories
   - Recent large IPOs and listing performance
8. How Trading Works
   - Market timings and settlement
   - Order types (Market, Limit, Stop Loss)
   - Trading charges breakdown
9. Large, Mid & Small Cap
   - Classification definitions
   - Risk profiles
10. India vs The World
    - Global market cap rankings
    - India's rise to #4 position

**Data Files:**
- `markets-data.json` — Comprehensive stock market data

**Future Additions:**
- [ ] Live market ticker integration
- [ ] Portfolio simulator
- [ ] IPO calendar
- [ ] Historical index calculator

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

### Phase 2 (Complete)
- [x] GDP & Growth section
- [x] Inflation & Prices section
- [x] Cross-linking between sections (RBI ↔ Inflation)

### Phase 3 (Complete)
- [x] Trade & Exports
- [x] Banking System

### Phase 4 (Complete)
- [x] Stock Markets

### Phase 5 (Future)
- [ ] Taxation
- [ ] Interactive calculators
- [ ] Quiz/trivia mode

### Phase 6 (Aspirational)
- [ ] Employment
- [ ] State-level comparisons
- [ ] Mobile app version
