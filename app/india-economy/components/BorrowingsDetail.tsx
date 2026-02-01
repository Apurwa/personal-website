'use client'

import { BudgetData } from '../data/types'
import { Accordion, AccordionItem } from './Accordion'
import { useCurrency } from '../context/CurrencyContext'

interface BorrowingsDetailProps {
  budget: BudgetData
}

interface CountryDebtData {
  country: string
  flag: string
  debt: number
  isIndia?: boolean
}

export function BorrowingsDetail({ budget }: BorrowingsDetailProps) {
  const { borrowings, fiscalDeficitPercent, debtToGdp, totalExpenditure } = budget
  const { formatCurrency } = useCurrency()

  const borrowingPercent = ((borrowings / totalExpenditure) * 100).toFixed(1)

  const instruments = [
    {
      name: 'Government Securities (G-Secs)',
      description: 'Long-term bonds (5-40 years) sold to banks, insurance companies',
      share: 75,
      risk: 'Low',
      icon: '📜',
      color: '#00ff41',
    },
    {
      name: 'Treasury Bills (T-Bills)',
      description: 'Short-term borrowing (91, 182, 364 days)',
      share: 15,
      risk: 'Very Low',
      icon: '📋',
      color: '#00d4ff',
    },
    {
      name: 'External Borrowing',
      description: 'Loans from World Bank, IMF, bilateral sources',
      share: 5,
      risk: 'Currency Risk',
      icon: '🌍',
      color: '#a78bfa',
    },
    {
      name: 'Small Savings',
      description: 'PPF, NSC, Sukanya Samriddhi - public deposits',
      share: 5,
      risk: 'Low',
      icon: '🏦',
      color: '#ffb000',
    },
  ]

  // Global debt comparison
  const globalComparison: CountryDebtData[] = [
    { country: 'Japan', flag: '🇯🇵', debt: 263 },
    { country: 'Greece', flag: '🇬🇷', debt: 171 },
    { country: 'USA', flag: '🇺🇸', debt: 123 },
    { country: 'India', flag: '🇮🇳', debt: debtToGdp, isIndia: true },
    { country: 'China', flag: '🇨🇳', debt: 77 },
    { country: 'Germany', flag: '🇩🇪', debt: 66 },
    { country: 'Australia', flag: '🇦🇺', debt: 45 },
  ]

  // Historical fiscal deficit
  const historicalDeficit = [
    { year: '2019-20', value: 4.6 },
    { year: '2020-21', value: 9.2 },
    { year: '2021-22', value: 6.7 },
    { year: '2022-23', value: 6.4 },
    { year: '2023-24', value: 5.8 },
    { year: '2024-25', value: fiscalDeficitPercent, isCurrent: true },
  ]

  return (
    <div className="space-y-4">
      {/* Warning Banner */}
      <div className="p-4 border-2 border-[#ff00ff] bg-[#1a1a2e]">
        <div className="text-center">
          <div className="text-xs text-[#b8c0cc] mb-1">⚠️ CREDIT USED</div>
          <div className="text-3xl font-bold text-[#ff00ff]">
            {formatCurrency(borrowings)}
          </div>
          <div className="text-sm text-[#e0e4ea] mt-1">
            {borrowingPercent}% of total spending is borrowed!
          </div>
        </div>
      </div>

      {/* What is Borrowing */}
      <div className="p-4 border border-[#3d3d54] bg-[#1a1a2e]/80">
        <div className="text-sm text-[#ffcc00] mb-2">❓ Why Does Government Borrow?</div>
        <p className="text-sm text-[#c8d0dc] leading-relaxed">
          When government spending exceeds revenue (taxes + non-tax), the gap is called{' '}
          <span className="text-[#ff00ff]">Fiscal Deficit</span>. This gap is filled by
          borrowing - just like using a credit card when your salary isn&apos;t enough!
        </p>
      </div>

      <Accordion>
        {/* Key Metrics */}
        <AccordionItem title="Deficit Metrics" icon="📊" accentColor="#ff00ff" defaultOpen>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 border border-[#2d2d44] bg-[#0f0f23] text-center">
              <div className="text-xs text-[#b8c0cc] mb-1">Fiscal Deficit</div>
              <div className="text-2xl text-[#ff00ff]">{fiscalDeficitPercent}%</div>
              <div className="text-xs text-[#888]">of GDP</div>
            </div>
            <div className="p-3 border border-[#2d2d44] bg-[#0f0f23] text-center">
              <div className="text-xs text-[#b8c0cc] mb-1">Total Debt</div>
              <div className="text-2xl text-[#ffb000]">{debtToGdp}%</div>
              <div className="text-xs text-[#888]">of GDP</div>
            </div>
          </div>
          <div className="mt-3 p-2 bg-[#0f0f23] border-l-2 border-[#ff00ff]">
            <span className="text-sm text-[#c8d0dc]">
              FRBM Act target: 3% fiscal deficit. We&apos;re at {fiscalDeficitPercent}%.
            </span>
          </div>
        </AccordionItem>

        {/* Global Comparison */}
        <AccordionItem title="How India Compares Globally" icon="🌍" accentColor="#4ecdc4">
          <div className="text-xs text-[#b8c0cc] mb-3">
            Debt to GDP Ratio
          </div>
          <div className="space-y-2">
            {globalComparison.map((item, i) => (
              <div
                key={i}
                className={`flex justify-between items-center p-2 text-sm ${
                  item.isIndia ? 'bg-[#00ff41]/10 border border-[#00ff41] rounded' : ''
                }`}
              >
                <span className="text-[#c8d0dc]">
                  {item.flag} {item.country}
                  {item.isIndia && <span className="text-[#00ff41] ml-1">★</span>}
                </span>
                <span className={item.isIndia ? 'text-[#00ff41] font-bold' : 'text-[#ffcc00]'}>
                  {item.debt}%
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-[#0f0f23] border-l-2 border-[#4ecdc4]">
            <span className="text-sm text-[#c8d0dc]">
              India&apos;s debt is moderate, but we pay higher interest rates (~7% vs 2-3% in developed nations).
            </span>
          </div>
        </AccordionItem>

        {/* Historical Trend */}
        <AccordionItem title="Historical Trend" icon="📈" accentColor="#a78bfa">
          <div className="space-y-2">
            {historicalDeficit.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="text-[#a0a8b4]">{item.year}</span>
                <div className="flex-1 mx-3">
                  <div className="h-2 bg-[#0f0f23] rounded overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${(item.value / 10) * 100}%`,
                        backgroundColor: item.isCurrent ? '#00ff41' : '#a78bfa',
                      }}
                    />
                  </div>
                </div>
                <span className={item.isCurrent ? 'text-[#00ff41] font-bold' : 'text-[#ffcc00]'}>
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-sm text-[#c8d0dc]">
            COVID (2020-21) caused the highest deficit. We&apos;re recovering gradually.
          </div>
        </AccordionItem>

        {/* Borrowing Instruments */}
        <AccordionItem title="How Government Borrows" icon="📋" accentColor="#00d4ff">
          <div className="space-y-3">
            {instruments.map((item) => (
              <div key={item.name} className="p-3 bg-[#0f0f23] border-l-2" style={{ borderColor: item.color }}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#e0e4ea]">{item.icon} {item.name}</span>
                  <span className="text-sm" style={{ color: item.color }}>~{item.share}%</span>
                </div>
                <p className="text-xs text-[#888] mb-1">{item.description}</p>
                <div className="text-xs">
                  <span className="text-[#888]">Risk: </span>
                  <span className={item.risk === 'Low' || item.risk === 'Very Low' ? 'text-[#00ff41]' : 'text-[#ffb000]'}>
                    {item.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Interest Trap */}
        <AccordionItem title="The Interest Trap" icon="💸" accentColor="#ff6b6b">
          <div className="space-y-3">
            <p className="text-sm text-[#c8d0dc]">
              Borrowing isn&apos;t free! The government pays{' '}
              <span className="text-[#ffff00]">₹11.5 lakh crore</span> every year just as
              interest on past loans.
            </p>
            <div className="p-3 border-2 border-[#ff6b6b] bg-[#ff6b6b]/10 text-center">
              <div className="text-[#ff6b6b] text-sm mb-1">⚠️ LARGEST BUDGET EXPENSE</div>
              <p className="text-sm text-[#c8d0dc]">
                Interest payments &gt; Defence + Education + Health combined!
              </p>
            </div>
            <div className="p-2 bg-[#0f0f23] border-l-2 border-[#ff6b6b]">
              <div className="text-sm text-[#ff6b6b]">Daily Interest</div>
              <div className="text-lg text-[#ffcc00]">~₹3,150 Cr/day</div>
            </div>
          </div>
        </AccordionItem>

        {/* Fun Facts */}
        <AccordionItem title="Did You Know?" icon="💡" accentColor="#fbbf24">
          <div className="space-y-2">
            <div className="flex gap-2 text-sm">
              <span className="text-[#fbbf24]">★</span>
              <span className="text-[#c8d0dc]">Every Indian&apos;s share of govt debt: ~₹1.5 lakh</span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-[#fbbf24]">★</span>
              <span className="text-[#c8d0dc]">95% of India&apos;s debt is domestic - a strength!</span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-[#fbbf24]">★</span>
              <span className="text-[#c8d0dc]">Japan has 263% debt-to-GDP but survives on domestic borrowing</span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-[#fbbf24]">★</span>
              <span className="text-[#c8d0dc]">Combined Centre + State debt is ~85% of GDP</span>
            </div>
          </div>
        </AccordionItem>

        {/* Impact on You */}
        <AccordionItem title="Impact on You" icon="👤" accentColor="#f472b6">
          <div className="space-y-3">
            <div className="p-2 bg-[#0f0f23] border-l-2 border-[#f472b6]">
              <div className="text-sm text-[#f472b6]">Your Debt Share</div>
              <div className="text-sm text-[#c8d0dc]">
                Each citizen owes ~₹1.5 lakh as their share of government debt.
              </div>
            </div>
            <div className="p-2 bg-[#0f0f23] border-l-2 border-[#f472b6]">
              <div className="text-sm text-[#f472b6]">Crowding Out</div>
              <div className="text-sm text-[#c8d0dc]">
                Government borrowing leaves less credit for private businesses.
              </div>
            </div>
            <div className="p-2 bg-[#0f0f23] border-l-2 border-[#f472b6]">
              <div className="text-sm text-[#f472b6]">Future Taxes</div>
              <div className="text-sm text-[#c8d0dc]">
                Today&apos;s borrowing = tomorrow&apos;s taxes to repay it.
              </div>
            </div>
            <div className="p-2 bg-[#0f0f23] border-l-2 border-[#f472b6]">
              <div className="text-sm text-[#f472b6]">Inflation Risk</div>
              <div className="text-sm text-[#c8d0dc]">
                Excess borrowing can trigger inflation, reducing your purchasing power.
              </div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
