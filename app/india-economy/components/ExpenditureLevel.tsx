'use client'

import { BudgetData } from '../data/types'
import { LevelSection } from './LevelSection'
import { ScoreCounter } from './ScoreCounter'
import { MinistryCard } from './MinistryCard'

interface ExpenditureLevelProps {
  budget: BudgetData
}

export function ExpenditureLevel({ budget }: ExpenditureLevelProps) {
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
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-[#00d4ff]">
          💡 Interest Payments alone consume{' '}
          <span className="text-[#ff00ff]">
            {((budget.ministryAllocations.find(m => m.name === 'Interest Payments')?.allocation || 0) / budget.totalExpenditure * 100).toFixed(1)}%
          </span>
          {' '}of the budget!
        </p>
      </div>
    </LevelSection>
  )
}
