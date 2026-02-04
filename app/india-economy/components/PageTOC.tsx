'use client'

import { TOCItem } from './TableOfContents'
import { StickyTableOfContents } from './StickyTableOfContents'
import { MobileTOCDrawer } from './MobileTOCDrawer'

interface PageTOCProps {
  /** Array of TOC items with id and title */
  items: TOCItem[]
  /** Optional title for the TOC header */
  title?: string
}

/**
 * Sticky Table of Contents wrapper for India Economy pages.
 * - Desktop (≥1280px): Fixed left sidebar with scroll spy
 * - Mobile (<1280px): Floating button + bottom sheet drawer
 *
 * Usage:
 * ```tsx
 * const tocItems = [
 *   { id: 'intro', title: 'Introduction' },
 *   { id: 'details', title: 'Details' },
 * ]
 *
 * <PageTOC items={tocItems} />
 * ```
 */
export function PageTOC({ items, title }: PageTOCProps) {
  return (
    <>
      <StickyTableOfContents items={items} title={title} />
      <MobileTOCDrawer items={items} title={title} />
    </>
  )
}
