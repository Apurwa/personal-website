import { getBudgetData } from './data'
import { ArcadeScreen } from './components/ArcadeScreen'
import { ScoreCounter } from './components/ScoreCounter'
import { RevenueLevel } from './components/RevenueLevel'

export default function IndiaEconomyPage() {
  const budget = getBudgetData()
  return (
    <ArcadeScreen className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Hero */}
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-4">
            BUDGET QUEST
          </h1>
          <p className="text-center text-[#ffb000] text-xs mb-8">
            INDIA&apos;S UNION BUDGET {budget.fiscalYear}
          </p>
          <ScoreCounter
            value={budget.totalExpenditure}
            label="Total Budget"
          />
          <p className="text-xs text-[#00d4ff] mt-8 animate-pulse">
            ↓ SCROLL TO BEGIN ↓
          </p>
        </div>

        {/* Level 1: Revenue */}
        <RevenueLevel budget={budget} />
      </main>
    </ArcadeScreen>
  )
}
