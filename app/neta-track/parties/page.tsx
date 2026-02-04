import Link from 'next/link'
import { Metadata } from 'next'
import { PartyCard } from '../components/PartyCard'
import { getParties, getPartyStats } from '../lib/promises'

export const metadata: Metadata = {
  title: 'All Parties',
  description: 'Browse all political parties and their promise delivery records.',
}

export default function PartiesPage() {
  const parties = getParties()
  const partiesWithStats = parties.map((party) => ({
    party,
    stats: getPartyStats(party.slug, 2019),
  }))

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 animate-fade-in">
        <ol className="flex items-center gap-2 font-sans text-sm text-[#6b7c8f]">
          <li>
            <Link href="/neta-track" className="hover:text-[#4a6fa5]">
              Neta Track
            </Link>
          </li>
          <li>/</li>
          <li className="text-[#1a2e44]">Parties</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a2e44] mb-4 animate-fade-in-up">
          All Parties
        </h1>
        <p className="font-sans text-[#6b7c8f] animate-fade-in-up delay-1">
          Browse political parties and their 2019 Lok Sabha manifesto delivery records.
        </p>
      </header>

      {/* Party Grid */}
      <section>
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

      {/* Note */}
      <aside className="mt-12 methodology-callout animate-fade-in delay-6">
        <p className="font-sans text-sm text-[#4a5568]">
          We are actively tracking promises from major national parties.
          Promise data is being added progressively. If you&apos;d like to contribute
          or report an error, please reach out.
        </p>
      </aside>
    </main>
  )
}
