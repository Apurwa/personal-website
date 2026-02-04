import { Promise, SECTOR_LABELS } from '../data/types'
import { StatusBadge } from './StatusBadge'
import { ConcernTagList } from './ConcernTag'

interface PromiseCardProps {
  promise: Promise
  showParty?: boolean
  partyName?: string
  partyColor?: string
}

export function PromiseCard({ promise, showParty = false, partyName, partyColor }: PromiseCardProps) {
  return (
    <article
      className="promise-card"
      style={showParty && partyColor ? { borderLeftWidth: '3px', borderLeftColor: partyColor } : undefined}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          {showParty && partyName && (
            <span className="font-sans text-xs font-medium text-[#6b7c8f] uppercase tracking-wide mb-1 block">
              {partyName} &middot; {promise.electionYear}
            </span>
          )}
          <h4 className="font-serif text-lg font-semibold text-[#1a2e44]">
            {promise.summary}
          </h4>
        </div>
        <StatusBadge status={promise.status} />
      </div>

      <p className="font-sans text-sm text-[#4a5568] mb-3 italic border-l-2 border-[#e5e0d8] pl-3">
        &ldquo;{promise.text}&rdquo;
      </p>

      <div className="font-sans text-sm text-[#4a5568] mb-4">
        <span className="font-medium text-[#1a2e44]">Status: </span>
        {promise.statusReason}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs">
        <span className="font-sans text-[#6b7c8f]">
          {SECTOR_LABELS[promise.sector]}
        </span>
        <span className="text-[#e5e0d8]">|</span>
        <ConcernTagList concerns={promise.concerns} clickable={false} />
      </div>

      {promise.evidence.length > 0 && (
        <div className="mt-4 pt-3 border-t border-[#e5e0d8]">
          <span className="font-sans text-xs font-medium text-[#6b7c8f] uppercase tracking-wide">
            Sources
          </span>
          <ul className="mt-1 space-y-1">
            {promise.evidence.map((ev, idx) => (
              <li key={idx}>
                <a
                  href={ev.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-[#4a6fa5] hover:underline"
                >
                  {ev.title}
                  <span className="text-[#6b7c8f] ml-1">
                    ({ev.type === 'government' ? 'Govt' : ev.type})
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
