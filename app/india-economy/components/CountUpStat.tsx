'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface CountUpStatProps {
  value: number
  prefix?: string
  suffix?: string
  label: string
  sublabel?: string
  decimals?: number
  duration?: number
  className?: string
}

/**
 * Animated stat display that counts up when scrolled into view.
 * Uses GSAP ScrollTrigger for smooth number animation.
 */
export function CountUpStat({
  value,
  prefix = '',
  suffix = '',
  label,
  sublabel,
  decimals = 0,
  duration = 1.5,
  className = '',
}: CountUpStatProps) {
  const valueRef = useRef<HTMLSpanElement>(null)
  const countRef = useRef({ value: 0 })
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = valueRef.current
    if (!element || hasAnimated.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      element.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`
      return
    }

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        gsap.to(countRef.current, {
          value: value,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            if (element) {
              const displayValue = decimals > 0
                ? countRef.current.value.toFixed(decimals)
                : Math.round(countRef.current.value).toString()
              element.textContent = `${prefix}${displayValue}${suffix}`
            }
          },
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [value, prefix, suffix, decimals, duration])

  return (
    <div className={`text-center py-4 ${className}`}>
      <div className="font-serif text-3xl md:text-4xl font-bold text-[#1a2e44]">
        <span ref={valueRef}>{prefix}0{suffix}</span>
      </div>
      <div className="font-sans text-sm font-medium text-[#4a5568] mt-1">{label}</div>
      {sublabel && (
        <div className="font-sans text-xs text-[#6b7c8f] mt-0.5">{sublabel}</div>
      )}
    </div>
  )
}

interface CountUpTextProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

/**
 * Inline count-up text for use within paragraphs or other components.
 */
export function CountUpText({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.5,
  className = '',
}: CountUpTextProps) {
  const valueRef = useRef<HTMLSpanElement>(null)
  const countRef = useRef({ value: 0 })
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = valueRef.current
    if (!element || hasAnimated.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      element.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`
      return
    }

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        gsap.to(countRef.current, {
          value: value,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            if (element) {
              const displayValue = decimals > 0
                ? countRef.current.value.toFixed(decimals)
                : Math.round(countRef.current.value).toString()
              element.textContent = `${prefix}${displayValue}${suffix}`
            }
          },
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [value, prefix, suffix, decimals, duration])

  return (
    <span ref={valueRef} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
