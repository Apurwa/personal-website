import Link from 'next/link'
import { Concern, CONCERN_LABELS } from '../data/types'

interface ConcernTagProps {
  concern: Concern
  active?: boolean
  clickable?: boolean
}

export function ConcernTag({ concern, active = false, clickable = true }: ConcernTagProps) {
  const className = `concern-tag ${active ? 'active' : ''}`

  if (clickable) {
    return (
      <Link href={`/neta-track/issues/${concern}`} className={className}>
        {CONCERN_LABELS[concern]}
      </Link>
    )
  }

  return (
    <span className={className}>
      {CONCERN_LABELS[concern]}
    </span>
  )
}

interface ConcernTagListProps {
  concerns: Concern[]
  activeConcern?: Concern
  clickable?: boolean
}

export function ConcernTagList({ concerns, activeConcern, clickable = true }: ConcernTagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {concerns.map((concern) => (
        <ConcernTag
          key={concern}
          concern={concern}
          active={concern === activeConcern}
          clickable={clickable}
        />
      ))}
    </div>
  )
}
