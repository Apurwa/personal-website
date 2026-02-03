---
name: animation-library-selection
description: Use when adding animations to this project - decision framework for choosing between Framer Motion, GSAP, and CSS animations
---

# Animation Library Selection

This project uses a dual-library animation system. Choose the right tool for each animation type.

## Decision Framework

```
┌─────────────────────────────────────────────────────────────┐
│ What kind of animation?                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Component mount/unmount, layout changes, gestures           │
│   → Framer Motion                                           │
│                                                             │
│ Scroll-triggered, timeline sequences, complex choreography  │
│   → GSAP + ScrollTrigger                                    │
│                                                             │
│ Simple hover/focus states, loading spinners                 │
│   → CSS (Tailwind)                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Framer Motion

**Use for:** React component lifecycle animations, gestures, layout animations

**Setup:** Components using Framer Motion need `'use client'`

### Page Transitions (`app/template.tsx`)

```tsx
'use client'
import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

### Mount/Unmount with AnimatePresence

```tsx
import { AnimatePresence, motion } from 'framer-motion'

function Menu({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {/* menu content */}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
```

### Micro-interactions (hover, tap)

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400 }}
>
  Click me
</motion.button>
```

### Stagger Children

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => (
    <motion.li key={i} variants={item}>{i}</motion.li>
  ))}
</motion.ul>
```

## GSAP + ScrollTrigger

**Use for:** Scroll-based reveals, parallax, complex timelines, number counting

**Setup:** Wrapped by `GSAPProvider.tsx`, components in `GSAPAnimations.tsx`

### Available Components

| Component | Use for |
|-----------|---------|
| `ScrollReveal` | Fade/slide in when element enters viewport |
| `Parallax` | Elements moving at different scroll speeds |
| `Magnetic` | Elements that follow cursor on hover |
| `CountUp` | Animate numbers from 0 to target |
| `StaggerReveal` | Sequential reveal of child elements |

### ScrollReveal Usage

```tsx
import { ScrollReveal } from '@/components/GSAPAnimations'

<ScrollReveal direction="up" delay={0.2}>
  <div>Reveals when scrolled into view</div>
</ScrollReveal>
```

### CountUp for Statistics

```tsx
import { CountUp } from '@/components/GSAPAnimations'

<CountUp end={48200000} duration={2} suffix=" Cr" />
```

### Custom GSAP Animation

```tsx
'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

function CustomAnimation() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
      },
      x: 100,
      rotation: 360,
    })
  }, [])

  return <div ref={ref}>Animates on scroll</div>
}
```

## CSS / Tailwind

**Use for:** Simple state transitions, loading states, hover effects

### Hover States

```tsx
<button className="transition-colors duration-200 hover:bg-primary-600">
  Hover me
</button>
```

### Custom Animations (tailwind.config.ts)

```tsx
// Already defined in this project:
<div className="animate-fade-in">Fades in</div>
<div className="animate-slide-up">Slides up</div>
```

### Loading Spinner

```tsx
<div className="animate-spin h-5 w-5 border-2 border-primary-500 border-t-transparent rounded-full" />
```

## Reduced Motion Support

Always respect user preferences:

```tsx
// Framer Motion - automatic with useReducedMotion hook
import { useReducedMotion } from 'framer-motion'

const shouldReduce = useReducedMotion()
const variants = shouldReduce ? {} : { /* full animation */ }

// CSS - use media query
@media (prefers-reduced-motion: reduce) {
  .animate-slide-up {
    animation: none;
    opacity: 1;
  }
}

// GSAP - check in useGSAP
useGSAP(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // ... animation code
}, [])
```

## Quick Reference

| Animation Type | Library | Example |
|---------------|---------|---------|
| Page transition | Framer | `template.tsx` with `motion.div` |
| Modal open/close | Framer | `AnimatePresence` + `motion.div` |
| Button hover | CSS | `hover:scale-105 transition-transform` |
| Scroll reveal | GSAP | `<ScrollReveal>` component |
| Number counter | GSAP | `<CountUp end={100} />` |
| Parallax background | GSAP | `<Parallax speed={0.5}>` |
| Drawer slide | Framer | `animate={{ x: isOpen ? 0 : '100%' }}` |
| Loading spinner | CSS | `animate-spin` |
