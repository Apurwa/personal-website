import Link from 'next/link'
import { PartyCard } from './components/PartyCard'
import { ConcernTagList } from './components/ConcernTag'
import { getParties, getPartyStats } from './lib/promises'
import { Concern } from './data/types'

const FEATURED_CONCERNS: Concern[] = [
  'jobs',
  'prices',
  'corruption',
  'development',
  'healthcare',
  'education',
  'farmers',
  'women',
]

export default function NetaTrackPage() {
  const parties = getParties()

  // Get stats for parties that have promise data
  const partiesWithStats = parties.map((party) => ({
    party,
    stats: getPartyStats(party.slug, 2019),
  }))

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <header className="text-center mb-16">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#b85c38] mb-4 animate-fade-in">
          A Citizen&apos;s Guide
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1a2e44] mb-6 leading-tight animate-fade-in-up delay-1">
          Neta Track
        </h1>
        <div className="w-24 h-0.5 bg-[#b85c38] mx-auto mb-6 animate-draw-line delay-2" />
        <p className="font-sans text-[#4a5568] text-lg max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-3">
          Track what political parties promised vs. what they delivered.
          Fact-based, neutral, with sources you can verify.
          Make informed voting decisions.
        </p>
      </header>

      {/* Browse by Concern */}
      <section className="mb-16 animate-fade-in-up delay-4">
        <h2 className="font-serif text-2xl font-semibold text-[#1a2e44] mb-4">
          What matters to you?
        </h2>
        <p className="font-sans text-[#6b7c8f] mb-6">
          Browse promises by the issues you care about
        </p>
        <ConcernTagList concerns={FEATURED_CONCERNS} />
      </section>

      {/* Party Cards */}
      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif text-2xl font-semibold text-[#1a2e44]">
            Party Report Cards
          </h2>
          <Link
            href="/neta-track/parties"
            className="font-sans text-sm text-[#4a6fa5] link-animated"
          >
            View all parties
          </Link>
        </div>
        <p className="font-sans text-[#6b7c8f] mb-6">
          2019 Lok Sabha manifesto promises tracked against delivery
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partiesWithStats.map(({ party, stats }, index) => (
            <PartyCard
              key={party.slug}
              party={party}
              stats={stats || undefined}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Methodology callout */}
      <section className="methodology-callout animate-fade-in delay-7">
        <h3 className="font-serif text-lg font-semibold text-[#1a2e44] mb-2">
          Our Methodology
        </h3>
        <p className="font-sans text-sm text-[#4a5568] mb-3">
          Every promise is verified against official government data, parliamentary
          records, and reputable third-party research. We classify promises as
          Delivered, Partially Delivered, Not Delivered, In Progress, or Not Verifiable.
        </p>
        <Link
          href="/neta-track/methodology"
          className="font-sans text-sm text-[#4a6fa5] link-animated inline-flex items-center gap-1"
        >
          Read our full methodology
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>

      {/* Trust indicators */}
      <aside className="mt-16 pt-8 border-t border-[#e5e0d8] text-center animate-fade-in delay-8">
        <p className="font-sans text-[#6b7c8f] text-sm mb-4">
          Data sourced from official records and verified research
        </p>
        <div className="flex flex-wrap justify-center gap-6 font-sans text-sm text-[#6b7c8f]">
          <span className="flex items-center gap-2 group cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b85c38] transition-transform group-hover:scale-150" />
            Election Commission
          </span>
          <span className="flex items-center gap-2 group cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a6fa5] transition-transform group-hover:scale-150" />
            PRS Legislative
          </span>
          <span className="flex items-center gap-2 group cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7a9e7e] transition-transform group-hover:scale-150" />
            ADR
          </span>
          <span className="flex items-center gap-2 group cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a84b] transition-transform group-hover:scale-150" />
            Party Manifestos
          </span>
        </div>
      </aside>

      {/* Disclaimer */}
      <footer className="mt-12 text-center">
        <p className="font-sans text-xs text-[#6b7c8f]">
          This is an independent, non-partisan project. We are not affiliated with
          any political party. Our goal is to help citizens make informed decisions.
        </p>
      </footer>
    </main>
  )
}
