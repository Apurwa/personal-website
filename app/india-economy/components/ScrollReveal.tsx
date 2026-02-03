'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right'
  delay?: number // 0-8, maps to delay-1 through delay-8
  threshold?: number
  once?: boolean
}

/**
 * Lightweight scroll reveal using Intersection Observer + CSS animations.
 * Triggers existing CSS animation classes when element enters viewport.
 */
export function ScrollReveal({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      element.classList.add('scroll-revealed')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-revealed')
            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            entry.target.classList.remove('scroll-revealed')
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before fully visible
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, once])

  const animationClass = {
    'fade-up': 'scroll-fade-up',
    'fade-in': 'scroll-fade-in',
    'slide-left': 'scroll-slide-left',
    'slide-right': 'scroll-slide-right',
  }[animation]

  const delayClass = delay > 0 ? `scroll-delay-${delay}` : ''

  return (
    <div ref={ref} className={`${animationClass} ${delayClass} ${className}`}>
      {children}
    </div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number // ms between each child
}

/**
 * Container that staggers reveal of child ScrollReveal components.
 * Children should be wrapped in ScrollReveal with delay={index}.
 */
export function StaggerContainer({ children, className = '' }: StaggerContainerProps) {
  return <div className={className}>{children}</div>
}
