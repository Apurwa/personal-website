'use client'

import { BudgetData } from '../data/types'
import { ProgressBar } from './ProgressBar'
import { ScoreCounter } from './ScoreCounter'
import { LevelSection } from './LevelSection'

interface RevenueLevelProps {
  budget: BudgetData
}

export function RevenueLevel({ budget }: RevenueLevelProps) {
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
        <div className="p-4 border-2 border-[#00ff41] bg-[#0f0f23]/80">
          <h3 className="text-sm text-[#00ff41] mb-4 text-center">
            TAX REVENUE
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
        </div>

        {/* Non-Tax & Borrowings */}
        <div className="space-y-4">
          <div className="p-4 border-2 border-[#00d4ff] bg-[#0f0f23]/80">
            <h3 className="text-sm text-[#00d4ff] mb-4 text-center">
              NON-TAX REVENUE
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
          </div>

          <div className="p-4 border-2 border-[#ff00ff] bg-[#0f0f23]/80">
            <h3 className="text-sm text-[#ff00ff] mb-4 text-center">
              CREDIT USED
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
          </div>
        </div>
      </div>
    </LevelSection>
  )
}
