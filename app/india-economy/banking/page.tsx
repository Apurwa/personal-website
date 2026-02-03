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
import { getBankingData } from '../data'

export const metadata = {
  title: 'Banking System | Understanding India\'s Economy',
  description: 'Learn how India\'s banking system works - types of banks, how they make money, NPAs, UPI revolution, and deposit insurance.',
}

export default function BankingPage() {
  const data = getBankingData()

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'India Economy', href: '/india-economy' },
          { label: 'Banking System' },
        ]}
      />

      {/* Hero */}
      <header className="mt-8 mb-16">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#b85c38] mb-3 animate-fade-in">
          Financial Infrastructure
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1a2e44] mb-4 leading-tight animate-fade-in-up delay-1">
          Banking System
        </h1>
        <p className="font-sans text-[#4a5568] text-lg leading-relaxed animate-fade-in-up delay-2">
          India&apos;s banking network serves 220 crore account holders through 1.6 lakh branches.
          From nationalization in 1969 to UPI revolution in 2016, explore how banks shape our economy.
        </p>
      </header>

      {/* Overview Stats */}
      <section className="mb-16 animate-fade-in-up delay-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatDisplay
            value={data.overview.totalBanks.toString()}
            label="Banks"
            sublabel="All categories"
          />
          <StatDisplay
            value={`${(data.overview.totalBranches / 1000).toFixed(0)}K`}
            label="Branches"
            sublabel="Pan-India network"
          />
          <StatDisplay
            value={`₹${data.overview.totalDeposits}L Cr`}
            label="Total Deposits"
            sublabel="Dec 2024"
          />
          <StatDisplay
            value={`${data.overview.bankingPenetration}%`}
            label="Banked Population"
            sublabel="Adults with accounts"
          />
        </div>
      </section>

      {/* What is a Bank? */}
      <section className="mb-16 animate-fade-in-up delay-4">
        <SectionHeading chapter={1}>
          What is a Bank?
        </SectionHeading>

        <Definition term="Bank" hindi="बैंक">
          A financial institution that accepts deposits from the public, pays interest on those deposits,
          and uses that money to give loans at a higher interest rate. The difference between what they
          earn and pay is how banks make money.
        </Definition>

        <MarginNote label="Did you know">
          The word &quot;bank&quot; comes from the Italian &quot;banco&quot; meaning bench — medieval Italian
          money-lenders conducted business on benches in marketplaces.
        </MarginNote>

        <p className="font-sans text-[#4a5568] leading-relaxed mt-6">
          In India, banks are regulated by the <strong>Reserve Bank of India (RBI)</strong>. Only institutions
          with a banking license from RBI can call themselves &quot;banks&quot; and accept deposits from the public.
        </p>
      </section>

      {/* Types of Banks */}
      <section className="mb-16">
        <SectionHeading chapter={2}>
          Types of Banks in India
        </SectionHeading>

        <p className="font-sans text-[#4a5568] leading-relaxed mb-8">
          India has {data.overview.totalBanks} banks categorized into different types based on ownership,
          functions, and target customers.
        </p>

        <div className="space-y-6">
          {data.bankCategories.map((category, index) => (
            <ContentCard key={category.type} className={`animate-fade-in-up delay-${index + 1}`}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#1a2e44]">
                    {category.type}
                  </h3>
                  <p className="font-sans text-sm text-[#6b7c8f]">{category.hindi}</p>
                </div>
                <div className="flex gap-4 text-center">
                  <div>
                    <p className="font-serif text-2xl font-bold text-[#b85c38]">{category.count}</p>
                    <p className="font-sans text-xs text-[#6b7c8f]">Banks</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl font-bold text-[#4a6fa5]">{category.marketShare}%</p>
                    <p className="font-sans text-xs text-[#6b7c8f]">Market Share</p>
                  </div>
                </div>
              </div>
              <p className="font-sans text-[#4a5568] text-sm mb-4">{category.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {category.examples.slice(0, 5).map((example) => (
                  <span
                    key={example}
                    className="px-2 py-1 bg-[#FAF7F2] border border-[#e5e0d8] rounded text-xs font-sans text-[#4a5568]"
                  >
                    {example}
                  </span>
                ))}
              </div>
              <ul className="space-y-1">
                {category.keyFacts.map((fact, i) => (
                  <li key={i} className="font-sans text-xs text-[#6b7c8f] flex items-start gap-2">
                    <span className="text-[#7a9e7e] mt-0.5">•</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </ContentCard>
          ))}
        </div>
      </section>

      {/* Top 10 Banks */}
      <section className="mb-16">
        <SectionHeading chapter={3}>
          Top 10 Banks by Assets
        </SectionHeading>

        <DataTable>
          <TableHead>
            <TableHeader>Rank</TableHeader>
            <TableHeader>Bank</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Assets (₹L Cr)</TableHeader>
            <TableHeader>Branches</TableHeader>
          </TableHead>
          <TableBody>
            {data.topBanksByAssets.map((bank) => (
              <TableRow key={bank.name}>
                <TableCell>{bank.rank}</TableCell>
                <TableCell className="font-medium">{bank.name}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      bank.type === 'PSU'
                        ? 'bg-[#e8f4ea] text-[#2d5a3d]'
                        : 'bg-[#e8f0f8] text-[#2d4a6d]'
                    }`}
                  >
                    {bank.type}
                  </span>
                </TableCell>
                <TableCell>{bank.assets.toFixed(1)}</TableCell>
                <TableCell>{bank.branches.toLocaleString('en-IN')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DataTable>
        <p className="font-sans text-xs text-[#6b7c8f] mt-2">
          Source: RBI Statistical Tables, December 2024
        </p>

        <MarginNote label="SBI Fact">
          State Bank of India alone has more branches than all private banks combined.
          It handles nearly 25% of all banking transactions in India.
        </MarginNote>
      </section>

      {/* How Banks Make Money */}
      <section className="mb-16">
        <SectionHeading chapter={4}>
          How Banks Make Money
        </SectionHeading>

        <Definition term="Net Interest Income" hindi="शुद्ध ब्याज आय">
          The difference between interest earned on loans and interest paid on deposits.
          This is the primary source of revenue for most banks.
        </Definition>

        <p className="font-sans text-[#4a5568] leading-relaxed my-6">
          When you deposit money in a savings account, the bank pays you around 3% interest.
          When someone takes a home loan, they pay the bank around 9% interest. The bank keeps
          the 6% difference — this is called the <strong>spread</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {data.howBanksMakeMoney.revenueStreams.map((stream) => (
            <ContentCard key={stream.source}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-serif font-semibold text-[#1a2e44]">{stream.source}</h4>
                <span className="font-serif text-xl font-bold text-[#b85c38]">{stream.share}%</span>
              </div>
              <p className="font-sans text-sm text-[#4a5568] mb-2">{stream.explanation}</p>
              <p className="font-sans text-xs text-[#6b7c8f] italic">
                Example: {stream.example}
              </p>
            </ContentCard>
          ))}
        </div>

        <KeyConcept title="Net Interest Margin (NIM)">
          NIM measures how efficiently a bank converts deposits into lending income.
          Private banks have higher NIM ({data.howBanksMakeMoney.netInterestMargin.private}%)
          than PSU banks ({data.howBanksMakeMoney.netInterestMargin.psb}%) because they
          charge higher loan rates and have better cost management.
        </KeyConcept>
      </section>

      {/* NPAs */}
      <section className="mb-16">
        <SectionHeading chapter={5}>
          The NPA Problem
        </SectionHeading>

        <Definition term="Non-Performing Asset (NPA)" hindi="अनर्जक परिसंपत्ति">
          A loan where the borrower has not paid interest or principal for 90 days or more.
          When loans become NPAs, banks have to set aside money (provisions) from their profits,
          which reduces their ability to lend more.
        </Definition>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          <StatDisplay
            value={`${data.npaData.currentGrossNPA}%`}
            label="Gross NPA"
            sublabel="Dec 2024"
          />
          <StatDisplay
            value={`${data.npaData.currentNetNPA}%`}
            label="Net NPA"
            sublabel="After provisions"
          />
          <StatDisplay
            value={`₹${data.npaData.totalNPAAmount}L Cr`}
            label="Total NPAs"
            sublabel="Absolute amount"
          />
          <StatDisplay
            value="11.2%"
            label="Peak NPA"
            sublabel="FY 2017-18"
          />
        </div>

        {/* NPA Historical Chart */}
        <ContentCard className="mb-8">
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">NPA Trend (2015-2025)</h4>
          <div className="space-y-3">
            {data.npaData.historical.map((year) => (
              <div key={year.year} className="flex items-center gap-4">
                <span className="font-sans text-sm text-[#6b7c8f] w-20">{year.year}</span>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 bg-[#f5f0eb] rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#b85c38] to-[#d4a84b] rounded-full transition-all duration-500"
                      style={{ width: `${(year.grossNPA / 12) * 100}%` }}
                    />
                  </div>
                  <span className="font-sans text-sm font-medium text-[#1a2e44] w-12 text-right">
                    {year.grossNPA}%
                  </span>
                </div>
                {year.notes && (
                  <span className="font-sans text-xs text-[#6b7c8f] w-32 hidden md:block">
                    {year.notes}
                  </span>
                )}
              </div>
            ))}
          </div>
        </ContentCard>

        <MarginNote label="IBC Success">
          The Insolvency and Bankruptcy Code (2016) helped recover ₹3.16 lakh crore from bad loans.
          However, creditors still had to accept an average 52% haircut (loss).
        </MarginNote>

        {/* Sector-wise NPA */}
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4 mt-8">Which Sectors Defaulted Most?</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.npaData.sectorWiseNPA.map((sector) => (
            <ContentCard key={sector.sector} className="text-center">
              <p className="font-serif text-2xl font-bold text-[#b85c38]">{sector.share}%</p>
              <p className="font-sans font-medium text-[#1a2e44]">{sector.sector}</p>
              <p className="font-sans text-xs text-[#6b7c8f] mt-1">{sector.majorDefaulters}</p>
            </ContentCard>
          ))}
        </div>
      </section>

      {/* Digital Payments / UPI */}
      <section className="mb-16">
        <SectionHeading chapter={6}>
          Digital Payments Revolution
        </SectionHeading>

        <Definition term="UPI" hindi="एकीकृत भुगतान इंटरफेस">
          Unified Payments Interface — a real-time payment system that allows instant money
          transfer between bank accounts using a mobile phone. Launched in 2016, it has made
          India the world leader in digital payments.
        </Definition>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          <StatDisplay
            value={`${data.digitalPayments.upiStats.monthlyTransactions}B`}
            label="Monthly Txns"
            sublabel="Dec 2024"
          />
          <StatDisplay
            value={`₹${data.digitalPayments.upiStats.monthlyValue}L Cr`}
            label="Monthly Value"
            sublabel="Dec 2024"
          />
          <StatDisplay
            value={`${data.digitalPayments.upiStats.dailyAverage}M`}
            label="Daily Average"
            sublabel="Transactions"
          />
          <StatDisplay
            value="#1"
            label="Global Rank"
            sublabel="Real-time payments"
          />
        </div>

        {/* UPI Timeline */}
        <ContentCard className="mb-8">
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">UPI Growth Story</h4>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e5e0d8]" />
            <div className="space-y-6">
              {data.digitalPayments.upiMilestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-4 relative">
                  <div className="w-8 h-8 rounded-full bg-[#4a6fa5] flex items-center justify-center text-white text-xs font-medium z-10">
                    {milestone.year.slice(-2)}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-sans font-medium text-[#1a2e44]">{milestone.event}</p>
                    <p className="font-sans text-sm text-[#6b7c8f]">
                      {milestone.transactions}B monthly transactions
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContentCard>

        <MarginNote label="India vs World">
          India processes more real-time payments than China, USA, UK, and Europe combined.
          In 2024, India&apos;s 165 billion transactions were 46% of global volume.
        </MarginNote>

        {/* Global Comparison */}
        <DataTable>
          <TableHead>
            <TableHeader>Rank</TableHeader>
            <TableHeader>Country</TableHeader>
            <TableHeader>Real-Time Payments (Billion)</TableHeader>
            <TableHeader>{' '}</TableHeader>
          </TableHead>
          <TableBody>
            {data.digitalPayments.globalComparison.map((country) => (
              <TableRow key={country.country}>
                <TableCell>#{country.rank}</TableCell>
                <TableCell className="font-medium">{country.country}</TableCell>
                <TableCell>{country.realTimePayments}</TableCell>
                <TableCell>
                  {country.country === 'India' && (
                    <span className="px-2 py-0.5 bg-[#e8f4ea] text-[#2d5a3d] rounded text-xs">Leader</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DataTable>
        <p className="font-sans text-xs text-[#6b7c8f] mt-2">
          Global real-time payments volume, 2024
        </p>

        {/* UPI International */}
        <h4 className="font-serif font-semibold text-[#1a2e44] mb-4 mt-8">UPI Goes Global</h4>
        <p className="font-sans text-[#4a5568] leading-relaxed mb-4">
          UPI is now accepted in multiple countries, allowing Indians to pay using their
          familiar apps while traveling abroad.
        </p>
        <div className="flex flex-wrap gap-2">
          {data.digitalPayments.upiInternational.map((country) => (
            <span
              key={country.country}
              className={`px-3 py-1.5 rounded-full text-sm font-sans ${
                country.status === 'Live'
                  ? 'bg-[#e8f4ea] text-[#2d5a3d]'
                  : 'bg-[#f5f0eb] text-[#6b7c8f]'
              }`}
            >
              {country.country} {country.status === 'Live' ? '✓' : '(Soon)'}
            </span>
          ))}
        </div>
      </section>

      {/* Deposit Insurance */}
      <section className="mb-16">
        <SectionHeading chapter={7}>
          Deposit Insurance
        </SectionHeading>

        <Definition term="Deposit Insurance" hindi="जमा बीमा">
          Protection provided to bank depositors if their bank fails. In India, deposits up to
          ₹5 lakh per depositor per bank are insured by DICGC, a subsidiary of RBI.
        </Definition>

        <KeyConcept title="You&apos;re Protected!">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-serif text-3xl font-bold text-[#7a9e7e]">
              ₹{(data.depositInsurance.currentCoverage / 100000).toFixed(0)} Lakh
            </span>
            <span className="font-sans text-[#4a5568]">
              maximum coverage per depositor per bank
            </span>
          </div>
          <p className="font-sans text-sm text-[#6b7c8f]">
            This covers {data.depositInsurance.coveragePercent}% of all depositors in India.
            The premium is paid by banks, not by you.
          </p>
        </KeyConcept>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <ContentCard>
            <h4 className="font-serif font-semibold text-[#7a9e7e] mb-3">What&apos;s Covered</h4>
            <ul className="space-y-2">
              {data.depositInsurance.whatsCovered.map((item) => (
                <li key={item} className="font-sans text-sm text-[#4a5568] flex items-center gap-2">
                  <span className="text-[#7a9e7e]">✓</span> {item}
                </li>
              ))}
            </ul>
          </ContentCard>
          <ContentCard>
            <h4 className="font-serif font-semibold text-[#b85c38] mb-3">What&apos;s Not Covered</h4>
            <ul className="space-y-2">
              {data.depositInsurance.whatsNotCovered.map((item) => (
                <li key={item} className="font-sans text-sm text-[#4a5568] flex items-center gap-2">
                  <span className="text-[#b85c38]">✗</span> {item}
                </li>
              ))}
            </ul>
          </ContentCard>
        </div>

        <MarginNote label="History">
          Coverage was just ₹1 lakh until February 2020. After the PMC Bank crisis,
          the government increased it to ₹5 lakh to boost depositor confidence.
        </MarginNote>
      </section>

      {/* Banking Reforms Timeline */}
      <section className="mb-16">
        <SectionHeading chapter={8}>
          Key Banking Reforms
        </SectionHeading>

        <div className="space-y-6">
          {data.bankingReforms.map((reform, index) => (
            <ContentCard key={reform.year} className={`animate-fade-in-up delay-${index + 1}`}>
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-block px-3 py-1 bg-[#4a6fa5] text-white font-serif font-bold rounded">
                    {reform.year}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-serif font-semibold text-[#1a2e44]">{reform.reform}</h4>
                  <p className="font-sans text-xs text-[#6b7c8f] mb-2">{reform.hindi}</p>
                  <p className="font-sans text-sm text-[#4a5568] mb-2">{reform.description}</p>
                  <p className="font-sans text-sm text-[#7a9e7e]">
                    <strong>Impact:</strong> {reform.impact}
                  </p>
                </div>
              </div>
            </ContentCard>
          ))}
        </div>
      </section>

      {/* Financial Inclusion */}
      <section className="mb-16">
        <SectionHeading chapter={9}>
          Financial Inclusion
        </SectionHeading>

        <Definition term="Jan Dhan Yojana" hindi="जन धन योजना">
          Launched in 2014, it&apos;s the world&apos;s largest financial inclusion program.
          It provides a basic bank account with zero balance requirement, RuPay debit card,
          and accident insurance to every Indian household.
        </Definition>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          <StatDisplay
            value={`${data.financialInclusion.janDhan.totalAccounts} Cr`}
            label="Accounts Opened"
            sublabel="Since 2014"
          />
          <StatDisplay
            value={`₹${data.financialInclusion.janDhan.totalDeposits}L Cr`}
            label="Total Deposits"
            sublabel="In Jan Dhan accounts"
          />
          <StatDisplay
            value={`${data.financialInclusion.janDhan.rupayCards} Cr`}
            label="RuPay Cards"
            sublabel="Issued free"
          />
          <StatDisplay
            value={`${data.financialInclusion.janDhan.womenAccounts} Cr`}
            label="Women Accounts"
            sublabel="56% of total"
          />
        </div>

        <ContentCard>
          <h4 className="font-serif font-semibold text-[#1a2e44] mb-4">Banking Access Points</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="font-serif text-2xl font-bold text-[#4a6fa5]">
                {(data.financialInclusion.bankingAccessPoints.branches / 1000).toFixed(0)}K
              </p>
              <p className="font-sans text-sm text-[#6b7c8f]">Bank Branches</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl font-bold text-[#4a6fa5]">
                {(data.financialInclusion.bankingAccessPoints.atms / 1000).toFixed(0)}K
              </p>
              <p className="font-sans text-sm text-[#6b7c8f]">ATMs</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl font-bold text-[#4a6fa5]">
                {(data.financialInclusion.bankingAccessPoints.bcAgents / 100000).toFixed(1)}L
              </p>
              <p className="font-sans text-sm text-[#6b7c8f]">BC Agents</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl font-bold text-[#4a6fa5]">
                {(data.financialInclusion.bankingAccessPoints.microATMs / 100000).toFixed(1)}L
              </p>
              <p className="font-sans text-sm text-[#6b7c8f]">Micro ATMs</p>
            </div>
          </div>
        </ContentCard>
      </section>

      {/* Interest Rates Quick Reference */}
      <section className="mb-16">
        <SectionHeading chapter={10}>
          Interest Rates Quick Guide
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContentCard>
            <h4 className="font-serif font-semibold text-[#7a9e7e] mb-4">Deposit Rates</h4>
            <div className="space-y-4">
              <div>
                <p className="font-sans text-sm text-[#6b7c8f] mb-1">Savings Account</p>
                <p className="font-sans text-[#4a5568]">
                  PSU: {data.interestRates.savingsAccount.psuAverage}% |
                  Private: {data.interestRates.savingsAccount.privateAverage}% |
                  SFB: {data.interestRates.savingsAccount.smallFinanceAverage}%
                </p>
              </div>
              <div>
                <p className="font-sans text-sm text-[#6b7c8f] mb-1">1-Year FD</p>
                <p className="font-sans text-[#4a5568]">
                  PSU: {data.interestRates.fixedDeposit.oneYear.psuAverage}% |
                  Private: {data.interestRates.fixedDeposit.oneYear.privateAverage}% |
                  SFB: {data.interestRates.fixedDeposit.oneYear.smallFinanceAverage}%
                </p>
              </div>
              <p className="font-sans text-xs text-[#6b7c8f]">
                * Senior citizens get additional {data.interestRates.fixedDeposit.seniorCitizenBonus}%
              </p>
            </div>
          </ContentCard>

          <ContentCard>
            <h4 className="font-serif font-semibold text-[#b85c38] mb-4">Loan Rates</h4>
            <div className="space-y-3">
              {Object.entries(data.interestRates.loanRates).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="font-sans text-sm text-[#4a5568] capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="font-sans text-sm font-medium text-[#1a2e44]">
                    {value.range}
                  </span>
                </div>
              ))}
            </div>
          </ContentCard>
        </div>
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
            href="/india-economy/rbi"
            className="block p-4 bg-white rounded border border-[#e5e0d8] hover-lift"
          >
            <p className="font-serif font-semibold text-[#4a6fa5]">RBI & Monetary Policy</p>
            <p className="font-sans text-sm text-[#6b7c8f]">
              How RBI regulates banks through repo rate, CRR, and SLR
            </p>
          </a>
          <a
            href="/india-economy/budget"
            className="block p-4 bg-white rounded border border-[#e5e0d8] hover-lift"
          >
            <p className="font-serif font-semibold text-[#4a6fa5]">Union Budget</p>
            <p className="font-sans text-sm text-[#6b7c8f]">
              Government&apos;s bank recapitalization and PSU bank reforms
            </p>
          </a>
        </div>
      </section>

      {/* Source Footer */}
      <SourceFooter sourceIds={['rbi-banking-stats', 'npci-upi-stats', 'dicgc-deposit-insurance']} />
    </main>
  )
}
