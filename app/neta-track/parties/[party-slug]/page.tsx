import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { getPartyBySlug, getPromisesByParty, getPartyStats, calculateDeliveryRate } from '../../lib/promises'
import { StatusBadge } from '../../components/StatusBadge'
import { PromiseCard } from '../../components/PromiseCard'
import { PromiseStatus, STATUS_LABELS } from '../../data/types'

interface PageProps {
  params: Promise<{ 'party-slug': string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { 'party-slug': slug } = await params
  const party = getPartyBySlug(slug)

  if (!party) {
    return { title: 'Party Not Found' }
  }

  return {
    title: `${party.shortName} Promise Tracker`,
    description: `Track ${party.name}'s election promises. See what they promised vs. what they delivered with verified sources.`,
  }
}

export default async function PartyPage({ params }: PageProps) {
  const { 'party-slug': slug } = await params
  const party = getPartyBySlug(slug)

  if (!party) {
    notFound()
  }

  const promises = getPromisesByParty(slug, 2019)
  const stats = getPartyStats(slug, 2019)
  const deliveryRate = stats ? calculateDeliveryRate(stats) : null

  const statusOrder: PromiseStatus[] = ['delivered', 'partial', 'in-progress', 'not-delivered', 'not-verifiable']

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 animate-fade-in">
        <ol className="flex items-center gap-2 font-sans text-sm text-[#6b7c8f]">
          <li>
            <Link href="/neta-track" className="hover:text-[#4a6fa5]">
              Neta Track
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/neta-track/parties" className="hover:text-[#4a6fa5]">
              Parties
            </Link>
          </li>
          <li>/</li>
          <li className="text-[#1a2e44]">{party.shortName}</li>
        </ol>
      </nav>

      {/* Party Header */}
      <header className="mb-12">
        <div className="flex items-start gap-6">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center font-serif text-2xl font-bold text-white animate-fade-in"
            style={{ backgroundColor: party.color }}
          >
            {party.shortName.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a2e44] mb-2 animate-fade-in-up delay-1">
              {party.name}
            </h1>
            <p className="font-sans text-[#6b7c8f] animate-fade-in-up delay-2">
              {party.description}
            </p>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      {stats && (
        <section className="mb-12 animate-fade-in-up delay-3">
          <div className="bg-white border border-[#e5e0d8] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-semibold text-[#1a2e44]">
                2019 Manifesto Report Card
              </h2>
              {deliveryRate !== null && (
                <div className="text-right">
                  <div className="font-serif text-3xl font-bold text-[#1a2e44]">
                    {deliveryRate}%
                  </div>
                  <div className="font-sans text-xs text-[#6b7c8f] uppercase tracking-wide">
                    Delivery Rate
                  </div>
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="progress-bar-container h-4 mb-4">
              <div
                className="progress-segment progress-delivered"
                style={{ width: `${(stats.delivered / stats.totalPromises) * 100}%` }}
                title={`Delivered: ${stats.delivered}`}
              />
              <div
                className="progress-segment progress-partial"
                style={{ width: `${(stats.partial / stats.totalPromises) * 100}%` }}
                title={`Partial: ${stats.partial}`}
              />
              <div
                className="progress-segment progress-in-progress"
                style={{ width: `${(stats.inProgress / stats.totalPromises) * 100}%` }}
                title={`In Progress: ${stats.inProgress}`}
              />
              <div
                className="progress-segment progress-not-delivered"
                style={{ width: `${(stats.notDelivered / stats.totalPromises) * 100}%` }}
                title={`Not Delivered: ${stats.notDelivered}`}
              />
              <div
                className="progress-segment progress-not-verifiable"
                style={{ width: `${(stats.notVerifiable / stats.totalPromises) * 100}%` }}
                title={`Not Verifiable: ${stats.notVerifiable}`}
              />
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 font-sans text-sm">
              {statusOrder.map((status) => {
                const count = stats[status === 'not-delivered' ? 'notDelivered' : status === 'in-progress' ? 'inProgress' : status === 'not-verifiable' ? 'notVerifiable' : status as keyof typeof stats] as number
                if (count === 0) return null
                return (
                  <div key={status} className="flex items-center gap-2">
                    <StatusBadge status={status} size="sm" />
                    <span className="text-[#6b7c8f]">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Promises List */}
      <section>
        <h2 className="font-serif text-2xl font-semibold text-[#1a2e44] mb-6 animate-fade-in-up delay-4">
          Promises Tracked ({promises.length})
        </h2>

        {promises.length === 0 ? (
          <div className="text-center py-12 bg-white border border-[#e5e0d8] rounded-xl">
            <p className="font-sans text-[#6b7c8f]">
              No promises tracked yet for this party. Check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {promises.map((promise, index) => (
              <div
                key={promise.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.4 + index * 0.05}s` }}
              >
                <PromiseCard promise={promise} />
              </div>
            ))}
          </div>
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
