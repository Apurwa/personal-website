import { TopicCard } from './components/TopicCard'
import { SourceFooter } from './components/SourceFooter'

const topics = [
  {
    title: 'Union Budget',
    description: 'Where does the government get money from? Where does it spend? Explore India\'s ₹48 lakh crore annual budget.',
    href: '/india-economy/budget',
  },
  {
    title: 'RBI & Monetary Policy',
    description: 'How does RBI control inflation and interest rates? Learn about repo rate, CRR, and how they affect your daily life.',
    href: '/india-economy/rbi',
  },
  {
    title: 'GDP & Growth',
    description: 'What is GDP? How fast is India growing? Track the economic growth story over the decades.',
    href: '/india-economy/gdp',
    comingSoon: true,
  },
  {
    title: 'Inflation & Prices',
    description: 'Why do prices keep rising? How is inflation measured? Understand what affects your purchasing power.',
    href: '/india-economy/inflation',
    comingSoon: true,
  },
]

export default function IndiaEconomyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <header className="text-center mb-20">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#b85c38] mb-4 animate-fade-in">
          An Educational Series
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1a2e44] mb-6 leading-tight animate-fade-in-up delay-1">
          Understanding India&apos;s Economy
        </h1>
        <div className="w-24 h-0.5 bg-[#b85c38] mx-auto mb-6 animate-draw-line delay-2" />
        <p className="font-sans text-[#4a5568] text-lg max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-3">
          Learn how India&apos;s economy works through simple explanations,
          real data, and easy-to-understand examples. Written for everyone —
          from students to curious adults.
        </p>
      </header>

      {/* Topic Cards Grid */}
      <section aria-label="Topics">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {topics.map((topic, index) => (
            <TopicCard
              key={topic.title}
              title={topic.title}
              description={topic.description}
              href={topic.href}
              comingSoon={topic.comingSoon}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Trust indicators */}
      <aside className="mt-20 pt-8 border-t border-[#e5e0d8] text-center animate-fade-in delay-7">
        <p className="font-sans text-[#6b7c8f] text-sm mb-4">
          All data sourced from official government publications
        </p>
        <div className="flex flex-wrap justify-center gap-6 font-sans text-sm text-[#6b7c8f]">
          <span className="flex items-center gap-2 group cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b85c38] transition-transform group-hover:scale-150" aria-hidden="true" />
            Ministry of Finance
          </span>
          <span className="flex items-center gap-2 group cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a6fa5] transition-transform group-hover:scale-150" aria-hidden="true" />
            Reserve Bank of India
          </span>
        </div>
      </aside>

      {/* Data Sources */}
      <div className="animate-fade-in delay-8">
        <SourceFooter
          sourceIds={[
            'union-budget-2024-25',
            'rbi-monetary-policy',
            'india-budget-historical'
          ]}
        />
      </div>
    </main>
  )
}
