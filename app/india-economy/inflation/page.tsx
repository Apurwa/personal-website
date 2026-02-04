import { Metadata } from 'next'
import { Breadcrumb } from '../components/Breadcrumb'
import { SourceFooter } from '../components/SourceFooter'
import { PageTOC } from '../components/PageTOC'
import {
  ContentCard,
  MarginNote,
  KeyConcept,
  Definition,
  StatDisplay,
  SectionHeading,
  DataTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '../components/EducationalCards'
import { getInflationData } from '../data'
import Link from 'next/link'
import { ScrollReveal } from '../components/ScrollReveal'
import { CountUpStat } from '../components/CountUpStat'

export const metadata: Metadata = {
  title: 'Inflation & Prices in India Explained',
  description: 'Why do prices rise? Learn about CPI inflation, WPI, food inflation, and RBI\'s 4% inflation target. Understand onion prices, petrol prices, and what causes inflation in India.',
  keywords: ['inflation India', 'CPI inflation', 'WPI inflation', 'food inflation India', 'RBI inflation target', 'consumer price index', 'why prices rise', 'onion price spike'],
  alternates: {
    canonical: 'https://apurwasarwajit.com/india-economy/inflation',
  },
  openGraph: {
    title: 'Inflation & Prices in India | India Economy',
    description: 'Why do onions cost ₹200 sometimes? Learn how inflation is measured (CPI, WPI) and why RBI targets 4% inflation.',
    url: 'https://apurwasarwajit.com/india-economy/inflation',
  },
}

export default function InflationPage() {
  const inflation = getInflationData()
  const { currentData, rbiTarget, historicalAnnual, categoryWeights, foodSubCategories, notablePriceSpikes } = inflation

  // Find years with high inflation
  const highInflationYears = historicalAnnual.filter(y => y.cpiInflation > 6)

  const tocItems = [
    { id: 'current-rates', title: 'Current Inflation Rates' },
    { id: 'what-is-inflation', title: 'What is Inflation?', chapter: 1 },
    { id: 'how-measured', title: 'How is Inflation Measured?', chapter: 2 },
    { id: 'why-prices-rise', title: 'Why Do Prices Rise?', chapter: 3 },
    { id: 'price-spikes', title: 'Famous Price Spikes' },
    { id: 'inflation-history', title: 'Inflation History (2014-2024)', chapter: 4 },
    { id: 'rbi-targeting', title: "RBI's Inflation Targeting", chapter: 5 },
    { id: 'food-inflation', title: 'Food Inflation Breakdown' },
    { id: 'summary', title: 'Quick Summary' },
  ]

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'India Economy', href: '/india-economy' },
          { label: 'Inflation & Prices' },
        ]}
      />

      {/* Header */}
      <header className="mb-12">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#b85c38] mb-4">
          Price Stability
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a2e44] mb-4 leading-tight">
          Inflation & Prices
        </h1>
        <p className="font-sans text-[#4a5568] text-lg leading-relaxed">
          Why does a plate of samosa cost more than it did 10 years ago? Why do onion prices
          suddenly spike? Let&apos;s understand inflation — the silent force that affects
          everyone&apos;s wallet.
        </p>
      </header>

      {/* Sticky Page TOC */}
      <PageTOC items={tocItems} />

      {/* Current Inflation Dashboard */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="current-rates" subtitle={`Latest data: ${currentData.asOf}`}>
          Current Inflation Rates
        </SectionHeading>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 bg-white/40 border border-[#e5e0d8] p-6">
        <CountUpStat
          value={currentData.headlineInflation}
          suffix="%"
          decimals={1}
          label="Headline CPI"
          sublabel="Overall inflation"
        />
        <CountUpStat
          value={currentData.foodInflation}
          suffix="%"
          decimals={1}
          label="Food Inflation"
          sublabel="Biggest impact"
        />
        <CountUpStat
          value={currentData.coreInflation}
          suffix="%"
          decimals={1}
          label="Core Inflation"
          sublabel="Excluding food & fuel"
        />
        <CountUpStat
          value={rbiTarget.target}
          suffix="%"
          decimals={0}
          label="RBI Target"
          sublabel="± 2% band"
        />
      </div>

      <div className="mb-8 p-4 bg-[#FFF8E7] border-l-4 border-[#d4a84b]">
        <p className="text-sm text-[#4a5568]">
          <strong className="text-[#1a2e44]">RBI&apos;s job:</strong> Keep inflation between {rbiTarget.lowerBound}% and {rbiTarget.upperBound}%.
          Current inflation at {currentData.headlineInflation}% is {currentData.headlineInflation <= rbiTarget.upperBound ? 'within' : 'above'} the target band.
        </p>
      </div>

      {/* What is Inflation */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="what-is-inflation" chapter={1}>
          What is Inflation?
        </SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <Definition term="Inflation" hindi="मुद्रास्फीति">
          A general increase in prices and fall in the purchasing power of money.
          If inflation is 5%, something that cost ₹100 last year now costs ₹105.
        </Definition>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-8">
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">A simple example</h4>
          <div className="space-y-4 text-[#4a5568]">
            <p>
              Imagine you have ₹100 and a plate of chaat costs ₹50. You can buy 2 plates.
            </p>
            <p>
              After one year with 10% inflation, the same chaat costs ₹55.
              Now your ₹100 can only buy 1.8 plates.
            </p>
            <p className="font-medium text-[#1a2e44]">
              Your money didn&apos;t shrink, but its purchasing power did. That&apos;s inflation.
            </p>
          </div>
        </ContentCard>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-6">
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Is all inflation bad?</h4>
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-[#7a9e7e]">
              <p className="font-semibold text-[#1a2e44] mb-1">Moderate inflation (2-4%) is healthy</p>
              <p className="text-sm text-[#4a5568]">
                It encourages people to spend and invest rather than hoard money.
                Wages usually rise with inflation, so workers aren&apos;t hurt.
              </p>
            </div>
            <div className="pl-4 border-l-2 border-[#b85c38]">
              <p className="font-semibold text-[#1a2e44] mb-1">High inflation (above 6%) is harmful</p>
              <p className="text-sm text-[#4a5568]">
                Savings lose value, poor people suffer most, businesses can&apos;t plan.
                India targets 4% because it balances growth and price stability.
              </p>
            </div>
            <div className="pl-4 border-l-2 border-[#4a6fa5]">
              <p className="font-semibold text-[#1a2e44] mb-1">Deflation (negative inflation) is also bad</p>
              <p className="text-sm text-[#4a5568]">
                Falling prices sound good, but they make people delay purchases
                (&quot;why buy today if it&apos;s cheaper tomorrow?&quot;), hurting businesses.
              </p>
            </div>
          </div>
        </ContentCard>
      </ScrollReveal>

      {/* How is Inflation Measured */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="how-measured" chapter={2} subtitle="CPI, WPI, and the basket of goods">
          How is Inflation Measured?
        </SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <Definition term="Consumer Price Index (CPI)" hindi="उपभोक्ता मूल्य सूचकांक">
          Measures the average change in prices paid by consumers for a fixed basket of goods
          and services. This is the main inflation measure in India since 2014.
        </Definition>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-6">
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">The CPI Basket</h4>
          <p className="text-[#4a5568] mb-4">
            Imagine a shopping cart with everything an average Indian family buys. The government
            tracks prices of 299 items across {categoryWeights.categories.length} major categories:
          </p>
          <div className="space-y-3">
            {categoryWeights.categories.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="font-medium text-[#1a2e44]">{cat.name}</span>
                    <span className="text-sm text-[#6b7c8f] ml-2">({cat.hindi})</span>
                  </div>
                  <span className="font-serif font-bold text-[#1a2e44]">{cat.weight}%</span>
                </div>
                <div className="h-2 bg-[#e5e0d8]/50 rounded-sm overflow-hidden mb-1">
                  <div
                    className="h-full rounded-sm bg-[#4a6fa5]"
                    style={{ width: `${cat.weight * 2}%` }}
                  />
                </div>
                <p className="text-xs text-[#6b7c8f]">{cat.examples}</p>
              </div>
            ))}
          </div>
        </ContentCard>
      </ScrollReveal>

      <ScrollReveal animation="slide-left">
        <MarginNote label="Key insight">
          Food is almost half (46%) of the CPI basket. This is why vegetable price spikes
          have such a big impact on headline inflation — and why the government monitors
          onion and tomato prices so closely!
        </MarginNote>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-6">
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">CPI vs WPI</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[#1a2e44]">
                  <th className="text-left py-3 pr-4 font-semibold text-[#1a2e44]">Aspect</th>
                  <th className="text-left py-3 pr-4 font-semibold text-[#1a2e44]">CPI</th>
                  <th className="text-left py-3 font-semibold text-[#1a2e44]">WPI</th>
                </tr>
              </thead>
              <tbody className="text-[#4a5568]">
                <tr className="border-b border-[#e5e0d8]">
                  <td className="py-3 pr-4 font-medium">Full Form</td>
                  <td className="py-3 pr-4">Consumer Price Index</td>
                  <td className="py-3">Wholesale Price Index</td>
                </tr>
                <tr className="border-b border-[#e5e0d8]">
                  <td className="py-3 pr-4 font-medium">Measures</td>
                  <td className="py-3 pr-4">Retail prices (what you pay)</td>
                  <td className="py-3">Wholesale prices (bulk trading)</td>
                </tr>
                <tr className="border-b border-[#e5e0d8]">
                  <td className="py-3 pr-4 font-medium">Includes Services?</td>
                  <td className="py-3 pr-4">Yes (housing, education)</td>
                  <td className="py-3">No (only goods)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Used for</td>
                  <td className="py-3 pr-4">RBI policy, inflation targeting</td>
                  <td className="py-3">Early warning indicator</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ContentCard>
      </ScrollReveal>

      {/* Why Prices Rise */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="why-prices-rise" chapter={3} subtitle="Demand-pull vs Cost-push">
          Why Do Prices Rise?
        </SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-6">
          <div className="space-y-6">
            <div>
              <h4 className="font-serif font-semibold text-[#1a2e44] mb-2">Demand-Pull Inflation</h4>
              <p className="text-[#4a5568] mb-2">
                &quot;Too much money chasing too few goods&quot;
              </p>
              <div className="bg-[#e5e0d8]/30 p-4 rounded-sm text-sm text-[#4a5568]">
                <strong>Example:</strong> During Diwali, everyone wants to buy gold and sweets.
                Demand shoots up, but supply is the same. So prices rise.
              </div>
            </div>
            <div>
              <h4 className="font-serif font-semibold text-[#1a2e44] mb-2">Cost-Push Inflation</h4>
              <p className="text-[#4a5568] mb-2">
                &quot;It costs more to produce, so prices go up&quot;
              </p>
              <div className="bg-[#e5e0d8]/30 p-4 rounded-sm text-sm text-[#4a5568]">
                <strong>Example:</strong> When crude oil prices rise globally, petrol becomes expensive.
                This increases transport costs for everything, pushing up all prices.
              </div>
            </div>
          </div>
        </ContentCard>
      </ScrollReveal>

      {/* Notable Price Spikes */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="price-spikes" subtitle="When prices made headlines">
          Famous Price Spikes
        </SectionHeading>
      </ScrollReveal>

      <div className="space-y-4 mb-8">
        {notablePriceSpikes.map((spike, index) => (
          <ScrollReveal key={spike.item} animation="fade-up" delay={index}>
            <ContentCard className="!p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-serif font-bold text-[#1a2e44]">{spike.item}</span>
                    <span className="text-sm text-[#6b7c8f]">({spike.year})</span>
                  </div>
                  <p className="text-sm text-[#4a5568]">{spike.cause}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-[#6b7c8f]">Normal</div>
                    <div className="font-medium text-[#1a2e44]">{spike.normal}</div>
                  </div>
                  <div className="text-[#b85c38] text-xl">→</div>
                  <div className="text-center">
                    <div className="text-[#6b7c8f]">Peak</div>
                    <div className="font-bold text-[#b85c38]">{spike.peak}</div>
                  </div>
                </div>
              </div>
            </ContentCard>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal animation="slide-left">
        <MarginNote label="Onion politics">
          Onion prices have toppled governments in India! In 1998 and 2010, high onion prices
          were blamed for ruling parties losing elections. That&apos;s why onion prices get
          so much political attention.
        </MarginNote>
      </ScrollReveal>

      {/* Historical Inflation */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="inflation-history" chapter={4} subtitle="A decade of price changes">
          Inflation History (2014-2024)
        </SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-6">
          <div className="space-y-2">
            {historicalAnnual.map((year) => {
              const isAboveTarget = year.cpiInflation > rbiTarget.upperBound
              const isBelowTarget = year.cpiInflation < rbiTarget.lowerBound
              return (
                <div key={year.year} className="flex items-center gap-4">
                  <span className="w-20 font-sans text-sm text-[#6b7c8f]">{year.year}</span>
                  <div className="flex-1 h-5 bg-[#e5e0d8]/50 rounded-sm overflow-hidden relative">
                    {/* Target zone indicator */}
                    <div
                      className="absolute h-full bg-[#7a9e7e]/20"
                      style={{
                        left: `${rbiTarget.lowerBound * 10}%`,
                        width: `${(rbiTarget.upperBound - rbiTarget.lowerBound) * 10}%`
                      }}
                    />
                    {/* Target line */}
                    <div
                      className="absolute h-full w-0.5 bg-[#7a9e7e]"
                      style={{ left: `${rbiTarget.target * 10}%` }}
                    />
                    {/* Inflation bar */}
                    <div
                      className={`h-full rounded-sm ${isAboveTarget ? 'bg-[#b85c38]' : isBelowTarget ? 'bg-[#4a6fa5]' : 'bg-[#7a9e7e]'}`}
                      style={{ width: `${year.cpiInflation * 10}%` }}
                    />
                  </div>
                  <span className={`w-12 font-sans text-sm font-medium ${isAboveTarget ? 'text-[#b85c38]' : 'text-[#1a2e44]'}`}>
                    {year.cpiInflation}%
                  </span>
                </div>
              )
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-[#6b7c8f]">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-[#7a9e7e]/20 border border-[#7a9e7e]" />
              RBI target zone (2-6%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-[#b85c38]" />
              Above target
            </span>
          </div>
        </ContentCard>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <KeyConcept title="The COVID bump">
          Inflation spiked to 6.2% in 2020-21 due to supply chain disruptions, and 6.7% in 2022-23
          due to the Russia-Ukraine war. RBI raised the repo rate from 4% to 6.5% to bring it
          under control.
          <Link href="/india-economy/rbi" className="text-[#4a6fa5] hover:text-[#b85c38] ml-1 link-animated">
            Learn more about RBI&apos;s tools →
          </Link>
        </KeyConcept>
      </ScrollReveal>

      {/* RBI's Role */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="rbi-targeting" chapter={5} subtitle="How the central bank fights inflation">
          RBI&apos;s Inflation Targeting
        </SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-6">
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">The Framework</h4>
          <div className="bg-[#e5e0d8]/30 p-4 rounded-sm mb-4">
            <div className="flex items-center justify-center gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[#4a6fa5]">{rbiTarget.lowerBound}%</div>
                <div className="text-xs text-[#6b7c8f]">Floor</div>
              </div>
              <div className="text-[#6b7c8f]">←</div>
              <div>
                <div className="text-3xl font-bold text-[#7a9e7e]">{rbiTarget.target}%</div>
                <div className="text-xs text-[#6b7c8f]">Target</div>
              </div>
              <div className="text-[#6b7c8f]">→</div>
              <div>
                <div className="text-2xl font-bold text-[#b85c38]">{rbiTarget.upperBound}%</div>
                <div className="text-xs text-[#6b7c8f]">Ceiling</div>
              </div>
            </div>
          </div>
          <p className="text-[#4a5568] text-sm">
            Since {rbiTarget.effectiveSince}, RBI must keep inflation within the 2-6% band.
            If inflation stays outside this band for 3 quarters, RBI must explain why to the government.
          </p>
        </ContentCard>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-6">
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">How RBI Controls Inflation</h4>
          <div className="space-y-3 text-[#4a5568]">
            <div className="flex gap-3">
              <span className="text-[#b85c38] font-semibold">1.</span>
              <div>
                <strong className="text-[#1a2e44]">Raise Repo Rate</strong> — Makes borrowing expensive,
                people spend less, demand falls, prices cool down
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-[#b85c38] font-semibold">2.</span>
              <div>
                <strong className="text-[#1a2e44]">Increase CRR</strong> — Banks have less money to lend,
                less money in circulation
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-[#b85c38] font-semibold">3.</span>
              <div>
                <strong className="text-[#1a2e44]">Open Market Operations</strong> — RBI sells government
                bonds to suck money out of the system
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#e5e0d8]">
            <Link
              href="/india-economy/rbi"
              className="text-[#4a6fa5] hover:text-[#b85c38] transition-colors link-animated text-sm font-medium"
            >
              Deep dive into RBI&apos;s monetary policy tools →
            </Link>
          </div>
        </ContentCard>
      </ScrollReveal>

      {/* Food Inflation Detail */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="food-inflation" subtitle="The biggest contributor to inflation">
          Food Inflation Breakdown
        </SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-6">
          <div className="space-y-3">
            {foodSubCategories.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between py-2 border-b border-[#e5e0d8] last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-[#4a5568]">{cat.name}</span>
                  {cat.volatile && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#b85c38] bg-[#b85c38]/10 px-1.5 py-0.5 rounded">
                      Volatile
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[#6b7c8f]">{cat.weight}% of CPI</span>
                  <span className={`font-medium ${cat.recentInflation > 10 ? 'text-[#b85c38]' : cat.recentInflation < 0 ? 'text-[#7a9e7e]' : 'text-[#1a2e44]'}`}>
                    {cat.recentInflation > 0 ? '+' : ''}{cat.recentInflation}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ContentCard>
      </ScrollReveal>

      <ScrollReveal animation="slide-left">
        <MarginNote label="Why vegetables matter">
          Vegetables have only 6% weight in CPI, but their prices can swing 50-100% in weeks.
          A tomato crisis can add 1% to headline inflation overnight — that&apos;s why food
          inflation gets so much attention.
        </MarginNote>
      </ScrollReveal>

      {/* Summary */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="summary">Quick Summary</SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard>
          <ul className="space-y-3 text-[#4a5568]">
            <li className="flex gap-3">
              <span className="text-[#b85c38] font-semibold">1.</span>
              <span><strong className="text-[#1a2e44]">Inflation</strong> means rising prices — your money buys less over time</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#b85c38] font-semibold">2.</span>
              <span><strong className="text-[#1a2e44]">CPI</strong> measures inflation using a basket of 299 items weighted by spending patterns</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#b85c38] font-semibold">3.</span>
              <span><strong className="text-[#1a2e44]">Food</strong> (46% of CPI) is the biggest driver — vegetable prices especially volatile</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#b85c38] font-semibold">4.</span>
              <span>RBI targets <strong className="text-[#1a2e44]">4% inflation</strong> (± 2% band) using repo rate and other tools</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#b85c38] font-semibold">5.</span>
              <span>Current inflation is <strong className="text-[#1a2e44]">{currentData.headlineInflation}%</strong> — {currentData.headlineInflation <= rbiTarget.upperBound ? 'within' : 'above'} the target band</span>
            </li>
          </ul>
        </ContentCard>
      </ScrollReveal>

      {/* Source Attribution */}
      <SourceFooter sourceIds={['mospi-cpi', 'rbi-inflation-data']} />
    </main>
  )
}
