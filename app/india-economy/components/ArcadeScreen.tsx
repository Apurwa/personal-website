'use client'

import { ReactNode } from 'react'

interface ArcadeScreenProps {
  children: ReactNode
  className?: string
}

export function ArcadeScreen({ children, className = '' }: ArcadeScreenProps) {
  return (
    <div className={`relative ${className}`}>
      {/* CRT Scanlines Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
        }}
        aria-hidden="true"
      />

      {/* Screen Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-lg"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0, 255, 65, 0.1)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  )
}
