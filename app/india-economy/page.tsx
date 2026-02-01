import { ArcadeScreen } from './components/ArcadeScreen'
import { getBudgetData } from './data'

export default function IndiaEconomyPage() {
  const budget = getBudgetData()
  return (
    <ArcadeScreen className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          BUDGET QUEST
        </h1>
        <p className="text-center text-[#ffb000] text-xs">
          FY {budget.fiscalYear} | Total: ₹{budget.totalExpenditure.toLocaleString('en-IN')} Cr
        </p>
      </main>
    </ArcadeScreen>
  )
}
