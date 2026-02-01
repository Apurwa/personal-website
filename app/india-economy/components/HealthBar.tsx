'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCurrency } from '../context/CurrencyContext'

gsap.registerPlugin(ScrollTrigger)

interface HealthBarProps {
  label: string
  current: number
  max: number
  color: string
  direction?: 'ltr' | 'rtl'
}

export function HealthBar({ label, current, max, color, direction = 'ltr' }: HealthBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayValue, setDisplayValue] = useState(0)
  const { formatCurrency } = useCurrency()

  const percentage = Math.min((current / max) * 100, 100)

  useEffect(() => {
    if (!barRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        {
          width: `${percentage}%`,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: function () {
            setDisplayValue(Math.floor(current * this.progress()))
          },
        }
      )
    })

    return () => ctx.revert()
  }, [current, percentage])

  return (
    <div ref={containerRef} className="mb-4">
      <div className={`flex justify-between text-xs mb-1 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
        <span style={{ color }}>{label}</span>
        <span className="text-[#ffb000]">{formatCurrency(displayValue)}</span>
      </div>
      <div className={`h-6 bg-[#1a1a2e] border-2 border-[#2d2d44] relative overflow-hidden ${direction === 'rtl' ? 'flex justify-end' : ''}`}>
        <div
          ref={barRef}
          className="h-full transition-all"
          style={{ backgroundColor: color, width: '0%' }}
        />
        {/* Damage flash effect */}
        <div className="absolute inset-0 bg-white opacity-0 animate-pulse" style={{ animationDuration: '2s' }} />
      </div>
    </div>
  )
}
