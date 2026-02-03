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
- **`app/india-economy/data/budget-2024-25.json`** - India budget data for Budget Quest

### Interactive Tools

**Market Sizer** (`/tools/market-sizer`)

- API route: `app/api/market-size/route.ts`
- Components: `components/market-sizer/`
- Backend: `lib/marketSizer/` (NAICS classifier, Census API, calculator)
- Uses Census Bureau API; requires `CENSUS_API_KEY` env var
- Optional `OPENAI_API_KEY` for AI-powered business classification

**Budget Quest** (`/india-economy`)

- Self-contained in `app/india-economy/` with co-located components, data, hooks
- Arcade-themed India budget visualization with drill-down drawers
- `CurrencyContext` provides INR/USD toggle with live exchange rates
- Achievement system via `useAchievements` hook

### Animation System

Two animation libraries:

1. **Framer Motion** - Page transitions (`app/template.tsx`), micro-interactions, AnimatedSection/AnimatedText components

2. **GSAP + ScrollTrigger** - Scroll animations via `GSAPProvider.tsx` and `GSAPAnimations.tsx` (ScrollReveal, Parallax, Magnetic, CountUp, StaggerReveal)

### Styling

- Tailwind CSS with custom primary color palette
- Utility classes in `globals.css`: `.card-hover`, `.btn-primary`, `.tag-neutral`, `.link-arrow`
- Reduced motion support via `@media (prefers-reduced-motion)`

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
CENSUS_API_KEY=...    # Required for Market Sizer (free from census.gov/developers)
OPENAI_API_KEY=...    # Optional: AI-powered NAICS classification
```

## Content Updates

**Resume**: Edit `data/resume.ts`

**Blog posts**: Create MDX files in `content/blog/` with frontmatter:

```yaml
---
title: "Post Title"
description: "Brief description"
date: "2024-01-15"
tags: ["AI", "Product"]
---
```

## Deployment

```bash
npx vercel --prod
```
