'use client'

import { BudgetData } from '../data/types'

interface BorrowingsDetailProps {
  budget: BudgetData
}

export function BorrowingsDetail({ budget }: BorrowingsDetailProps) {
  const { borrowings, fiscalDeficit, fiscalDeficitPercent, debtToGdp, totalExpenditure } = budget

  const borrowingPercent = ((borrowings / totalExpenditure) * 100).toFixed(1)

  const instruments = [
    {
      name: 'Government Securities (G-Secs)',
      description: 'Long-term bonds (5-40 years) sold to banks, insurance companies',
      share: 75,
      risk: 'Low',
    },
    {
      name: 'Treasury Bills (T-Bills)',
      description: 'Short-term borrowing (91, 182, 364 days)',
      share: 15,
      risk: 'Very Low',
    },
    {
      name: 'External Borrowing',
      description: 'Loans from World Bank, IMF, bilateral sources',
      share: 5,
      risk: 'Currency Risk',
    },
    {
      name: 'Small Savings',
      description: 'PPF, NSC, Sukanya Samriddhi - public deposits',
      share: 5,
      risk: 'Low',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Warning Banner */}
      <div className="p-4 border-2 border-[#ff00ff] bg-[#1a1a2e] animate-pulse">
        <div className="text-xs text-[#ff00ff] mb-2">⚠️ CREDIT USED</div>
        <div className="text-2xl text-[#ff00ff]">
          ₹{borrowings.toLocaleString('en-IN')} Cr
        </div>
        <div className="text-xs text-[#ffb000] mt-1">
          {borrowingPercent}% of total spending is borrowed money!
        </div>
      </div>

      {/* What is Borrowing */}
      <div className="p-3 border border-[#2d2d44] bg-[#1a1a2e]/50">
        <div className="text-xs text-[#ffff00] mb-2">❓ WHY DOES GOVERNMENT BORROW?</div>
        <p className="text-xs text-[#888] leading-relaxed">
          When government spending exceeds revenue (taxes + non-tax), the gap is called{' '}
          <span className="text-[#ff00ff]">Fiscal Deficit</span>. This gap is filled by
          borrowing - just like using a credit card when your salary isn&apos;t enough!
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 border border-[#2d2d44] bg-[#1a1a2e] text-center">
          <div className="text-xs text-[#00d4ff] mb-1">Fiscal Deficit</div>
          <div className="text-lg text-[#ff00ff]">{fiscalDeficitPercent}%</div>
          <div className="text-xs text-[#888]">of GDP</div>
        </div>
        <div className="p-3 border border-[#2d2d44] bg-[#1a1a2e] text-center">
          <div className="text-xs text-[#00d4ff] mb-1">Total Debt</div>
          <div className="text-lg text-[#ffb000]">{debtToGdp}%</div>
          <div className="text-xs text-[#888]">of GDP</div>
        </div>
      </div>

      {/* Borrowing Instruments */}
      <div className="border border-[#2d2d44] bg-[#1a1a2e]/50">
        <div className="p-3 border-b border-[#2d2d44]">
          <div className="text-xs text-[#ffff00]">📊 HOW DOES GOVERNMENT BORROW?</div>
        </div>
        <div className="p-3 space-y-3">
          {instruments.map((item) => (
            <div key={item.name} className="p-2 border border-[#2d2d44] bg-[#0f0f23]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-[#00d4ff]">{item.name}</span>
                <span className="text-xs text-[#00ff41]">~{item.share}%</span>
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
      </div>

      {/* Interest Burden */}
      <div className="p-4 border border-[#ff00ff] bg-[#1a1a2e]">
        <div className="text-xs text-[#ff00ff] mb-2">💸 THE INTEREST TRAP</div>
        <p className="text-xs text-[#888] leading-relaxed mb-3">
          Borrowing isn&apos;t free! The government pays{' '}
          <span className="text-[#ffff00]">₹11.5 lakh crore</span> every year just as
          interest on past loans. That&apos;s the largest single expense in the budget!
        </p>
        <div className="p-2 bg-[#0f0f23] border-l-2 border-[#ffff00]">
          <span className="text-xs text-[#00d4ff]">
            💡 Interest payments are MORE than what we spend on Defence, Education,
            and Health combined!
          </span>
        </div>
      </div>

      {/* Debt Comparison */}
      <div className="p-4 border border-[#00d4ff] bg-[#1a1a2e]">
        <div className="text-xs text-[#00d4ff] mb-3">🌍 HOW DO WE COMPARE?</div>
        <div className="space-y-2">
          {[
            { country: 'Japan', debt: 263, flag: '🇯🇵' },
            { country: 'USA', debt: 123, flag: '🇺🇸' },
            { country: 'India', debt: debtToGdp, flag: '🇮🇳', highlight: true },
            { country: 'China', debt: 77, flag: '🇨🇳' },
            { country: 'Germany', debt: 66, flag: '🇩🇪' },
          ].map((item) => (
            <div
              key={item.country}
              className={`flex justify-between text-xs p-1 ${item.highlight ? 'bg-[#00ff41]/10 border border-[#00ff41]' : ''}`}
            >
              <span className="text-[#888]">
                {item.flag} {item.country}
              </span>
              <span className={item.highlight ? 'text-[#00ff41]' : 'text-[#ffb000]'}>
                {item.debt}% of GDP
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#888] mt-3">
          India&apos;s debt is moderate compared to developed nations, but interest rates
          are higher here.
        </p>
      </div>

      {/* Fun Fact */}
      <div className="p-3 border-2 border-[#ffff00] bg-[#1a1a2e] text-center">
        <span className="text-[#ffff00] text-xs">🎮 GAME TIP: </span>
        <span className="text-xs text-[#00d4ff]">
          Every Indian citizen&apos;s share of government debt is approximately ₹1.5 lakh!
        </span>
      </div>
    </div>
  )
}
