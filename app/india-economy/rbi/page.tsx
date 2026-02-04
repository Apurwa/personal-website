import { Metadata } from 'next'
import { Breadcrumb } from '../components/Breadcrumb'
import { SourceFooter } from '../components/SourceFooter'
import { PageTOC } from '../components/PageTOC'
import {
  ContentCard,
  MarginNote,
  KeyConcept,
  Definition,
  SectionHeading,
  DataTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '../components/EducationalCards'
import { getCurrentRates } from '../data'
import { ScrollReveal } from '../components/ScrollReveal'
import { CountUpStat } from '../components/CountUpStat'

export const metadata: Metadata = {
  title: 'RBI & Monetary Policy Explained',
  description: 'Learn how RBI controls India\'s economy through repo rate, CRR, SLR, and reverse repo rate. Understand how interest rate changes affect your EMI, loans, and savings.',
  keywords: ['RBI monetary policy', 'repo rate India', 'CRR SLR explained', 'Reserve Bank of India', 'interest rates India', 'EMI interest rate', 'MPC meeting'],
  alternates: {
    canonical: 'https://apurwasarwajit.com/india-economy/rbi',
  },
  openGraph: {
    title: 'RBI & Monetary Policy Explained | India Economy',
    description: 'How does RBI control inflation and interest rates? Learn about repo rate, CRR, SLR and how they affect your loans and savings.',
    url: 'https://apurwasarwajit.com/india-economy/rbi',
  },
}

export default function RBIPage() {
  const rates = getCurrentRates()

  const tocItems = [
    { id: 'current-rates', title: 'Current Policy Rates' },
    { id: 'what-is-rbi', title: 'What is the Reserve Bank of India?' },
    { id: 'repo-rate', title: 'What is Repo Rate?' },
    { id: 'crr', title: 'What is CRR (Cash Reserve Ratio)?' },
    { id: 'slr', title: 'What is SLR (Statutory Liquidity Ratio)?' },
    { id: 'summary', title: 'Quick Summary' },
  ]

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'India Economy', href: '/india-economy' },
          { label: 'RBI & Monetary Policy' },
        ]}
      />

      {/* Header */}
      <header className="mb-16">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#b85c38] mb-4">
          Monetary Policy
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a2e44] mb-4 leading-tight">
          RBI & Monetary Policy
        </h1>
        <p className="font-sans text-[#4a5568] text-lg leading-relaxed">
          The Reserve Bank of India (RBI) is India&apos;s central bank. It controls
          how much money flows in the economy, which affects everything from your
          home loan EMI to the price of vegetables.
        </p>
      </header>

      <PageTOC items={tocItems} />

      {/* Current Rates Dashboard */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="current-rates" subtitle="These are the key interest rates set by RBI that affect the entire economy.">
          Current Policy Rates
        </SectionHeading>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 bg-white/40 border border-[#e5e0d8] p-6">
        <CountUpStat
          value={rates.repoRate}
          suffix="%"
          decimals={2}
          label="Repo Rate"
          sublabel="Lending rate to banks"
        />
        <CountUpStat
          value={rates.reverseRepoRate}
          suffix="%"
          decimals={2}
          label="Reverse Repo"
          sublabel="Deposit rate from banks"
        />
        <CountUpStat
          value={rates.crr}
          suffix="%"
          decimals={2}
          label="CRR"
          sublabel="Cash reserve ratio"
        />
        <CountUpStat
          value={rates.slr}
          suffix="%"
          decimals={2}
          label="SLR"
          sublabel="Statutory liquidity ratio"
        />
      </div>

      <p className="font-sans text-[#6b7c8f] text-sm text-center mb-12">
        Last updated: {rates.effectiveDate}
      </p>

      {/* What is RBI */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="what-is-rbi">What is the Reserve Bank of India?</SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-8">
          <p className="text-[#4a5568] leading-relaxed mb-4">
            The Reserve Bank of India (RBI) was established in 1935 and is headquartered in Mumbai.
            Think of RBI as the &quot;bank of all banks&quot; — it doesn&apos;t deal with regular people like you and me.
            Instead, it works with commercial banks (like SBI, HDFC, ICICI) and the government.
          </p>
          <p className="text-[#4a5568] leading-relaxed">
            RBI has many jobs: printing currency notes, managing foreign exchange,
            supervising banks, and most importantly — controlling inflation through <strong className="text-[#1a2e44]">monetary policy</strong>.
          </p>
        </ContentCard>
      </ScrollReveal>

      <ScrollReveal animation="slide-left">
        <MarginNote label="Did you know">
          All currency notes in India are issued by RBI, while coins are issued by the Government of India.
          That&apos;s why notes say &quot;I promise to pay the bearer&quot; signed by the RBI Governor, but coins don&apos;t!
        </MarginNote>
      </ScrollReveal>

      {/* Repo Rate Explainer */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="repo-rate" subtitle="The most important interest rate in India">
          What is Repo Rate?
        </SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <Definition term="Repo Rate" hindi="रेपो दर">
          The interest rate at which RBI lends money to commercial banks for a short period (usually overnight).
          &quot;Repo&quot; stands for &quot;Repurchasing Option&quot; — banks sell government securities to RBI and
          agree to buy them back.
        </Definition>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-6">
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">How does Repo Rate affect you?</h4>
          <div className="space-y-4 text-[#4a5568]">
            <div className="pl-4 border-l-2 border-[#7a9e7e]">
              <p className="font-semibold text-[#1a2e44] mb-1">When RBI increases repo rate:</p>
              <p className="text-sm">
                Banks have to pay more interest to borrow from RBI → Banks increase their loan interest rates →
                Your home loan EMI goes up → People borrow less → Less money in the economy → Inflation decreases
              </p>
            </div>
            <div className="pl-4 border-l-2 border-[#b85c38]">
              <p className="font-semibold text-[#1a2e44] mb-1">When RBI decreases repo rate:</p>
              <p className="text-sm">
                Banks pay less interest to borrow → Banks reduce their loan rates →
                Your EMI goes down → People borrow more → More money in the economy → Economic growth increases
              </p>
            </div>
          </div>
        </ContentCard>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <KeyConcept title="EMI Impact">
          If you have a home loan with &quot;floating interest rate&quot;, your EMI changes when RBI changes the repo rate.
          A 0.25% increase in repo rate can increase your monthly EMI by ₹500-1500 depending on your loan amount.
        </KeyConcept>
      </ScrollReveal>

      {/* CRR Explainer */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="crr" subtitle="Money that banks must keep with RBI">
          What is CRR (Cash Reserve Ratio)?
        </SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <Definition term="Cash Reserve Ratio" hindi="नकद आरक्षित अनुपात">
          The percentage of a bank&apos;s total deposits that must be kept with RBI as cash.
          Banks cannot use this money for giving loans.
        </Definition>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-6">
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Example: How CRR works</h4>
          <p className="text-[#4a5568] mb-4">
            If CRR is 4% and a bank has ₹100 crore in deposits:
          </p>
          <ul className="list-none space-y-2 text-[#4a5568]">
            <li className="flex gap-3">
              <span className="text-[#b85c38]">→</span>
              <span>Bank must keep ₹4 crore with RBI (no interest earned on this)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#b85c38]">→</span>
              <span>Bank can use ₹96 crore for giving loans</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#b85c38]">→</span>
              <span>If CRR increases to 5%, bank can only use ₹95 crore for loans</span>
            </li>
          </ul>
        </ContentCard>
      </ScrollReveal>

      <ScrollReveal animation="slide-left">
        <MarginNote label="COVID-19 Response">
          In March 2020, RBI reduced CRR from 4% to 3% to help banks lend more money
          and support the economy. It was later restored to 4% as the economy recovered.
        </MarginNote>
      </ScrollReveal>

      {/* SLR Explainer */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="slr" subtitle="Investments banks must make in government securities">
          What is SLR (Statutory Liquidity Ratio)?
        </SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <Definition term="Statutory Liquidity Ratio" hindi="सांविधिक तरलता अनुपात">
          The percentage of deposits that banks must invest in government securities (like government bonds).
          Unlike CRR, banks earn interest on SLR investments.
        </Definition>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <ContentCard className="mb-6">
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Why does SLR exist?</h4>
          <ul className="list-none space-y-2 text-[#4a5568]">
            <li className="flex gap-3">
              <span className="text-[#b85c38] font-semibold">1.</span>
              <span>Ensures banks have liquid (easily convertible) assets</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#b85c38] font-semibold">2.</span>
              <span>Helps government raise money easily (banks are forced buyers)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#b85c38] font-semibold">3.</span>
              <span>Controls how much money banks can lend</span>
            </li>
          </ul>
        </ContentCard>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <KeyConcept title="Money Supply Control">
          CRR + SLR together mean banks can only lend about 78% of their deposits
          (100% - 4% CRR - 18% SLR = 78%). This is how RBI controls the money supply in the economy.
        </KeyConcept>
      </ScrollReveal>

      {/* Summary */}
      <ScrollReveal animation="fade-up">
        <SectionHeading id="summary">Quick Summary</SectionHeading>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <DataTable>
        <TableHead>
          <TableHeader>Tool</TableHeader>
          <TableHeader>Current Rate</TableHeader>
          <TableHeader>Effect when increased</TableHeader>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-[#1a2e44]">Repo Rate</TableCell>
            <TableCell>{rates.repoRate}%</TableCell>
            <TableCell>Loans become expensive → Less spending → Lower inflation</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-[#1a2e44]">CRR</TableCell>
            <TableCell>{rates.crr}%</TableCell>
            <TableCell>Less money available for loans → Less money in economy</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-[#1a2e44]">SLR</TableCell>
            <TableCell>{rates.slr}%</TableCell>
            <TableCell>Banks buy more govt bonds → Less money for loans</TableCell>
          </TableRow>
        </TableBody>
      </DataTable>
      </ScrollReveal>

      {/* Source Attribution */}
      <SourceFooter sourceIds={['rbi-monetary-policy', 'rbi-database-indian-economy']} />
    </main>
  )
}
