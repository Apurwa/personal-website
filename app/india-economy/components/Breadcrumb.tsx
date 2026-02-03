'use client'

import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 animate-slide-in-left">
      <ol className="flex items-center gap-2 font-sans text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-[#d4cfc4]" aria-hidden="true">/</span>
              )}
              {isLast || !item.href ? (
                <span className="text-[#1a2e44] font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[#4a6fa5] hover:text-[#b85c38] transition-colors link-animated"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
