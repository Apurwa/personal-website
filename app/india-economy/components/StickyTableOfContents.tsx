'use client'

import { TOCItem } from './TableOfContents'
import { useScrollSpy } from '../hooks/useScrollSpy'

interface StickyTableOfContentsProps {
  items: TOCItem[]
  title?: string
}

/**
 * Desktop sticky sidebar Table of Contents.
 * Fixed positioned on the left side, highlights active section on scroll.
 * Only visible on xl breakpoint (1280px+).
 */
export function StickyTableOfContents({
  items,
  title = 'Contents'
}: StickyTableOfContentsProps) {
  const sectionIds = items.map((item) => item.id)
  const { activeId, scrollToSection } = useScrollSpy({ sectionIds })

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollToSection(id)
  }

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block fixed left-[max(1rem,calc(50%-40rem))] top-24 w-48 z-40"
    >
      <div className="sticky-toc">
        {/* Title */}
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#6b7c8f] mb-4">
          {title}
        </p>

        {/* TOC Items */}
        <ol className="space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto sticky-toc-scroll pr-2">
          {items.map((item, index) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`
                    block py-1.5 pl-3 text-sm border-l-2 transition-all duration-200
                    ${isActive
                      ? 'border-[#b85c38] text-[#1a2e44] font-medium bg-[#b85c38]/5'
                      : 'border-transparent text-[#6b7c8f] hover:text-[#1a2e44] hover:border-[#e5e0d8]'
                    }
                  `}
                  aria-current={isActive ? 'location' : undefined}
                >
                  <span className="line-clamp-2">
                    {item.chapter ?? index + 1}. {item.title}
                  </span>
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
