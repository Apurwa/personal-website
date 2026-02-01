'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCurrency } from '../context/CurrencyContext'

gsap.registerPlugin(ScrollTrigger)

interface ProgressBarProps {
  label: string
  value: number
  maxValue: number
  color?: string
  className?: string
}

export function ProgressBar({
  label,
  value,
  maxValue,
  color = '#00ff41',
  className = '',
}: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayValue, setDisplayValue] = useState(0)
  const { formatCurrency } = useCurrency()

  const percentage = (value / maxValue) * 100

  useEffect(() => {
    if (!barRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        {
          width: `${percentage}%`,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: function() {
            const progress = this.progress()
            setDisplayValue(Math.floor(value * progress))
          },
        }
      )
    })

    return () => ctx.revert()
  }, [percentage, value])

  return (
    <div ref={containerRef} className={`mb-4 ${className}`}>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[#00d4ff]">{label}</span>
        <span className="text-[#ffb000]">{formatCurrency(displayValue)}</span>
      </div>
      <div className="h-4 bg-[#1a1a2e] border-2 border-[#2d2d44] relative">
        <div
          ref={barRef}
          className="h-full"
          style={{ backgroundColor: color, width: '0%' }}
        />
        {/* Pixel notches */}
        <div className="absolute inset-0 flex">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex-1 border-r border-[#2d2d44] last:border-r-0" />
          ))}
        </div>
      </div>
    </div>
  )
}
