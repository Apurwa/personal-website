'use client'

import { useState } from 'react'
import { BudgetData } from '../data/types'
import { ProgressBar } from './ProgressBar'
import { ScoreCounter } from './ScoreCounter'
import { LevelSection } from './LevelSection'
import { Drawer } from './Drawer'
import { TaxRevenueDetail } from './TaxRevenueDetail'
import { NonTaxRevenueDetail } from './NonTaxRevenueDetail'
import { BorrowingsDetail } from './BorrowingsDetail'

interface RevenueLevelProps {
  budget: BudgetData
}

type DrawerType = 'tax' | 'nonTax' | 'borrowings' | null

export function RevenueLevel({ budget }: RevenueLevelProps) {
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null)

  const maxTaxValue = Math.max(
    budget.taxRevenue.gst,
    budget.taxRevenue.incomeTax,
    budget.taxRevenue.corporateTax,
    budget.taxRevenue.customsDuty,
    budget.taxRevenue.exciseDuty
  )

  return (
    <LevelSection
      level={1}
      title="WHERE DOES THE MONEY COME FROM?"
      subtitle="Government Revenue Sources"
    >
      <div className="mb-12">
        <ScoreCounter
          value={budget.totalRevenue}
          label="Total Revenue"
          className="mb-8"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Tax Revenue */}
        <button
          onClick={() => setActiveDrawer('tax')}
          className="p-4 border-2 border-[#00ff41] bg-[#0f0f23]/80 text-left transition-all hover:bg-[#00ff41]/10 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] group cursor-pointer"
        >
          <h3 className="text-sm text-[#00ff41] mb-4 text-center flex items-center justify-center gap-2">
            <span>💰</span>
            <span>TAX REVENUE</span>
            <span className="text-xs text-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity">
              TAP FOR DETAILS →
            </span>
          </h3>
          <ProgressBar
            label="GST"
            value={budget.taxRevenue.gst}
            maxValue={maxTaxValue}
            color="#00ff41"
          />
          <ProgressBar
            label="Income Tax"
            value={budget.taxRevenue.incomeTax}
            maxValue={maxTaxValue}
            color="#00d4ff"
          />
          <ProgressBar
            label="Corporate Tax"
            value={budget.taxRevenue.corporateTax}
            maxValue={maxTaxValue}
            color="#ff00ff"
          />
          <ProgressBar
            label="Customs Duty"
            value={budget.taxRevenue.customsDuty}
            maxValue={maxTaxValue}
            color="#ffff00"
          />
          <ProgressBar
            label="Excise Duty"
            value={budget.taxRevenue.exciseDuty}
            maxValue={maxTaxValue}
            color="#ffb000"
          />
        </button>

        {/* Non-Tax & Borrowings */}
        <div className="space-y-4">
          <button
            onClick={() => setActiveDrawer('nonTax')}
            className="w-full p-4 border-2 border-[#00d4ff] bg-[#0f0f23]/80 text-left transition-all hover:bg-[#00d4ff]/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] group cursor-pointer"
          >
            <h3 className="text-sm text-[#00d4ff] mb-4 text-center flex items-center justify-center gap-2">
              <span>📈</span>
              <span>NON-TAX REVENUE</span>
              <span className="text-xs text-[#ffb000] opacity-0 group-hover:opacity-100 transition-opacity">
                TAP →
              </span>
            </h3>
            <ProgressBar
              label="Dividends"
              value={budget.nonTaxRevenue.dividends}
              maxValue={budget.nonTaxRevenue.dividends}
              color="#00d4ff"
            />
            <ProgressBar
              label="Interest Receipts"
              value={budget.nonTaxRevenue.interestReceipts}
              maxValue={budget.nonTaxRevenue.dividends}
              color="#00d4ff"
            />
          </button>

          <button
            onClick={() => setActiveDrawer('borrowings')}
            className="w-full p-4 border-2 border-[#ff00ff] bg-[#0f0f23]/80 text-left transition-all hover:bg-[#ff00ff]/10 hover:shadow-[0_0_20px_rgba(255,0,255,0.3)] group cursor-pointer"
          >
            <h3 className="text-sm text-[#ff00ff] mb-4 text-center flex items-center justify-center gap-2">
              <span>🎮</span>
              <span>CREDIT USED</span>
              <span className="text-xs text-[#ffb000] opacity-0 group-hover:opacity-100 transition-opacity">
                TAP →
              </span>
            </h3>
            <ProgressBar
              label="Borrowings"
              value={budget.borrowings}
              maxValue={budget.borrowings}
              color="#ff00ff"
            />
            <p className="text-xs text-[#ffb000] text-center mt-2">
              {((budget.borrowings / budget.totalExpenditure) * 100).toFixed(1)}% of total spending
            </p>
          </button>
        </div>
      </div>

      {/* Hint */}
      <p className="text-xs text-[#00d4ff] text-center mt-6 animate-pulse">
        💡 Tap any section to explore details
      </p>

      {/* Drawers */}
      <Drawer
        isOpen={activeDrawer === 'tax'}
        onClose={() => setActiveDrawer(null)}
        title="TAX REVENUE"
        icon="💰"
        accentColor="#00ff41"
      >
        <TaxRevenueDetail budget={budget} />
      </Drawer>

      <Drawer
        isOpen={activeDrawer === 'nonTax'}
        onClose={() => setActiveDrawer(null)}
        title="NON-TAX REVENUE"
        icon="📈"
        accentColor="#00d4ff"
      >
        <NonTaxRevenueDetail budget={budget} />
      </Drawer>

      <Drawer
        isOpen={activeDrawer === 'borrowings'}
        onClose={() => setActiveDrawer(null)}
        title="BORROWINGS & DEBT"
        icon="🎮"
        accentColor="#ff00ff"
      >
        <BorrowingsDetail budget={budget} />
      </Drawer>
    </LevelSection>
  )
}
