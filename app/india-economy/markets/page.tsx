import { Metadata } from 'next'
import { Breadcrumb } from '../components/Breadcrumb'
import { SourceFooter } from '../components/SourceFooter'
import {
  SectionHeading,
  Definition,
  MarginNote,
  KeyConcept,
  StatDisplay,
  ContentCard,
  DataTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '../components/EducationalCards'
import { getMarketsData } from '../data'

export const metadata: Metadata = {
  title: 'Indian Stock Markets - Sensex, Nifty Explained',
  description: 'How do Sensex and Nifty work? Learn about BSE, NSE, IPOs, FIIs vs DIIs, SEBI regulations, and how India became the 4th largest stock market ($4.5 trillion market cap).',
  keywords: ['Sensex explained', 'Nifty 50', 'BSE NSE difference', 'Indian stock market', 'IPO process India', 'FII DII India', 'SEBI regulations', 'how to invest stocks India', 'demat account'],
  alternates: {
    canonical: 'https://apurwasarwajit.com/india-economy/markets',
  },
  openGraph: {
    title: 'Indian Stock Markets - Sensex, Nifty | India Economy',
    description: 'BSE, NSE, Sensex, Nifty explained. IPOs, FIIs, retail investors. India is now the 4th largest stock market globally.',
    url: 'https://apurwasarwajit.com/india-economy/markets',
  },
}

export default function MarketsPage() {
  const data = getMarketsData()

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'India Economy', href: '/india-economy' },
          { label: 'Stock Markets' },
        ]}
      />

      {/* Hero */}
      <header className="mt-8 mb-16">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#b85c38] mb-3 animate-fade-in">
          Capital Markets
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1a2e44] mb-4 leading-tight animate-fade-in-up delay-1">
          Stock Markets
        </h1>
        <p className="font-sans text-[#4a5568] text-lg leading-relaxed animate-fade-in-up delay-2">
          India&apos;s stock market is now the 4th largest in the world with ₹{data.overview.totalMarketCap} lakh crore
          market cap. From BSE (Asia&apos;s oldest exchange) to NSE (world&apos;s largest derivatives market),
          explore how millions of Indians invest.
        </p>
      </header>

      {/* Overview Stats */}
      <section className="mb-16 animate-fade-in-up delay-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatDisplay
            value={`$${data.overview.marketCapUsd}T`}
            label="Market Cap"
            sublabel={`#${data.overview.globalRank} globally`}
          />
          <StatDisplay
            value={data.overview.listedCompanies.toLocaleString('en-IN')}
            label="Listed Companies"
            sublabel="NSE + BSE"
          />
          <StatDisplay
            value={`${data.overview.retailInvestors} Cr`}
            label="Demat Accounts"
            sublabel="Individual investors"
          />
          <StatDisplay
            value={`${data.overview.marketCapToGdp}%`}
            label="Market Cap/GDP"
            sublabel="Market depth"
          />
        </div>
      </section>

      {/* What is Stock Market */}
      <section className="mb-16 animate-fade-in-up delay-4">
        <SectionHeading chapter={1}>
          What is the Stock Market?
        </SectionHeading>

        <Definition term="Stock Market" hindi="शेयर बाज़ार">
          A marketplace where shares (small ownership pieces) of companies are bought and sold.
          When you buy a company&apos;s share, you become a part-owner of that company and share
          in its profits and losses.
        </Definition>

        <MarginNote label="Did you know">
          If you had invested ₹10,000 in Sensex in 1979, it would be worth over ₹76 lakh today —
          a 760x return in 45 years.
        </MarginNote>

        <p className="font-sans text-[#4a5568] leading-relaxed mt-6">
          Companies list their shares on stock exchanges to raise money from the public.
          In return, investors get a chance to grow their wealth as the company grows.
          The two main exchanges in India are <strong>BSE</strong> and <strong>NSE</strong>.
        </p>
      </section>

      {/* Stock Exchanges */}
      <section className="mb-16">
        <SectionHeading chapter={2}>
          BSE vs NSE
        </SectionHeading>

        <p className="font-sans text-[#4a5568] leading-relaxed mb-8">
          India has two major stock exchanges. Most stocks are listed on both, but they have different strengths.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.exchanges.map((exchange) => (
            <ContentCard key={exchange.shortName}>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#4a6fa5] text-white font-serif font-bold rounded">
                  {exchange.shortName}
                </span>
                <span className="font-sans text-sm text-[#6b7c8f]">Est. {exchange.founded}</span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#1a2e44] mb-1">
                {exchange.name}
              </h3>
              <p className="font-sans text-xs text-[#6b7c8f] mb-4">{exchange.hindi}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="font-serif text-2xl font-bold text-[#b85c38]">
                    {exchange.listedCompanies.toLocaleString('en-IN')}
                  </p>
                  <p className="font-sans text-xs text-[#6b7c8f]">Listed Companies</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-[#4a6fa5]">
                    {exchange.tradingShare}%
                  </p>
                  <p className="font-sans text-xs text-[#6b7c8f]">Trading Volume</p>
                </div>
              </div>

              <p className="font-sans text-sm text-[#4a5568] mb-3">
                <strong>Flagship Index:</strong> {exchange.flagshipIndex}
              </p>

              <ul className="space-y-1">
                {exchange.highlights.map((highlight, i) => (
                  <li key={i} className="font-sans text-xs text-[#6b7c8f] flex items-start gap-2">
                    <span className="text-[#7a9e7e] mt-0.5">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </ContentCard>
          ))}
        </div>

        <KeyConcept title="Key Difference">
          NSE handles 93% of all trading volume due to better technology and lower costs.
          But BSE has more listed companies and its Sensex is the most quoted index in news.
        </KeyConcept>
      </section>

      {/* Sensex & Nifty */}
      <section className="mb-16">
        <SectionHeading chapter={3}>
          Sensex & Nifty Explained
        </SectionHeading>

        <Definition term="Stock Index" hindi="शेयर सूचकांक">
          A number that represents the overall value of a group of stocks. When the index goes up,
          it means most stocks in that group are doing well. It&apos;s like a &quot;health score&quot; for the market.
        </Definition>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {/* Sensex */}
          <ContentCard>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#1a2e44]">
                  {data.indices.sensex.fullName}
                </h3>
                <p className="font-sans text-xs text-[#6b7c8f]">{data.indices.sensex.hindi}</p>
              </div>
              <span className="px-2 py-1 bg-[#b85c38] text-white text-xs rounded">BSE</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-serif text-2xl font-bold text-[#1a2e44]">
                  {data.indices.sensex.currentValue.toLocaleString('en-IN')}
                </p>
                <p className="font-sans text-xs text-[#6b7c8f]">Current Value</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#7a9e7e]">
                  {data.indices.sensex.allTimeHigh.toLocaleString('en-IN')}
                </p>
                <p className="font-sans text-xs text-[#6b7c8f]">All-Time High</p>
              </div>
            </div>

            <p className="font-sans text-sm text-[#4a5568] mb-2">
              <strong>{data.indices.sensex.companies} companies</strong> | Base: {data.indices.sensex.baseValue} ({data.indices.sensex.baseYear})
            </p>
            <p className="font-sans text-xs text-[#6b7c8f]">
              {data.indices.sensex.meaning} — tracks the 30 largest and most traded companies
            </p>
          </ContentCard>

          {/* Nifty */}
          <ContentCard>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#1a2e44]">
                  {data.indices.nifty.fullName}
                </h3>
                <p className="font-sans text-xs text-[#6b7c8f]">{data.indices.nifty.hindi}</p>
              </div>
              <span className="px-2 py-1 bg-[#4a6fa5] text-white text-xs rounded">NSE</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-serif text-2xl font-bold text-[#1a2e44]">
                  {data.indices.nifty.currentValue.toLocaleString('en-IN')}
                </p>
                <p className="font-sans text-xs text-[#6b7c8f]">Current Value</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#7a9e7e]">
                  {data.indices.nifty.allTimeHigh.toLocaleString('en-IN')}
                </p>
                <p className="font-sans text-xs text-[#6b7c8f]">All-Time High</p>
              </div>
            </div>

            <p className="font-sans text-sm text-[#4a5568] mb-2">
              <strong>{data.indices.nifty.companies} companies</strong> | Base: {data.indices.nifty.baseValue} ({data.indices.nifty.baseYear})
            </p>
            <p className="font-sans text-xs text-[#6b7c8f]">
              {data.indices.nifty.meaning} — broader representation of the market
            </p>
          </ContentCard>
        </div>

        {/* Nifty Sector Weights */}
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Nifty 50 Sector Composition</h4>
        <div className="space-y-2 mb-8">
          {data.indices.nifty.sectorWeights?.map((sector) => (
            <div key={sector.sector} className="flex items-center gap-4">
              <span className="font-sans text-sm text-[#4a5568] w-32">{sector.sector}</span>
              <div className="flex-1 bg-[#f5f0eb] rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#4a6fa5] to-[#7a9e7e] rounded-full"
                  style={{ width: `${(sector.weight / 35) * 100}%` }}
                />
              </div>
              <span className="font-sans text-sm font-medium text-[#1a2e44] w-12 text-right">
                {sector.weight}%
              </span>
            </div>
          ))}
        </div>

        <MarginNote label="Top Holdings">
          Reliance Industries has the highest weight in both Sensex (~11%) and Nifty (~10%).
          HDFC Bank and ICICI Bank together make up ~15% of the indices.
        </MarginNote>
      </section>

      {/* Market History Timeline */}
      <section className="mb-16">
        <SectionHeading chapter={4}>
          Stock Market History
        </SectionHeading>

        <ContentCard>
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-6">Key Milestones</h4>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e5e0d8]" />
            <div className="space-y-6">
              {data.historicalMilestones.map((milestone) => (
                <div key={milestone.year} className="flex gap-4 relative">
                  <div className="w-8 h-8 rounded-full bg-[#4a6fa5] flex items-center justify-center text-white text-xs font-medium z-10 flex-shrink-0">
                    {milestone.year.slice(-2)}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-sans font-medium text-[#1a2e44]">{milestone.year}</span>
                      {milestone.sensex && (
                        <span className="px-2 py-0.5 bg-[#e8f4ea] text-[#2d5a3d] rounded text-xs">
                          Sensex: {milestone.sensex.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-sm text-[#4a5568] mt-1">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContentCard>
      </section>

      {/* SEBI */}
      <section className="mb-16">
        <SectionHeading chapter={5}>
          SEBI: The Market Regulator
        </SectionHeading>

        <Definition term="SEBI" hindi="सेबी">
          {data.sebi.fullName} — the watchdog of Indian capital markets.
          It protects investors, regulates stock exchanges, and ensures fair trading practices.
        </Definition>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          <StatDisplay
            value={data.sebi.established.toString()}
            label="Established"
            sublabel="As advisory body"
          />
          <StatDisplay
            value={data.sebi.statutoryPowers.toString()}
            label="Statutory Powers"
            sublabel="SEBI Act passed"
          />
          <StatDisplay
            value="Mumbai"
            label="Headquarters"
            sublabel="Maharashtra"
          />
          <StatDisplay
            value="1st"
            label="Woman Chair"
            sublabel="Madhabi Puri Buch"
          />
        </div>

        <ContentCard>
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">SEBI&apos;s Key Roles</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.sebi.roles.map((role, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[#4a6fa5] mt-1">✓</span>
                <span className="font-sans text-sm text-[#4a5568]">{role}</span>
              </div>
            ))}
          </div>
        </ContentCard>

        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4 mt-8">Recent Reforms</h4>
        <div className="space-y-3">
          {data.sebi.recentReforms.map((reform) => (
            <div key={reform.reform} className="flex items-center gap-4 p-3 bg-[#f5f0eb] rounded">
              <span className="px-2 py-1 bg-[#4a6fa5] text-white text-xs font-medium rounded">
                {reform.year}
              </span>
              <span className="font-sans text-sm text-[#4a5568]">{reform.reform}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FII, DII, Retail */}
      <section className="mb-16">
        <SectionHeading chapter={6}>
          Who Invests in the Market?
        </SectionHeading>

        <p className="font-sans text-[#4a5568] leading-relaxed mb-8">
          The stock market has three main types of investors: Foreign Institutions (FIIs),
          Domestic Institutions (DIIs), and Retail Investors like you and me.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* FII */}
          <ContentCard>
            <h3 className="font-serif font-semibold text-[#1a2e44] mb-1">FII/FPI</h3>
            <p className="font-sans text-xs text-[#6b7c8f] mb-4">{data.investorTypes.fii.hindi}</p>

            <p className="font-serif text-2xl font-bold text-[#b85c38]">
              {data.investorTypes.fii.equityHolding}%
            </p>
            <p className="font-sans text-xs text-[#6b7c8f] mb-4">of market cap</p>

            <p className="font-sans text-sm text-[#4a5568] mb-2">
              AUM: ₹{data.investorTypes.fii.totalAum} lakh crore
            </p>
            <p className="font-sans text-xs text-[#6b7c8f]">
              Top sources: {data.investorTypes.fii.topCountries.slice(0, 3).join(', ')}
            </p>

            <div className="mt-4 pt-4 border-t border-[#e5e0d8]">
              <p className="font-sans text-xs text-[#b85c38]">
                FY24: ₹{Math.abs(data.investorTypes.fii.recentTrend.fy2024).toLocaleString('en-IN')} Cr sold
              </p>
            </div>
          </ContentCard>

          {/* DII */}
          <ContentCard>
            <h3 className="font-serif font-semibold text-[#1a2e44] mb-1">DII</h3>
            <p className="font-sans text-xs text-[#6b7c8f] mb-4">{data.investorTypes.dii.hindi}</p>

            <p className="font-serif text-2xl font-bold text-[#7a9e7e]">
              {data.investorTypes.dii.equityHolding}%
            </p>
            <p className="font-sans text-xs text-[#6b7c8f] mb-4">of market cap</p>

            <p className="font-sans text-sm text-[#4a5568] mb-2">
              AUM: ₹{data.investorTypes.dii.totalAum} lakh crore
            </p>
            <p className="font-sans text-xs text-[#6b7c8f]">
              Includes: {data.investorTypes.dii.includes.slice(0, 2).join(', ')}
            </p>

            <div className="mt-4 pt-4 border-t border-[#e5e0d8]">
              <p className="font-sans text-xs text-[#7a9e7e]">
                FY24: ₹{data.investorTypes.dii.recentTrend.fy2024.toLocaleString('en-IN')} Cr bought
              </p>
            </div>
          </ContentCard>

          {/* Retail */}
          <ContentCard>
            <h3 className="font-serif font-semibold text-[#1a2e44] mb-1">Retail</h3>
            <p className="font-sans text-xs text-[#6b7c8f] mb-4">{data.investorTypes.retail.hindi}</p>

            <p className="font-serif text-2xl font-bold text-[#4a6fa5]">
              {data.investorTypes.retail.equityHolding}%
            </p>
            <p className="font-sans text-xs text-[#6b7c8f] mb-4">of market cap</p>

            <p className="font-sans text-sm text-[#4a5568] mb-2">
              Demat: {data.investorTypes.retail.dematAccounts} crore accounts
            </p>
            <p className="font-sans text-xs text-[#6b7c8f]">
              Growth since 2020: {data.investorTypes.retail.growthSince2020}%
            </p>

            <div className="mt-4 pt-4 border-t border-[#e5e0d8]">
              <p className="font-sans text-xs text-[#4a6fa5]">
                Avg trade: ₹{data.investorTypes.retail.averageTicketSize.toLocaleString('en-IN')}
              </p>
            </div>
          </ContentCard>
        </div>

        <KeyConcept title="DIIs vs FIIs">
          When FIIs sell, DIIs (through your SIPs and mutual funds) have been buying.
          In FY24, FIIs sold ₹25,400 crore but DIIs bought ₹1.86 lakh crore — keeping markets stable.
          Monthly SIP inflows are now ₹{data.investorTypes.dii.mutualFundSip.monthlySip.toLocaleString('en-IN')} crore.
        </KeyConcept>
      </section>

      {/* IPO */}
      <section className="mb-16">
        <SectionHeading chapter={7}>
          IPOs: How Companies Go Public
        </SectionHeading>

        <Definition term="IPO" hindi="आई.पी.ओ.">
          {data.ipo.description}. It&apos;s the first time the general public can buy shares
          of a company that was previously privately owned.
        </Definition>

        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4 mt-8">IPO Process</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {data.ipo.process.map((step) => (
            <ContentCard key={step.step} className="text-center">
              <span className="inline-block w-8 h-8 rounded-full bg-[#4a6fa5] text-white font-serif font-bold text-sm leading-8 mb-2">
                {step.step}
              </span>
              <p className="font-sans font-medium text-[#1a2e44] text-sm">{step.name}</p>
              <p className="font-sans text-xs text-[#6b7c8f] mt-1">{step.description}</p>
            </ContentCard>
          ))}
        </div>

        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">IPO Categories</h4>
        <DataTable>
          <TableHead>
            <TableHeader>Category</TableHeader>
            <TableHeader>Quota</TableHeader>
            <TableHeader>Max Investment</TableHeader>
          </TableHead>
          <TableBody>
            {data.ipo.categories.map((cat) => (
              <TableRow key={cat.category}>
                <TableCell className="font-medium">{cat.category}</TableCell>
                <TableCell>{cat.quota}%</TableCell>
                <TableCell>{cat.maxInvestment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DataTable>

        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4 mt-8">Recent Large IPOs</h4>
        <DataTable>
          <TableHead>
            <TableHeader>Company</TableHeader>
            <TableHeader>Year</TableHeader>
            <TableHeader>Size (₹ Cr)</TableHeader>
            <TableHeader>Listing Day</TableHeader>
          </TableHead>
          <TableBody>
            {data.ipo.recentLargestIpos.map((ipo) => (
              <TableRow key={ipo.company}>
                <TableCell className="font-medium">{ipo.company}</TableCell>
                <TableCell>{ipo.year}</TableCell>
                <TableCell>{ipo.size.toLocaleString('en-IN')}</TableCell>
                <TableCell>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    ipo.listing >= 0 ? 'bg-[#e8f4ea] text-[#2d5a3d]' : 'bg-[#fef2f2] text-[#b85c38]'
                  }`}>
                    {ipo.listing >= 0 ? '+' : ''}{ipo.listing}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DataTable>

        <MarginNote label="2024 Stats">
          {data.ipo.stats2024.totalIpos} IPOs raised ₹{data.ipo.stats2024.amountRaised.toLocaleString('en-IN')} crore.
          Average subscription was {data.ipo.stats2024.averageSubscription}x oversubscribed.
        </MarginNote>
      </section>

      {/* Trading Basics */}
      <section className="mb-16">
        <SectionHeading chapter={8}>
          How Trading Works
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ContentCard>
            <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Market Timings</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-sans text-sm text-[#6b7c8f]">Pre-Open</span>
                <span className="font-sans text-sm text-[#4a5568]">{data.tradingBasics.marketTimings.preOpen}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-sm text-[#6b7c8f]">Normal Trading</span>
                <span className="font-sans text-sm font-medium text-[#1a2e44]">{data.tradingBasics.marketTimings.normalTrading}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-sm text-[#6b7c8f]">Post-Close</span>
                <span className="font-sans text-sm text-[#4a5568]">{data.tradingBasics.marketTimings.postClose}</span>
              </div>
              <p className="font-sans text-xs text-[#6b7c8f] pt-2 border-t border-[#e5e0d8]">
                {data.tradingBasics.marketTimings.days}
              </p>
            </div>
          </ContentCard>

          <ContentCard>
            <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Settlement</h4>
            <div className="text-center py-4">
              <p className="font-serif text-4xl font-bold text-[#4a6fa5]">
                {data.tradingBasics.settlement.current}
              </p>
              <p className="font-sans text-sm text-[#4a5568] mt-2">
                {data.tradingBasics.settlement.meaning}
              </p>
              <p className="font-sans text-xs text-[#6b7c8f] mt-2">
                Changed from {data.tradingBasics.settlement.previousSystem} in {data.tradingBasics.settlement.changedOn}
              </p>
            </div>
          </ContentCard>
        </div>

        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Order Types</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {data.tradingBasics.orderTypes.map((order) => (
            <ContentCard key={order.type}>
              <h5 className="font-sans font-medium text-[#1a2e44]">{order.type}</h5>
              <p className="font-sans text-xs text-[#6b7c8f] mb-2">{order.hindi}</p>
              <p className="font-sans text-sm text-[#4a5568]">{order.description}</p>
            </ContentCard>
          ))}
        </div>

        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Trading Charges</h4>
        <DataTable>
          <TableHead>
            <TableHeader>Charge</TableHeader>
            <TableHeader>Rate</TableHeader>
            <TableHeader>Note</TableHeader>
          </TableHead>
          <TableBody>
            {data.tradingBasics.charges.map((charge) => (
              <TableRow key={charge.charge}>
                <TableCell className="font-medium">{charge.charge}</TableCell>
                <TableCell>{charge.range || charge.rate}</TableCell>
                <TableCell className="text-[#6b7c8f]">{charge.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DataTable>
      </section>

      {/* Market Cap Categories */}
      <section className="mb-16">
        <SectionHeading chapter={9}>
          Large, Mid & Small Cap
        </SectionHeading>

        <p className="font-sans text-[#4a5568] leading-relaxed mb-8">
          Companies are classified by their market capitalization (total value of all shares).
          This classification helps investors understand the risk and growth potential.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.marketCapCategories.map((cat) => (
            <ContentCard key={cat.category}>
              <h3 className="font-serif text-xl font-semibold text-[#1a2e44]">{cat.category}</h3>
              <p className="font-sans text-xs text-[#6b7c8f] mb-4">{cat.hindi}</p>

              <p className="font-sans text-sm text-[#4a5568] mb-2">{cat.definition}</p>
              <p className="font-sans text-sm text-[#4a6fa5] font-medium mb-4">{cat.minMarketCap}</p>

              <div className="flex items-center gap-2 mb-3">
                <span className="font-sans text-sm text-[#6b7c8f]">Risk:</span>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  cat.risk === 'Low' ? 'bg-[#e8f4ea] text-[#2d5a3d]' :
                  cat.risk === 'Medium' ? 'bg-[#fef8e8] text-[#8b6914]' :
                  'bg-[#fef2f2] text-[#b85c38]'
                }`}>
                  {cat.risk}
                </span>
              </div>

              <p className="font-sans text-xs text-[#6b7c8f]">
                Examples: {cat.examples.join(', ')}
              </p>
            </ContentCard>
          ))}
        </div>
      </section>

      {/* Global Comparison */}
      <section className="mb-16">
        <SectionHeading chapter={10}>
          India vs The World
        </SectionHeading>

        <DataTable>
          <TableHead>
            <TableHeader>Rank</TableHeader>
            <TableHeader>Country</TableHeader>
            <TableHeader>Exchange(s)</TableHeader>
            <TableHeader>Market Cap</TableHeader>
          </TableHead>
          <TableBody>
            {data.globalComparison.map((country) => (
              <TableRow key={country.country}>
                <TableCell>#{country.rank}</TableCell>
                <TableCell className={`font-medium ${country.highlight ? 'text-[#b85c38]' : ''}`}>
                  {country.country}
                  {country.highlight && (
                    <span className="ml-2 px-2 py-0.5 bg-[#b85c38] text-white text-xs rounded">You are here</span>
                  )}
                </TableCell>
                <TableCell>{country.exchange}</TableCell>
                <TableCell>${country.marketCap}T</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DataTable>

        <MarginNote label="2024 Achievement">
          India overtook Hong Kong in early 2024 to become the 4th largest stock market.
          At current growth rates, India could overtake Japan by 2027.
        </MarginNote>
      </section>

      {/* Key Insights */}
      <section className="mb-16">
        <KeyConcept title="Key Takeaways">
          <ul className="space-y-2">
            {data.keyInsights.map((insight, index) => (
              <li key={index} className="font-sans text-[#4a5568] flex items-start gap-2">
                <span className="text-[#d4a84b] mt-1">•</span>
                {insight}
              </li>
            ))}
          </ul>
        </KeyConcept>
      </section>

      {/* Cross-links */}
      <section className="mb-16 p-6 bg-[#f5f0eb] rounded-lg">
        <h3 className="font-serif font-semibold text-[#1a2e44] mb-4">Related Topics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/india-economy/banking"
            className="block p-4 bg-white rounded border border-[#e5e0d8] hover-lift"
          >
            <p className="font-serif font-semibold text-[#4a6fa5]">Banking System</p>
            <p className="font-sans text-sm text-[#6b7c8f]">
              How banks work, NPAs, and UPI revolution
            </p>
          </a>
          <a
            href="/india-economy/rbi"
            className="block p-4 bg-white rounded border border-[#e5e0d8] hover-lift"
          >
            <p className="font-serif font-semibold text-[#4a6fa5]">RBI & Monetary Policy</p>
            <p className="font-sans text-sm text-[#6b7c8f]">
              Interest rates that affect market valuations
            </p>
          </a>
        </div>
      </section>

      {/* Source Footer */}
      <SourceFooter sourceIds={['sebi-nse-bse-stats', 'nse-market-data', 'bse-market-data']} />
    </main>
  )
}
