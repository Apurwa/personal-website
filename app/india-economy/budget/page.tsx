import { Metadata } from 'next'
import { getBudgetData, getBudgetHistorical } from '../data'
import { Breadcrumb } from '../components/Breadcrumb'
import { SourceFooter } from '../components/SourceFooter'
import {
  ContentCard,
  MarginNote,
  KeyConcept,
  Definition,
  SectionHeading,
} from '../components/EducationalCards'
import { ScrollReveal } from '../components/ScrollReveal'
import { CountUpStat } from '../components/CountUpStat'
import { TableOfContents, TOCItem } from '../components/TableOfContents'

export const metadata: Metadata = {
  title: 'Union Budget 2024-25 Explained Simply',
  description: 'Understand India\'s Union Budget 2024-25 in simple terms. Learn where the government gets ₹48 lakh crore from (taxes, borrowing) and how it spends on defence, education, health, infrastructure.',
  keywords: ['Union Budget 2024', 'India Budget explained', 'fiscal deficit India', 'government spending India', 'tax revenue India', 'budget allocation ministries'],
  alternates: {
    canonical: 'https://apurwasarwajit.com/india-economy/budget',
  },
  openGraph: {
    title: 'Union Budget 2024-25 Explained Simply | India Economy',
    description: 'Learn how India\'s ₹48 lakh crore budget works. Tax revenue, spending allocation, fiscal deficit - explained for students and beginners.',
    url: 'https://apurwasarwajit.com/india-economy/budget',
  },
}

export default function BudgetPage() {
  const budget = getBudgetData()
  const historical = getBudgetHistorical()

  // Calculate percentages for visualization
  const taxRevenueTotal = budget.taxRevenue.gst + budget.taxRevenue.incomeTax +
    budget.taxRevenue.corporateTax + budget.taxRevenue.customsDuty +
    budget.taxRevenue.exciseDuty + budget.taxRevenue.otherTaxes

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'India Economy', href: '/india-economy' },
          { label: 'Union Budget' },
        ]}
      />

      {/* Header */}
      <header className="mb-16">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#b85c38] mb-4">
          Fiscal Policy
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a2e44] mb-4 leading-tight">
          Union Budget {budget.fiscalYear}
        </h1>
        <p className="font-sans text-[#4a5568] text-lg leading-relaxed">
          Every year, the Government of India presents a budget that shows where it plans to
          get money from and how it will spend it. Let&apos;s understand India&apos;s ₹48 lakh crore budget.
        </p>
      </header>

      <ScrollReveal animation="fade-up">
        <TableOfContents
          items={[
            { id: 'big-picture', title: 'The Big Picture' },
            { id: 'what-is-budget', title: 'What is the Union Budget?' },
            { id: 'where-money-comes-from', title: 'Where Does the Money Come From?' },
            { id: 'where-money-goes', title: 'Where Does the Money Go?' },
            { id: 'fiscal-deficit', title: 'What is Fiscal Deficit?' },
            { id: 'deficit-trend', title: '10-Year Fiscal Deficit Trend' },
          ]}
        />
      </ScrollReveal>

      {/* Key Numbers */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="big-picture" subtitle="Here are the most important numbers from this year's budget">
          The Big Picture
        </SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 bg-white/40 border border-[#e5e0d8] p-6">
          <CountUpStat
            value={budget.totalExpenditure / 100000}
            prefix="₹"
            suffix="L Cr"
            decimals={1}
            label="Total Spending"
            sublabel="What government will spend"
          />
          <CountUpStat
            value={budget.totalRevenue / 100000}
            prefix="₹"
            suffix="L Cr"
            decimals={1}
            label="Total Revenue"
            sublabel="What government will earn"
          />
          <CountUpStat
            value={budget.fiscalDeficitPercent}
            suffix="%"
            decimals={1}
            label="Fiscal Deficit"
            sublabel="Gap as % of GDP"
          />
        </div>
      </ScrollReveal>

      <ScrollReveal animation="slide-left">
        <MarginNote label="Did you know">
          ₹48 lakh crore is ₹48,00,000,00,00,000 (48 followed by 12 zeros)!
          If you spent ₹1 crore every day, it would take you over 1.3 lakh years to spend this much money.
        </MarginNote>
      </ScrollReveal>

      {/* What is a Budget */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="what-is-budget">What is the Union Budget?</SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <Definition term="Union Budget" hindi="केंद्रीय बजट">
          The Union Budget is the annual financial statement of the Government of India.
          It shows expected income (revenue) and planned expenses (expenditure) for the
          financial year (April to March).
        </Definition>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-8">
        <p className="text-[#4a5568] leading-relaxed mb-4">
          The Finance Minister presents the budget in Parliament every year, usually on February 1st.
          The budget is divided into two main parts:
        </p>
        <ul className="list-none space-y-2 text-[#4a5568]">
          <li className="flex gap-3">
            <span className="text-[#b85c38] font-semibold">1.</span>
            <span><strong className="text-[#1a2e44]">Revenue Budget</strong> — Day-to-day income and expenses (salaries, pensions, interest)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b85c38] font-semibold">2.</span>
            <span><strong className="text-[#1a2e44]">Capital Budget</strong> — Building assets like roads, bridges, and factories</span>
          </li>
        </ul>
        </ContentCard>
      </ScrollReveal>

      {/* Where Money Comes From */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="where-money-comes-from" subtitle="Government's sources of income">
          Where Does the Money Come From?
        </SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-6">
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Tax Revenue Breakdown</h4>
          <div className="space-y-4">
            <RevenueBar label="Income Tax" value={budget.taxRevenue.incomeTax} total={taxRevenueTotal} color="bg-[#4a6fa5]" />
            <RevenueBar label="GST" value={budget.taxRevenue.gst} total={taxRevenueTotal} color="bg-[#b85c38]" />
            <RevenueBar label="Corporate Tax" value={budget.taxRevenue.corporateTax} total={taxRevenueTotal} color="bg-[#6b7c8f]" />
            <RevenueBar label="Excise Duty" value={budget.taxRevenue.exciseDuty} total={taxRevenueTotal} color="bg-[#d4a84b]" />
            <RevenueBar label="Customs Duty" value={budget.taxRevenue.customsDuty} total={taxRevenueTotal} color="bg-[#7a9e7e]" />
          </div>
        </ContentCard>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <KeyConcept title="Key Takeaway">
          Income Tax and Corporate Tax together contribute about 57% of all tax revenue.
          This is why governments focus on increasing the tax base and compliance.
        </KeyConcept>
      </ScrollReveal>

      {/* Where Money Goes */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="where-money-goes" subtitle="Major areas of government spending">
          Where Does the Money Go?
        </SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-6">
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Top Ministry Allocations</h4>
          <div className="space-y-3">
            {budget.ministryAllocations.slice(0, 6).map((ministry, index) => (
              <div key={ministry.name} className="flex items-center justify-between py-2 border-b border-[#e5e0d8] last:border-0">
                <span className="flex items-center gap-3 text-[#4a5568]">
                  <span className="font-sans text-xs text-[#6b7c8f] w-5">{index + 1}.</span>
                  {ministry.name}
                </span>
                <span className="font-serif font-semibold text-[#1a2e44]">
                  ₹{(ministry.allocation / 1000).toFixed(0)}K Cr
                </span>
              </div>
            ))}
          </div>
        </ContentCard>
      </ScrollReveal>

      <ScrollReveal animation="slide-left">
        <MarginNote label="Did you know">
          The largest single expense in the budget is Interest Payments — ₹11.5 lakh crore!
          This is the interest government pays on money it borrowed in previous years.
          That&apos;s almost 24% of the entire budget going just towards paying interest.
        </MarginNote>
      </ScrollReveal>

      {/* Fiscal Deficit */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="fiscal-deficit" subtitle="When government spends more than it earns">
          What is Fiscal Deficit?
        </SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <Definition term="Fiscal Deficit" hindi="राजकोषीय घाटा">
          The difference between what the government spends and what it earns.
          If the government spends ₹100 but earns only ₹70, the fiscal deficit is ₹30.
        </Definition>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-6">
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-3">This Year&apos;s Deficit</h4>
          <div className="flex items-baseline gap-4 mb-4">
            <div className="font-serif text-3xl font-bold text-[#b85c38]">₹{(budget.fiscalDeficit / 100000).toFixed(1)} lakh crore</div>
            <div className="font-sans text-[#6b7c8f]">({budget.fiscalDeficitPercent}% of GDP)</div>
          </div>
          <p className="text-[#4a5568]">
            The government will borrow this money by issuing bonds. This is why managing fiscal
            deficit is important — too much borrowing means higher interest payments in the future.
          </p>
        </ContentCard>
      </ScrollReveal>

      {/* Historical Trend */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="deficit-trend" subtitle="How has the deficit changed over the years?">
          10-Year Fiscal Deficit Trend
        </SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-6">
          <div className="space-y-2">
            {historical.data.map((year) => (
              <div key={year.fiscalYear} className="flex items-center gap-4">
                <span className="w-20 font-sans text-sm text-[#6b7c8f]">{year.fiscalYear}</span>
                <div className="flex-1 h-5 bg-[#e5e0d8]/50 rounded-sm overflow-hidden">
                  <div
                    className={`h-full rounded-sm ${year.fiscalDeficitPercent > 6 ? 'bg-[#b85c38]' : year.fiscalDeficitPercent > 4 ? 'bg-[#d4a84b]' : 'bg-[#7a9e7e]'}`}
                    style={{ width: `${(year.fiscalDeficitPercent / 10) * 100}%` }}
                  />
                </div>
                <span className="w-12 font-sans text-sm font-medium text-[#1a2e44]">{year.fiscalDeficitPercent}%</span>
              </div>
            ))}
          </div>
          <p className="font-sans text-[#6b7c8f] text-sm mt-4 italic">
            * The spike in 2020-21 was due to COVID-19 pandemic and stimulus spending
          </p>
        </ContentCard>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <KeyConcept title="Fiscal Consolidation">
          The government aims to bring the fiscal deficit below 4.5% by 2025-26.
          This is called &quot;fiscal consolidation&quot; — reducing the deficit gradually without
          hurting economic growth.
        </KeyConcept>
      </ScrollReveal>

      {/* Source Attribution */}
      <SourceFooter sourceIds={['union-budget-2024-25', 'india-budget-historical']} />
    </main>
  )
}

// Simple bar chart component for revenue breakdown
function RevenueBar({
  label,
  value,
  total,
  color
}: {
  label: string
  value: number
  total: number
  color: string
}) {
  const percentage = (value / total) * 100

  return (
    <div>
      <div className="flex justify-between font-sans text-sm mb-1">
        <span className="text-[#1a2e44]">{label}</span>
        <span className="text-[#6b7c8f]">₹{(value / 1000).toFixed(0)}K Cr ({percentage.toFixed(0)}%)</span>
      </div>
      <div className="h-2 bg-[#e5e0d8]/50 rounded-sm overflow-hidden">
        <div
          className={`h-full rounded-sm ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
