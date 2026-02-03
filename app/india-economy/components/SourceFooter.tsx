import { getSourceById } from '../data'

interface SourceFooterProps {
  sourceIds: string[]
}

export function SourceFooter({ sourceIds }: SourceFooterProps) {
  const sources = sourceIds
    .map((id) => getSourceById(id))
    .filter((source): source is NonNullable<typeof source> => source !== undefined)

  if (sources.length === 0) {
    return null
  }

  return (
    <footer className="mt-12 pt-6 border-t border-[#e5e0d8]">
      <div className="font-sans text-sm text-[#6b7c8f]">
        <span className="font-semibold text-[#1a2e44] uppercase tracking-wider text-xs">Sources</span>
        <ul className="mt-3 space-y-2">
          {sources.map((source) => (
            <li key={source.id} className="flex flex-wrap items-baseline gap-x-2">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4a6fa5] hover:text-[#b85c38] transition-colors link-animated"
              >
                {source.title}
              </a>
              <span className="text-[#d4cfc4]">/</span>
              <span>{source.publisher}</span>
              {source.accessedDate && (
                <>
                  <span className="text-[#d4cfc4]">/</span>
                  <span className="text-[#9ca3af]">Accessed {source.accessedDate}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
