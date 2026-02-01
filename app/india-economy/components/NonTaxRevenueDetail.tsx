'use client'

import { BudgetData } from '../data/types'
import { Accordion, AccordionItem } from './Accordion'
import { useCurrency } from '../context/CurrencyContext'

interface NonTaxRevenueDetailProps {
  budget: BudgetData
}

interface CountryData {
  country: string
  flag: string
  psuRevenuePercent: number
  isIndia?: boolean
}

export function NonTaxRevenueDetail({ budget }: NonTaxRevenueDetailProps) {
  const { nonTaxRevenue } = budget
  const { formatCurrency } = useCurrency()
  const totalNonTax =
    nonTaxRevenue.dividends + nonTaxRevenue.interestReceipts + nonTaxRevenue.otherNonTax

  const revenueItems = [
    {
      name: 'Dividends & Profits',
      value: nonTaxRevenue.dividends,
      icon: '🏦',
      color: '#00ff41',
      description: 'Earnings from Public Sector Undertakings (PSUs) and RBI',
      sources: [
        { name: 'RBI Surplus', note: 'Central bank profits' },
        { name: 'Oil PSUs', note: 'ONGC, IOC, BPCL' },
        { name: 'Bank Dividends', note: 'SBI, public sector banks' },
        { name: 'Other PSUs', note: 'Coal India, NTPC, etc.' },
      ],
      funFacts: [
        'RBI alone transferred ₹2.1 lakh crore as surplus in 2023-24!',
        'India has over 250 Central Public Sector Enterprises',
        'Maharatna PSUs employ lakhs of people',
      ],
    },
    {
      name: 'Interest Receipts',
      value: nonTaxRevenue.interestReceipts,
      icon: '💵',
      color: '#ffb000',
      description: 'Interest earned on loans given by the government',
      sources: [
        { name: 'State Loans', note: 'Loans to state governments' },
        { name: 'PSU Loans', note: 'Loans to public enterprises' },
        { name: 'Foreign Loans', note: 'Loans to other countries' },
      ],
      funFacts: [
        'India has given loans to countries like Bangladesh, Sri Lanka, and Maldives',
        'States borrow from Center at concessional rates',
        'These loans help fund infrastructure projects',
      ],
    },
    {
      name: 'Other Non-Tax Revenue',
      value: nonTaxRevenue.otherNonTax,
      icon: '📋',
      color: '#a78bfa',
      description: 'Various fees, fines, and service charges',
      sources: [
        { name: 'Spectrum Auction', note: '5G, telecom licenses' },
        { name: 'Passport Fees', note: 'Application charges' },
        { name: 'License Fees', note: 'Various permits' },
        { name: 'Fines & Penalties', note: 'Court fines, traffic challans' },
      ],
      funFacts: [
        'The 5G spectrum auction in 2022 raised over ₹1.5 lakh crore!',
        'Passport fees vary from ₹1,500 to ₹3,500',
        'Mining royalties are a significant source',
      ],
    },
  ]

  // Global comparison of state-owned enterprise revenue
  const globalComparison: CountryData[] = [
    { country: 'China', flag: '🇨🇳', psuRevenuePercent: 35 },
    { country: 'Russia', flag: '🇷🇺', psuRevenuePercent: 20 },
    { country: 'India', flag: '🇮🇳', psuRevenuePercent: 8, isIndia: true },
    { country: 'Brazil', flag: '🇧🇷', psuRevenuePercent: 5 },
    { country: 'USA', flag: '🇺🇸', psuRevenuePercent: 2 },
    { country: 'UK', flag: '🇬🇧', psuRevenuePercent: 1 },
  ]

  return (
    <div className="space-y-4">
      {/* Hero Overview */}
      <div className="p-4 border-2 border-[#00d4ff] bg-[#1a1a2e]">
        <div className="text-center">
          <div className="text-xs text-[#b8c0cc] mb-1">TOTAL NON-TAX REVENUE</div>
          <div className="text-3xl font-bold text-[#00d4ff]">
            {formatCurrency(totalNonTax)}
          </div>
          <div className="text-sm text-[#e0e4ea] mt-1">
            Revenue earned without imposing taxes
          </div>
        </div>
      </div>

      {/* What is Non-Tax Revenue */}
      <div className="p-4 border border-[#3d3d54] bg-[#1a1a2e]/80">
        <div className="text-sm text-[#ffcc00] mb-2">❓ What is Non-Tax Revenue?</div>
        <p className="text-sm text-[#c8d0dc] leading-relaxed">
          Unlike taxes which are mandatory payments, non-tax revenue comes from
          the government&apos;s business activities - <span className="text-[#00ff41]">dividends</span> from
          companies it owns, <span className="text-[#ffb000]">interest</span> on loans it gives,
          and <span className="text-[#a78bfa]">fees</span> for services.
        </p>
      </div>

      <Accordion>
        {/* Revenue Breakdown */}
        <AccordionItem title="Revenue Components" icon="📊" accentColor="#00d4ff" defaultOpen>
          <div className="space-y-3">
            {revenueItems.map((item) => {
              const percent = ((item.value / totalNonTax) * 100).toFixed(1)
              return (
                <div key={item.name} className="p-3 bg-[#0f0f23] border-l-2" style={{ borderColor: item.color }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#e0e4ea]">
                      {item.icon} {item.name}
                    </span>
                    <div className="text-right">
                      <div style={{ color: item.color }}>{formatCurrency(item.value)}</div>
                      <div className="text-xs text-[#888]">{percent}%</div>
                    </div>
                  </div>
                  <div className="h-2 bg-[#1a1a2e] rounded overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </AccordionItem>

        {/* Global Comparison */}
        <AccordionItem title="How India Compares Globally" icon="🌍" accentColor="#4ecdc4">
          <div className="text-xs text-[#b8c0cc] mb-3">
            State-owned enterprise revenue as % of GDP
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
                  {item.psuRevenuePercent}%
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-[#0f0f23] border-l-2 border-[#4ecdc4]">
            <span className="text-sm text-[#c8d0dc]">
              China&apos;s state enterprises dominate; India is privatizing more PSUs.
            </span>
          </div>
        </AccordionItem>

        {/* Key Sources */}
        <AccordionItem title="Top Revenue Sources" icon="🏦" accentColor="#00ff41">
          <div className="space-y-3">
            {revenueItems.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="text-sm text-[#e0e4ea]">{item.icon} {item.name}</div>
                {item.sources.map((source, i) => (
                  <div key={i} className="flex justify-between text-sm pl-4">
                    <span className="text-[#00ff41]">→ {source.name}</span>
                    <span className="text-[#888]">{source.note}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Disinvestment */}
        <AccordionItem title="Disinvestment" icon="📈" accentColor="#ff00ff">
          <div className="space-y-3">
            <p className="text-sm text-[#c8d0dc]">
              The government also raises money by selling its stake in PSUs.
              This is called <span className="text-[#ffff00]">disinvestment</span>.
            </p>
            <div className="p-3 bg-[#0f0f23] border-l-2 border-[#ff00ff]">
              <div className="text-sm text-[#ff00ff]">Target for 2024-25</div>
              <div className="text-lg text-[#ffcc00]">₹50,000 Cr</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-[#c8d0dc]">Recent big moves:</div>
              <div className="flex gap-2 text-sm">
                <span className="text-[#fbbf24]">→</span>
                <span className="text-[#c8d0dc]">LIC IPO (2022) - ₹21,000 Cr raised</span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-[#fbbf24]">→</span>
                <span className="text-[#c8d0dc]">Air India sold to Tata (2022)</span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-[#fbbf24]">→</span>
                <span className="text-[#c8d0dc]">BPCL privatization (in progress)</span>
              </div>
            </div>
          </div>
        </AccordionItem>

        {/* Fun Facts */}
        <AccordionItem title="Did You Know?" icon="💡" accentColor="#fbbf24">
          <div className="space-y-2">
            {revenueItems.flatMap((item) =>
              item.funFacts.slice(0, 1).map((fact, i) => (
                <div key={`${item.name}-${i}`} className="flex gap-2 text-sm">
                  <span className="text-[#fbbf24]">{item.icon}</span>
                  <span className="text-[#c8d0dc]">{fact}</span>
                </div>
              ))
            )}
          </div>
        </AccordionItem>

        {/* Impact on You */}
        <AccordionItem title="Impact on You" icon="👤" accentColor="#f472b6">
          <div className="space-y-3">
            <div className="p-2 bg-[#0f0f23] border-l-2 border-[#f472b6]">
              <div className="text-sm text-[#f472b6]">Hidden Benefit</div>
              <div className="text-sm text-[#c8d0dc]">
                PSU dividends reduce the need for higher taxes on citizens.
              </div>
            </div>
            <div className="p-2 bg-[#0f0f23] border-l-2 border-[#f472b6]">
              <div className="text-sm text-[#f472b6]">Public Services</div>
              <div className="text-sm text-[#c8d0dc]">
                PSUs like Indian Railways, BSNL serve areas private companies won&apos;t.
              </div>
            </div>
            <div className="p-2 bg-[#0f0f23] border-l-2 border-[#f472b6]">
              <div className="text-sm text-[#f472b6]">Employment</div>
              <div className="text-sm text-[#c8d0dc]">
                Central PSUs employ over 10 lakh people directly.
              </div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
