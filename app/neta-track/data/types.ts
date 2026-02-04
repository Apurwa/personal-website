// Neta Track - TypeScript Types

// ============================================
// Core Types
// ============================================

export type Sector =
  | 'economy'
  | 'employment'
  | 'agriculture'
  | 'healthcare'
  | 'education'
  | 'infrastructure'
  | 'defence'
  | 'social-welfare'
  | 'environment'
  | 'governance'
  | 'foreign-policy'

export type Concern =
  | 'jobs'
  | 'prices'
  | 'safety'
  | 'corruption'
  | 'development'
  | 'healthcare'
  | 'education'
  | 'farmers'
  | 'women'
  | 'youth'
  | 'environment'
  | 'minorities'
  | 'reservation'

export type PromiseStatus =
  | 'delivered'
  | 'partial'
  | 'not-delivered'
  | 'in-progress'
  | 'not-verifiable'

export type ElectionYear = 2014 | 2019 | 2024

// ============================================
// Party
// ============================================

export interface Party {
  slug: string
  name: string
  shortName: string
  founded: number
  symbol: string
  color: string
  website: string
  currentLeader: string
  description: string
}

// ============================================
// Promise
// ============================================

export interface Evidence {
  title: string
  url: string
  type: 'government' | 'news' | 'research'
  date: string
}

export interface Promise {
  id: string
  partySlug: string
  electionYear: ElectionYear
  text: string
  summary: string
  sector: Sector
  concerns: Concern[]
  status: PromiseStatus
  statusReason: string
  evidence: Evidence[]
  manifestoPage?: number
  sourceId: string
}

// ============================================
// Policy Stance
// ============================================

export interface PolicyQuote {
  text: string
  source: string
  date: string
}

export interface PolicyStance {
  partySlug: string
  issue: string
  stance: string
  quotes: PolicyQuote[]
  lastUpdated: string
}

// ============================================
// Source (for citations)
// ============================================

export interface Source {
  id: string
  title: string
  publisher: string
  url: string
  type: 'official' | 'news' | 'research'
  publishedDate: string
  accessedDate: string
  coversData: string[]
}

// ============================================
// Aggregated Stats (for report cards)
// ============================================

export interface PartyStats {
  partySlug: string
  electionYear: ElectionYear
  totalPromises: number
  delivered: number
  partial: number
  notDelivered: number
  inProgress: number
  notVerifiable: number
}

export interface SectorBreakdown {
  sector: Sector
  total: number
  delivered: number
  partial: number
  notDelivered: number
}

// ============================================
// Concerns Mapping
// ============================================

export type ConcernsMapping = Record<Concern, Sector[]>

// ============================================
// Display helpers
// ============================================

export const SECTOR_LABELS: Record<Sector, string> = {
  economy: 'Economy & Finance',
  employment: 'Employment & Jobs',
  agriculture: 'Agriculture & Rural',
  healthcare: 'Healthcare',
  education: 'Education',
  infrastructure: 'Infrastructure',
  defence: 'Defence & Security',
  'social-welfare': 'Social Welfare',
  environment: 'Environment',
  governance: 'Governance & Reform',
  'foreign-policy': 'Foreign Policy',
}

export const CONCERN_LABELS: Record<Concern, string> = {
  jobs: 'Jobs & Employment',
  prices: 'Prices & Inflation',
  safety: 'Safety & Security',
  corruption: 'Corruption',
  development: 'Development',
  healthcare: 'Healthcare',
  education: 'Education',
  farmers: 'Farmers',
  women: 'Women',
  youth: 'Youth',
  environment: 'Environment',
  minorities: 'Minorities',
  reservation: 'Reservation',
}

export const STATUS_LABELS: Record<PromiseStatus, string> = {
  delivered: 'Delivered',
  partial: 'Partially Delivered',
  'not-delivered': 'Not Delivered',
  'in-progress': 'In Progress',
  'not-verifiable': 'Not Verifiable',
}

export const STATUS_COLORS: Record<PromiseStatus, string> = {
  delivered: '#7a9e7e',      // sage green
  partial: '#d4a84b',        // gold
  'not-delivered': '#c45c4a', // muted red
  'in-progress': '#4a6fa5',  // muted blue
  'not-verifiable': '#6b7c8f', // slate
}
