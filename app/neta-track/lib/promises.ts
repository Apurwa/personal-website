import { Promise, Party, PartyStats, ElectionYear } from '../data/types'
import partiesData from '../data/parties.json'
import bjp2019 from '../data/promises/bjp-2019.json'

// Type assertions for imported JSON
const parties = partiesData as Party[]
const allPromises: Promise[] = [
  ...(bjp2019 as Promise[]),
  // Add more promise files here as they're created
]

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
