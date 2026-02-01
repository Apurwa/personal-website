'use client'

import { ReactNode, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface LevelSectionProps {
  level: number
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function LevelSection({
  level,
  title,
  subtitle,
  children,
  className = '',
}: LevelSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current || !headerRef.current) return

    gsap.from(headerRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`py-16 border-b-4 border-[#2d2d44] ${className}`}
    >
      <div ref={headerRef} className="mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="text-[#ff00ff] text-xs">★★★</div>
          <div className="text-[#ffff00] text-sm">LEVEL {level}</div>
          <div className="text-[#ff00ff] text-xs">★★★</div>
        </div>
        <h2 className="text-xl md:text-2xl text-center text-[#00ff41]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-center text-[#00d4ff] text-xs mt-2">
            {subtitle}
          </p>
        )}
      </div>
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </section>
  )
}
