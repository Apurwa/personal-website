import { Metadata } from 'next'
import { Breadcrumb } from '../components/Breadcrumb'
import { SourceFooter } from '../components/SourceFooter'
import { PageTOC } from '../components/PageTOC'
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
import { getEmploymentData } from '../data'
import { ScrollReveal } from '../components/ScrollReveal'
import { CountUpStat } from '../components/CountUpStat'

export const metadata: Metadata = {
  title: 'Employment in India - Jobs, MGNREGA, Gig Economy',
  description: 'Where do 56 crore Indians work? Formal vs informal sector (79% without benefits), MGNREGA, gig economy (23M workers by 2030), youth unemployment, women in workforce, and Skill India.',
  keywords: ['unemployment India', 'MGNREGA', 'gig economy India', 'informal sector India', 'youth unemployment', 'women workforce India', 'Skill India', 'EPFO', 'labour laws India', 'PLFS data'],
  alternates: {
    canonical: 'https://apurwasarwajit.com/india-economy/employment',
  },
  openGraph: {
    title: 'Employment in India - Jobs & Labour Market | India Economy',
    description: 'India\'s employment story: 79% informal sector, MGNREGA, gig workers, youth unemployment, and the future of work.',
    url: 'https://apurwasarwajit.com/india-economy/employment',
  },
}

export default function EmploymentPage() {
  const data = getEmploymentData()

  const tocItems = [
    { id: 'unemployment', title: 'Understanding Unemployment', chapter: 1 },
    { id: 'where-indians-work', title: 'Where Do Indians Work?', chapter: 2 },
    { id: 'formal-vs-informal', title: 'Formal vs Informal Sector', chapter: 3 },
    { id: 'women-in-workforce', title: 'Women in the Workforce', chapter: 4 },
    { id: 'gig-economy', title: 'The Gig Economy', chapter: 5 },
    { id: 'mgnrega', title: 'MGNREGA: Rural Employment Guarantee', chapter: 6 },
    { id: 'skill-india', title: 'Skill India', chapter: 7 },
    { id: 'labour-reforms', title: 'Labour Law Reforms', chapter: 8 },
    { id: 'future-of-work', title: 'Future of Work', chapter: 9 },
  ]

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'India Economy', href: '/india-economy' },
          { label: 'Employment' },
        ]}
      />

      {/* Hero */}
      <header className="mt-8 mb-16">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#b85c38] mb-3 animate-fade-in">
          Labour Market
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1a2e44] mb-4 leading-tight animate-fade-in-up delay-1">
          Employment
        </h1>
        <p className="font-sans text-[#4a5568] text-lg leading-relaxed animate-fade-in-up delay-2">
          India has {data.overview.totalWorkforce} crore workers — the world&apos;s largest workforce after China.
          But 79% work in the informal sector without social security. Explore the employment landscape.
        </p>
      </header>

      <PageTOC items={tocItems} />

      {/* Overview Stats */}
      <section className="mb-16 animate-fade-in-up delay-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CountUpStat
            value={data.overview.totalWorkforce}
            suffix=" Cr"
            label="Total Workforce"
            sublabel="Employed persons"
          />
          <CountUpStat
            value={data.overview.unemploymentRate}
            suffix="%"
            decimals={1}
            label="Unemployment"
            sublabel="Record low (2023-24)"
          />
          <CountUpStat
            value={data.overview.labourForceParticipation}
            suffix="%"
            decimals={1}
            label="LFPR"
            sublabel="Labour participation"
          />
          <CountUpStat
            value={data.overview.informalSectorShare}
            suffix="%"
            label="Informal Sector"
            sublabel="Without social security"
          />
        </div>
      </section>

      {/* Unemployment */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={1} id="unemployment">
            Understanding Unemployment
          </SectionHeading>
        </ScrollReveal>

        <ScrollReveal animation="fade-up">
          <Definition term="Unemployment Rate" hindi="बेरोज़गारी दर">
            The percentage of people in the labour force who are actively seeking work but cannot find it.
            India uses three methods to measure this — each giving different numbers.
          </Definition>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-8">
          <CountUpStat
            value={data.unemploymentMetrics.currentRate.overall}
            suffix="%"
            decimals={1}
            label="Overall"
            sublabel="National average"
          />
          <CountUpStat
            value={data.unemploymentMetrics.currentRate.urban}
            suffix="%"
            decimals={1}
            label="Urban"
            sublabel="Cities"
          />
          <CountUpStat
            value={data.unemploymentMetrics.currentRate.rural}
            suffix="%"
            decimals={1}
            label="Rural"
            sublabel="Villages"
          />
          <CountUpStat
            value={data.unemploymentMetrics.youthUnemployment.age15to29}
            suffix="%"
            decimals={1}
            label="Youth (15-29)"
            sublabel="Higher than average"
          />
          <CountUpStat
            value={data.unemploymentMetrics.youthUnemployment.graduates}
            suffix="%"
            decimals={1}
            label="Graduates"
            sublabel="Skills mismatch"
          />
        </div>

        <ScrollReveal animation="slide-left">
          <MarginNote label="Paradox">
            {data.unemploymentMetrics.youthUnemployment.note}
          </MarginNote>
        </ScrollReveal>

        {/* Historical Trend */}
        <ScrollReveal animation="fade-up">
          <ContentCard className="mt-8">
            <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Unemployment Trend</h4>
            <div className="space-y-2">
              {data.unemploymentMetrics.historical.map((entry) => (
                <div key={entry.year} className="flex items-center gap-4">
                  <span className="font-sans text-sm text-[#6b7c8f] w-20">{entry.year}</span>
                  <div className="flex-1 bg-[#f5f0eb] rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#b85c38] to-[#d4a84b] rounded-full"
                      style={{ width: `${(entry.rate / 7) * 100}%` }}
                    />
                  </div>
                  <span className="font-sans text-sm font-medium text-[#1a2e44] w-12 text-right">
                    {entry.rate}%
                  </span>
                  {entry.notes && (
                    <span className="font-sans text-xs text-[#6b7c8f] w-28 hidden md:block">
                      {entry.notes}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </ContentCard>
        </ScrollReveal>
      </section>

      {/* Sector Distribution */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={2} id="where-indians-work">
            Where Do Indians Work?
          </SectionHeading>
        </ScrollReveal>

        <p className="font-sans text-[#4a5568] leading-relaxed mb-6">
          {data.sectorDistribution.insight}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {data.sectorDistribution.bySector.map((sector, index) => (
            <ScrollReveal key={sector.sector} animation="fade-up" delay={index + 1}>
              <ContentCard className="text-center">
                <p className="font-serif text-3xl font-bold text-[#4a6fa5]">{sector.share}%</p>
                <p className="font-sans font-medium text-[#1a2e44]">{sector.sector}</p>
                <p className="font-sans text-xs text-[#6b7c8f]">{sector.hindi}</p>
                <p className="font-sans text-xs text-[#6b7c8f] mt-2">{sector.workers} Cr workers</p>
                <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs ${
                  sector.trend === 'Growing' ? 'bg-[#e8f4ea] text-[#2d5a3d]' :
                  sector.trend === 'Declining' ? 'bg-[#fef2f2] text-[#b85c38]' :
                  'bg-[#f5f0eb] text-[#6b7c8f]'
                }`}>
                  {sector.trend}
                </span>
              </ContentCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="fade-up">
          <KeyConcept title="The Productivity Gap">
            Agriculture employs 46% of workers but contributes only 18% to GDP.
            This means agricultural workers earn much less than those in services or industry.
          </KeyConcept>
        </ScrollReveal>
      </section>

      {/* Formal vs Informal */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={3} id="formal-vs-informal">
            Formal vs Informal Sector
          </SectionHeading>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Formal */}
          <ScrollReveal animation="fade-up" delay={1}>
            <ContentCard className="border-2 border-[#7a9e7e]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl font-semibold text-[#1a2e44]">Formal Sector</h3>
                <span className="font-serif text-2xl font-bold text-[#7a9e7e]">
                  {data.formalVsInformal.formal.share}%
                </span>
              </div>
              <p className="font-sans text-xs text-[#6b7c8f] mb-4">{data.formalVsInformal.formal.hindi}</p>

              <p className="font-sans text-sm text-[#4a5568] mb-4">
                {data.formalVsInformal.formal.definition}
              </p>

              <p className="font-sans text-lg font-medium text-[#1a2e44] mb-4">
                {data.formalVsInformal.formal.workers} crore workers
              </p>

              <ul className="space-y-1 mb-4">
                {data.formalVsInformal.formal.characteristics.map((char, i) => (
                  <li key={i} className="font-sans text-xs text-[#4a5568] flex items-start gap-2">
                    <span className="text-[#7a9e7e]">✓</span> {char}
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-[#e5e0d8]">
                {data.formalVsInformal.formal.breakdown.map((b) => (
                  <div key={b.type} className="flex justify-between text-sm mb-1">
                    <span className="text-[#6b7c8f]">{b.type}</span>
                    <span className="text-[#1a2e44]">{b.workers} Cr ({b.share}%)</span>
                  </div>
                ))}
              </div>
            </ContentCard>
          </ScrollReveal>

          {/* Informal */}
          <ScrollReveal animation="fade-up" delay={2}>
            <ContentCard className="border-2 border-[#b85c38]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl font-semibold text-[#1a2e44]">Informal Sector</h3>
                <span className="font-serif text-2xl font-bold text-[#b85c38]">
                  {data.formalVsInformal.informal.share}%
                </span>
              </div>
              <p className="font-sans text-xs text-[#6b7c8f] mb-4">{data.formalVsInformal.informal.hindi}</p>

              <p className="font-sans text-sm text-[#4a5568] mb-4">
                {data.formalVsInformal.informal.definition}
              </p>

              <p className="font-sans text-lg font-medium text-[#1a2e44] mb-4">
                {data.formalVsInformal.informal.workers} crore workers
              </p>

              <ul className="space-y-1 mb-4">
                {data.formalVsInformal.informal.characteristics.map((char, i) => (
                  <li key={i} className="font-sans text-xs text-[#4a5568] flex items-start gap-2">
                    <span className="text-[#b85c38]">✗</span> {char}
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-[#e5e0d8]">
                {data.formalVsInformal.informal.breakdown.map((b) => (
                  <div key={b.type} className="flex justify-between text-sm mb-1">
                    <span className="text-[#6b7c8f]">{b.type}</span>
                    <span className="text-[#1a2e44]">{b.workers} Cr ({b.share}%)</span>
                  </div>
                ))}
              </div>
            </ContentCard>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="slide-left">
          <MarginNote label="EPFO Data">
            {data.formalVsInformal.epfoData.description}. Total subscribers: {data.formalVsInformal.epfoData.totalSubscribers} crore.
            Monthly additions: {data.formalVsInformal.epfoData.monthlyAdditions} lakh new members.
          </MarginNote>
        </ScrollReveal>
      </section>

      {/* Women in Workforce */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={4} id="women-in-workforce">
            Women in the Workforce
          </SectionHeading>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <CountUpStat
            value={data.womenInWorkforce.lfpr.overall}
            suffix="%"
            decimals={1}
            label="Female LFPR"
            sublabel="Overall"
          />
          <CountUpStat
            value={data.womenInWorkforce.lfpr.rural}
            suffix="%"
            decimals={1}
            label="Rural Women"
            sublabel="Higher participation"
          />
          <CountUpStat
            value={data.womenInWorkforce.lfpr.urban}
            suffix="%"
            decimals={1}
            label="Urban Women"
            sublabel="Lower participation"
          />
          <CountUpStat
            value={62}
            suffix="%"
            label="In Agriculture"
            sublabel="Primary sector"
          />
        </div>

        <ScrollReveal animation="fade-up">
          <ContentCard className="mb-8">
            <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Women&apos;s LFPR Trend</h4>
            <div className="space-y-2">
              {data.womenInWorkforce.historical.map((entry) => (
                <div key={entry.year} className="flex items-center gap-4">
                  <span className="font-sans text-sm text-[#6b7c8f] w-20">{entry.year}</span>
                  <div className="flex-1 bg-[#f5f0eb] rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#4a6fa5] to-[#7a9e7e] rounded-full"
                      style={{ width: `${(entry.lfpr / 45) * 100}%` }}
                    />
                  </div>
                  <span className="font-sans text-sm font-medium text-[#1a2e44] w-12 text-right">
                    {entry.lfpr}%
                  </span>
                </div>
              ))}
            </div>
            <p className="font-sans text-xs text-[#7a9e7e] mt-4">
              Women&apos;s participation rose from 23% to 37% in 6 years — a significant improvement
            </p>
          </ContentCard>
        </ScrollReveal>

        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Barriers to Women&apos;s Employment</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {data.womenInWorkforce.barriers.map((barrier, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-[#fef2f2] rounded">
              <span className="text-[#b85c38]">!</span>
              <span className="font-sans text-sm text-[#4a5568]">{barrier}</span>
            </div>
          ))}
        </div>

        <ScrollReveal animation="fade-up">
          <DataTable>
            <TableHead>
              <TableHeader>Country</TableHeader>
              <TableHeader>Female LFPR</TableHeader>
            </TableHead>
            <TableBody>
              {data.womenInWorkforce.globalComparison.map((country) => (
                <TableRow key={country.country}>
                  <TableCell className={country.highlight ? 'font-medium text-[#b85c38]' : ''}>
                    {country.country}
                  </TableCell>
                  <TableCell>{country.femaleLfpr}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        </ScrollReveal>
      </section>

      {/* Gig Economy */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={5} id="gig-economy">
            The Gig Economy
          </SectionHeading>
        </ScrollReveal>

        <ScrollReveal animation="fade-up">
          <Definition term="Gig Economy" hindi={data.gigEconomy.hindi}>
            {data.gigEconomy.definition}
          </Definition>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          <CountUpStat
            value={data.gigEconomy.currentWorkers}
            suffix="M"
            label="Current Workers"
            sublabel="Gig & platform"
          />
          <CountUpStat
            value={data.gigEconomy.projectedWorkers2030}
            suffix="M"
            label="By 2030"
            sublabel="Projected"
          />
          <CountUpStat
            value={205}
            suffix="%"
            label="Growth"
            sublabel="Expected by 2030"
          />
          <CountUpStat
            value={Math.round(data.gigEconomy.workerProfile.averageEarning / 1000)}
            prefix="₹"
            suffix="K"
            label="Avg. Earning"
            sublabel="Per month"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <ScrollReveal animation="fade-up" delay={1}>
            <ContentCard>
              <h5 className="font-sans font-medium text-[#1a2e44] mb-2">Transport</h5>
              <p className="font-sans text-sm text-[#6b7c8f]">
                {data.gigEconomy.platforms.transportation.join(', ')}
              </p>
            </ContentCard>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={2}>
            <ContentCard>
              <h5 className="font-sans font-medium text-[#1a2e44] mb-2">Delivery</h5>
              <p className="font-sans text-sm text-[#6b7c8f]">
                {data.gigEconomy.platforms.delivery.join(', ')}
              </p>
            </ContentCard>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={3}>
            <ContentCard>
              <h5 className="font-sans font-medium text-[#1a2e44] mb-2">Services</h5>
              <p className="font-sans text-sm text-[#6b7c8f]">
                {data.gigEconomy.platforms.services.join(', ')}
              </p>
            </ContentCard>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={4}>
            <ContentCard>
              <h5 className="font-sans font-medium text-[#1a2e44] mb-2">Freelance</h5>
              <p className="font-sans text-sm text-[#6b7c8f]">
                {data.gigEconomy.platforms.freelance.join(', ')}
              </p>
            </ContentCard>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="fade-up">
          <KeyConcept title="Gig Worker Challenges">
            <ul className="space-y-1">
              {data.gigEconomy.challenges.map((challenge, i) => (
                <li key={i} className="font-sans text-sm text-[#4a5568] flex items-start gap-2">
                  <span className="text-[#b85c38]">•</span> {challenge}
                </li>
              ))}
            </ul>
          </KeyConcept>
        </ScrollReveal>

        <ScrollReveal animation="slide-left">
          <MarginNote label="e-Shram">
            The government&apos;s e-Shram portal has registered {data.gigEconomy.governmentInitiatives[0].registered} crore
            unorganized workers to provide them social security benefits.
          </MarginNote>
        </ScrollReveal>
      </section>

      {/* MGNREGA */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={6} id="mgnrega">
            MGNREGA: Rural Employment Guarantee
          </SectionHeading>
        </ScrollReveal>

        <ScrollReveal animation="fade-up">
          <Definition term="MGNREGA" hindi={data.mgnrega.hindi}>
            {data.mgnrega.fullForm} — guarantees {data.mgnrega.guarantee} in {data.mgnrega.coverage}.
            Launched in {data.mgnrega.launched}.
          </Definition>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          <CountUpStat
            value={data.mgnrega.currentStats.householdsEmployed}
            suffix=" Cr"
            decimals={1}
            label="Households"
            sublabel="Employed in FY24"
          />
          <CountUpStat
            value={data.mgnrega.currentStats.personDays}
            suffix=" Cr"
            label="Person-Days"
            sublabel="Generated"
          />
          <CountUpStat
            value={data.mgnrega.currentStats.averageWage}
            prefix="₹"
            label="Daily Wage"
            sublabel="National average"
          />
          <CountUpStat
            value={data.mgnrega.currentStats.womenParticipation}
            suffix="%"
            label="Women"
            sublabel="Of total workers"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ScrollReveal animation="fade-up" delay={1}>
            <ContentCard>
              <h4 className="font-serif font-semibold text-[#7a9e7e] mb-3">Impact</h4>
              <ul className="space-y-2">
                {data.mgnrega.impact.map((item, i) => (
                  <li key={i} className="font-sans text-sm text-[#4a5568] flex items-start gap-2">
                    <span className="text-[#7a9e7e]">✓</span> {item}
                  </li>
                ))}
              </ul>
            </ContentCard>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={2}>
            <ContentCard>
              <h4 className="font-serif font-semibold text-[#b85c38] mb-3">Challenges</h4>
              <ul className="space-y-2">
                {data.mgnrega.challenges.map((item, i) => (
                  <li key={i} className="font-sans text-sm text-[#4a5568] flex items-start gap-2">
                    <span className="text-[#b85c38]">!</span> {item}
                  </li>
                ))}
              </ul>
            </ContentCard>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="fade-up">
          <DataTable>
            <TableHead>
              <TableHeader>State</TableHeader>
              <TableHeader>Person-Days (Crore)</TableHeader>
            </TableHead>
            <TableBody>
              {data.mgnrega.topStates.map((state) => (
                <TableRow key={state.state}>
                  <TableCell className="font-medium">{state.state}</TableCell>
                  <TableCell>{state.personDays}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        </ScrollReveal>
      </section>

      {/* Skill India */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={7} id="skill-india">
            Skill India
          </SectionHeading>
        </ScrollReveal>

        <p className="font-sans text-[#4a5568] leading-relaxed mb-6">
          {data.skillIndia.description}. Target: {data.skillIndia.target}
        </p>

        <ScrollReveal animation="fade-up">
          <KeyConcept title="India's Skill Gap">
            Only {data.skillIndia.nsfData.formallySkilled}% of India&apos;s workforce is formally skilled,
            compared to 96% in South Korea, 80% in Japan, and 75% in Germany.
          </KeyConcept>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          {data.skillIndia.programs.slice(0, 4).map((program, index) => (
            <ScrollReveal key={program.name} animation="fade-up" delay={index + 1}>
              <ContentCard>
                <h4 className="font-serif font-semibold text-[#1a2e44]">{program.name}</h4>
                {program.fullForm && (
                  <p className="font-sans text-xs text-[#6b7c8f] mb-2">{program.fullForm}</p>
                )}
                {program.description && (
                  <p className="font-sans text-sm text-[#4a5568] mb-2">{program.description}</p>
                )}
                <div className="flex gap-4 mt-3">
                  {program.trained && (
                    <div>
                      <p className="font-serif text-xl font-bold text-[#4a6fa5]">{program.trained} Cr</p>
                      <p className="font-sans text-xs text-[#6b7c8f]">Trained</p>
                    </div>
                  )}
                  {program.institutes && (
                    <div>
                      <p className="font-serif text-xl font-bold text-[#4a6fa5]">{program.institutes.toLocaleString()}</p>
                      <p className="font-sans text-xs text-[#6b7c8f]">Institutes</p>
                    </div>
                  )}
                  {program.placement && (
                    <div>
                      <p className="font-serif text-xl font-bold text-[#b85c38]">{program.placement}%</p>
                      <p className="font-sans text-xs text-[#6b7c8f]">Placement</p>
                    </div>
                  )}
                </div>
              </ContentCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="fade-up">
          <DataTable>
            <TableHead>
              <TableHeader>Country</TableHeader>
              <TableHeader>Formally Skilled Workforce</TableHeader>
            </TableHead>
            <TableBody>
              {data.skillIndia.nsfData.globalComparison.map((country) => (
                <TableRow key={country.country}>
                  <TableCell className={country.highlight ? 'font-medium text-[#b85c38]' : ''}>
                    {country.country}
                  </TableCell>
                  <TableCell>{country.skilled}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        </ScrollReveal>
      </section>

      {/* Labour Reforms */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={8} id="labour-reforms">
            Labour Law Reforms
          </SectionHeading>
        </ScrollReveal>

        <p className="font-sans text-[#4a5568] leading-relaxed mb-6">
          {data.labourReforms.description}
        </p>

        <div className="space-y-4 mb-8">
          {data.labourReforms.codes.map((code, index) => (
            <ScrollReveal key={code.code} animation="fade-up" delay={index + 1}>
              <ContentCard>
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0">
                    <span className="inline-block px-3 py-1 bg-[#4a6fa5] text-white font-sans text-sm rounded">
                      Replaces {code.replaces}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif font-semibold text-[#1a2e44]">{code.code}</h4>
                    <p className="font-sans text-xs text-[#6b7c8f] mb-3">{code.hindi}</p>
                    <ul className="space-y-1">
                      {code.keyFeatures.slice(0, 3).map((feature, i) => (
                        <li key={i} className="font-sans text-sm text-[#4a5568] flex items-start gap-2">
                          <span className="text-[#4a6fa5]">•</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ContentCard>
            </ScrollReveal>
          ))}
        </div>

        <p className="font-sans text-sm text-[#6b7c8f] italic">
          Status: {data.labourReforms.status}
        </p>
      </section>

      {/* Future of Work */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={9} id="future-of-work">
            Future of Work
          </SectionHeading>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ScrollReveal animation="fade-up" delay={1}>
            <ContentCard>
              <h4 className="font-serif font-semibold text-[#b85c38] mb-4">Automation Risk</h4>
              <p className="font-serif text-3xl font-bold text-[#b85c38]">
                {data.futureOfWork.automation.jobsAtRisk}M
              </p>
              <p className="font-sans text-sm text-[#4a5568] mb-4">
                jobs at high automation risk by 2030
              </p>
              <p className="font-sans text-xs text-[#6b7c8f]">
                Sectors: {data.futureOfWork.automation.sectorsAffected.join(', ')}
              </p>
            </ContentCard>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={2}>
            <ContentCard>
              <h4 className="font-serif font-semibold text-[#7a9e7e] mb-4">New Opportunities</h4>
              <p className="font-serif text-3xl font-bold text-[#7a9e7e]">
                {data.futureOfWork.automation.newJobsCreated}M
              </p>
              <p className="font-sans text-sm text-[#4a5568] mb-4">
                new jobs possible with reskilling
              </p>
              <div className="space-y-1">
                {data.futureOfWork.emergingSectors.slice(0, 3).map((sector) => (
                  <p key={sector.sector} className="font-sans text-xs text-[#6b7c8f]">
                    {sector.sector}: {sector.potential}
                  </p>
                ))}
              </div>
            </ContentCard>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="fade-up">
          <KeyConcept title="Demographic Dividend">
            {data.futureOfWork.demographicDividend.description}
            <p className="font-sans text-sm text-[#4a5568] mt-2">
              <strong>Window:</strong> {data.futureOfWork.demographicDividend.window}<br />
              <strong>Challenge:</strong> {data.futureOfWork.demographicDividend.challenge}<br />
              <strong>Opportunity:</strong> {data.futureOfWork.demographicDividend.opportunity}
            </p>
          </KeyConcept>
        </ScrollReveal>
      </section>

      {/* Key Insights */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
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
        </ScrollReveal>
      </section>

      {/* Cross-links */}
      <section className="mb-16 p-6 bg-[#f5f0eb] rounded-lg">
        <h3 className="font-serif font-semibold text-[#1a2e44] mb-4">Related Topics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/india-economy/gdp"
            className="block p-4 bg-white rounded border border-[#e5e0d8] hover-lift"
          >
            <p className="font-serif font-semibold text-[#4a6fa5]">GDP & Growth</p>
            <p className="font-sans text-sm text-[#6b7c8f]">
              How employment contributes to economic growth
            </p>
          </a>
          <a
            href="/india-economy/budget"
            className="block p-4 bg-white rounded border border-[#e5e0d8] hover-lift"
          >
            <p className="font-serif font-semibold text-[#4a6fa5]">Union Budget</p>
            <p className="font-sans text-sm text-[#6b7c8f]">
              MGNREGA and skill development allocations
            </p>
          </a>
        </div>
      </section>

      {/* Source Footer */}
      <SourceFooter sourceIds={['mospi-plfs-labour', 'labour-ministry-stats']} />
    </main>
  )
}
