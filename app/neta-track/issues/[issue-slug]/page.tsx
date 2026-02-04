import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { getConcernDetails, getPromisesByConcernWithParty, getAllConcerns } from '../../lib/promises'
import { PromiseCard } from '../../components/PromiseCard'
import { ConcernTag } from '../../components/ConcernTag'
import { SECTOR_LABELS, Concern } from '../../data/types'

interface PageProps {
  params: Promise<{ 'issue-slug': string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { 'issue-slug': slug } = await params
  const details = getConcernDetails(slug)

  if (!details) {
    return { title: 'Issue Not Found' }
  }

  return {
    title: `${details.label} - Political Promises`,
    description: `Track political promises related to ${details.label.toLowerCase()}. ${details.description}`,
  }
}

export default async function IssuePage({ params }: PageProps) {
  const { 'issue-slug': slug } = await params
  const details = getConcernDetails(slug)

  if (!details) {
    notFound()
  }

  const promises = getPromisesByConcernWithParty(slug)
  const allConcerns = getAllConcerns()
  const otherConcerns = allConcerns
    .filter((c) => c.concern !== slug && c.promiseCount > 0)
    .slice(0, 5)

  // Group promises by status for summary
  const statusCounts = {
    delivered: promises.filter((p) => p.status === 'delivered').length,
    partial: promises.filter((p) => p.status === 'partial').length,
    notDelivered: promises.filter((p) => p.status === 'not-delivered').length,
    inProgress: promises.filter((p) => p.status === 'in-progress').length,
  }

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
          <li>
            <Link href="/neta-track/issues" className="hover:text-[#4a6fa5]">
              Issues
            </Link>
          </li>
          <li>/</li>
          <li className="text-[#1a2e44]">{details.label}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a2e44] mb-4 animate-fade-in-up">
          {details.label}
        </h1>
        <p className="font-sans text-lg text-[#4a5568] mb-4 animate-fade-in-up delay-1">
          {details.description}
        </p>
        <div className="flex flex-wrap gap-2 animate-fade-in-up delay-2">
          <span className="font-sans text-sm text-[#6b7c8f]">Related sectors:</span>
          {details.sectors.map((sector) => (
            <span
              key={sector}
              className="font-sans text-sm text-[#4a6fa5] bg-[#FAF7F2] px-2 py-0.5 rounded"
            >
              {SECTOR_LABELS[sector as keyof typeof SECTOR_LABELS] || sector}
            </span>
          ))}
        </div>
      </header>

      {/* Summary Stats */}
      {promises.length > 0 && (
        <section className="mb-10 animate-fade-in-up delay-3">
          <div className="bg-white border border-[#e5e0d8] rounded-xl p-5">
            <h2 className="font-serif text-lg font-semibold text-[#1a2e44] mb-4">
              Summary across all parties
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="font-serif text-2xl font-bold text-[#7a9e7e]">
                  {statusCounts.delivered}
                </div>
                <div className="font-sans text-xs text-[#6b7c8f] uppercase tracking-wide">
                  Delivered
                </div>
              </div>
              <div className="text-center">
                <div className="font-serif text-2xl font-bold text-[#d4a84b]">
                  {statusCounts.partial}
                </div>
                <div className="font-sans text-xs text-[#6b7c8f] uppercase tracking-wide">
                  Partial
                </div>
              </div>
              <div className="text-center">
                <div className="font-serif text-2xl font-bold text-[#4a6fa5]">
                  {statusCounts.inProgress}
                </div>
                <div className="font-sans text-xs text-[#6b7c8f] uppercase tracking-wide">
                  In Progress
                </div>
              </div>
              <div className="text-center">
                <div className="font-serif text-2xl font-bold text-[#c45c4a]">
                  {statusCounts.notDelivered}
                </div>
                <div className="font-sans text-xs text-[#6b7c8f] uppercase tracking-wide">
                  Not Delivered
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Promises List */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl font-semibold text-[#1a2e44] mb-6 animate-fade-in-up delay-4">
          Promises ({promises.length})
        </h2>

        {promises.length === 0 ? (
          <div className="text-center py-12 bg-white border border-[#e5e0d8] rounded-xl animate-fade-in-up delay-4">
            <p className="font-sans text-[#6b7c8f] mb-2">
              No promises tracked yet for this issue.
            </p>
            <p className="font-sans text-sm text-[#6b7c8f]">
              We&apos;re actively adding more promise data. Check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {promises.map((promise, index) => (
              <div
                key={promise.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.4 + index * 0.05}s` }}
              >
                <PromiseCard
                  promise={promise}
                  showParty={true}
                  partyName={promise.partyName}
                  partyColor={promise.partyColor}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Other Issues */}
      {otherConcerns.length > 0 && (
        <section className="mb-12 animate-fade-in delay-6">
          <h2 className="font-serif text-xl font-semibold text-[#1a2e44] mb-4">
            Explore other issues
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherConcerns.map((item) => (
              <ConcernTag key={item.concern} concern={item.concern} />
            ))}
            <Link
              href="/neta-track/issues"
              className="concern-tag bg-transparent border border-[#e5e0d8]"
            >
              View all
            </Link>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="pt-8 border-t border-[#e5e0d8]">
        <Link
          href="/neta-track/issues"
          className="font-sans text-sm text-[#4a6fa5] link-animated inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all issues
        </Link>
      </div>
    </main>
  )
}
