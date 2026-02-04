'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { TOCItem } from './TableOfContents'
import { useScrollSpy } from '../hooks/useScrollSpy'

interface MobileTOCDrawerProps {
  items: TOCItem[]
  title?: string
}

/**
 * Mobile Table of Contents with floating action button and bottom sheet drawer.
 * Uses GSAP for smooth animations, matching existing Drawer.tsx patterns.
 * Only visible below xl breakpoint (< 1280px).
 */
export function MobileTOCDrawer({
  items,
  title = 'Contents'
}: MobileTOCDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  const sectionIds = items.map((item) => item.id)
  const { activeId, scrollToSection } = useScrollSpy({ sectionIds })

  // Mount check for portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle open/close animations
  useEffect(() => {
    if (!mounted || !overlayRef.current || !drawerRef.current) return

    const overlay = overlayRef.current
    const drawer = drawerRef.current

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden'

      // Animate in
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )

      gsap.fromTo(
        drawer,
        { y: '100%' },
        { y: '0%', duration: 0.4, ease: 'power3.out' }
      )
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, mounted])

  const handleClose = useCallback(() => {
    if (!overlayRef.current || !drawerRef.current) {
      setIsOpen(false)
      return
    }

    // Animate out
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    })

    gsap.to(drawerRef.current, {
      y: '100%',
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => setIsOpen(false),
    })
  }, [])

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    handleClose()
    // Delay scroll to allow drawer to close
    setTimeout(() => {
      scrollToSection(id)
    }, 350)
  }

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose])

  // FAB button - always visible on mobile
  const fabButton = (
    <button
      onClick={() => setIsOpen(true)}
      className="xl:hidden fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#b85c38] text-white shadow-lg hover:bg-[#a04d2f] active:scale-95 transition-all duration-200 flex items-center justify-center"
      aria-label="Open table of contents"
      aria-expanded={isOpen}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  )

  // Bottom sheet drawer
  const drawer = isOpen && mounted ? createPortal(
    <div className="xl:hidden fixed inset-0 z-50">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Bottom Sheet */}
      <div
        ref={drawerRef}
        className="absolute bottom-0 left-0 right-0 max-h-[70vh] bg-[#FAF7F2] rounded-t-2xl shadow-xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Table of contents"
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#e5e0d8]" aria-hidden="true" />
        </div>

        {/* Header */}
        <div className="px-6 pb-3 border-b border-[#e5e0d8] flex items-center justify-between">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#6b7c8f]">
            {title}
          </p>
          <button
            onClick={handleClose}
            className="text-[#6b7c8f] hover:text-[#1a2e44] transition-colors p-1"
            aria-label="Close table of contents"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* TOC Items */}
        <nav className="p-6 overflow-y-auto max-h-[calc(70vh-80px)]">
          <ol className="space-y-1">
            {items.map((item, index) => {
              const isActive = activeId === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleItemClick(e, item.id)}
                    className={`
                      block py-3 px-4 rounded-lg text-base border-l-2 transition-all duration-200
                      ${isActive
                        ? 'border-[#b85c38] bg-[#b85c38]/10 text-[#1a2e44] font-medium'
                        : 'border-transparent text-[#4a5568] hover:bg-[#e5e0d8]/50 hover:text-[#1a2e44]'
                      }
                    `}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    <span className="text-[#b85c38] font-medium mr-2">
                      {item.chapter ?? index + 1}.
                    </span>
                    {item.title}
                  </a>
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </div>,
    document.body
  ) : null

  return (
    <>
      {fabButton}
      {drawer}
    </>
  )
}
