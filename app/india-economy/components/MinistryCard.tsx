'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCurrency } from '../context/CurrencyContext'

gsap.registerPlugin(ScrollTrigger)

interface MinistryCardProps {
  name: string
  allocation: number
  icon: string
  maxAllocation: number
  index: number
  onClick?: () => void
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

export function MinistryCard({ name, allocation, icon, maxAllocation, index, onClick }: MinistryCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const { formatCurrency } = useCurrency()

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
    <button
      ref={cardRef}
      onClick={onClick}
      className="p-3 border-2 border-[#2d2d44] bg-[#1a1a2e] text-left transition-all duration-200 hover:border-[#ffff00] hover:bg-[#ffff00]/5 hover:shadow-[0_0_15px_rgba(255,255,0,0.2)] hover:scale-105 cursor-pointer group"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl group-hover:scale-110 transition-transform">{iconMap[icon] || '📦'}</span>
        <span className="text-xs text-[#00d4ff] truncate group-hover:text-[#ffff00] transition-colors">{name}</span>
      </div>
      <div className="text-xs text-[#ffb000] mb-1">
        {formatCurrency(allocation)}
      </div>
      <div className="h-2 bg-[#0f0f23] border border-[#2d2d44]">
        <div
          ref={barRef}
          className="h-full bg-[#00ff41]"
          style={{ width: '0%' }}
        />
      </div>
      <div className="text-xs text-[#888] text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        TAP →
      </div>
    </button>
  )
}
