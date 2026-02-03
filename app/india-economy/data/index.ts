import budgetData from './budget-2024-25.json'
import sourcesData from './sources.json'
import budgetHistoricalData from './budget-historical.json'
import rbiRatesData from './rbi-rates.json'
import type {
  BudgetData,
  SourcesData,
  Source,
  BudgetHistoricalData,
  BudgetHistoricalEntry,
  RBIRatesData,
  RateChange,
  CurrentRates
} from './types'

// Budget Data (current year detailed)
export function getBudgetData(): BudgetData {
  return budgetData as BudgetData
}

// Historical Budget Data (10 years)
export function getBudgetHistorical(): BudgetHistoricalData {
  return budgetHistoricalData as BudgetHistoricalData
}

export function getBudgetByYear(fiscalYear: string): BudgetHistoricalEntry | undefined {
  return getBudgetHistorical().data.find(entry => entry.fiscalYear === fiscalYear)
}

// RBI Monetary Policy Data
export function getRBIRates(): RBIRatesData {
  return rbiRatesData as RBIRatesData
}

export function getCurrentRates(): CurrentRates {
  return getRBIRates().currentRates
}

export function getRepoRateHistory(): RateChange[] {
  return getRBIRates().repoRateHistory
}

export function getCRRHistory(): RateChange[] {
  return getRBIRates().crrHistory
}

export function getSLRHistory(): RateChange[] {
  return getRBIRates().slrHistory
}

// Sources
export function getSources(): Source[] {
  return (sourcesData as SourcesData).sources
}

export function getSourceById(id: string): Source | undefined {
  return getSources().find(source => source.id === id)
}

export function getSourcesForDataFile(filename: string): Source[] {
  return getSources().filter(source => source.coversData.includes(filename))
}

// Type exports
export type {
  BudgetData,
  MinistryAllocation,
  RevenueBreakdown,
  NonTaxRevenue,
  Source,
  SourcesData,
  BudgetHistoricalData,
  BudgetHistoricalEntry,
  RBIRatesData,
  RateChange,
  CurrentRates,
  InflationTarget
} from './types'
