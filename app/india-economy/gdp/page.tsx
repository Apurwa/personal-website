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
import { getGDPHistorical, getGDPSectors, getGDPGlobal, getGDPMilestones } from '../data'

export const metadata: Metadata = {
  title: 'India GDP & Economic Growth Explained',
  description: 'India\'s GDP journey from $270B (1991) to $3.9 trillion (2024). Learn about GDP growth rate, per capita income, sector breakdown (agriculture, services, industry), and global rankings.',
  keywords: ['India GDP', 'India economic growth', 'GDP per capita India', 'India 5th largest economy', 'services sector India', 'India growth rate', 'real vs nominal GDP'],
  alternates: {
    canonical: 'https://apurwasarwajit.com/india-economy/gdp',
  },
  openGraph: {
    title: 'India GDP & Economic Growth | India Economy',
    description: 'Track India\'s economic growth from 1991 liberalization to becoming the 5th largest economy. GDP, per capita income, sector breakdown.',
    url: 'https://apurwasarwajit.com/india-economy/gdp',
  },
}

export default function GDPPage() {
  const gdpHistory = getGDPHistorical()
  const gdpSectors = getGDPSectors()
  const gdpGlobal = getGDPGlobal()
  const milestones = getGDPMilestones()

  // Get latest and earliest data points
  const latestGDP = gdpHistory.data[gdpHistory.data.length - 1]
  const earliestGDP = gdpHistory.data[0]

  // Calculate growth multiples
  const gdpGrowthTimes = (latestGDP.gdpNominalUsdBn / earliestGDP.gdpNominalUsdBn).toFixed(0)
  const perCapitaGrowthTimes = (latestGDP.perCapitaUsd / earliestGDP.perCapitaUsd).toFixed(0)

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'India Economy', href: '/india-economy' },
          { label: 'GDP & Growth' },
        ]}
      />

      {/* Header */}
      <header className="mb-16">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#b85c38] mb-4">
          Economic Growth
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a2e44] mb-4 leading-tight">
          GDP & Economic Growth
        </h1>
        <p className="font-sans text-[#4a5568] text-lg leading-relaxed">
          Gross Domestic Product (GDP) measures the total value of everything a country produces.
          It&apos;s like measuring how big the economy&apos;s &quot;pie&quot; is. Let&apos;s understand
          India&apos;s growth story.
        </p>
      </header>

      {/* Key Numbers Dashboard */}
      <SectionHeading subtitle="India's economy at a glance">
        The Big Picture
      </SectionHeading>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-white/40 border border-[#e5e0d8] p-6">
        <StatDisplay
          value={`$${(latestGDP.gdpNominalUsdBn / 1000).toFixed(1)}T`}
          label="GDP (2024-25)"
          sublabel="5th largest in world"
        />
        <StatDisplay
          value={`${latestGDP.realGrowthPercent}%`}
          label="Growth Rate"
          sublabel="Real GDP growth"
        />
        <StatDisplay
          value={`$${latestGDP.perCapitaUsd.toLocaleString()}`}
          label="Per Capita"
          sublabel="139th in world"
        />
        <StatDisplay
          value={`${gdpGrowthTimes}x`}
          label="Since 1991"
          sublabel="GDP multiplied"
        />
      </div>

      <MarginNote label="The journey">
        In 1991, India&apos;s GDP was just $267 billion. Today it&apos;s nearly $4 trillion —
        a {gdpGrowthTimes}x increase in 33 years! Per capita income grew {perCapitaGrowthTimes}x
        from ${earliestGDP.perCapitaUsd} to ${latestGDP.perCapitaUsd.toLocaleString()}.
      </MarginNote>

      {/* What is GDP */}
      <SectionHeading chapter={1}>
        What is GDP?
      </SectionHeading>

      <Definition term="Gross Domestic Product" hindi="सकल घरेलू उत्पाद">
        The total monetary value of all goods and services produced within a country&apos;s
        borders in a specific time period (usually one year). It measures the &quot;size&quot;
        of an economy.
      </Definition>

      <ContentCard className="mb-8">
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Think of it like this...</h4>
        <p className="text-[#4a5568] leading-relaxed mb-4">
          Imagine counting everything India produces in a year:
        </p>
        <ul className="list-none space-y-2 text-[#4a5568]">
          <li className="flex gap-3">
            <span className="text-[#b85c38]">+</span>
            <span>Every phone manufactured in India</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b85c38]">+</span>
            <span>Every haircut given at a salon</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b85c38]">+</span>
            <span>Every rice crop harvested</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b85c38]">+</span>
            <span>Every software service exported</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b85c38]">+</span>
            <span>Every movie ticket sold</span>
          </li>
        </ul>
        <p className="text-[#4a5568] leading-relaxed mt-4">
          Add up the value of all of this — that&apos;s GDP!
        </p>
      </ContentCard>

      {/* Real vs Nominal GDP */}
      <ContentCard className="mb-6">
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Real GDP vs Nominal GDP</h4>
        <div className="space-y-4 text-[#4a5568]">
          <div className="pl-4 border-l-2 border-[#4a6fa5]">
            <p className="font-semibold text-[#1a2e44] mb-1">Nominal GDP</p>
            <p className="text-sm">
              Measured at current prices. If prices go up due to inflation, nominal GDP goes up
              even if the actual production stays the same.
            </p>
          </div>
          <div className="pl-4 border-l-2 border-[#7a9e7e]">
            <p className="font-semibold text-[#1a2e44] mb-1">Real GDP</p>
            <p className="text-sm">
              Adjusted for inflation. This tells us if the economy actually produced more goods
              and services, not just if prices went up.
            </p>
          </div>
        </div>
      </ContentCard>

      <KeyConcept title="Why Real GDP matters">
        When we say India grew at 6.5%, we mean real GDP growth. This means India actually
        produced 6.5% more goods and services than the previous year — after removing the
        effect of price increases.
      </KeyConcept>

      {/* GDP Per Capita */}
      <SectionHeading chapter={2} subtitle="The average Indian's share">
        GDP Per Capita
      </SectionHeading>

      <Definition term="GDP Per Capita" hindi="प्रति व्यक्ति जीडीपी">
        Total GDP divided by the population. It tells us the average income if we distributed
        the entire GDP equally among all citizens.
      </Definition>

      <ContentCard className="mb-6">
        <div className="flex items-baseline gap-4 mb-4">
          <div className="font-serif text-3xl font-bold text-[#1a2e44]">${latestGDP.perCapitaUsd.toLocaleString()}</div>
          <div className="font-sans text-[#6b7c8f]">per person per year</div>
        </div>
        <p className="text-[#4a5568] mb-4">
          This is why India can be the 5th largest economy but still have low per capita income —
          our population is 1.4 billion people, so the pie gets divided into many small pieces.
        </p>
        <div className="bg-[#FFF8E7] p-4 border-l-4 border-[#d4a84b]">
          <p className="text-[#4a5568] text-sm">
            <strong className="text-[#1a2e44]">Quick math:</strong> ${latestGDP.perCapitaUsd.toLocaleString()} per year
            = ~₹{Math.round(latestGDP.perCapitaUsd * 84 / 12).toLocaleString()} per month.
            But this is an average — actual incomes vary widely.
          </p>
        </div>
      </ContentCard>

      {/* Historical Growth */}
      <SectionHeading chapter={3} subtitle="From crisis to growth">
        India&apos;s GDP Story (1991-2024)
      </SectionHeading>

      <ContentCard className="mb-6">
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Key Milestones</h4>
        <div className="space-y-4">
          {milestones.map((entry) => (
            <div key={entry.fiscalYear} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-20 font-sans text-sm font-medium text-[#b85c38]">
                {entry.fiscalYear}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[#1a2e44]">${entry.gdpNominalUsdBn}B</div>
                <div className="text-sm text-[#6b7c8f]">{entry.milestone}</div>
              </div>
              <div className={`text-sm font-medium ${entry.realGrowthPercent < 0 ? 'text-[#b85c38]' : 'text-[#7a9e7e]'}`}>
                {entry.realGrowthPercent > 0 ? '+' : ''}{entry.realGrowthPercent}%
              </div>
            </div>
          ))}
        </div>
      </ContentCard>

      {/* GDP Growth Chart */}
      <ContentCard className="mb-6">
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">GDP Growth Rate (Last 10 Years)</h4>
        <div className="space-y-2">
          {gdpHistory.data.slice(-10).map((year) => (
            <div key={year.fiscalYear} className="flex items-center gap-4">
              <span className="w-20 font-sans text-sm text-[#6b7c8f]">{year.fiscalYear}</span>
              <div className="flex-1 h-5 bg-[#e5e0d8]/50 rounded-sm overflow-hidden relative">
                {year.realGrowthPercent < 0 ? (
                  <div
                    className="absolute right-1/2 h-full bg-[#b85c38] rounded-sm"
                    style={{ width: `${Math.abs(year.realGrowthPercent) * 5}%` }}
                  />
                ) : (
                  <div
                    className="absolute left-1/2 h-full bg-[#7a9e7e] rounded-sm"
                    style={{ width: `${year.realGrowthPercent * 5}%` }}
                  />
                )}
                <div className="absolute left-1/2 top-0 h-full w-px bg-[#1a2e44]/20" />
              </div>
              <span className={`w-12 font-sans text-sm font-medium ${year.realGrowthPercent < 0 ? 'text-[#b85c38]' : 'text-[#1a2e44]'}`}>
                {year.realGrowthPercent > 0 ? '+' : ''}{year.realGrowthPercent}%
              </span>
            </div>
          ))}
        </div>
        <p className="font-sans text-[#6b7c8f] text-sm mt-4 italic">
          * 2020-21 shows India&apos;s first GDP contraction since 1979 due to COVID-19
        </p>
      </ContentCard>

      {/* Sector Breakdown */}
      <SectionHeading chapter={4} subtitle="Agriculture, Industry, Services">
        What Makes Up India&apos;s GDP?
      </SectionHeading>

      <ContentCard className="mb-6">
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Sector Shares ({gdpSectors.currentYear.fiscalYear})</h4>
        <div className="space-y-6">
          {Object.entries(gdpSectors.currentYear.sectors).map(([key, sector]) => (
            <div key={key}>
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <span className="font-semibold text-[#1a2e44]">{sector.name}</span>
                  <span className="text-sm text-[#6b7c8f] ml-2">({sector.hindi})</span>
                </div>
                <div className="text-right">
                  <span className="font-serif font-bold text-[#1a2e44]">{sector.sharePercent}%</span>
                  <span className="text-sm text-[#7a9e7e] ml-2">+{sector.growthPercent}%</span>
                </div>
              </div>
              <div className="h-3 bg-[#e5e0d8]/50 rounded-sm overflow-hidden mb-1">
                <div
                  className={`h-full rounded-sm ${
                    key === 'services' ? 'bg-[#4a6fa5]' :
                    key === 'industry' ? 'bg-[#b85c38]' :
                    'bg-[#7a9e7e]'
                  }`}
                  style={{ width: `${sector.sharePercent}%` }}
                />
              </div>
              <p className="text-sm text-[#6b7c8f]">{sector.description}</p>
            </div>
          ))}
        </div>
      </ContentCard>

      <MarginNote label="The big shift">
        In 1950, agriculture was 52% of GDP. Today it&apos;s just 18% — but still employs
        46% of the workforce. This mismatch is why farm incomes remain low.
      </MarginNote>

      {/* Sector Evolution */}
      <ContentCard className="mb-6">
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">How Sectors Have Changed</h4>
        <div className="space-y-3">
          {gdpSectors.historical.map((year) => (
            <div key={year.year} className="flex items-center gap-2">
              <span className="w-16 font-sans text-sm text-[#6b7c8f]">{year.year}</span>
              <div className="flex-1 h-6 flex rounded-sm overflow-hidden">
                <div
                  className="bg-[#7a9e7e] h-full"
                  style={{ width: `${year.agriculture}%` }}
                  title={`Agriculture: ${year.agriculture}%`}
                />
                <div
                  className="bg-[#b85c38] h-full"
                  style={{ width: `${year.industry}%` }}
                  title={`Industry: ${year.industry}%`}
                />
                <div
                  className="bg-[#4a6fa5] h-full"
                  style={{ width: `${year.services}%` }}
                  title={`Services: ${year.services}%`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-6 mt-4 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#7a9e7e] rounded-sm" />
            Agriculture
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#b85c38] rounded-sm" />
            Industry
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#4a6fa5] rounded-sm" />
            Services
          </span>
        </div>
      </ContentCard>

      <KeyConcept title="Services-led growth">
        India&apos;s growth is unusual — most countries industrialized first (like China),
        then moved to services. India leapfrogged directly to services (IT, finance, telecom).
        This is why &quot;Make in India&quot; tries to boost manufacturing.
      </KeyConcept>

      {/* Global Comparison */}
      <SectionHeading chapter={5} subtitle="Where India stands globally">
        Comparing with the World
      </SectionHeading>

      <DataTable>
        <TableHead>
          <TableHeader>Rank</TableHeader>
          <TableHeader>Country</TableHeader>
          <TableHeader className="text-right">GDP</TableHeader>
          <TableHeader className="text-right">Per Capita</TableHeader>
        </TableHead>
        <TableBody>
          {gdpGlobal.topEconomies.slice(0, 7).map((country) => (
            <TableRow key={country.country}>
              <TableCell className={country.highlight ? 'font-semibold text-[#b85c38]' : ''}>
                #{country.rank}
              </TableCell>
              <TableCell className={country.highlight ? 'font-semibold text-[#1a2e44]' : ''}>
                {country.country}
              </TableCell>
              <TableCell className="text-right">${country.gdpUsdTn.toFixed(2)}T</TableCell>
              <TableCell className="text-right">${country.perCapitaUsd.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>

      <MarginNote label="The paradox">
        India is the 5th largest economy but ranks 139th in per capita income.
        Our GDP per capita is just 3% of the USA&apos;s — because we have 4x their population.
      </MarginNote>

      {/* Asian Comparison */}
      <ContentCard className="mb-6">
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Among Asian Economies</h4>
        <div className="space-y-3">
          {gdpGlobal.asianComparison.slice(0, 6).map((country) => (
            <div key={country.country} className={`flex items-center justify-between py-2 border-b border-[#e5e0d8] last:border-0 ${country.highlight ? 'bg-[#FFF8E7] -mx-4 px-4' : ''}`}>
              <span className={`font-sans ${country.highlight ? 'font-semibold text-[#1a2e44]' : 'text-[#4a5568]'}`}>
                {country.country}
              </span>
              <div className="flex items-center gap-6 text-sm">
                <span className="text-[#6b7c8f]">${country.gdpUsdTn.toFixed(2)}T</span>
                <span className={`font-medium ${country.growthPercent && country.growthPercent > 5 ? 'text-[#7a9e7e]' : 'text-[#6b7c8f]'}`}>
                  +{country.growthPercent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </ContentCard>

      {/* Future Projections */}
      <SectionHeading subtitle="What the future might hold">
        Projections
      </SectionHeading>

      <ContentCard className="mb-6">
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">IMF Growth Outlook</h4>
        <div className="space-y-4">
          {gdpGlobal.projections.data.map((proj) => (
            <div key={proj.year} className="flex items-center justify-between py-2 border-b border-[#e5e0d8] last:border-0">
              <div>
                <span className="font-semibold text-[#1a2e44]">{proj.year}</span>
                {proj.note && (
                  <span className="text-sm text-[#6b7c8f] ml-2">— {proj.note}</span>
                )}
              </div>
              <div className="text-right">
                <span className="font-serif font-bold text-[#1a2e44]">${proj.projectedGdpUsdTn.toFixed(2)}T</span>
                <span className="text-sm text-[#6b7c8f] ml-2">Rank #{proj.projectedRank}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-[#6b7c8f] mt-4 italic">
          * Projections based on current growth trajectory. Actual results may vary.
        </p>
      </ContentCard>

      <KeyConcept title="The $5 Trillion Goal">
        India aims to become a $5 trillion economy. At current growth rates, this could
        happen around 2027-28. But more important than the number is ensuring growth
        creates jobs and reduces poverty.
      </KeyConcept>

      {/* Summary */}
      <SectionHeading>Quick Summary</SectionHeading>

      <ContentCard>
        <ul className="space-y-3 text-[#4a5568]">
          <li className="flex gap-3">
            <span className="text-[#b85c38] font-semibold">1.</span>
            <span><strong className="text-[#1a2e44]">GDP</strong> measures the total value of everything produced in a country</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b85c38] font-semibold">2.</span>
            <span>India&apos;s GDP is ~<strong className="text-[#1a2e44]">$4 trillion</strong> (5th largest), but per capita is just <strong className="text-[#1a2e44]">$2,730</strong> (139th)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b85c38] font-semibold">3.</span>
            <span><strong className="text-[#1a2e44]">Services</strong> (55%) dominate our economy, followed by Industry (27%) and Agriculture (18%)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b85c38] font-semibold">4.</span>
            <span>Since 1991 liberalization, India&apos;s GDP has grown <strong className="text-[#1a2e44]">{gdpGrowthTimes}x</strong></span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b85c38] font-semibold">5.</span>
            <span>India could become the <strong className="text-[#1a2e44]">3rd largest economy</strong> by 2030</span>
          </li>
        </ul>
      </ContentCard>

      {/* Source Attribution */}
      <SourceFooter sourceIds={['mospi-national-accounts', 'world-bank-gdp']} />
    </main>
  )
}
