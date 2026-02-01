import { getBudgetData } from './data'
import { ArcadeScreen } from './components/ArcadeScreen'
import { ScoreCounter } from './components/ScoreCounter'

export default function IndiaEconomyPage() {
  const budget = getBudgetData()
  return (
    <ArcadeScreen className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          BUDGET QUEST
        </h1>
        <p className="text-center text-[#ffb000] text-xs mb-8">
          FY {budget.fiscalYear}
        </p>
        <ScoreCounter
          value={budget.totalExpenditure}
          label="Total Budget"
        />
      </main>
    </ArcadeScreen>
  )
}
