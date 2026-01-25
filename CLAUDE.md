# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Apurwa Sarwajit built with Next.js 14 (App Router). The site showcases professional experience, projects, and blog posts with rich animations.

**Live site:** https://apurwasarwajit.com

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production (static export)
npm run lint     # Run ESLint
```

## Architecture

### Static Export
The site uses `output: 'export'` in next.config.js for static HTML generation. All pages must be statically generatable - no server-side features (API routes, dynamic server rendering).

### Data Flow
- **`data/resume.ts`** - Central data source for all resume content (experiences, projects, skills, personal info)
- **`content/blog/*.mdx`** - Blog posts as MDX files with frontmatter
- **`lib/blog.ts`** - MDX parsing utilities using gray-matter

### Animation System (Dual Library)
Two animation libraries work together:

1. **Framer Motion** - Used in individual components for:
   - Page transitions (`app/template.tsx`)
   - Micro-interactions (hover, tap)
   - AnimatedSection, AnimatedText components

2. **GSAP + ScrollTrigger** - Used for scroll-based animations:
   - `GSAPProvider.tsx` wraps the app, registers plugins
   - `GSAPAnimations.tsx` exports: ScrollReveal, Parallax, Magnetic, CountUp, StaggerReveal
   - Checkpoint `v1.0-framer-motion` available if GSAP needs rollback

### Key Component Patterns
- **ThemeProvider** - Dark mode via `class` strategy on `<html>`
- **Header** - Includes ScrollProgress bar, mobile menu with AnimatePresence
- **Timeline** - Expandable work experience with animated line drawing
- **ContactForm** - Floating labels, real-time validation, success animation

### Styling
- Tailwind CSS with custom primary color palette (blue)
- Custom animations defined in `tailwind.config.ts`
- Utility classes in `globals.css`: `.card-hover`, `.btn-primary`, `.tag-neutral`, `.link-arrow`
- Reduced motion support via `@media (prefers-reduced-motion)`

## Content Updates

To update resume data, edit `data/resume.ts`. The file exports:
- `personalInfo` - Name, tagline, contact info
- `experiences` - Work history with roles and achievements
- `projects` - Featured project cards
- `education`, `skills`, `leadershipExperiences`

To add blog posts, create MDX files in `content/blog/` with frontmatter:
```yaml
---
title: "Post Title"
description: "Brief description"
date: "2024-01-15"
tags: ["AI", "Product"]
---
```

## Deployment

Deployed to Vercel. Deploy with:
```bash
npx vercel --prod
```
