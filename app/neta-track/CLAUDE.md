# CLAUDE.md - Neta Track

This file provides guidance for working on the Neta Track political promise tracker (`/neta-track`).

## Overview

A fact-based, neutral political promise tracker that helps citizens make informed voting decisions. Tracks what parties promised in election manifestos vs. what they delivered.

**URL:** https://apurwasarwajit.com/neta-track

## Guiding Principles

1. **Neutrality is non-negotiable**
   - Apply same standards to all parties
   - No editorializing or opinion
   - Let data speak for itself

2. **Everything must be verifiable**
   - Every status classification needs sources
   - Prefer official government data
   - Include links users can check themselves

3. **Accessible to all citizens**
   - Write for general audience, not policy experts
   - Use plain language summaries
   - Make navigation intuitive

4. **Transparency about methodology**
   - Clearly define status classifications
   - Acknowledge limitations
   - Be open about what we can't verify

## Architecture

```
app/neta-track/
├── page.tsx              # Landing hub
├── layout.tsx            # Theme wrapper (Thoughtful Textbook)
├── neta-track.css        # Section-specific styles
├── CLAUDE.md             # This file
├── methodology/
│   └── page.tsx          # How we classify promises
├── parties/
│   ├── page.tsx          # All parties list
│   └── [party-slug]/
│       └── page.tsx      # Party report card
├── issues/               # Browse by voter concerns (TODO)
├── compare/              # Side-by-side comparison (TODO)
├── components/
│   ├── PartyCard.tsx
│   ├── PromiseCard.tsx
│   ├── StatusBadge.tsx
│   ├── ConcernTag.tsx
│   └── ...
├── data/
│   ├── types.ts          # TypeScript interfaces
│   ├── parties.json      # Party metadata
│   ├── sources.json      # Source citations
│   ├── concerns-mapping.json
│   └── promises/
│       ├── bjp-2019.json
│       └── ...
└── lib/
    └── promises.ts       # Data helpers
```

## Data Model

### Promise Status

| Status | Meaning |
|--------|---------|
| `delivered` | Promise fully implemented as stated |
| `partial` | Partially implemented or incomplete |
| `in-progress` | Active work happening |
| `not-delivered` | No significant progress made |
| `not-verifiable` | Insufficient data to determine |

### Adding Promise Data

1. Create JSON file: `data/promises/{party}-{year}.json`
2. Follow the `Promise` interface in `data/types.ts`
3. Include evidence links for every promise
4. Add source entry to `data/sources.json`
5. Import in `lib/promises.ts`

### Promise JSON Structure

```json
{
  "id": "bjp-2019-001",
  "partySlug": "bjp",
  "electionYear": 2019,
  "text": "Original promise text from manifesto",
  "summary": "Plain language summary",
  "sector": "economy",
  "concerns": ["jobs", "development"],
  "status": "partial",
  "statusReason": "Brief explanation with facts",
  "evidence": [
    {
      "title": "Source title",
      "url": "https://...",
      "type": "government",
      "date": "2024-01-01"
    }
  ],
  "manifestoPage": 12,
  "sourceId": "bjp-manifesto-2019"
}
```

## Design System

Reuses "Thoughtful Textbook" theme from `/india-economy`:

**Typography:**
- Headers: Source Serif 4
- Body: IBM Plex Sans

**Colors:**
| Usage | Hex |
|-------|-----|
| Background | `#FAF7F2` |
| Primary text | `#1a2e44` |
| Accent | `#b85c38` |
| Links | `#4a6fa5` |
| Delivered | `#7a9e7e` |
| Partial | `#d4a84b` |
| Not delivered | `#c45c4a` |
| In progress | `#4a6fa5` |
| Not verifiable | `#6b7c8f` |

## Content Guidelines

| Guideline | Example |
|-----------|---------|
| Tone | Neutral, factual |
| Promise text | Quote exactly from manifesto |
| Status reason | State facts, not opinions |
| Sources | Always include, prefer official |
| No emojis | Never use emojis |

## Current Status

- ✅ Landing page
- ✅ Party report card template
- ✅ Methodology page
- ✅ Sample BJP 2019 promises (5 examples)
- 🔜 Issues browse page
- 🔜 Compare page
- 🔜 More party data

## Adding a New Party's Promises

1. Get official manifesto PDF
2. Identify key, verifiable promises
3. Research delivery status with sources
4. Create `data/promises/{party}-{year}.json`
5. Add source to `data/sources.json`
6. Update `lib/promises.ts` imports
7. Test party page renders correctly
