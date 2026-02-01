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
  source: string
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
