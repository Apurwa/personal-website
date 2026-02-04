'use client'

import { useState } from 'react'

export interface TOCItem {
  id: string
  title: string
  chapter?: number | string
}

interface TableOfContentsProps {
  items: TOCItem[]
  title?: string
}

/**
 * Inline Table of Contents component for educational pages.
 * Matches the "Thoughtful Textbook" theme with clean typography.
 */
export function TableOfContents({ items, title = 'In this section' }: TableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav className="mb-12 animate-fade-in-up" aria-label="Table of contents">
      {/* Header with toggle for mobile */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full md:cursor-default group"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#6b7c8f]">
            {title}
          </span>
          <span className="hidden md:block w-16 h-px bg-[#e5e0d8]" aria-hidden="true" />
        </div>

        {/* Mobile toggle indicator */}
        <span className="md:hidden text-[#6b7c8f] transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* TOC Items */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0 md:max-h-[500px] md:opacity-100 md:mt-4'
        }`}
      >
        <ol className="space-y-2 border-l-2 border-[#e5e0d8] pl-4">
          {items.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className="group flex items-baseline gap-3 py-1 text-[15px] text-[#4a5568] hover:text-[#1a2e44] transition-colors"
              >
                <span className="font-sans text-xs text-[#b85c38] font-medium w-4 flex-shrink-0">
                  {item.chapter ?? index + 1}.
                </span>
                <span className="group-hover:text-[#b85c38] transition-colors">
                  {item.title}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
