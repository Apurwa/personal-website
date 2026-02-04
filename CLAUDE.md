# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Apurwa Sarwajit built with Next.js 14 (App Router). Includes portfolio content, blog, and interactive tools.

**Live site:** https://apurwasarwajit.com

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run lint     # Run ESLint
```

## Architecture

### Deployment Mode

Deployed to Vercel with serverless functions. API routes are supported. Images use `unoptimized: true`.

### Data Sources

- **`data/resume.ts`** - Resume content (experiences, projects, skills, personal info)
- **`content/blog/*.mdx`** - Blog posts with frontmatter; parsed by `lib/blog.ts`

### Interactive Tools

**Market Sizer** (`/tools/market-sizer`)

- API route: `app/api/market-size/route.ts`
- Components: `components/market-sizer/`
- Backend: `lib/marketSizer/` (NAICS classifier, Census API, calculator)
- Uses Census Bureau API; requires `CENSUS_API_KEY` env var
- Optional `OPENAI_API_KEY` for AI-powered business classification

**India Economy Portal** (`/india-economy`)

- Self-contained in `app/india-economy/` with co-located components, data, hooks
- "Thoughtful Textbook" theme - editorial, typography-driven design
- 9 live sections: Budget, RBI, GDP, Inflation, Trade, Banking, Markets, Taxes, Employment
- `CurrencyContext` provides INR/USD toggle with live exchange rates
- **See `app/india-economy/CLAUDE.md` for detailed guidance**
- **See `app/india-economy/STRUCTURE.md` for content roadmap**

**Neta Track - Political Promise Tracker** (`/neta-track`)

- Fact-based tracker comparing election manifesto promises vs delivery
- Neutral tone; every claim requires verifiable sources
- Routes: `/parties/[party-slug]`, `/methodology`, `/issues`, `/compare`
- Data: `app/neta-track/data/promises/{party}-{year}.json`
- Reuses "Thoughtful Textbook" theme with status-specific colors (delivered/partial/not-delivered)
- **See `app/neta-track/CLAUDE.md` for detailed guidance**

### Animation System

Two animation libraries:

1. **Framer Motion** - Page transitions (`app/template.tsx`), micro-interactions, AnimatedSection/AnimatedText components

2. **GSAP + ScrollTrigger** - Scroll animations via `GSAPProvider.tsx` and `GSAPAnimations.tsx` (ScrollReveal, Parallax, Magnetic, CountUp, StaggerReveal)

### Styling

- Tailwind CSS with custom primary color palette
- Utility classes in `globals.css`: `.card-hover`, `.btn-primary`, `.tag-neutral`, `.link-arrow`
- Reduced motion support via `@media (prefers-reduced-motion)`

## Design Preferences

### "Thoughtful Textbook" Theme

Used for educational content (`/india-economy`, `/neta-track`). Distinctive editorial design:

**Typography:** Source Serif 4 (headers), IBM Plex Sans (body)

**Core Colors:**
| Usage | Hex |
|-------|-----|
| Background (warm cream) | `#FAF7F2` |
| Primary text (deep indigo) | `#1a2e44` |
| Accent (terracotta) | `#b85c38` |
| Links (muted blue) | `#4a6fa5` |
| Positive/Delivered (sage green) | `#7a9e7e` |
| Highlight/Partial (gold) | `#d4a84b` |

**Design Principles:**
- Typography-driven, no emojis
- Paper texture background (`paper-texture` class)
- Staggered animations with `animation-delay`
- Educational components: `Definition`, `MarginNote`, `KeyConcept`, `StatDisplay`
- All animations respect `prefers-reduced-motion`

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
CENSUS_API_KEY=...    # Required for Market Sizer (free from census.gov/developers)
OPENAI_API_KEY=...    # Optional: AI-powered NAICS classification
```

## Content Updates

**Resume**: Edit `data/resume.ts`

**Blog posts**: Create MDX in `content/blog/` with frontmatter (title, description, date, tags)

**India Economy**: Add data to `app/india-economy/data/`, register sources in `sources.json`

**Neta Track**: Add promises to `app/neta-track/data/promises/{party}-{year}.json`

## Deployment

```bash
npx vercel --prod
```
