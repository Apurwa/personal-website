'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BudgetData } from '../data/types'
import { LevelSection } from './LevelSection'
import { HealthBar } from './HealthBar'
import { Drawer } from './Drawer'
import { DeficitDetail } from './DeficitDetail'

gsap.registerPlugin(ScrollTrigger)

interface DeficitLevelProps {
  budget: BudgetData
}

type DeficitType = 'fiscal' | 'revenue' | 'primary' | 'debt'

interface DamageItem {
  type: DeficitType
  label: string
  value: string
  color: string
  icon: string
}

export function DeficitLevel({ budget }: DeficitLevelProps) {
  const bossRef = useRef<HTMLDivElement>(null)
  const [selectedDeficit, setSelectedDeficit] = useState<DeficitType | null>(null)

  const damageItems: DamageItem[] = [
    {
      type: 'fiscal',
      label: 'Fiscal Deficit',
      value: `${(budget.fiscalDeficit / 100000).toFixed(1)}L Cr`,
      color: '#ff6b6b',
      icon: '💥',
    },
    {
      type: 'revenue',
      label: 'Revenue Deficit',
      value: `${(budget.revenueDeficit / 100000).toFixed(1)}L Cr`,
      color: '#fbbf24',
      icon: '💸',
    },
    {
      type: 'primary',
      label: 'Primary Deficit',
      value: `${(budget.primaryDeficit / 100000).toFixed(1)}L Cr`,
      color: '#a78bfa',
      icon: '⚡',
    },
    {
      type: 'debt',
      label: 'Debt to GDP',
      value: `${budget.debtToGdp}%`,
      color: '#4ecdc4',
      icon: '📊',
    },
  ]
  const maxValue = Math.max(budget.totalRevenue, budget.totalExpenditure)

  // Boss size based on deficit percentage (bigger = worse)
  const bossScale = 0.5 + (budget.fiscalDeficitPercent / 10)

  useGSAP(() => {
    if (!bossRef.current) return

    gsap.from(bossRef.current, {
      scrollTrigger: {
        trigger: bossRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      scale: 0,
      rotation: 360,
      duration: 1,
      ease: 'back.out(1.7)',
    })

    // Floating animation
    gsap.to(bossRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  return (
    <LevelSection
      level={3}
      title="THE BOSS BATTLE"
      subtitle="Fiscal Deficit Showdown"
    >
      <div className="text-center mb-8">
        <p className="text-xs text-[#ff00ff] animate-pulse">
          WARNING: BOSS APPROACHING
        </p>
      </div>

      {/* Battle Arena */}
      <div className="grid md:grid-cols-3 gap-4 items-center mb-8">
        {/* Revenue (Player) */}
        <div className="p-4 border-2 border-[#00ff41] bg-[#0f0f23]/80">
          <h3 className="text-sm text-[#00ff41] text-center mb-4">REVENUE</h3>
          <HealthBar
            label="Total Revenue"
            current={budget.totalRevenue}
            max={maxValue}
            color="#00ff41"
          />
          <p className="text-xs text-center text-[#00d4ff]">
            Your Power Level
          </p>
        </div>

        {/* VS / Boss */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="text-[#ffff00] text-xl mb-4">VS</div>
          <div
            ref={bossRef}
            className="text-6xl"
            style={{ transform: `scale(${bossScale})` }}
          >
            <span role="img" aria-label="boss">&#128126;</span>
          </div>
          <div className="mt-4 text-center">
            <div className="text-[#ff00ff] text-lg">
              {budget.fiscalDeficitPercent}%
            </div>
            <div className="text-xs text-[#ffb000]">
              of GDP
            </div>
          </div>
        </div>

        {/* Expenditure (Enemy) */}
        <div className="p-4 border-2 border-[#ff00ff] bg-[#0f0f23]/80">
          <h3 className="text-sm text-[#ff00ff] text-center mb-4">EXPENDITURE</h3>
          <HealthBar
            label="Total Spending"
            current={budget.totalExpenditure}
            max={maxValue}
            color="#ff00ff"
            direction="rtl"
          />
          <p className="text-xs text-center text-[#00d4ff]">
            Boss Power Level
          </p>
        </div>
      </div>

      {/* Damage Report */}
      <div className="p-4 border-2 border-[#ffff00] bg-[#0f0f23]/80">
        <h3 className="text-sm text-[#ffff00] text-center mb-4">
          🎮 DAMAGE REPORT - TAP TO ANALYZE 🎮
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
          {damageItems.map((item) => (
            <button
              key={item.type}
              onClick={() => setSelectedDeficit(item.type)}
              className="p-3 border border-[#2d2d44] bg-[#1a1a2e] transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,0,0.3)] cursor-pointer group"
              style={{
                borderColor: item.color,
              }}
            >
              <div className="text-lg mb-1 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="text-[#c8d0dc] group-hover:text-white transition-colors">
                {item.label}
              </div>
              <div className="text-lg mt-1" style={{ color: item.color }}>
                {item.value}
              </div>
              <div className="text-xs text-[#888] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                TAP →
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hint */}
      <p className="text-xs text-[#00d4ff] text-center mt-4 animate-pulse">
        💡 Tap any deficit to see global comparisons and analysis
      </p>

      <div className="mt-6 text-center">
        <p className="text-xs text-[#c8d0dc]">
          The gap between Revenue and Expenditure is the{' '}
          <span className="text-[#ff6b6b]">Fiscal Deficit</span>
          {' '}- borrowed to keep the game running!
        </p>
      </div>

      {/* Deficit Detail Drawer */}
      <Drawer
        isOpen={selectedDeficit !== null}
        onClose={() => setSelectedDeficit(null)}
        title={damageItems.find((d) => d.type === selectedDeficit)?.label || ''}
        icon={damageItems.find((d) => d.type === selectedDeficit)?.icon || '📊'}
        accentColor={damageItems.find((d) => d.type === selectedDeficit)?.color || '#ffff00'}
      >
        {selectedDeficit && (
          <DeficitDetail budget={budget} type={selectedDeficit} />
        )}
      </Drawer>
    </LevelSection>
  )
}
