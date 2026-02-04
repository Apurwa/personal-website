import { Promise, Party, PartyStats, ElectionYear, Concern, CONCERN_LABELS, ConcernsMapping } from '../data/types'
import partiesData from '../data/parties.json'
import concernsMapping from '../data/concerns-mapping.json'
import bjp2019 from '../data/promises/bjp-2019.json'
import congress2019 from '../data/promises/congress-2019.json'

// Type assertions for imported JSON
const parties = partiesData as Party[]
const allPromises: Promise[] = [
  ...(bjp2019 as Promise[]),
  ...(congress2019 as Promise[]),
]

// Concern descriptions for the issues page
export const CONCERN_DESCRIPTIONS: Record<Concern, string> = {
  jobs: 'Employment opportunities, job creation, skill development, and labor policies',
  prices: 'Inflation control, price stability, cost of living, and subsidies',
  safety: 'Law and order, national security, police reform, and public safety',
  corruption: 'Anti-corruption measures, transparency, and governance reform',
  development: 'Infrastructure, urbanization, and economic development',
  healthcare: 'Hospitals, health insurance, medical facilities, and public health',
  education: 'Schools, universities, skill training, and educational reform',
  farmers: 'Agricultural policy, MSP, crop insurance, and rural development',
  women: 'Women\'s safety, empowerment, reservations, and welfare schemes',
  youth: 'Youth employment, education, sports, and entrepreneurship',
  environment: 'Climate action, pollution control, forests, and clean energy',
  minorities: 'Minority rights, welfare schemes, and inclusive policies',
  reservation: 'Quota policies, affirmative action, and social justice',
}

export function getParties(): Party[] {
  return parties
}

export function getPartyBySlug(slug: string): Party | undefined {
  return parties.find((p) => p.slug === slug)
}

export function getPromisesByParty(partySlug: string, year?: ElectionYear): Promise[] {
  return allPromises.filter(
    (p) => p.partySlug === partySlug && (year === undefined || p.electionYear === year)
  )
}

export function getPromisesBySector(sector: string): Promise[] {
  return allPromises.filter((p) => p.sector === sector)
}

export function getPromisesByConcern(concern: string): Promise[] {
  return allPromises.filter((p) => p.concerns.includes(concern as any))
}

export function getPartyStats(partySlug: string, year?: ElectionYear): PartyStats | null {
  const promises = getPromisesByParty(partySlug, year)

  if (promises.length === 0) return null

  return {
    partySlug,
    electionYear: year || 2019, // default
    totalPromises: promises.length,
    delivered: promises.filter((p) => p.status === 'delivered').length,
    partial: promises.filter((p) => p.status === 'partial').length,
    notDelivered: promises.filter((p) => p.status === 'not-delivered').length,
    inProgress: promises.filter((p) => p.status === 'in-progress').length,
    notVerifiable: promises.filter((p) => p.status === 'not-verifiable').length,
  }
}

export function getAllPromises(): Promise[] {
  return allPromises
}

export function getPromiseById(id: string): Promise | undefined {
  return allPromises.find((p) => p.id === id)
}

// Calculate overall delivery rate (delivered + 0.5*partial) / total
export function calculateDeliveryRate(stats: PartyStats): number {
  if (stats.totalPromises === 0) return 0
  return Math.round(
    ((stats.delivered + stats.partial * 0.5) / stats.totalPromises) * 100
  )
}

// Get all concerns with their promise counts
export function getAllConcerns(): { concern: Concern; label: string; description: string; promiseCount: number }[] {
  const concerns = Object.keys(concernsMapping) as Concern[]

  return concerns.map((concern) => ({
    concern,
    label: CONCERN_LABELS[concern],
    description: CONCERN_DESCRIPTIONS[concern],
    promiseCount: getPromisesByConcern(concern).length,
  }))
}

// Get concern details
export function getConcernDetails(concern: string): {
  concern: Concern
  label: string
  description: string
  sectors: string[]
} | null {
  const mapping = concernsMapping as ConcernsMapping
  if (!(concern in mapping)) return null

  return {
    concern: concern as Concern,
    label: CONCERN_LABELS[concern as Concern],
    description: CONCERN_DESCRIPTIONS[concern as Concern],
    sectors: mapping[concern as Concern],
  }
}

// Get promises by concern with party info
export function getPromisesByConcernWithParty(concern: string): (Promise & { partyName: string; partyColor: string })[] {
  const promises = getPromisesByConcern(concern)

  return promises.map((promise) => {
    const party = getPartyBySlug(promise.partySlug)
    return {
      ...promise,
      partyName: party?.shortName || promise.partySlug,
      partyColor: party?.color || '#6b7c8f',
    }
  })
}
