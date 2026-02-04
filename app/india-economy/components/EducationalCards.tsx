'use client'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

// Main content card - subtle, paper-like
export function ContentCard({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white/60 border border-[#e5e0d8] rounded-sm p-6 animate-fade-in-up ${className}`}>
      {children}
    </div>
  )
}

// Margin note style callout - like a textbook annotation with asymmetric offset
export function MarginNote({ children, label = 'Note' }: { children: ReactNode; label?: string }) {
  return (
    <aside className="my-8 pl-5 border-l-2 border-[#b85c38] margin-note-offset animate-slide-in-left">
      <span className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#b85c38] mb-2">
        {label}
      </span>
      <p className="font-sans text-[15px] leading-relaxed text-[#4a5568]">{children}</p>
    </aside>
  )
}

// Key concept box - subtle highlight background
export function KeyConcept({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="my-8 bg-[#FFF8E7] border-l-4 border-[#d4a84b] px-6 py-5 animate-fade-in-up">
      {title && (
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-2">{title}</h4>
      )}
      <div className="font-sans text-[15px] leading-relaxed text-[#4a5568]">{children}</div>
    </div>
  )
}

// Definition - term with optional Hindi translation
export function Definition({
  term,
  hindi,
  children
}: {
  term: string
  hindi?: string
  children: ReactNode
}) {
  return (
    <dl className="my-6 font-sans animate-fade-in-up">
      <dt className="flex items-baseline gap-3 mb-2">
        <span className="font-serif text-lg font-semibold text-[#1a2e44]">{term}</span>
        {hindi && <span className="text-sm text-[#6b7c8f] italic">({hindi})</span>}
      </dt>
      <dd className="text-[15px] leading-relaxed text-[#4a5568] border-l-2 border-[#e5e0d8] pl-4">
        {children}
      </dd>
    </dl>
  )
}

// Stat display - for key numbers
export function StatDisplay({
  value,
  label,
  sublabel,
}: {
  value: string
  label: string
  sublabel?: string
}) {
  return (
    <div className="text-center py-4">
      <div className="font-serif text-3xl md:text-4xl font-bold text-[#1a2e44] stat-highlight">
        {value}
      </div>
      <div className="font-sans text-sm font-medium text-[#4a5568] mt-1">{label}</div>
      {sublabel && (
        <div className="font-sans text-xs text-[#6b7c8f] mt-0.5">{sublabel}</div>
      )}
    </div>
  )
}

// Section heading - clean, editorial with optional chapter number
export function SectionHeading({
  children,
  subtitle,
  chapter,
  id,
}: {
  children: ReactNode
  subtitle?: string
  chapter?: number | string
  id?: string
}) {
  return (
    <header id={id} className="mb-8 mt-16 first:mt-0 relative animate-fade-in-up scroll-mt-20">
      {chapter && (
        <span className="chapter-number font-serif">{chapter}</span>
      )}
      <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#1a2e44] leading-tight relative z-10">
        {children}
      </h2>
      {subtitle && (
        <p className="font-sans text-[15px] text-[#6b7c8f] mt-2">{subtitle}</p>
      )}
      <div className="w-12 h-0.5 bg-[#b85c38]/40 mt-4 animate-draw-line" />
    </header>
  )
}

// Chapter marker - for major sections
export function ChapterMarker({ number, title }: { number: string | number; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-6 mt-16 first:mt-0 border-b border-[#e5e0d8] pb-4 animate-fade-in-up">
      <span className="font-serif text-5xl font-bold text-[#b85c38]/30">{number}</span>
      <h2 className="font-serif text-2xl font-semibold text-[#1a2e44]">{title}</h2>
    </div>
  )
}

// Simple blockquote style with offset
export function Pullquote({ children, attribution }: { children: ReactNode; attribution?: string }) {
  return (
    <blockquote className="my-10 px-6 py-4 border-y border-[#e5e0d8] pull-quote-offset animate-fade-in-up">
      <p className="font-serif text-xl md:text-2xl text-[#1a2e44] leading-relaxed italic">
        &ldquo;{children}&rdquo;
      </p>
      {attribution && (
        <cite className="block font-sans text-sm text-[#6b7c8f] mt-3 not-italic">
          — {attribution}
        </cite>
      )}
    </blockquote>
  )
}

// Data table with clean styling
export function DataTable({ children, className = '' }: CardProps) {
  return (
    <div className={`overflow-x-auto my-6 animate-fade-in-up ${className}`}>
      <table className="w-full font-sans text-sm border-collapse">
        {children}
      </table>
    </div>
  )
}

export function TableHead({ children }: { children: ReactNode }) {
  return (
    <thead>
      <tr className="border-b-2 border-[#1a2e44]">
        {children}
      </tr>
    </thead>
  )
}

export function TableHeader({ children, className = '' }: CardProps) {
  return (
    <th className={`text-left py-3 pr-4 font-semibold text-[#1a2e44] ${className}`}>
      {children}
    </th>
  )
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>
}

export function TableRow({ children }: { children: ReactNode }) {
  return (
    <tr className="border-b border-[#e5e0d8] transition-colors hover:bg-white/50">
      {children}
    </tr>
  )
}

export function TableCell({ children, className = '' }: CardProps) {
  return (
    <td className={`py-3 pr-4 text-[#4a5568] ${className}`}>
      {children}
    </td>
  )
}
