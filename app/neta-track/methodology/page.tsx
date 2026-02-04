import Link from 'next/link'
import { Metadata } from 'next'
import { StatusBadge } from '../components/StatusBadge'
import { PromiseStatus } from '../data/types'

export const metadata: Metadata = {
  title: 'Methodology',
  description: 'How we track and classify political promises. Our sources, criteria, and commitment to neutrality.',
}

const statusDefinitions: { status: PromiseStatus; definition: string; criteria: string[] }[] = [
  {
    status: 'delivered',
    definition: 'The promise has been fully implemented as stated.',
    criteria: [
      'Policy/scheme officially launched and operational',
      'Target metrics achieved (if specified in promise)',
      'Verified through government data or official announcements',
    ],
  },
  {
    status: 'partial',
    definition: 'The promise has been partially implemented or implementation is incomplete.',
    criteria: [
      'Scheme launched but target not fully met',
      'Implementation in some states/regions but not nationwide',
      'Modified version of the original promise delivered',
    ],
  },
  {
    status: 'in-progress',
    definition: 'Active work is being done toward fulfilling this promise.',
    criteria: [
      'Legislation passed or bill introduced',
      'Budget allocated and implementation started',
      'Official timeline announced with visible progress',
    ],
  },
  {
    status: 'not-delivered',
    definition: 'The promise has not been fulfilled and no significant progress made.',
    criteria: [
      'No policy action taken',
      'Promise explicitly abandoned or contradicted',
      'Timeline expired with no implementation',
    ],
  },
  {
    status: 'not-verifiable',
    definition: 'Insufficient data exists to determine the status of this promise.',
    criteria: [
      'Promise too vague to measure',
      'No reliable data sources available',
      'Conflicting information from sources',
    ],
  },
]

export default function MethodologyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 animate-fade-in">
        <ol className="flex items-center gap-2 font-sans text-sm text-[#6b7c8f]">
          <li>
            <Link href="/neta-track" className="hover:text-[#4a6fa5]">
              Neta Track
            </Link>
          </li>
          <li>/</li>
          <li className="text-[#1a2e44]">Methodology</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a2e44] mb-4 animate-fade-in-up">
          Our Methodology
        </h1>
        <p className="font-sans text-lg text-[#4a5568] animate-fade-in-up delay-1">
          Transparency is fundamental to our mission. Here&apos;s exactly how we
          track, verify, and classify political promises.
        </p>
      </header>

      {/* Principles */}
      <section className="mb-12 animate-fade-in-up delay-2">
        <h2 className="font-serif text-2xl font-semibold text-[#1a2e44] mb-4">
          Guiding Principles
        </h2>
        <div className="space-y-4 font-sans text-[#4a5568]">
          <div className="bg-white border border-[#e5e0d8] rounded-lg p-4">
            <h3 className="font-semibold text-[#1a2e44] mb-1">Neutrality</h3>
            <p>
              We apply the same standards to all parties. Our classifications are
              based solely on evidence, not political preference.
            </p>
          </div>
          <div className="bg-white border border-[#e5e0d8] rounded-lg p-4">
            <h3 className="font-semibold text-[#1a2e44] mb-1">Verifiability</h3>
            <p>
              Every status classification includes links to sources. You can
              verify our conclusions yourself.
            </p>
          </div>
          <div className="bg-white border border-[#e5e0d8] rounded-lg p-4">
            <h3 className="font-semibold text-[#1a2e44] mb-1">No Interpretation</h3>
            <p>
              We report what happened, not why. We don&apos;t assign blame or credit
              beyond stating whether a promise was delivered.
            </p>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="mb-12 animate-fade-in-up delay-3">
        <h2 className="font-serif text-2xl font-semibold text-[#1a2e44] mb-4">
          Our Sources
        </h2>
        <div className="font-sans text-[#4a5568] space-y-4">
          <div>
            <h3 className="font-semibold text-[#1a2e44] mb-2">Official Sources (Primary)</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Party manifestos (direct PDF downloads)</li>
              <li>Government scheme dashboards and portals</li>
              <li>Parliament records (Lok Sabha, Rajya Sabha)</li>
              <li>Election Commission of India</li>
              <li>Ministry press releases and annual reports</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#1a2e44] mb-2">Research Organizations (Secondary)</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>PRS Legislative Research</li>
              <li>Association for Democratic Reforms (ADR)</li>
              <li>Factly</li>
              <li>IndiaSpend</li>
              <li>FactChecker.in</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Status Definitions */}
      <section className="mb-12 animate-fade-in-up delay-4">
        <h2 className="font-serif text-2xl font-semibold text-[#1a2e44] mb-6">
          Status Classifications
        </h2>
        <div className="space-y-6">
          {statusDefinitions.map(({ status, definition, criteria }) => (
            <div key={status} className="bg-white border border-[#e5e0d8] rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <StatusBadge status={status} />
              </div>
              <p className="font-sans text-[#4a5568] mb-3">{definition}</p>
              <div>
                <span className="font-sans text-sm font-medium text-[#6b7c8f] uppercase tracking-wide">
                  Criteria:
                </span>
                <ul className="mt-2 font-sans text-sm text-[#4a5568] space-y-1">
                  {criteria.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#b85c38] mt-1">•</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Limitations */}
      <section className="mb-12 animate-fade-in-up delay-5">
        <h2 className="font-serif text-2xl font-semibold text-[#1a2e44] mb-4">
          Limitations
        </h2>
        <div className="methodology-callout">
          <ul className="font-sans text-[#4a5568] space-y-2">
            <li>
              <strong>Not exhaustive:</strong> We track major, verifiable promises,
              not every statement in a manifesto.
            </li>
            <li>
              <strong>Point-in-time:</strong> Statuses reflect our assessment at
              the time of last update. Situations may change.
            </li>
            <li>
              <strong>Measurement challenges:</strong> Some promises are inherently
              difficult to measure (e.g., &quot;improve governance&quot;).
            </li>
            <li>
              <strong>Data availability:</strong> Government data isn&apos;t always
              current or complete.
            </li>
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="animate-fade-in-up delay-6">
        <h2 className="font-serif text-2xl font-semibold text-[#1a2e44] mb-4">
          Report an Error
        </h2>
        <p className="font-sans text-[#4a5568]">
          If you believe we&apos;ve made an error in classifying a promise, please
          reach out with evidence. We&apos;re committed to accuracy and will
          update our records if warranted.
        </p>
      </section>

      {/* Back link */}
      <div className="mt-12 pt-8 border-t border-[#e5e0d8]">
        <Link
          href="/neta-track"
          className="font-sans text-sm text-[#4a6fa5] link-animated inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Neta Track
        </Link>
      </div>
    </main>
  )
}
