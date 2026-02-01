'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BudgetData } from '../data/types'
import { LevelSection } from './LevelSection'
import { HealthBar } from './HealthBar'

gsap.registerPlugin(ScrollTrigger)

interface DeficitLevelProps {
  budget: BudgetData
}

export function DeficitLevel({ budget }: DeficitLevelProps) {
  const bossRef = useRef<HTMLDivElement>(null)
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
          DAMAGE REPORT
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
          <div>
            <div className="text-[#00d4ff]">Fiscal Deficit</div>
            <div className="text-[#ff00ff] text-lg">{(budget.fiscalDeficit / 100000).toFixed(1)}L Cr</div>
          </div>
          <div>
            <div className="text-[#00d4ff]">Revenue Deficit</div>
            <div className="text-[#ffb000] text-lg">{(budget.revenueDeficit / 100000).toFixed(1)}L Cr</div>
          </div>
          <div>
            <div className="text-[#00d4ff]">Primary Deficit</div>
            <div className="text-[#ffff00] text-lg">{(budget.primaryDeficit / 100000).toFixed(1)}L Cr</div>
          </div>
          <div>
            <div className="text-[#00d4ff]">Debt to GDP</div>
            <div className="text-[#00ff41] text-lg">{budget.debtToGdp}%</div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-[#00d4ff]">
          The gap between Revenue and Expenditure is the{' '}
          <span className="text-[#ff00ff]">Fiscal Deficit</span>
          {' '}- borrowed to keep the game running!
        </p>
      </div>
    </LevelSection>
  )
}
