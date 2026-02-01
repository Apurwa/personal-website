'use client'

import { useState } from 'react'
import { BudgetData, MinistryAllocation } from '../data/types'
import { LevelSection } from './LevelSection'
import { ScoreCounter } from './ScoreCounter'
import { MinistryCard } from './MinistryCard'
import { Drawer } from './Drawer'
import { MinistryDetail } from './MinistryDetail'

interface ExpenditureLevelProps {
  budget: BudgetData
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

export function ExpenditureLevel({ budget }: ExpenditureLevelProps) {
  const [selectedMinistry, setSelectedMinistry] = useState<MinistryAllocation | null>(null)
  const maxAllocation = Math.max(...budget.ministryAllocations.map(m => m.allocation))

  return (
    <LevelSection
      level={2}
      title="WHERE DOES IT GO?"
      subtitle="Ministry-wise Allocations"
    >
      <div className="mb-12">
        <ScoreCounter
          value={budget.totalExpenditure}
          label="Total Expenditure"
          className="mb-4"
        />
        <div className="flex justify-center gap-8 text-xs">
          <div className="text-center">
            <div className="text-[#00d4ff]">Revenue</div>
            <div className="text-[#ffb000]">₹{budget.revenueExpenditure.toLocaleString('en-IN')} Cr</div>
          </div>
          <div className="text-center">
            <div className="text-[#ff00ff]">Capital</div>
            <div className="text-[#ffb000]">₹{budget.capitalExpenditure.toLocaleString('en-IN')} Cr</div>
          </div>
        </div>
      </div>

      <h3 className="text-sm text-[#ffff00] text-center mb-6">
        🎮 SELECT YOUR MINISTRY 🎮
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {budget.ministryAllocations.map((ministry, index) => (
          <MinistryCard
            key={ministry.name}
            name={ministry.name}
            allocation={ministry.allocation}
            icon={ministry.icon}
            maxAllocation={maxAllocation}
            index={index}
            onClick={() => setSelectedMinistry(ministry)}
          />
        ))}
      </div>

      {/* Hint */}
      <p className="text-xs text-[#00d4ff] text-center mt-6 animate-pulse">
        💡 Tap any ministry to see detailed breakdown
      </p>

      <div className="mt-4 text-center">
        <p className="text-xs text-[#00d4ff]">
          ⚠️ Interest Payments alone consume{' '}
          <span className="text-[#ff00ff]">
            {((budget.ministryAllocations.find(m => m.name === 'Interest Payments')?.allocation || 0) / budget.totalExpenditure * 100).toFixed(1)}%
          </span>
          {' '}of the budget!
        </p>
      </div>

      {/* Ministry Detail Drawer */}
      <Drawer
        isOpen={selectedMinistry !== null}
        onClose={() => setSelectedMinistry(null)}
        title={selectedMinistry?.name || ''}
        icon={selectedMinistry ? iconMap[selectedMinistry.icon] || '📦' : '📦'}
        accentColor="#ffff00"
      >
        {selectedMinistry && (
          <MinistryDetail
            ministry={selectedMinistry}
            totalExpenditure={budget.totalExpenditure}
          />
        )}
      </Drawer>
    </LevelSection>
  )
}
