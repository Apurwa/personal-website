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
import { getTaxationData } from '../data'
import { ScrollReveal } from '../components/ScrollReveal'
import { CountUpStat } from '../components/CountUpStat'

export const metadata: Metadata = {
  title: 'India Taxation - Income Tax, GST Explained',
  description: 'Income tax slabs (old vs new regime), GST explained (5 slabs), corporate tax rates, TDS, capital gains tax. Only 2.2% of Indians pay income tax. Complete guide to Indian taxation.',
  keywords: ['income tax slabs India', 'GST rates India', 'new tax regime', 'old tax regime', 'corporate tax India', 'TDS rates', 'capital gains tax India', 'section 80C', 'ITR filing', 'tax to GDP ratio'],
  alternates: {
    canonical: 'https://apurwasarwajit.com/india-economy/taxes',
  },
  openGraph: {
    title: 'India Taxation - Income Tax, GST | India Economy',
    description: 'Income tax old vs new regime, GST slabs, corporate tax, TDS explained. Only 2.2% Indians pay income tax.',
    url: 'https://apurwasarwajit.com/india-economy/taxes',
  },
}

export default function TaxesPage() {
  const data = getTaxationData()

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'India Economy', href: '/india-economy' },
          { label: 'Taxation' },
        ]}
      />

      {/* Hero */}
      <header className="mt-8 mb-16">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#b85c38] mb-3 animate-fade-in">
          Government Revenue
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1a2e44] mb-4 leading-tight animate-fade-in-up delay-1">
          Taxation
        </h1>
        <p className="font-sans text-[#4a5568] text-lg leading-relaxed animate-fade-in-up delay-2">
          India collects ₹{data.overview.grossTaxRevenue} lakh crore in taxes annually. From income tax
          to GST, understand how taxes fund everything from roads to defence.
        </p>
      </header>

      {/* Overview Stats */}
      <section className="mb-16 animate-fade-in-up delay-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CountUpStat
            value={data.overview.grossTaxRevenue}
            prefix="₹"
            suffix="L Cr"
            decimals={1}
            label="Total Tax Revenue"
            sublabel={`FY ${data.fiscalYear}`}
          />
          <CountUpStat
            value={data.overview.taxToGdp}
            suffix="%"
            decimals={1}
            label="Tax-to-GDP"
            sublabel="Among lowest globally"
          />
          <CountUpStat
            value={data.overview.taxpayersFiling}
            suffix=" Cr"
            decimals={1}
            label="ITR Filers"
            sublabel="Returns filed"
          />
          <CountUpStat
            value={data.overview.gstRegistrations}
            suffix=" Cr"
            decimals={1}
            label="GST Registrations"
            sublabel="Businesses"
          />
        </div>
      </section>

      {/* Direct vs Indirect */}
      <section className="mb-16 animate-fade-in-up delay-4">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={1}>
            Direct vs Indirect Taxes
          </SectionHeading>
        </ScrollReveal>

        <p className="font-sans text-[#4a5568] leading-relaxed mb-8">
          All taxes fall into two categories: those you pay directly to the government,
          and those collected through intermediaries.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Direct */}
          <ScrollReveal animation="fade-up" delay={1}>
            <ContentCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl font-semibold text-[#1a2e44]">Direct Taxes</h3>
                <span className="font-serif text-2xl font-bold text-[#4a6fa5]">
                  {data.directVsIndirect.direct.share}%
                </span>
              </div>
              <p className="font-sans text-xs text-[#6b7c8f] mb-4">{data.directVsIndirect.direct.hindi}</p>

              <Definition term="Direct Tax" hindi="">
                {data.directVsIndirect.direct.definition}
              </Definition>

              <div className="flex flex-wrap gap-2 my-4">
                {data.directVsIndirect.direct.examples.map((ex) => (
                  <span key={ex} className="px-2 py-1 bg-[#e8f0f8] text-[#2d4a6d] rounded text-xs">
                    {ex}
                  </span>
                ))}
              </div>

              <ul className="space-y-1">
                {data.directVsIndirect.direct.characteristics.map((char, i) => (
                  <li key={i} className="font-sans text-xs text-[#6b7c8f] flex items-start gap-2">
                    <span className="text-[#4a6fa5] mt-0.5">•</span>
                    {char}
                  </li>
                ))}
              </ul>
            </ContentCard>
          </ScrollReveal>

          {/* Indirect */}
          <ScrollReveal animation="fade-up" delay={2}>
            <ContentCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl font-semibold text-[#1a2e44]">Indirect Taxes</h3>
                <span className="font-serif text-2xl font-bold text-[#b85c38]">
                  {data.directVsIndirect.indirect.share}%
                </span>
              </div>
              <p className="font-sans text-xs text-[#6b7c8f] mb-4">{data.directVsIndirect.indirect.hindi}</p>

              <Definition term="Indirect Tax" hindi="">
                {data.directVsIndirect.indirect.definition}
              </Definition>

              <div className="flex flex-wrap gap-2 my-4">
                {data.directVsIndirect.indirect.examples.map((ex) => (
                  <span key={ex} className="px-2 py-1 bg-[#fef2f2] text-[#b85c38] rounded text-xs">
                    {ex}
                  </span>
                ))}
              </div>

              <ul className="space-y-1">
                {data.directVsIndirect.indirect.characteristics.map((char, i) => (
                  <li key={i} className="font-sans text-xs text-[#6b7c8f] flex items-start gap-2">
                    <span className="text-[#b85c38] mt-0.5">•</span>
                    {char}
                  </li>
                ))}
              </ul>
            </ContentCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Income Tax */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={2}>
            Income Tax
          </SectionHeading>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={1}>
          <Definition term="Income Tax" hindi={data.incomeTax.hindi}>
            {data.incomeTax.description}. Administered by the {data.incomeTax.adminBody}.
            Filing deadline: {data.incomeTax.filingDeadline}.
          </Definition>
        </ScrollReveal>

        <ScrollReveal animation="slide-left" delay={2}>
          <MarginNote label="Did you know">
            Only 2.2% of Indians pay income tax. Of {data.incomeTax.filingStats.fy2024.returnsFiled} crore
            returns filed, {data.incomeTax.filingStats.fy2024.zeroTaxPercent}% had zero tax liability.
          </MarginNote>
        </ScrollReveal>

        {/* Tax Regime Comparison */}
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4 mt-8">Old vs New Tax Regime</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Old Regime */}
          <ScrollReveal animation="fade-up" delay={1}>
            <ContentCard>
              <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">
                {data.incomeTax.oldRegime.name}
              </h4>
              <DataTable>
                <TableHead>
                  <TableHeader>Income</TableHeader>
                  <TableHeader>Rate</TableHeader>
                </TableHead>
                <TableBody>
                  {data.incomeTax.oldRegime.slabs.map((slab) => (
                    <TableRow key={slab.income}>
                      <TableCell>{slab.income}</TableCell>
                      <TableCell className="font-medium">{slab.rate}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </DataTable>
              <p className="font-sans text-xs text-[#7a9e7e] mt-4">
                <strong>Best for:</strong> {data.incomeTax.oldRegime.bestFor}
              </p>
              <div className="mt-4 pt-4 border-t border-[#e5e0d8]">
                <p className="font-sans text-xs text-[#6b7c8f] mb-2">Key deductions available:</p>
                <ul className="space-y-1">
                  {data.incomeTax.oldRegime.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} className="font-sans text-xs text-[#4a5568]">• {benefit}</li>
                  ))}
                </ul>
              </div>
            </ContentCard>
          </ScrollReveal>

          {/* New Regime */}
          <ScrollReveal animation="fade-up" delay={2}>
            <ContentCard className="border-2 border-[#4a6fa5]">
              <div className="flex items-center gap-2 mb-4">
                <h4 className="font-serif font-semibold text-[#1a2e44]">
                  {data.incomeTax.newRegime.name}
                </h4>
                <span className="px-2 py-0.5 bg-[#4a6fa5] text-white text-xs rounded">Default</span>
              </div>
              <DataTable>
                <TableHead>
                  <TableHeader>Income</TableHeader>
                  <TableHeader>Rate</TableHeader>
                </TableHead>
                <TableBody>
                  {data.incomeTax.newRegime.slabs.map((slab) => (
                    <TableRow key={slab.income}>
                      <TableCell>{slab.income}</TableCell>
                      <TableCell className="font-medium">{slab.rate}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </DataTable>
              <p className="font-sans text-xs text-[#7a9e7e] mt-4">
                <strong>Best for:</strong> {data.incomeTax.newRegime.bestFor}
              </p>
              <div className="mt-4 pt-4 border-t border-[#e5e0d8]">
                <p className="font-sans text-xs text-[#6b7c8f] mb-2">Benefits:</p>
                <ul className="space-y-1">
                  {data.incomeTax.newRegime.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} className="font-sans text-xs text-[#4a5568]">• {benefit}</li>
                  ))}
                </ul>
              </div>
            </ContentCard>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="fade-up">
          <KeyConcept title="Section 87A Rebate">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-sans text-sm text-[#6b7c8f]">Old Regime</p>
                <p className="font-sans font-medium text-[#1a2e44]">{data.incomeTax.rebate87A.oldRegime}</p>
              </div>
              <div>
                <p className="font-sans text-sm text-[#6b7c8f]">New Regime</p>
                <p className="font-sans font-medium text-[#1a2e44]">{data.incomeTax.rebate87A.newRegime}</p>
              </div>
            </div>
          </KeyConcept>
        </ScrollReveal>

        {/* Surcharge & Cess */}
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4 mt-8">Surcharge & Cess</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal animation="fade-up" delay={1}>
            <ContentCard>
              <h5 className="font-sans font-medium text-[#1a2e44] mb-3">Surcharge (on high income)</h5>
              <div className="space-y-2">
                {data.incomeTax.surcharge.map((s) => (
                  <div key={s.income} className="flex justify-between text-sm">
                    <span className="font-sans text-[#6b7c8f]">{s.income}</span>
                    <span className="font-sans font-medium text-[#b85c38]">{s.rate}%</span>
                  </div>
                ))}
              </div>
            </ContentCard>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={2}>
            <ContentCard>
              <h5 className="font-sans font-medium text-[#1a2e44] mb-3">{data.incomeTax.cess.name}</h5>
              <p className="font-serif text-3xl font-bold text-[#4a6fa5]">{data.incomeTax.cess.rate}%</p>
              <p className="font-sans text-sm text-[#6b7c8f] mt-2">
                Applied on: {data.incomeTax.cess.appliedOn}
              </p>
            </ContentCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Corporate Tax */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={3}>
            Corporate Tax
          </SectionHeading>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={1}>
          <Definition term="Corporate Tax" hindi={data.corporateTax.hindi}>
            {data.corporateTax.description}
          </Definition>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={2}>
          <DataTable>
            <TableHead>
              <TableHeader>Category</TableHeader>
              <TableHeader>Base Rate</TableHeader>
              <TableHeader>Effective Rate</TableHeader>
            </TableHead>
            <TableBody>
              {data.corporateTax.rates.map((rate) => (
                <TableRow key={rate.category}>
                  <TableCell>{rate.category}</TableCell>
                  <TableCell>{rate.rate}%</TableCell>
                  <TableCell className="font-medium">{rate.effective}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        </ScrollReveal>

        <ScrollReveal animation="slide-left" delay={3}>
          <MarginNote label="2019 Reform">
            The corporate tax cut from 30% to 22% (and 15% for new manufacturing) made India
            competitive with Singapore (17%) and Hong Kong (16.5%).
          </MarginNote>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <CountUpStat
            value={data.corporateTax.collection.fy2024}
            prefix="₹"
            suffix="L Cr"
            decimals={1}
            label="FY24 Collection"
            sublabel={`+${data.corporateTax.collection.growth}% growth`}
          />
          <CountUpStat
            value={data.corporateTax.minimumAlternateTax.rate}
            suffix="%"
            decimals={0}
            label="MAT Rate"
            sublabel="Minimum Alternate Tax"
          />
        </div>
      </section>

      {/* GST */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={4}>
            GST: One Nation, One Tax
          </SectionHeading>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={1}>
          <Definition term="GST" hindi={data.gst.hindi}>
            {data.gst.fullForm} — {data.gst.description}. Launched on {data.gst.launchDate}.
            Governed by the {data.gst.governingBody}.
          </Definition>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          <CountUpStat
            value={data.gst.collection.fy2024Total}
            prefix="₹"
            suffix="L Cr"
            decimals={1}
            label="FY24 Collection"
            sublabel="Total GST"
          />
          <CountUpStat
            value={data.gst.collection.monthlyAverage}
            prefix="₹"
            suffix="L Cr"
            decimals={2}
            label="Monthly Average"
            sublabel="Current year"
          />
          <CountUpStat
            value={data.gst.collection.highestEver}
            prefix="₹"
            suffix="L Cr"
            decimals={2}
            label="Record High"
            sublabel={data.gst.collection.highestMonth}
          />
          <CountUpStat
            value={data.gst.taxesReplaced.length}
            label="Taxes Replaced"
            sublabel="Unified system"
          />
        </div>

        {/* GST Slabs */}
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">GST Slabs</h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {data.gst.slabs.map((slab, index) => (
            <ScrollReveal key={slab.rate} animation="fade-up" delay={index + 1}>
              <ContentCard className="text-center">
                <p className="font-serif text-3xl font-bold text-[#4a6fa5]">{slab.rate}%</p>
                <p className="font-sans text-xs text-[#6b7c8f] mt-2">{slab.items[0]}</p>
                <div className="mt-3 pt-3 border-t border-[#e5e0d8]">
                  <p className="font-sans text-xs text-[#4a5568]">
                    {slab.examples.slice(0, 2).join(', ')}
                  </p>
                </div>
              </ContentCard>
            </ScrollReveal>
          ))}
        </div>

        {/* GST Types */}
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Types of GST</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {data.gst.types.map((type, index) => (
            <ScrollReveal key={type.type} animation="fade-up" delay={index + 1}>
              <ContentCard>
                <p className="font-serif font-bold text-[#1a2e44]">{type.type}</p>
                <p className="font-sans text-xs text-[#6b7c8f]">{type.fullForm}</p>
                <p className="font-sans text-xs text-[#4a6fa5] mt-2">→ {type.goesTo}</p>
              </ContentCard>
            </ScrollReveal>
          ))}
        </div>

        {/* How GST Works Example */}
        <ScrollReveal animation="fade-up">
          <ContentCard>
            <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">How GST Works</h4>
            <p className="font-sans text-sm text-[#6b7c8f] mb-4">{data.gst.howItWorks.example}</p>
            <div className="space-y-2">
              {data.gst.howItWorks.breakdown.map((item) => (
                <div key={item.component} className="flex justify-between items-center">
                  <span className="font-sans text-sm text-[#4a5568]">{item.component}</span>
                  <span className={`font-sans font-medium ${
                    item.component === 'Total bill' ? 'text-[#1a2e44] text-lg' : 'text-[#6b7c8f]'
                  }`}>
                    ₹{item.amount}
                  </span>
                </div>
              ))}
            </div>
            <p className="font-sans text-xs text-[#6b7c8f] mt-4 pt-4 border-t border-[#e5e0d8]">
              {data.gst.howItWorks.note}
            </p>
          </ContentCard>
        </ScrollReveal>

        <ScrollReveal animation="fade-up">
          <KeyConcept title="Input Tax Credit (ITC)">
            {data.gst.inputTaxCredit.definition}
            <p className="font-sans text-sm text-[#6b7c8f] mt-2">
              <strong>Example:</strong> {data.gst.inputTaxCredit.example}
            </p>
          </KeyConcept>
        </ScrollReveal>

        {/* Benefits & Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <ScrollReveal animation="fade-up" delay={1}>
            <ContentCard>
              <h4 className="font-serif font-semibold text-[#7a9e7e] mb-3">Benefits</h4>
              <ul className="space-y-2">
                {data.gst.benefits.map((b, i) => (
                  <li key={i} className="font-sans text-sm text-[#4a5568] flex items-start gap-2">
                    <span className="text-[#7a9e7e]">✓</span> {b}
                  </li>
                ))}
              </ul>
            </ContentCard>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={2}>
            <ContentCard>
              <h4 className="font-serif font-semibold text-[#b85c38] mb-3">Challenges</h4>
              <ul className="space-y-2">
                {data.gst.challenges.map((c, i) => (
                  <li key={i} className="font-sans text-sm text-[#4a5568] flex items-start gap-2">
                    <span className="text-[#b85c38]">!</span> {c}
                  </li>
                ))}
              </ul>
            </ContentCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Other Taxes */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={5}>
            Other Important Taxes
          </SectionHeading>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Capital Gains */}
          <ScrollReveal animation="fade-up" delay={1}>
            <ContentCard>
              <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Capital Gains Tax</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-sans text-sm text-[#6b7c8f]">Short-Term (equity, &lt;1 year)</p>
                  <p className="font-serif text-2xl font-bold text-[#b85c38]">
                    {data.otherTaxes.capitalGainsTax.shortTerm.equity}%
                  </p>
                  <p className="font-sans text-xs text-[#6b7c8f]">
                    {data.otherTaxes.capitalGainsTax.shortTerm.note}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-sm text-[#6b7c8f]">Long-Term (equity, &gt;1 year)</p>
                  <p className="font-serif text-2xl font-bold text-[#4a6fa5]">
                    {data.otherTaxes.capitalGainsTax.longTerm.equity}%
                  </p>
                  <p className="font-sans text-xs text-[#6b7c8f]">
                    Exemption: {data.otherTaxes.capitalGainsTax.longTerm.exemption}/year
                  </p>
                </div>
              </div>
            </ContentCard>
          </ScrollReveal>

          {/* TDS */}
          <ScrollReveal animation="fade-up" delay={2}>
            <ContentCard>
              <h4 className="font-serif font-semibold text-[#1a2e44] mb-2">TDS</h4>
              <p className="font-sans text-xs text-[#6b7c8f] mb-4">
                {data.otherTaxes.tds.fullForm} ({data.otherTaxes.tds.hindi})
              </p>
              <p className="font-sans text-sm text-[#4a5568] mb-4">{data.otherTaxes.tds.description}</p>
              <div className="flex flex-wrap gap-2">
                {data.otherTaxes.tds.examples.map((ex) => (
                  <span key={ex} className="px-2 py-1 bg-[#f5f0eb] text-[#4a5568] rounded text-xs">
                    {ex}
                  </span>
                ))}
              </div>
            </ContentCard>
          </ScrollReveal>

          {/* Customs */}
          <ScrollReveal animation="fade-up" delay={3}>
            <ContentCard>
              <h4 className="font-serif font-semibold text-[#1a2e44] mb-2">Customs Duty</h4>
              <p className="font-sans text-xs text-[#6b7c8f] mb-4">{data.otherTaxes.customsDuty.hindi}</p>
              <p className="font-sans text-sm text-[#4a5568] mb-2">{data.otherTaxes.customsDuty.description}</p>
              <p className="font-serif text-xl font-bold text-[#4a6fa5]">
                ₹{data.otherTaxes.customsDuty.collection} {data.otherTaxes.customsDuty.unit}
              </p>
            </ContentCard>
          </ScrollReveal>

          {/* STT */}
          <ScrollReveal animation="fade-up" delay={4}>
            <ContentCard>
              <h4 className="font-serif font-semibold text-[#1a2e44] mb-2">STT</h4>
              <p className="font-sans text-xs text-[#6b7c8f] mb-4">
                {data.otherTaxes.stt.fullForm} ({data.otherTaxes.stt.hindi})
              </p>
              <p className="font-sans text-sm text-[#4a5568] mb-2">{data.otherTaxes.stt.rate}</p>
              <p className="font-sans text-xs text-[#6b7c8f]">{data.otherTaxes.stt.purpose}</p>
            </ContentCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Tax-to-GDP Ratio */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={6}>
            Tax-to-GDP Ratio
          </SectionHeading>
        </ScrollReveal>

        <p className="font-sans text-[#4a5568] leading-relaxed mb-6">
          {data.taxToGdpRatio.insight}
        </p>

        <ScrollReveal animation="fade-up" delay={1}>
          <ContentCard className="mb-8">
            <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">India&apos;s Tax-to-GDP Trend</h4>
            <div className="space-y-2">
              {data.taxToGdpRatio.historical.slice(-6).map((entry) => (
                <div key={entry.year} className="flex items-center gap-4">
                  <span className="font-sans text-sm text-[#6b7c8f] w-20">{entry.year}</span>
                  <div className="flex-1 bg-[#f5f0eb] rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#4a6fa5] to-[#7a9e7e] rounded-full"
                      style={{ width: `${(entry.ratio / 15) * 100}%` }}
                    />
                  </div>
                  <span className="font-sans text-sm font-medium text-[#1a2e44] w-12 text-right">
                    {entry.ratio}%
                  </span>
                </div>
              ))}
            </div>
          </ContentCard>
        </ScrollReveal>

        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Global Comparison</h4>
        <ScrollReveal animation="fade-up" delay={2}>
          <DataTable>
            <TableHead>
              <TableHeader>Country</TableHeader>
              <TableHeader>Tax-to-GDP Ratio</TableHeader>
            </TableHead>
            <TableBody>
              {data.taxToGdpRatio.globalComparison.map((country) => (
                <TableRow key={country.country}>
                  <TableCell className={country.highlight ? 'font-medium text-[#b85c38]' : ''}>
                    {country.country}
                    {country.highlight && (
                      <span className="ml-2 px-2 py-0.5 bg-[#b85c38] text-white text-xs rounded">
                        You are here
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{country.ratio}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        </ScrollReveal>
      </section>

      {/* Tax Reforms */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={7}>
            Major Tax Reforms
          </SectionHeading>
        </ScrollReveal>

        <div className="space-y-4">
          {data.taxReforms.map((reform, index) => (
            <ScrollReveal key={reform.year} animation="fade-up" delay={index + 1}>
              <ContentCard>
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <span className="inline-block px-3 py-1 bg-[#4a6fa5] text-white font-serif font-bold rounded flex-shrink-0">
                    {reform.year}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-serif font-semibold text-[#1a2e44]">{reform.reform}</h4>
                    <p className="font-sans text-sm text-[#4a5568] mt-1">{reform.description}</p>
                    <p className="font-sans text-sm text-[#7a9e7e] mt-2">
                      <strong>Impact:</strong> {reform.impact}
                    </p>
                  </div>
                </div>
              </ContentCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Black Money */}
      <section className="mb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading chapter={8}>
            Black Money & Tax Evasion
          </SectionHeading>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={1}>
          <Definition term="Black Money" hindi={data.blackMoney.hindi}>
            {data.blackMoney.definition}
          </Definition>
        </ScrollReveal>

        <p className="font-sans text-[#4a5568] leading-relaxed my-6">
          {data.blackMoney.estimatedSize}
        </p>

        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Government Measures</h4>
        <div className="space-y-3">
          {data.blackMoney.governmentMeasures.map((measure, index) => (
            <ScrollReveal key={measure.measure} animation="fade-up" delay={index + 1}>
              <ContentCard>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-sans font-medium text-[#1a2e44]">{measure.measure}</span>
                  <span className="hidden md:block text-[#e5e0d8]">|</span>
                  <span className="font-sans text-sm text-[#6b7c8f]">{measure.purpose}</span>
                </div>
                <p className="font-sans text-sm text-[#7a9e7e] mt-2">Result: {measure.result}</p>
              </ContentCard>
            </ScrollReveal>
          ))}
        </div>
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
            href="/india-economy/budget"
            className="block p-4 bg-white rounded border border-[#e5e0d8] hover-lift"
          >
            <p className="font-serif font-semibold text-[#4a6fa5]">Union Budget</p>
            <p className="font-sans text-sm text-[#6b7c8f]">
              How tax revenue is spent by the government
            </p>
          </a>
          <a
            href="/india-economy/markets"
            className="block p-4 bg-white rounded border border-[#e5e0d8] hover-lift"
          >
            <p className="font-serif font-semibold text-[#4a6fa5]">Stock Markets</p>
            <p className="font-sans text-sm text-[#6b7c8f]">
              Capital gains tax and STT on equity investments
            </p>
          </a>
        </div>
      </section>

      {/* Source Footer */}
      <SourceFooter sourceIds={['income-tax-gst-council', 'gst-portal']} />
    </main>
  )
}
