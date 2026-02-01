'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  icon?: string
  accentColor?: string
  children: ReactNode
}

export function Drawer({
  isOpen,
  onClose,
  title,
  icon = '📊',
  accentColor = '#00ff41',
  children,
}: DrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!overlayRef.current || !drawerRef.current || !contentRef.current) return

    const overlay = overlayRef.current
    const drawer = drawerRef.current
    const content = contentRef.current

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
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      )

      // Stagger content children
      gsap.fromTo(
        content.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.2,
          ease: 'power2.out',
        }
      )
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    if (!overlayRef.current || !drawerRef.current) return

    // Animate out
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    })

    gsap.to(drawerRef.current, {
      x: '100%',
      duration: 0.3,
      ease: 'power3.in',
      onComplete: onClose,
    })
  }

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 font-arcade">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute right-0 top-0 h-full w-full md:w-[500px] lg:w-[600px] bg-[#0f0f23] border-l-4 overflow-hidden"
        style={{ borderColor: accentColor }}
      >
        {/* Scanlines overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
          }}
          aria-hidden="true"
        />

        {/* Header */}
        <div
          className="relative z-20 p-4 border-b-2 flex items-center justify-between"
          style={{ borderColor: accentColor }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            <h2 className="text-sm md:text-base" style={{ color: accentColor }}>
              {title}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-[#ff00ff] hover:text-[#ff66ff] transition-colors text-xl px-2"
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="relative z-20 p-4 md:p-6 overflow-y-auto"
          style={{ height: 'calc(100% - 60px)' }}
        >
          {children}
        </div>

        {/* Glow effect */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            boxShadow: `inset 0 0 100px ${accentColor}20`,
          }}
          aria-hidden="true"
        />
      </div>
    </div>,
    document.body
  )
}
