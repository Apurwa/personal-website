import budgetData from './budget-2024-25.json'
import sourcesData from './sources.json'
import budgetHistoricalData from './budget-historical.json'
import rbiRatesData from './rbi-rates.json'
import gdpHistoricalData from './gdp-historical.json'
import gdpSectorsData from './gdp-sectors.json'
import gdpGlobalData from './gdp-global.json'
import inflationData from './inflation-data.json'
import type {
  BudgetData,
  SourcesData,
  Source,
  BudgetHistoricalData,
  BudgetHistoricalEntry,
  RBIRatesData,
  RateChange,
  CurrentRates,
  GDPHistoricalData,
  GDPYearEntry,
  GDPSectorsData,
  GDPGlobalData,
  InflationData
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

// GDP Data
export function getGDPHistorical(): GDPHistoricalData {
  return gdpHistoricalData as GDPHistoricalData
}

export function getGDPByYear(fiscalYear: string): GDPYearEntry | undefined {
  return getGDPHistorical().data.find(entry => entry.fiscalYear === fiscalYear)
}

export function getGDPSectors(): GDPSectorsData {
  return gdpSectorsData as GDPSectorsData
}

export function getGDPGlobal(): GDPGlobalData {
  return gdpGlobalData as GDPGlobalData
}

export function getGDPMilestones(): GDPYearEntry[] {
  return getGDPHistorical().data.filter(entry => entry.milestone)
}

// Inflation Data
export function getInflationData(): InflationData {
  return inflationData as InflationData
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
  InflationTarget,
  GDPHistoricalData,
  GDPYearEntry,
  GDPSectorsData,
  SectorData,
  SectorYearData,
  GDPGlobalData,
  CountryGDP,
  GDPProjection,
  InflationData,
  InflationYearData,
  CPICategory,
  FoodSubCategory,
  PriceSpike
} from './types'
