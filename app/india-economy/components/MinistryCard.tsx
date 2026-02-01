'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface MinistryCardProps {
  name: string
  allocation: number
  icon: string
  maxAllocation: number
  index: number
}

const iconMap: Record<string, string> = {
  shield: '🛡️',
  road: '🛣️',
  train: '🚂',
  home: '🏠',
  book: '📚',
  heart: '❤️',
  wheat: '🌾',
  village: '🏘️',
  coins: '💰',
  misc: '📦',
}

export function MinistryCard({ name, allocation, icon, maxAllocation, index }: MinistryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const percentage = (allocation / maxAllocation) * 100

  useGSAP(() => {
    if (!cardRef.current || !barRef.current) return

    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 30,
      duration: 0.4,
      delay: index * 0.1,
    })

    gsap.fromTo(
      barRef.current,
      { width: '0%' },
      {
        width: `${percentage}%`,
        duration: 0.8,
        delay: index * 0.1 + 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [index, percentage])

  return (
    <div
      ref={cardRef}
      className="p-3 border-2 border-[#2d2d44] bg-[#1a1a2e] hover:border-[#00ff41] transition-colors"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{iconMap[icon] || '📦'}</span>
        <span className="text-xs text-[#00d4ff] truncate">{name}</span>
      </div>
      <div className="text-xs text-[#ffb000] mb-1">
        ₹{allocation.toLocaleString('en-IN')} Cr
      </div>
      <div className="h-2 bg-[#0f0f23] border border-[#2d2d44]">
        <div
          ref={barRef}
          className="h-full bg-[#00ff41]"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  )
}
