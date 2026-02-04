'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface UseScrollSpyOptions {
  /** Array of section IDs to observe */
  sectionIds: string[]
  /** Offset from top (e.g., for sticky header) */
  offset?: number
  /** Threshold for intersection (0-1) */
  threshold?: number
}

/**
 * Hook that tracks which section is currently in view using Intersection Observer.
 * Used for highlighting active TOC items as user scrolls.
 * Respects prefers-reduced-motion preference.
 */
export function useScrollSpy({
  sectionIds,
  offset = 80,
  threshold = 0.1,
}: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const visibleSectionsRef = useRef<Map<string, number>>(new Map())

  // Calculate which visible section is topmost
  const updateActiveSection = useCallback(() => {
    const visible = visibleSectionsRef.current
    if (visible.size === 0) {
      setActiveId(null)
      return
    }

    // Find the section with the smallest top position (highest on screen)
    let topmost: string | null = null
    let topmostPosition = Infinity

    visible.forEach((position, id) => {
      if (position < topmostPosition) {
        topmostPosition = position
        topmost = id
      }
    })

    setActiveId(topmost)
  }, [])

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create intersection observer
    // rootMargin: negative top to account for header, negative bottom to focus on upper portion
    const rootMargin = `-${offset}px 0px -60% 0px`

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          if (entry.isIntersecting) {
            // Store the top position of the element
            visibleSectionsRef.current.set(id, entry.boundingClientRect.top)
          } else {
            visibleSectionsRef.current.delete(id)
          }
        })

        // Update active section after processing all entries
        updateActiveSection()
      },
      {
        rootMargin,
        threshold: prefersReducedMotion ? 0.5 : threshold,
      }
    )

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observerRef.current?.observe(element)
      }
    })

    // Set initial active section (first one if at top of page)
    if (window.scrollY < 100 && sectionIds.length > 0) {
      setActiveId(sectionIds[0])
    }

    return () => {
      observerRef.current?.disconnect()
      visibleSectionsRef.current.clear()
    }
  }, [sectionIds, offset, threshold, updateActiveSection])

  // Function to scroll to a section with offset
  const scrollToSection = useCallback(
    (id: string) => {
      const element = document.getElementById(id)
      if (element) {
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        })
      }
    },
    [offset]
  )

  return { activeId, scrollToSection }
}
