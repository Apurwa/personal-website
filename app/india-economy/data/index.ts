import budgetData from './budget-2024-25.json'
import type { BudgetData } from './types'

export function getBudgetData(): BudgetData {
  return budgetData as BudgetData
}

export type { BudgetData, MinistryAllocation, RevenueBreakdown, NonTaxRevenue } from './types'
