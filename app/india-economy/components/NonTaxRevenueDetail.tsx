'use client'

import { BudgetData } from '../data/types'

interface NonTaxRevenueDetailProps {
  budget: BudgetData
}

export function NonTaxRevenueDetail({ budget }: NonTaxRevenueDetailProps) {
  const { nonTaxRevenue } = budget
  const totalNonTax =
    nonTaxRevenue.dividends + nonTaxRevenue.interestReceipts + nonTaxRevenue.otherNonTax

  const revenueItems = [
    {
      name: 'Dividends & Profits',
      value: nonTaxRevenue.dividends,
      icon: '🏦',
      description: 'Earnings from Public Sector Undertakings (PSUs) and RBI',
      sources: [
        { name: 'RBI Surplus', note: 'Central bank profits' },
        { name: 'Oil PSUs', note: 'ONGC, IOC, BPCL' },
        { name: 'Bank Dividends', note: 'SBI, public sector banks' },
        { name: 'Other PSUs', note: 'Coal India, NTPC, etc.' },
      ],
      funFact: 'RBI alone transferred ₹2.1 lakh crore as surplus in 2023-24!',
    },
    {
      name: 'Interest Receipts',
      value: nonTaxRevenue.interestReceipts,
      icon: '💵',
      description: 'Interest earned on loans given by the government',
      sources: [
        { name: 'State Loans', note: 'Loans to state governments' },
        { name: 'PSU Loans', note: 'Loans to public enterprises' },
        { name: 'Foreign Loans', note: 'Loans to other countries' },
      ],
      funFact: 'India has given loans to countries like Bangladesh, Sri Lanka, and Maldives.',
    },
    {
      name: 'Other Non-Tax Revenue',
      value: nonTaxRevenue.otherNonTax,
      icon: '📋',
      description: 'Various fees, fines, and service charges',
      sources: [
        { name: 'Spectrum Auction', note: '5G, telecom licenses' },
        { name: 'Passport Fees', note: 'Application charges' },
        { name: 'License Fees', note: 'Various permits' },
        { name: 'Fines & Penalties', note: 'Court fines, traffic challans' },
      ],
      funFact: 'The 5G spectrum auction in 2022 raised over ₹1.5 lakh crore!',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="p-4 border-2 border-[#00d4ff] bg-[#1a1a2e]">
        <div className="text-xs text-[#ffb000] mb-2">TOTAL NON-TAX REVENUE</div>
        <div className="text-2xl text-[#00d4ff]">
          ₹{totalNonTax.toLocaleString('en-IN')} Cr
        </div>
        <div className="text-xs text-[#888] mt-1">
          Revenue earned without imposing taxes
        </div>
      </div>

      {/* What is Non-Tax Revenue */}
      <div className="p-3 border border-[#2d2d44] bg-[#1a1a2e]/50">
        <div className="text-xs text-[#ffff00] mb-2">❓ WHAT IS NON-TAX REVENUE?</div>
        <p className="text-xs text-[#888] leading-relaxed">
          Unlike taxes which are mandatory payments, non-tax revenue comes from
          government&apos;s business activities - dividends from companies it owns,
          interest on loans it gives, fees for services, and sale of assets.
        </p>
      </div>

      {/* Revenue breakdown */}
      {revenueItems.map((item) => (
        <div key={item.name} className="border border-[#2d2d44] bg-[#1a1a2e]/50">
          {/* Header */}
          <div className="p-3 border-b border-[#2d2d44] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl">{item.icon}</span>
              <span className="text-[#00d4ff] text-sm">{item.name}</span>
            </div>
            <span className="text-[#ffb000] text-sm">
              ₹{item.value.toLocaleString('en-IN')} Cr
            </span>
          </div>

          {/* Content */}
          <div className="p-3 space-y-3">
            <p className="text-xs text-[#888]">{item.description}</p>

            {/* Sources */}
            <div className="space-y-1">
              <div className="text-xs text-[#00d4ff] mb-2">Key Sources:</div>
              {item.sources.map((source, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-[#00ff41]">→ {source.name}</span>
                  <span className="text-[#888]">{source.note}</span>
                </div>
              ))}
            </div>

            {/* Fun fact */}
            <div className="mt-3 p-2 bg-[#0f0f23] border-l-2 border-[#ff00ff]">
              <span className="text-[#ff00ff] text-xs">💡 </span>
              <span className="text-xs text-[#00d4ff]">{item.funFact}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Disinvestment Note */}
      <div className="p-4 border border-[#ff00ff] bg-[#1a1a2e]">
        <div className="text-xs text-[#ff00ff] mb-2">📈 DISINVESTMENT</div>
        <p className="text-xs text-[#888] leading-relaxed mb-2">
          The government also raises money by selling its stake in PSUs.
          This is called <span className="text-[#ffff00]">disinvestment</span>.
          Recent examples include LIC IPO and Air India privatization.
        </p>
        <div className="text-xs text-[#00d4ff]">
          Target for 2024-25: ₹50,000 Cr
        </div>
      </div>
    </div>
  )
}
