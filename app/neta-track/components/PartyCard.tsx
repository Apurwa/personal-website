import Link from 'next/link'
import { Party } from '../data/types'

interface PartyCardProps {
  party: Party
  stats?: {
    totalPromises: number
    delivered: number
    partial: number
    notDelivered: number
  }
  index?: number
}

export function PartyCard({ party, stats, index = 0 }: PartyCardProps) {
  const deliveryRate = stats
    ? Math.round(((stats.delivered + stats.partial * 0.5) / stats.totalPromises) * 100)
    : null

  return (
    <Link
      href={`/neta-track/parties/${party.slug}`}
      className={`party-card party-accent-${party.slug} block animate-fade-in-up`}
      style={{
        animationDelay: `${0.1 + index * 0.05}s`,
        borderLeftColor: party.color,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-serif text-xl font-semibold text-[#1a2e44] mb-1">
            {party.shortName}
          </h3>
          <p className="font-sans text-sm text-[#6b7c8f] mb-3">
            {party.name}
          </p>
          <p className="font-sans text-sm text-[#4a5568] line-clamp-2">
            {party.description}
          </p>
        </div>

        {stats && (
          <div className="text-right flex-shrink-0">
            <div className="font-serif text-2xl font-bold text-[#1a2e44]">
              {deliveryRate}%
            </div>
            <div className="font-sans text-xs text-[#6b7c8f] uppercase tracking-wide">
              Delivery Rate
            </div>
          </div>
        )}
      </div>

      {stats && (
        <div className="mt-4">
          <div className="progress-bar-container">
            <div
              className="progress-segment progress-delivered"
              style={{ width: `${(stats.delivered / stats.totalPromises) * 100}%` }}
            />
            <div
              className="progress-segment progress-partial"
              style={{ width: `${(stats.partial / stats.totalPromises) * 100}%` }}
            />
            <div
              className="progress-segment progress-not-delivered"
              style={{ width: `${(stats.notDelivered / stats.totalPromises) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 font-sans text-xs text-[#6b7c8f]">
            <span>{stats.totalPromises} promises tracked</span>
            <span>{stats.delivered} delivered</span>
          </div>
        </div>
      )}
    </Link>
  )
}
