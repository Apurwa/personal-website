'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Reading progress bar that shows how far the user has scrolled through the article.
 * Appears as a thin terracotta bar at the top of the viewport.
 * Only shows on article pages (not the landing page).
 * Respects prefers-reduced-motion.
 */
export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  // Only show on article pages, not the landing page
  const isArticlePage = pathname !== '/india-economy'

  useEffect(() => {
    if (!isArticlePage) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      setProgress(Math.min(100, Math.max(0, scrollPercent)))
      setIsVisible(scrollTop > 100) // Show after scrolling 100px
    }

    // Use requestAnimationFrame for smooth updates (unless reduced motion)
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        if (prefersReducedMotion) {
          updateProgress()
        } else {
          requestAnimationFrame(() => {
            updateProgress()
            ticking = false
          })
        }
        ticking = true
      }
    }

    // Initial calculation
    updateProgress()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateProgress)
    }
  }, [isArticlePage])

  if (!isArticlePage) return null

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 h-1 bg-[#e5e0d8]/50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-gradient-to-r from-[#b85c38] to-[#d4a84b] transition-transform duration-150 ease-out origin-left"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  )
}
