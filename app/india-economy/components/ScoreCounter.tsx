'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface ScoreCounterProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function ScoreCounter({
  value,
  label,
  prefix = '₹',
  suffix = ' Cr',
  duration = 2,
  className = '',
}: ScoreCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!counterRef.current || hasAnimated) return

    const counter = { value: 0 }

    gsap.to(counter, {
      value,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(counter.value).toLocaleString('en-IN')
        }
      },
      onComplete: () => setHasAnimated(true),
    })
  }, [value, duration, hasAnimated])

  return (
    <div className={`text-center ${className}`}>
      <div className="text-[#ffb000] text-xs mb-2 uppercase tracking-widest">
        {label}
      </div>
      <div className="text-2xl md:text-4xl">
        <span className="text-[#00d4ff]">{prefix}</span>
        <span ref={counterRef} className="text-[#00ff41]">0</span>
        <span className="text-[#00d4ff]">{suffix}</span>
      </div>
    </div>
  )
}
