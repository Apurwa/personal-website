'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BudgetData } from '../data/types'

gsap.registerPlugin(ScrollTrigger)

interface HighScoresProps {
  budget: BudgetData
}

export function HighScores({ budget }: HighScoresProps) {
  const tableRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([])

  // Find best (lowest) and worst (highest) deficit years
  const bestYear = budget.historical.reduce((a, b) =>
    a.fiscalDeficitPercent < b.fiscalDeficitPercent ? a : b
  )
  const worstYear = budget.historical.reduce((a, b) =>
    a.fiscalDeficitPercent > b.fiscalDeficitPercent ? a : b
  )

  useGSAP(() => {
    if (!tableRef.current) return

    rowRefs.current.forEach((row, index) => {
      if (!row) return

      gsap.from(row, {
        scrollTrigger: {
          trigger: tableRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: index % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.5,
        delay: index * 0.15,
      })
    })
  }, [])

  return (
    <section className="py-16 border-b-4 border-[#2d2d44]">
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="text-[#ffff00] text-xs">🏆🏆🏆</div>
          <div className="text-[#ffff00] text-sm">HIGH SCORES</div>
          <div className="text-[#ffff00] text-xs">🏆🏆🏆</div>
        </div>
        <h2 className="text-xl md:text-2xl text-center text-[#00ff41]">
          HISTORICAL LEADERBOARD
        </h2>
        <p className="text-center text-[#00d4ff] text-xs mt-2">
          Fiscal Performance Over The Years
        </p>
      </div>

      <div ref={tableRef} className="max-w-2xl mx-auto">
        <div className="border-2 border-[#ffff00] bg-[#0f0f23]/80 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 gap-2 p-3 bg-[#1a1a2e] text-xs text-[#ffff00] border-b-2 border-[#ffff00]">
            <div>RANK</div>
            <div>YEAR</div>
            <div className="text-right">DEFICIT %</div>
            <div className="text-right">SPENDING</div>
          </div>

          {/* Rows - sorted by deficit (lower is better) */}
          {[...budget.historical]
            .sort((a, b) => a.fiscalDeficitPercent - b.fiscalDeficitPercent)
            .map((entry, index) => {
              const isBest = entry.year === bestYear.year
              const isWorst = entry.year === worstYear.year
              const isCurrent = entry.year === budget.fiscalYear

              return (
                <div
                  key={entry.year}
                  ref={(el) => { rowRefs.current[index] = el as HTMLTableRowElement }}
                  className={`grid grid-cols-4 gap-2 p-3 text-xs border-b border-[#2d2d44] last:border-b-0 ${
                    isCurrent ? 'bg-[#00ff41]/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`${index === 0 ? 'text-[#ffff00]' : index === 1 ? 'text-[#c0c0c0]' : index === 2 ? 'text-[#cd7f32]' : 'text-[#00d4ff]'}`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </span>
                  </div>
                  <div className={`${isCurrent ? 'text-[#00ff41]' : 'text-[#00d4ff]'}`}>
                    {entry.year}
                    {isCurrent && ' ★'}
                  </div>
                  <div className={`text-right ${isBest ? 'text-[#00ff41]' : isWorst ? 'text-[#ff00ff]' : 'text-[#ffb000]'}`}>
                    {entry.fiscalDeficitPercent}%
                    {isBest && ' ✓'}
                    {isWorst && ' ✗'}
                  </div>
                  <div className="text-right text-[#00d4ff]">
                    ₹{(entry.totalExpenditure / 100000).toFixed(1)}L Cr
                  </div>
                </div>
              )
            })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex justify-center gap-6 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-[#00ff41]">✓</span>
            <span className="text-[#00d4ff]">Best</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#ff00ff]">✗</span>
            <span className="text-[#00d4ff]">Worst</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#00ff41]">★</span>
            <span className="text-[#00d4ff]">Current</span>
          </div>
        </div>

        {/* Fun fact */}
        <div className="mt-6 p-3 border border-[#00d4ff] text-center text-xs">
          <span className="text-[#ffff00]">📊 FUN FACT:</span>
          <span className="text-[#00d4ff]"> COVID year {worstYear.year} had the highest deficit at </span>
          <span className="text-[#ff00ff]">{worstYear.fiscalDeficitPercent}%</span>
          <span className="text-[#00d4ff]"> of GDP!</span>
        </div>
      </div>
    </section>
  )
}
