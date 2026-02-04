'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getParties, getPartyStats, getPromisesByParty, calculateDeliveryRate } from '../lib/promises'
import { StatusBadge } from '../components/StatusBadge'
import { Party, PartyStats, PromiseStatus, STATUS_LABELS, SECTOR_LABELS, Sector } from '../data/types'

const parties = getParties()

// Get unique sectors from promises
function getSectorBreakdown(partySlug: string, year: 2014 | 2019 | 2024 = 2019) {
  const promises = getPromisesByParty(partySlug, year)
  const sectors: Record<string, { total: number; delivered: number; partial: number; notDelivered: number }> = {}

  promises.forEach((p) => {
    if (!sectors[p.sector]) {
      sectors[p.sector] = { total: 0, delivered: 0, partial: 0, notDelivered: 0 }
    }
    sectors[p.sector].total++
    if (p.status === 'delivered') sectors[p.sector].delivered++
    if (p.status === 'partial') sectors[p.sector].partial++
    if (p.status === 'not-delivered') sectors[p.sector].notDelivered++
  })

  return sectors
}

function PartySelector({
  selectedParties,
  onToggle,
}: {
  selectedParties: string[]
  onToggle: (slug: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {parties.map((party) => {
        const isSelected = selectedParties.includes(party.slug)
        return (
          <button
            key={party.slug}
            onClick={() => onToggle(party.slug)}
            className={`
              px-4 py-2 rounded-lg border-2 font-sans text-sm font-medium transition-all
              ${isSelected
                ? 'border-current text-white'
                : 'border-[#e5e0d8] text-[#6b7c8f] hover:border-[#4a6fa5] hover:text-[#4a6fa5]'
              }
            `}
            style={isSelected ? { backgroundColor: party.color, borderColor: party.color } : undefined}
          >
            {party.shortName}
          </button>
        )
      })}
    </div>
  )
}

function ComparisonCard({
  party,
  stats,
  sectorBreakdown,
}: {
  party: Party
  stats: PartyStats | null
  sectorBreakdown: Record<string, { total: number; delivered: number; partial: number; notDelivered: number }>
}) {
  const deliveryRate = stats ? calculateDeliveryRate(stats) : null
  const sectors = Object.entries(sectorBreakdown)

  return (
    <div
      className="bg-white border border-[#e5e0d8] rounded-xl overflow-hidden"
      style={{ borderTopWidth: '4px', borderTopColor: party.color }}
    >
      {/* Header */}
      <div className="p-5 border-b border-[#e5e0d8]">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-serif text-lg font-bold text-white"
            style={{ backgroundColor: party.color }}
          >
            {party.shortName.charAt(0)}
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#1a2e44]">
              {party.shortName}
            </h3>
            <p className="font-sans text-xs text-[#6b7c8f]">{party.name}</p>
          </div>
        </div>

        {deliveryRate !== null ? (
          <div className="flex items-end gap-2">
            <span className="font-serif text-4xl font-bold text-[#1a2e44]">
              {deliveryRate}%
            </span>
            <span className="font-sans text-sm text-[#6b7c8f] mb-1">delivery rate</span>
          </div>
        ) : (
          <p className="font-sans text-sm text-[#6b7c8f] italic">No data yet</p>
        )}
      </div>

      {/* Stats Breakdown */}
      {stats && (
        <div className="p-5 border-b border-[#e5e0d8]">
          <h4 className="font-sans text-xs font-semibold text-[#6b7c8f] uppercase tracking-wide mb-3">
            Promise Status
          </h4>
          <div className="space-y-2">
            <StatRow label="Delivered" count={stats.delivered} total={stats.totalPromises} color="#7a9e7e" />
            <StatRow label="Partial" count={stats.partial} total={stats.totalPromises} color="#d4a84b" />
            <StatRow label="In Progress" count={stats.inProgress} total={stats.totalPromises} color="#4a6fa5" />
            <StatRow label="Not Delivered" count={stats.notDelivered} total={stats.totalPromises} color="#c45c4a" />
            {stats.notVerifiable > 0 && (
              <StatRow label="Not Verifiable" count={stats.notVerifiable} total={stats.totalPromises} color="#6b7c8f" />
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-[#e5e0d8]">
            <div className="flex justify-between font-sans text-sm">
              <span className="text-[#6b7c8f]">Total Tracked</span>
              <span className="font-semibold text-[#1a2e44]">{stats.totalPromises}</span>
            </div>
          </div>
        </div>
      )}

      {/* Sector Breakdown */}
      {sectors.length > 0 && (
        <div className="p-5">
          <h4 className="font-sans text-xs font-semibold text-[#6b7c8f] uppercase tracking-wide mb-3">
            By Sector
          </h4>
          <div className="space-y-2">
            {sectors.map(([sector, data]) => (
              <div key={sector} className="flex items-center justify-between">
                <span className="font-sans text-sm text-[#4a5568]">
                  {SECTOR_LABELS[sector as Sector] || sector}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs text-[#7a9e7e]">{data.delivered}</span>
                  <span className="text-[#e5e0d8]">/</span>
                  <span className="font-sans text-xs text-[#6b7c8f]">{data.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Details Link */}
      <div className="px-5 pb-5">
        <Link
          href={`/neta-track/parties/${party.slug}`}
          className="block text-center font-sans text-sm text-[#4a6fa5] hover:text-[#3a5f8f] py-2 border border-[#e5e0d8] rounded-lg hover:border-[#4a6fa5] transition-colors"
        >
          View full report card
        </Link>
      </div>
    </div>
  )
}

function StatRow({
  label,
  count,
  total,
  color,
}: {
  label: string
  count: number
  total: number
  color: string
}) {
  const percentage = total > 0 ? (count / total) * 100 : 0

  return (
    <div className="flex items-center gap-3">
      <div className="w-20 font-sans text-xs text-[#6b7c8f]">{label}</div>
      <div className="flex-1 h-2 bg-[#e5e0d8] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <div className="w-8 text-right font-sans text-sm font-medium text-[#1a2e44]">
        {count}
      </div>
    </div>
  )
}

function EmptyState({ selectedCount }: { selectedCount: number }) {
  if (selectedCount === 0) {
    return (
      <div className="text-center py-16 bg-white border border-[#e5e0d8] rounded-xl">
        <svg className="w-16 h-16 mx-auto text-[#e5e0d8] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h3 className="font-serif text-xl font-semibold text-[#1a2e44] mb-2">
          Select parties to compare
        </h3>
        <p className="font-sans text-[#6b7c8f] max-w-md mx-auto">
          Choose two or more parties above to see a side-by-side comparison of
          their promise delivery records.
        </p>
      </div>
    )
  }

  return (
    <div className="text-center py-16 bg-white border border-[#e5e0d8] rounded-xl">
      <p className="font-sans text-[#6b7c8f]">
        Select at least one more party to compare.
      </p>
    </div>
  )
}

export default function ComparePage() {
  const [selectedParties, setSelectedParties] = useState<string[]>(['bjp', 'inc'])

  const toggleParty = (slug: string) => {
    setSelectedParties((prev) =>
      prev.includes(slug)
        ? prev.filter((p) => p !== slug)
        : [...prev, slug]
    )
  }

  const selectedPartiesData = selectedParties
    .map((slug) => {
      const party = parties.find((p) => p.slug === slug)
      if (!party) return null
      return {
        party,
        stats: getPartyStats(slug, 2019),
        sectorBreakdown: getSectorBreakdown(slug, 2019),
      }
    })
    .filter(Boolean) as {
      party: Party
      stats: PartyStats | null
      sectorBreakdown: Record<string, { total: number; delivered: number; partial: number; notDelivered: number }>
    }[]

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 animate-fade-in">
        <ol className="flex items-center gap-2 font-sans text-sm text-[#6b7c8f]">
          <li>
            <Link href="/neta-track" className="hover:text-[#4a6fa5]">
              Neta Track
            </Link>
          </li>
          <li>/</li>
          <li className="text-[#1a2e44]">Compare</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a2e44] mb-4 animate-fade-in-up">
          Compare Parties
        </h1>
        <p className="font-sans text-lg text-[#4a5568] animate-fade-in-up delay-1">
          See how different parties stack up on promise delivery.
          Select parties to compare side by side.
        </p>
      </header>

      {/* Party Selector */}
      <section className="mb-10 animate-fade-in-up delay-2">
        <h2 className="font-sans text-sm font-semibold text-[#6b7c8f] uppercase tracking-wide mb-4">
          Select parties to compare
        </h2>
        <PartySelector selectedParties={selectedParties} onToggle={toggleParty} />
      </section>

      {/* Comparison Grid */}
      <section className="animate-fade-in-up delay-3">
        {selectedPartiesData.length < 2 ? (
          <EmptyState selectedCount={selectedPartiesData.length} />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-semibold text-[#1a2e44]">
                2019 Lok Sabha Comparison
              </h2>
              <span className="font-sans text-sm text-[#6b7c8f]">
                {selectedPartiesData.length} parties selected
              </span>
            </div>

            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: `repeat(${Math.min(selectedPartiesData.length, 3)}, minmax(0, 1fr))`,
              }}
            >
              {selectedPartiesData.map(({ party, stats, sectorBreakdown }) => (
                <ComparisonCard
                  key={party.slug}
                  party={party}
                  stats={stats}
                  sectorBreakdown={sectorBreakdown}
                />
              ))}
            </div>

            {/* Note about data */}
            <aside className="mt-8 methodology-callout">
              <p className="font-sans text-sm text-[#4a5568]">
                <strong>Note:</strong> We are actively adding promise data for all parties.
                Parties showing &ldquo;No data yet&rdquo; will be updated as we verify their manifesto promises.
              </p>
            </aside>
          </>
        )}
      </section>

      {/* Back link */}
      <div className="mt-12 pt-8 border-t border-[#e5e0d8]">
        <Link
          href="/neta-track"
          className="font-sans text-sm text-[#4a6fa5] link-animated inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Neta Track
        </Link>
      </div>
    </main>
  )
}
