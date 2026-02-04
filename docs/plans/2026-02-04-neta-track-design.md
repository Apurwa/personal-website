# Neta Track - Design Document

**Date:** 2026-02-04
**Status:** Approved for implementation
**URL:** `/neta-track`

## Vision

Help Indian citizens make informed voting decisions by providing fact-based, neutral tracking of political party promises and policy stances.

**Thesis:** Data on political performance is scattered, unavailable, or inaccessible to the average citizen. This tool aggregates and presents it clearly.

## Scope

### Phase 1 (Current)
- Track record comparison: Promises vs. delivery
- Policy stance clarity: Where parties stand on issues
- Lok Sabha elections: 2014, 2019, 2024 cycles

### Phase 2 (Future)
- Candidate profiles (MP attendance, voting, assets, cases)
- Funding transparency (electoral bonds, donations)

### Phase 3 (Future)
- State elections (major states)
- Global expansion (other democracies)

## Data Sources

**Official:**
- Election Commission of India
- PRS Legislative Research
- Parliament records (Lok Sabha/Rajya Sabha)
- Government scheme dashboards

**Reputable Third-Party:**
- ADR (Association for Democratic Reforms)
- Factly
- IndiaSpend
- FactChecker

## Editorial Principles

1. **Strictly neutral presentation** — Show data without interpretation
2. **Factual context where needed** — "Promise made in 2019. Similar promise in 2014 not implemented."
3. **Transparent methodology** — Publish classification criteria, let users see reasoning
4. **No opinion/analysis** — Let citizens draw their own conclusions

## Information Architecture

```
/neta-track
├── /                       # Landing hub
├── /methodology            # How we classify promises
├── /parties                # All parties overview
│   └── /[party-slug]       # Party report card
├── /issues                 # Browse by voter concerns
│   └── /[issue-slug]       # Compare parties on one issue
└── /compare                # Side-by-side comparison tool
```

## User Flows

### Flow 1: "How did BJP do on their promises?"
1. Land on `/neta-track`
2. Click BJP card → `/neta-track/parties/bjp`
3. See report card: promises by status (delivered, partial, broken)
4. Filter by sector or election year
5. Click individual promise → see evidence and sources

### Flow 2: "Which party is best for jobs?"
1. Land on `/neta-track`
2. Click "Jobs" concern → `/neta-track/issues/jobs`
3. See all parties' promises related to jobs
4. Compare delivery rates across parties
5. Read policy stances on employment

### Flow 3: "Compare BJP vs Congress"
1. Go to `/neta-track/compare`
2. Select parties to compare
3. See side-by-side: overall scores, sector breakdown, key promises

## Data Model

### Party
```typescript
interface Party {
  slug: string              // "bjp", "congress", "aap"
  name: string              // "Bharatiya Janata Party"
  shortName: string         // "BJP"
  founded: number
  symbol: string
  color: string
  website: string
  currentLeader: string
}
```

### Promise
```typescript
interface Promise {
  id: string
  partySlug: string
  electionYear: 2014 | 2019 | 2024
  text: string                        // Original promise text
  summary: string                     // Plain-language summary
  sector: Sector
  concerns: Concern[]
  status: "delivered" | "partial" | "not-delivered" | "in-progress" | "not-verifiable"
  statusReason: string
  evidence: Evidence[]
  manifestoPage?: number
  sourceId: string
}

interface Evidence {
  title: string
  url: string
  type: "government" | "news" | "research"
  date: string
}
```

### Policy Stance
```typescript
interface PolicyStance {
  partySlug: string
  issue: string
  stance: string
  quotes: { text: string; source: string; date: string }[]
  lastUpdated: string
}
```

### Sectors (internal organization)
```typescript
type Sector =
  | "economy" | "employment" | "agriculture" | "healthcare"
  | "education" | "infrastructure" | "defence" | "social-welfare"
  | "environment" | "governance" | "foreign-policy"
```

### Concerns (user-facing)
```typescript
type Concern =
  | "jobs" | "prices" | "safety" | "corruption" | "development"
  | "healthcare" | "education" | "farmers" | "women" | "youth"
  | "environment" | "minorities" | "reservation"
```

### Concerns → Sectors Mapping
```json
{
  "jobs": ["employment", "economy", "education"],
  "prices": ["economy", "agriculture"],
  "safety": ["defence", "governance"],
  "corruption": ["governance"],
  "development": ["infrastructure", "economy"],
  "healthcare": ["healthcare", "social-welfare"],
  "education": ["education"],
  "farmers": ["agriculture", "economy"],
  "women": ["social-welfare", "governance", "employment"],
  "youth": ["employment", "education"],
  "environment": ["environment"],
  "minorities": ["social-welfare", "governance"],
  "reservation": ["social-welfare", "education", "employment"]
}
```

## Folder Structure

```
app/neta-track/
├── page.tsx                    # Landing hub
├── layout.tsx                  # Theme wrapper
├── neta-track.css              # Section-specific styles
├── CLAUDE.md                   # AI guidance
├── methodology/
│   └── page.tsx
├── parties/
│   ├── page.tsx
│   └── [party-slug]/
│       └── page.tsx
├── issues/
│   ├── page.tsx
│   └── [issue-slug]/
│       └── page.tsx
├── compare/
│   └── page.tsx
├── components/
│   ├── PartyCard.tsx
│   ├── PromiseTracker.tsx
│   ├── ReportCard.tsx
│   ├── ComparisonTable.tsx
│   ├── StatusBadge.tsx
│   ├── SourceCitation.tsx
│   └── ConcernTag.tsx
├── data/
│   ├── types.ts
│   ├── sources.json
│   ├── parties.json
│   ├── promises/
│   │   ├── bjp-2014.json
│   │   ├── bjp-2019.json
│   │   └── ...
│   ├── policy-stances.json
│   └── concerns-mapping.json
└── lib/
    ├── promises.ts
    └── scoring.ts
```

## Design System

Reuse "Thoughtful Textbook" theme from `/india-economy`:
- Typography: Source Serif 4 (headers), IBM Plex Sans (body)
- Colors: Warm cream background, deep indigo text, terracotta accent
- Animations: Staggered fade-in, scroll reveals
- Components: Adapt EducationalCards patterns

## Components Needed

| Component | Purpose |
|-----------|---------|
| PartyCard | Party overview tile on landing/browse |
| PromiseTracker | Single promise with status, evidence |
| ReportCard | Party scorecard with stats |
| ComparisonTable | Side-by-side party comparison |
| StatusBadge | Delivered/Partial/Broken/In Progress |
| SourceCitation | Link to evidence source |
| ConcernTag | Clickable concern pill |
| SectorFilter | Filter promises by sector |
| YearFilter | Filter by election year |

## Open Questions (to revisit)

- [ ] Finalize full list of concerns
- [ ] Finalize sector list
- [ ] Decide how many promises to track per party per cycle (all? top 20?)
- [ ] Define "delivered" vs "partial" criteria in methodology

## Next Steps

1. Set up folder structure and base files
2. Create TypeScript types
3. Build landing page with placeholder data
4. Add 2-3 sample promises for one party
5. Build party report card page
6. Iterate on design with real data
