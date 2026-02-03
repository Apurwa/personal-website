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

// Inflation Data Types
export interface InflationYearData {
  year: string
  cpiInflation: number
  foodInflation: number
  coreInflation: number
  notes?: string
}

export interface CPICategory {
  name: string
  weight: number
  hindi: string
  examples: string
}

export interface FoodSubCategory {
  name: string
  weight: number
  recentInflation: number
  volatile?: boolean
}

export interface PriceSpike {
  item: string
  year: string
  peak: string
  normal: string
  cause: string
  impact: string
}

export interface InflationData {
  sourceId: string
  description: string
  notes: string
  currentData: {
    asOf: string
    headlineInflation: number
    foodInflation: number
    coreInflation: number
    fuelInflation: number
    housingInflation: number
  }
  rbiTarget: {
    target: number
    lowerBound: number
    upperBound: number
    effectiveSince: string
    framework: string
    notes: string
  }
  historicalAnnual: InflationYearData[]
  categoryWeights: {
    description: string
    categories: CPICategory[]
  }
  foodSubCategories: FoodSubCategory[]
  notablePriceSpikes: PriceSpike[]
}

// Trade Data Types
export interface TradeCommodity {
  commodity: string
  value: number
  share: number
  growth: number
  highlight?: boolean
  critical?: boolean
}

export interface TradingPartner {
  country: string
  value: number
  share: number
  deficit?: number
  surplus?: number
}

export interface ServiceCategory {
  category: string
  value: number
  share: number
  growth: number
}

export interface CADEntry {
  year: string
  value: number
  percentGdp: number
  surplus?: boolean
  notes?: string
}

export interface TradeYearData {
  year: string
  exports: number
  imports: number
  deficit: number
  notes?: string
}

export interface TradeData {
  sourceId: string
  description: string
  fiscalYear: string
  summary: {
    totalExports: number
    totalImports: number
    tradeDeficit: number
    merchandiseExports: number
    merchandiseImports: number
    merchandiseDeficit: number
    servicesExports: number
    servicesImports: number
    servicesSurplus: number
    unit: string
    growthExports: number
    growthImports: number
  }
  globalRanking: {
    exportsRank: number
    importsRank: number
    tradeOpenness: number
  }
  topExports: TradeCommodity[]
  topImports: TradeCommodity[]
  servicesBreakdown: {
    exports: ServiceCategory[]
  }
  tradingPartners: {
    topExportDestinations: TradingPartner[]
    topImportSources: TradingPartner[]
  }
  forexReserves: {
    current: number
    allTimeHigh: number
    allTimeHighDate: string
    components: {
      foreignCurrencyAssets: number
      gold: number
      sdrs: number
      reservePosition: number
    }
    importCover: number
    unit: string
  }
  currentAccountDeficit: {
    'fy2024-25': {
      value: number
      percentGdp: number
    }
    historical: CADEntry[]
  }
  historicalTrade: TradeYearData[]
  keyInsights: string[]
}

// Banking Data Types
export interface BankCategory {
  type: string
  hindi: string
  count: number
  marketShare: number
  description: string
  examples: string[]
  totalAssets: number
  branches: number
  keyFacts: string[]
}

export interface TopBank {
  rank: number
  name: string
  type: string
  assets: number
  branches: number
}

export interface RevenueStream {
  source: string
  hindi: string
  share: number
  explanation: string
  example: string
}

export interface NPAHistorical {
  year: string
  grossNPA: number
  netNPA: number
  notes?: string
}

export interface SectorNPA {
  sector: string
  share: number
  majorDefaulters: string
}

export interface UPIMilestone {
  year: string
  event: string
  transactions: number
}

export interface PaymentMode {
  mode: string
  share: number
  growth: number
}

export interface GlobalPaymentRank {
  country: string
  realTimePayments: number
  unit: string
  rank: number
}

export interface UPIInternational {
  country: string
  status: string
  year: number
}

export interface BankingReform {
  year: string
  reform: string
  hindi: string
  description: string
  impact: string
}

export interface BankingData {
  sourceId: string
  description: string
  asOf: string
  overview: {
    totalBanks: number
    totalBranches: number
    totalATMs: number
    totalDeposits: number
    totalCredit: number
    creditDepositRatio: number
    unit: string
    bankingPenetration: number
    accountHolders: number
  }
  bankCategories: BankCategory[]
  topBanksByAssets: TopBank[]
  howBanksMakeMoney: {
    description: string
    revenueStreams: RevenueStream[]
    netInterestMargin: {
      current: number
      psb: number
      private: number
      explanation: string
    }
  }
  npaData: {
    description: string
    currentGrossNPA: number
    currentNetNPA: number
    totalNPAAmount: number
    unit: string
    historical: NPAHistorical[]
    sectorWiseNPA: SectorNPA[]
    keyInsights: string[]
  }
  digitalPayments: {
    description: string
    upiStats: {
      monthlyTransactions: number
      monthlyValue: number
      unit: string
      yearOnYearGrowth: number
      dailyAverage: number
      dailyUnit: string
    }
    upiMilestones: UPIMilestone[]
    paymentModes: PaymentMode[]
    globalComparison: GlobalPaymentRank[]
    upiInternational: UPIInternational[]
  }
  depositInsurance: {
    description: string
    currentCoverage: number
    previousCoverage: number
    changeDate: string
    coveragePercent: number
    premiumPaidBy: string
    premiumRate: string
    insurer: string
    parentOrg: string
    claims: {
      totalPaid: number
      banksCovered: number
      unit: string
    }
    whatsCovered: string[]
    whatsNotCovered: string[]
  }
  bankingReforms: BankingReform[]
  financialInclusion: {
    janDhan: {
      totalAccounts: number
      totalDeposits: number
      unit: string
      rupayCards: number
      zeroBalanceAccounts: number
      averageBalance: number
      womenAccounts: number
    }
    bankingAccessPoints: {
      branches: number
      atms: number
      bcAgents: number
      microATMs: number
    }
    ruralBanking: {
      ruralBranches: number
      ruralBranchShare: number
      villagesCovered: number
      bankingCorrespondents: number
    }
  }
  interestRates: {
    savingsAccount: {
      psuAverage: number
      privateAverage: number
      smallFinanceAverage: number
      range: string
    }
    fixedDeposit: {
      oneYear: {
        psuAverage: number
        privateAverage: number
        smallFinanceAverage: number
      }
      threeYear: {
        psuAverage: number
        privateAverage: number
        smallFinanceAverage: number
      }
      seniorCitizenBonus: number
    }
    loanRates: {
      homeLoan: { range: string; average: number }
      personalLoan: { range: string; average: number }
      carLoan: { range: string; average: number }
      educationLoan: { range: string; average: number }
      goldLoan: { range: string; average: number }
    }
  }
  keyInsights: string[]
}

// Stock Markets Data Types
export interface StockExchange {
  name: string
  shortName: string
  hindi: string
  founded: number
  headquarters: string
  listedCompanies: number
  marketCap: number
  flagshipIndex: string
  tradingShare: number
  globalRank: number
  highlights: string[]
}

export interface IndexConstituent {
  name: string
  weight: number
}

export interface SectorWeight {
  sector: string
  weight: number
}

export interface StockIndex {
  fullName: string
  hindi: string
  meaning: string
  companies: number
  baseYear: number
  baseValue: number
  currentValue: number
  allTimeHigh: number
  allTimeHighDate: string
  methodology: string
  topConstituents: IndexConstituent[]
  sectorWeights?: SectorWeight[]
}

export interface MarketMilestone {
  year: string
  event: string
  sensex: number | null
}

export interface SebiReform {
  year: number
  reform: string
}

export interface IPOStep {
  step: number
  name: string
  description: string
}

export interface IPOCategory {
  category: string
  quota: number
  maxInvestment: string
}

export interface RecentIPO {
  company: string
  year: number
  size: number
  listing: number
}

export interface MarketCapCategory {
  category: string
  hindi: string
  definition: string
  minMarketCap: string
  risk: string
  examples: string[]
}

export interface GlobalMarketRank {
  rank: number
  country: string
  exchange: string
  marketCap: number
  unit: string
  highlight?: boolean
}

export interface MarketsData {
  sourceId: string
  description: string
  asOf: string
  overview: {
    totalMarketCap: number
    marketCapUnit: string
    marketCapUsd: number
    marketCapUsdUnit: string
    globalRank: number
    listedCompanies: number
    dailyTurnover: number
    dailyTurnoverUnit: string
    retailInvestors: number
    retailInvestorsUnit: string
    marketCapToGdp: number
  }
  exchanges: StockExchange[]
  indices: {
    sensex: StockIndex
    nifty: StockIndex
    otherIndices: { name: string; description: string; companies: number }[]
  }
  historicalMilestones: MarketMilestone[]
  sebi: {
    fullName: string
    hindi: string
    established: number
    statutoryPowers: number
    headquarters: string
    chairman: string
    roles: string[]
    recentReforms: SebiReform[]
  }
  investorTypes: {
    fii: {
      fullName: string
      hindi: string
      alsoKnown: string
      totalAum: number
      aumUnit: string
      equityHolding: number
      holdingUnit: string
      topCountries: string[]
      recentTrend: {
        fy2024: number
        fy2023: number
        fy2022: number
        unit: string
      }
    }
    dii: {
      fullName: string
      hindi: string
      includes: string[]
      totalAum: number
      aumUnit: string
      equityHolding: number
      holdingUnit: string
      recentTrend: {
        fy2024: number
        fy2023: number
        fy2022: number
        unit: string
      }
      mutualFundSip: {
        monthlySip: number
        sipUnit: string
        sipAccounts: number
        sipAccountsUnit: string
      }
    }
    retail: {
      fullName: string
      hindi: string
      dematAccounts: number
      dematUnit: string
      equityHolding: number
      holdingUnit: string
      growthSince2020: number
      growthUnit: string
      averageTicketSize: number
      ticketUnit: string
    }
  }
  ipo: {
    description: string
    hindi: string
    process: IPOStep[]
    categories: IPOCategory[]
    recentLargestIpos: RecentIPO[]
    stats2024: {
      totalIpos: number
      amountRaised: number
      amountUnit: string
      averageSubscription: number
      subscriptionUnit: string
    }
  }
  tradingBasics: {
    marketTimings: {
      preOpen: string
      normalTrading: string
      postClose: string
      days: string
    }
    orderTypes: { type: string; hindi: string; description: string }[]
    segments: { name: string; description: string }[]
    settlement: {
      current: string
      meaning: string
      previousSystem: string
      changedOn: string
    }
    charges: { charge: string; range?: string; rate?: string; note: string }[]
  }
  marketCapCategories: MarketCapCategory[]
  globalComparison: GlobalMarketRank[]
  keyInsights: string[]
}
