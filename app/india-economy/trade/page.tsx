import { Metadata } from 'next'
import { Breadcrumb } from '../components/Breadcrumb'
import { SourceFooter } from '../components/SourceFooter'
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
import { getTradeData } from '../data'

export const metadata: Metadata = {
  title: 'India Trade & Exports Explained',
  description: 'India\'s $820 billion trade story. Learn about top exports (IT services, petroleum, gems), imports (crude oil, electronics), trade deficit with China, forex reserves ($600B+), and current account deficit.',
  keywords: ['India exports', 'India imports', 'trade deficit India', 'forex reserves India', 'current account deficit', 'IT services exports', 'crude oil imports', 'India trade partners'],
  alternates: {
    canonical: 'https://apurwasarwajit.com/india-economy/trade',
  },
  openGraph: {
    title: 'India Trade & Exports | India Economy',
    description: 'What does India export and import? ₹820 billion trade, forex reserves, trade deficit, and India\'s top trading partners.',
    url: 'https://apurwasarwajit.com/india-economy/trade',
  },
}

export default function TradePage() {
  const trade = getTradeData()
  const { summary, topExports, topImports, tradingPartners, forexReserves, currentAccountDeficit, historicalTrade, servicesBreakdown } = trade

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'India Economy', href: '/india-economy' },
          { label: 'Trade & Exports' },
        ]}
      />

      {/* Header */}
      <header className="mb-16">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#b85c38] mb-4">
          International Trade
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a2e44] mb-4 leading-tight">
          Trade & Exports
        </h1>
        <p className="font-sans text-[#4a5568] text-lg leading-relaxed">
          India trades with the entire world — exporting IT services, medicines, and gems while
          importing oil, electronics, and gold. Let&apos;s understand how India connects to the
          global economy.
        </p>
      </header>

      {/* Trade Summary Dashboard */}
      <SectionHeading subtitle={`FY ${trade.fiscalYear}`}>
        The Big Picture
      </SectionHeading>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 bg-white/40 border border-[#e5e0d8] p-6">
        <StatDisplay
          value={`$${summary.totalExports.toFixed(0)}B`}
          label="Total Exports"
          sublabel={`+${summary.growthExports}% growth`}
        />
        <StatDisplay
          value={`$${summary.totalImports.toFixed(0)}B`}
          label="Total Imports"
          sublabel={`+${summary.growthImports}% growth`}
        />
        <StatDisplay
          value={`$${Math.abs(summary.tradeDeficit).toFixed(0)}B`}
          label="Trade Deficit"
          sublabel="Imports > Exports"
        />
        <StatDisplay
          value={`$${forexReserves.current.toFixed(0)}B`}
          label="Forex Reserves"
          sublabel={`${forexReserves.importCover} months cover`}
        />
      </div>

      <div className="mb-8 p-4 bg-[#FFF8E7] border-l-4 border-[#d4a84b]">
        <p className="text-sm text-[#4a5568]">
          <strong className="text-[#1a2e44]">Global standing:</strong> India ranks {trade.globalRanking.exportsRank}th in
          exports and {trade.globalRanking.importsRank}th in imports globally.
        </p>
      </div>

      {/* What is Trade */}
      <SectionHeading chapter={1}>
        What is International Trade?
      </SectionHeading>

      <Definition term="Trade Balance" hindi="व्यापार संतुलन">
        The difference between what a country exports and imports. If imports exceed exports,
        it&apos;s a trade deficit. If exports exceed imports, it&apos;s a trade surplus.
      </Definition>

      <ContentCard className="mb-8">
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">India&apos;s Trade Structure</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#e5e0d8]/30 rounded-sm">
            <div>
              <div className="font-semibold text-[#1a2e44]">Merchandise (Goods)</div>
              <div className="text-sm text-[#6b7c8f]">Physical products that cross borders</div>
            </div>
            <div className="text-right">
              <div className="text-[#b85c38] font-bold">-${Math.abs(summary.merchandiseDeficit).toFixed(0)}B</div>
              <div className="text-xs text-[#6b7c8f]">Deficit</div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-[#e5e0d8]/30 rounded-sm">
            <div>
              <div className="font-semibold text-[#1a2e44]">Services</div>
              <div className="text-sm text-[#6b7c8f]">IT, travel, finance, business services</div>
            </div>
            <div className="text-right">
              <div className="text-[#7a9e7e] font-bold">+${summary.servicesSurplus.toFixed(0)}B</div>
              <div className="text-xs text-[#6b7c8f]">Surplus</div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border-t-2 border-[#1a2e44]">
            <div className="font-semibold text-[#1a2e44]">Overall Trade Balance</div>
            <div className="text-[#b85c38] font-bold text-lg">-${Math.abs(summary.tradeDeficit).toFixed(0)}B</div>
          </div>
        </div>
      </ContentCard>

      <MarginNote label="Key insight">
        India&apos;s services surplus ($189B) offsets much of the goods deficit ($283B).
        Our IT industry is the hero — services exports nearly equal merchandise exports now!
      </MarginNote>

      {/* Top Exports */}
      <SectionHeading chapter={2} subtitle="What India sells to the world">
        Top Exports
      </SectionHeading>

      <ContentCard className="mb-6">
        <div className="space-y-4">
          {topExports.slice(0, 8).map((item, index) => (
            <div key={item.commodity}>
              <div className="flex justify-between items-baseline mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#6b7c8f] w-5">{index + 1}.</span>
                  <span className="font-medium text-[#1a2e44]">{item.commodity}</span>
                  {item.highlight && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7a9e7e] bg-[#7a9e7e]/10 px-1.5 py-0.5 rounded">
                      Star Performer
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#6b7c8f]">${item.value}B</span>
                  <span className={`text-sm font-medium ${item.growth > 0 ? 'text-[#7a9e7e]' : 'text-[#b85c38]'}`}>
                    {item.growth > 0 ? '+' : ''}{item.growth}%
                  </span>
                </div>
              </div>
              <div className="h-2 bg-[#e5e0d8]/50 rounded-sm overflow-hidden">
                <div
                  className={`h-full rounded-sm ${item.highlight ? 'bg-[#7a9e7e]' : 'bg-[#4a6fa5]'}`}
                  style={{ width: `${item.share * 4}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </ContentCard>

      <KeyConcept title="The Electronics Revolution">
        Electronics exports grew 127x — from ₹1,500 crore in 2014-15 to ₹2 lakh crore in 2024-25!
        India is now the 3rd largest mobile phone exporter. &quot;Make in India&quot; is finally
        showing results in this sector.
      </KeyConcept>

      {/* Services Exports */}
      <ContentCard className="mb-6">
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Services Exports Breakdown (${summary.servicesExports}B)</h4>
        <div className="space-y-3">
          {servicesBreakdown.exports.map((service) => (
            <div key={service.category} className="flex items-center justify-between py-2 border-b border-[#e5e0d8] last:border-0">
              <span className="text-[#4a5568]">{service.category}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#6b7c8f]">{service.share}%</span>
                <span className="font-medium text-[#1a2e44]">${service.value}B</span>
              </div>
            </div>
          ))}
        </div>
      </ContentCard>

      <MarginNote label="IT powerhouse">
        IT & Business Services alone account for 52% of India&apos;s services exports.
        Companies like TCS, Infosys, and Wipro serve clients worldwide, bringing in ~$200B annually.
      </MarginNote>

      {/* Top Imports */}
      <SectionHeading chapter={3} subtitle="What India buys from the world">
        Top Imports
      </SectionHeading>

      <ContentCard className="mb-6">
        <div className="space-y-4">
          {topImports.slice(0, 8).map((item, index) => (
            <div key={item.commodity}>
              <div className="flex justify-between items-baseline mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#6b7c8f] w-5">{index + 1}.</span>
                  <span className="font-medium text-[#1a2e44]">{item.commodity}</span>
                  {item.critical && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#b85c38] bg-[#b85c38]/10 px-1.5 py-0.5 rounded">
                      Critical
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#6b7c8f]">${item.value}B</span>
                  <span className={`text-sm font-medium ${item.growth > 0 ? 'text-[#b85c38]' : 'text-[#7a9e7e]'}`}>
                    {item.growth > 0 ? '+' : ''}{item.growth}%
                  </span>
                </div>
              </div>
              <div className="h-2 bg-[#e5e0d8]/50 rounded-sm overflow-hidden">
                <div
                  className={`h-full rounded-sm ${item.critical ? 'bg-[#b85c38]' : 'bg-[#6b7c8f]'}`}
                  style={{ width: `${item.share * 3}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </ContentCard>

      <KeyConcept title="The Oil Dependency">
        Crude oil alone causes ~$150 billion deficit annually. India imports 85% of its oil needs.
        This is why petrol prices in India are affected by global oil prices and why electric
        vehicles are a strategic priority.
      </KeyConcept>

      {/* Trading Partners */}
      <SectionHeading chapter={4} subtitle="Who India trades with">
        Major Trading Partners
      </SectionHeading>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <ContentCard>
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Top Export Destinations</h4>
          <div className="space-y-2">
            {tradingPartners.topExportDestinations.slice(0, 6).map((partner, index) => (
              <div key={partner.country} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#6b7c8f] w-5">{index + 1}.</span>
                  <span className="text-[#1a2e44]">{partner.country}</span>
                </div>
                <span className="text-sm font-medium text-[#7a9e7e]">${partner.value}B</span>
              </div>
            ))}
          </div>
        </ContentCard>

        <ContentCard>
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Top Import Sources</h4>
          <div className="space-y-2">
            {tradingPartners.topImportSources.slice(0, 6).map((partner, index) => (
              <div key={partner.country} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#6b7c8f] w-5">{index + 1}.</span>
                  <span className="text-[#1a2e44]">{partner.country}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-[#b85c38]">${partner.value}B</span>
                  {partner.deficit && (
                    <span className="text-xs text-[#6b7c8f] ml-2">(-${Math.abs(partner.deficit)}B)</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ContentCard>
      </div>

      <MarginNote label="The China gap">
        India&apos;s trade deficit with China alone is ~$95 billion — more than our total deficit
        with all other countries combined. We import electronics, machinery, and chemicals from
        China but export relatively little back.
      </MarginNote>

      {/* Forex Reserves */}
      <SectionHeading chapter={5} subtitle="India's financial safety net">
        Foreign Exchange Reserves
      </SectionHeading>

      <Definition term="Forex Reserves" hindi="विदेशी मुद्रा भंडार">
        Foreign currency and gold held by RBI to pay for imports, stabilize the rupee, and
        handle economic shocks. Think of it as the country&apos;s savings account in foreign currency.
      </Definition>

      <ContentCard className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-4 bg-[#e5e0d8]/30 rounded-sm">
            <div className="font-serif text-2xl font-bold text-[#1a2e44]">${forexReserves.components.foreignCurrencyAssets}B</div>
            <div className="text-xs text-[#6b7c8f]">Foreign Currency</div>
          </div>
          <div className="text-center p-4 bg-[#e5e0d8]/30 rounded-sm">
            <div className="font-serif text-2xl font-bold text-[#d4a84b]">${forexReserves.components.gold}B</div>
            <div className="text-xs text-[#6b7c8f]">Gold</div>
          </div>
          <div className="text-center p-4 bg-[#e5e0d8]/30 rounded-sm">
            <div className="font-serif text-2xl font-bold text-[#4a6fa5]">${forexReserves.components.sdrs}B</div>
            <div className="text-xs text-[#6b7c8f]">SDRs (IMF)</div>
          </div>
          <div className="text-center p-4 bg-[#e5e0d8]/30 rounded-sm">
            <div className="font-serif text-2xl font-bold text-[#7a9e7e]">${forexReserves.current}B</div>
            <div className="text-xs text-[#6b7c8f]">Total</div>
          </div>
        </div>
        <p className="text-sm text-[#6b7c8f]">
          All-time high: ${forexReserves.allTimeHigh}B ({forexReserves.allTimeHighDate}).
          Current reserves can cover {forexReserves.importCover} months of imports.
        </p>
      </ContentCard>

      <KeyConcept title="Why forex matters">
        During the 1991 crisis, India had only 2 weeks of import cover and had to pledge gold.
        Today, with 10+ months cover, India is much more resilient to external shocks.
      </KeyConcept>

      {/* Current Account */}
      <SectionHeading chapter={6} subtitle="The broader picture">
        Balance of Payments
      </SectionHeading>

      <Definition term="Current Account Deficit (CAD)" hindi="चालू खाता घाटा">
        The difference between money flowing in (exports, remittances, investment income) and
        money flowing out (imports, payments abroad). A deficit means more money is leaving than coming in.
      </Definition>

      <ContentCard className="mb-6">
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">CAD History (% of GDP)</h4>
        <div className="space-y-2">
          {currentAccountDeficit.historical.map((year) => (
            <div key={year.year} className="flex items-center gap-4">
              <span className="w-20 font-sans text-sm text-[#6b7c8f]">{year.year}</span>
              <div className="flex-1 h-5 bg-[#e5e0d8]/50 rounded-sm overflow-hidden relative">
                <div className="absolute left-1/2 top-0 h-full w-px bg-[#1a2e44]/30" />
                {year.surplus ? (
                  <div
                    className="absolute left-1/2 h-full bg-[#7a9e7e] rounded-sm"
                    style={{ width: `${Math.abs(year.percentGdp) * 20}%` }}
                  />
                ) : (
                  <div
                    className="absolute right-1/2 h-full bg-[#b85c38] rounded-sm"
                    style={{ width: `${Math.abs(year.percentGdp) * 20}%`, right: '50%' }}
                  />
                )}
              </div>
              <span className={`w-16 font-sans text-sm font-medium text-right ${year.surplus ? 'text-[#7a9e7e]' : 'text-[#b85c38]'}`}>
                {year.surplus ? '+' : ''}{year.percentGdp}%
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-[#6b7c8f]">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[#7a9e7e]" />
            Surplus
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[#b85c38]" />
            Deficit
          </span>
        </div>
        <p className="text-sm text-[#6b7c8f] mt-2 italic">
          * 2020-21 saw a rare surplus as COVID crashed imports. 2022-23 saw highest deficit due to oil prices.
        </p>
      </ContentCard>

      {/* Historical Trade */}
      <SectionHeading subtitle="How trade has grown">
        10-Year Trade History
      </SectionHeading>

      <DataTable>
        <TableHead>
          <TableHeader>Year</TableHeader>
          <TableHeader className="text-right">Exports</TableHeader>
          <TableHeader className="text-right">Imports</TableHeader>
          <TableHeader className="text-right">Deficit</TableHeader>
        </TableHead>
        <TableBody>
          {historicalTrade.slice(-6).map((year) => (
            <TableRow key={year.year}>
              <TableCell className="font-medium text-[#1a2e44]">{year.year}</TableCell>
              <TableCell className="text-right text-[#7a9e7e]">${year.exports}B</TableCell>
              <TableCell className="text-right text-[#b85c38]">${year.imports}B</TableCell>
              <TableCell className="text-right font-medium text-[#b85c38]">-${Math.abs(year.deficit)}B</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>

      {/* Summary */}
      <SectionHeading>Quick Summary</SectionHeading>

      <ContentCard>
        <ul className="space-y-3 text-[#4a5568]">
          <li className="flex gap-3">
            <span className="text-[#b85c38] font-semibold">1.</span>
            <span>India&apos;s total trade is <strong className="text-[#1a2e44]">$1.7 trillion</strong> (exports $821B + imports $915B)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b85c38] font-semibold">2.</span>
            <span><strong className="text-[#1a2e44]">Services surplus</strong> ($189B) partly offsets goods deficit ($283B)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b85c38] font-semibold">3.</span>
            <span>Top exports: <strong className="text-[#1a2e44]">Petroleum, IT services, pharma, gems</strong></span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b85c38] font-semibold">4.</span>
            <span>Top imports: <strong className="text-[#1a2e44]">Crude oil, gold, electronics</strong> — critical dependencies</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b85c38] font-semibold">5.</span>
            <span>Forex reserves of <strong className="text-[#1a2e44]">${forexReserves.current}B</strong> provide {forexReserves.importCover} months of import cover</span>
          </li>
        </ul>
      </ContentCard>

      {/* Source Attribution */}
      <SourceFooter sourceIds={['commerce-ministry-trade', 'rbi-bop-forex']} />
    </main>
  )
}
