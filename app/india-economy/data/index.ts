import budgetData from './budget-2024-25.json'
import sourcesData from './sources.json'
import type { BudgetData, SourcesData, Source } from './types'

export function getBudgetData(): BudgetData {
  return budgetData as BudgetData
}

export function getSources(): Source[] {
  return (sourcesData as SourcesData).sources
}

export function getSourceById(id: string): Source | undefined {
  return getSources().find(source => source.id === id)
}

export function getSourcesForDataFile(filename: string): Source[] {
  return getSources().filter(source => source.coversData.includes(filename))
}

export type { BudgetData, MinistryAllocation, RevenueBreakdown, NonTaxRevenue, Source, SourcesData } from './types'
