export interface Source {
  id: string
  title: string
  publisher: string
  url: string
  type: 'official' | 'news' | 'analysis'
  publishedDate: string
  accessedDate: string
  coversData: string[]
  notes?: string
}

export interface SourcesData {
  sources: Source[]
}

export interface RevenueBreakdown {
  gst: number
  incomeTax: number
  corporateTax: number
  customsDuty: number
  exciseDuty: number
  otherTaxes: number
}

export interface NonTaxRevenue {
  dividends: number
  interestReceipts: number
  otherNonTax: number
}

export interface MinistryAllocation {
  name: string
  allocation: number
  icon: string
}

export interface BudgetData {
  fiscalYear: string
  lastUpdated: string
  sourceId: string
  totalRevenue: number
  grossTaxRevenue: number
  taxRevenue: RevenueBreakdown
  nonTaxRevenue: NonTaxRevenue
  borrowings: number
  totalExpenditure: number
  revenueExpenditure: number
  capitalExpenditure: number
  ministryAllocations: MinistryAllocation[]
  fiscalDeficit: number
  fiscalDeficitPercent: number
  revenueDeficit: number
  primaryDeficit: number
  debtToGdp: number
  historical: {
    year: string
    fiscalDeficitPercent: number
    totalExpenditure: number
  }[]
}

// Historical Budget Data (10-year view)
export interface BudgetHistoricalEntry {
  fiscalYear: string
  totalExpenditure: number
  fiscalDeficit: number
  fiscalDeficitPercent: number
  revenueDeficit: number
  gdpNominal: number
  notes?: string
}

export interface BudgetHistoricalData {
  sourceIds: string[]
  lastUpdated: string
  currency: string
  unit: string
  data: BudgetHistoricalEntry[]
}

// RBI Monetary Policy Data
export interface RateChange {
  effectiveDate: string
  rate: number
  change?: number
  context?: string
}

export interface CurrentRates {
  repoRate: number
  reverseRepoRate: number
  crr: number
  slr: number
  bankRate: number
  marginalStandingFacility: number
  effectiveDate: string
}

export interface InflationTarget {
  lower: number
  target: number
  upper: number
  effectiveSince: string
  framework: string
}

export interface RBIRatesData {
  sourceIds: string[]
  lastUpdated: string
  currentRates: CurrentRates
  repoRateHistory: RateChange[]
  crrHistory: RateChange[]
  slrHistory: RateChange[]
  inflationTargetRange: InflationTarget
}

// GDP Data Types
export interface GDPYearEntry {
  fiscalYear: string
  gdpNominalLakhCr: number
  gdpNominalUsdBn: number
  realGrowthPercent: number
  perCapitaUsd: number
  milestone?: string
  notes?: string
}

export interface GDPHistoricalData {
  sourceId: string
  description: string
  notes: string
  data: GDPYearEntry[]
}

export interface SectorData {
  name: string
  hindi: string
  sharePercent: number
  growthPercent: number
  description: string
  subsectors?: Record<string, number>
}

export interface SectorYearData {
  year: string
  agriculture: number
  industry: number
  services: number
  milestone?: string
}

export interface GDPSectorsData {
  sourceId: string
  description: string
  notes: string
  currentYear: {
    fiscalYear: string
    sectors: {
      agriculture: SectorData
      industry: SectorData
      services: SectorData
    }
  }
  historical: SectorYearData[]
  keyInsights: string[]
}

export interface CountryGDP {
  rank?: number
  country: string
  gdpUsdTn: number
  perCapitaUsd: number
  growthPercent?: number
  highlight?: boolean
}

export interface GDPProjection {
  year: string
  projectedGdpUsdTn: number
  projectedRank: number
  note?: string
}

export interface GDPGlobalData {
  sourceId: string
  description: string
  asOf: string
  indiaRanking: {
    nominal: number
    ppp: number
    perCapita: number
  }
  topEconomies: CountryGDP[]
  asianComparison: CountryGDP[]
  keyInsights: string[]
  projections: {
    source: string
    notes: string
    data: GDPProjection[]
  }
}
