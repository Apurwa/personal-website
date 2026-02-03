'use client'

import Link from 'next/link'

interface TopicCardProps {
  title: string
  description: string
  href: string
  comingSoon?: boolean
  index?: number
}

export function TopicCard({ title, description, href, comingSoon, index = 0 }: TopicCardProps) {
  const delayClass = `delay-${Math.min(index + 2, 8)}`

  const content = (
    <article
      className={`
        group relative p-8 border transition-all duration-300
        animate-fade-in-up ${delayClass}
        ${comingSoon
          ? 'border-[#e5e0d8] bg-[#FAF7F2] opacity-60 cursor-not-allowed'
          : 'border-[#e5e0d8] bg-white/40 hover-lift card-border-animate cursor-pointer hover:border-[#b85c38]/50 hover:bg-white/70'
        }
      `}
    >
      {comingSoon && (
        <span className="absolute top-4 right-4 text-[10px] font-sans font-semibold uppercase tracking-wider text-[#6b7c8f]">
          Coming Soon
        </span>
      )}

      <h3 className={`font-serif text-xl font-semibold mb-3 transition-colors duration-300 ${comingSoon ? 'text-[#6b7c8f]' : 'text-[#1a2e44] group-hover:text-[#b85c38]'}`}>
        {title}
      </h3>

      <p className={`font-sans text-[15px] leading-relaxed ${comingSoon ? 'text-[#a0aab4]' : 'text-[#4a5568]'}`}>
        {description}
      </p>

      {!comingSoon && (
        <span className="inline-flex items-center gap-2 mt-4 font-sans text-sm font-medium text-[#4a6fa5] group-hover:text-[#b85c38] transition-colors duration-300">
          Read more
          <svg
            className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      )}
    </article>
  )

  if (comingSoon) {
    return content
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  )
}
