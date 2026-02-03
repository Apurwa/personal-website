'use client'

import { BudgetData } from '../data/types'
import { Accordion, AccordionItem } from './Accordion'
import { useCurrency } from '../context/CurrencyContext'

interface TaxRevenueDetailProps {
  budget: BudgetData
}

interface CountryTaxData {
  country: string
  flag: string
  taxToGdp: number
  isIndia?: boolean
}

export function TaxRevenueDetail({ budget }: TaxRevenueDetailProps) {
  const { taxRevenue, grossTaxRevenue, totalRevenue, nonTaxRevenue } = budget
  const { formatCurrency } = useCurrency()

  // Calculate States' Share (devolution to states per Finance Commission)
  const totalNonTax = nonTaxRevenue.dividends + nonTaxRevenue.interestReceipts + nonTaxRevenue.otherNonTax
  const netTaxRevenue = totalRevenue - totalNonTax
  const statesShare = grossTaxRevenue - netTaxRevenue
  const statesSharePercent = ((statesShare / grossTaxRevenue) * 100).toFixed(0)

  const taxItems = [
    {
      name: 'GST',
      value: taxRevenue.gst,
      icon: '🛒',
      color: '#00ff41',
      description: 'Goods & Services Tax - Unified indirect tax replacing multiple levies',
      breakdown: [
        { label: 'CGST (Central)', percent: 50 },
        { label: 'SGST (State)', percent: 50 },
      ],
      funFacts: [
        'GST was introduced in July 2017, unifying 17 different taxes!',
        'There are 4 GST slabs: 5%, 12%, 18%, and 28%',
        'GST council has representatives from all states',
      ],
    },
    {
      name: 'Income Tax',
      value: taxRevenue.incomeTax,
      icon: '💰',
      color: '#ffb000',
      description: 'Tax on individual earnings above exemption limit',
      breakdown: [
        { label: 'Up to ₹3L', percent: 0, note: 'Nil' },
        { label: '₹3L - ₹7L', percent: 5 },
        { label: '₹7L - ₹10L', percent: 10 },
        { label: '₹10L - ₹12L', percent: 15 },
        { label: '₹12L - ₹15L', percent: 20 },
        { label: 'Above ₹15L', percent: 30 },
      ],
      funFacts: [
        'Only ~2% of Indians pay income tax!',
        'The new tax regime offers lower rates but no deductions',
        'Income tax was introduced in India in 1860',
      ],
    },
    {
      name: 'Corporate Tax',
      value: taxRevenue.corporateTax,
      icon: '🏢',
      color: '#00d4ff',
      description: 'Tax on company profits',
      breakdown: [
        { label: 'New Manufacturing', percent: 15, note: 'With conditions' },
        { label: 'Existing Companies', percent: 22 },
        { label: 'Large Companies', percent: 30 },
      ],
      funFacts: [
        'Corporate tax was slashed from 30% to 22% in 2019',
        'India\'s corporate tax rate is competitive globally',
        'IT companies enjoy various tax incentives',
      ],
    },
    {
      name: 'Customs Duty',
      value: taxRevenue.customsDuty,
      icon: '🚢',
      color: '#a78bfa',
      description: 'Tax on imports entering India',
      breakdown: [],
      funFacts: [
        'Customs duty helps protect domestic industries',
        'Electronics imports face varying duty rates',
        'Gold imports attract significant customs duty',
      ],
    },
    {
      name: 'Excise Duty',
      value: taxRevenue.exciseDuty,
      icon: '⛽',
      color: '#ff6b6b',
      description: 'Tax on goods manufactured in India (mainly fuel)',
      breakdown: [],
      funFacts: [
        'Fuel excise is a major source - ~50% tax on petrol!',
        'Excise on fuel was raised during COVID to boost revenue',
        'States also add VAT on top of central excise',
      ],
    },
  ]

  // Global tax comparison data
  const globalComparison: CountryTaxData[] = [
    { country: 'Denmark', flag: '🇩🇰', taxToGdp: 46.3 },
    { country: 'France', flag: '🇫🇷', taxToGdp: 45.4 },
    { country: 'Germany', flag: '🇩🇪', taxToGdp: 38.8 },
    { country: 'UK', flag: '🇬🇧', taxToGdp: 33.5 },
    { country: 'USA', flag: '🇺🇸', taxToGdp: 27.1 },
    { country: 'China', flag: '🇨🇳', taxToGdp: 17.5 },
    { country: 'India', flag: '🇮🇳', taxToGdp: 17.8, isIndia: true },
    { country: 'Indonesia', flag: '🇮🇩', taxToGdp: 10.9 },
  ]

  return (
    <div className="space-y-4">
      {/* Hero Overview */}
      <div className="p-4 border-2 border-[#00ff41] bg-[#1a1a2e]">
        <div className="text-center">
          <div className="text-xs text-[#b8c0cc] mb-1">GROSS TAX REVENUE</div>
          <div className="text-3xl font-bold text-[#00ff41]">
            {formatCurrency(grossTaxRevenue)}
          </div>
          <div className="text-sm text-[#e0e4ea] mt-1">
            Total taxes collected by Centre
          </div>
        </div>
      </div>

      {/* Tax Devolution Visual - States' Share */}
      <div className="p-4 border-2 border-[#ffb000] bg-[#1a1a2e]">
        <div className="text-xs text-[#ffb000] text-center mb-3">📊 WHERE DOES THE TAX GO?</div>

        {/* Flow visualization */}
        <div className="space-y-3">
          {/* Gross Tax */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-8 bg-[#00ff41]/20 border border-[#00ff41] flex items-center justify-between px-3">
              <span className="text-xs text-[#00ff41]">Gross Tax</span>
              <span className="text-xs text-[#00ff41] font-bold">{formatCurrency(grossTaxRevenue)}</span>
            </div>
          </div>

          {/* Arrow and split */}
          <div className="flex items-center justify-center text-[#888]">↓ Split as per Finance Commission ↓</div>

          {/* Two boxes side by side */}
          <div className="grid grid-cols-2 gap-2">
            {/* States' Share */}
            <div className="h-16 bg-[#ff6b6b]/20 border border-[#ff6b6b] flex flex-col items-center justify-center p-2">
              <span className="text-xs text-[#ff6b6b]">🏛️ States&apos; Share</span>
              <span className="text-sm text-[#ff6b6b] font-bold">{formatCurrency(statesShare)}</span>
              <span className="text-xs text-[#888]">~{statesSharePercent}%</span>
            </div>

            {/* Centre's Share */}
            <div className="h-16 bg-[#00d4ff]/20 border border-[#00d4ff] flex flex-col items-center justify-center p-2">
              <span className="text-xs text-[#00d4ff]">🏦 Centre&apos;s Share</span>
              <span className="text-sm text-[#00d4ff] font-bold">{formatCurrency(netTaxRevenue)}</span>
              <span className="text-xs text-[#888]">~{100 - Number(statesSharePercent)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory Note */}
      <div className="p-4 border border-[#ff6b6b] bg-[#ff6b6b]/10">
        <div className="text-sm text-[#ff6b6b] mb-2">⚠️ Why is Gross Tax &gt; Total Revenue?</div>
        <p className="text-sm text-[#c8d0dc] leading-relaxed">
          The Centre doesn&apos;t keep all the tax it collects! As per the <span className="text-[#ffb000]">Constitution</span> and
          <span className="text-[#ffb000]"> Finance Commission</span> recommendations, about <span className="text-[#ff6b6b]">41%</span> of
          the &quot;divisible pool&quot; (Income Tax, Corporate Tax, GST) is shared with states. This is called
          <span className="text-[#00ff41]"> Tax Devolution</span> - it ensures states have funds for local governance.
        </p>
      </div>

      {/* What are taxes? */}
      <div className="p-4 border border-[#3d3d54] bg-[#1a1a2e]/80">
        <div className="text-sm text-[#ffcc00] mb-2">💡 Understanding Taxes</div>
        <p className="text-sm text-[#c8d0dc] leading-relaxed">
          Taxes are the primary way the government earns money to fund public services.
          India has <span className="text-[#00ff41]">Direct taxes</span> (Income, Corporate)
          paid by earners, and <span className="text-[#ffb000]">Indirect taxes</span> (GST, Customs)
          paid by consumers on goods and services.
        </p>
      </div>

      <Accordion>
        {/* Tax Breakdown */}
        <AccordionItem title="Tax Components" icon="📊" accentColor="#00ff41" defaultOpen>
          <div className="space-y-3">
            {taxItems.map((item) => {
              const percent = ((item.value / grossTaxRevenue) * 100).toFixed(1)
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

        {/* Tax Devolution */}
        <AccordionItem title="Tax Devolution to States" icon="🏛️" accentColor="#ff6b6b">
          <div className="space-y-3">
            <p className="text-sm text-[#c8d0dc]">
              The 15th Finance Commission (2021-26) recommends that <span className="text-[#ff6b6b] font-bold">41%</span> of
              the divisible pool of central taxes be shared with states.
            </p>
            <div className="space-y-2">
              <div className="text-xs text-[#b8c0cc] mb-2">Taxes in the Divisible Pool:</div>
              <div className="flex justify-between text-sm p-2 bg-[#0f0f23]">
                <span className="text-[#c8d0dc]">✓ Income Tax</span>
                <span className="text-[#00ff41]">Shared</span>
              </div>
              <div className="flex justify-between text-sm p-2 bg-[#0f0f23]">
                <span className="text-[#c8d0dc]">✓ Corporate Tax</span>
                <span className="text-[#00ff41]">Shared</span>
              </div>
              <div className="flex justify-between text-sm p-2 bg-[#0f0f23]">
                <span className="text-[#c8d0dc]">✓ CGST (Central GST)</span>
                <span className="text-[#00ff41]">Shared</span>
              </div>
              <div className="flex justify-between text-sm p-2 bg-[#0f0f23]">
                <span className="text-[#c8d0dc]">✗ Customs Duty</span>
                <span className="text-[#ff6b6b]">Not Shared</span>
              </div>
              <div className="flex justify-between text-sm p-2 bg-[#0f0f23]">
                <span className="text-[#c8d0dc]">✗ Excise on Fuel</span>
                <span className="text-[#ff6b6b]">Not Shared</span>
              </div>
            </div>
            <div className="mt-3 p-2 bg-[#0f0f23] border-l-2 border-[#ff6b6b]">
              <span className="text-sm text-[#c8d0dc]">
                💡 States with larger population & lower per-capita income get a bigger share!
              </span>
            </div>
          </div>
        </AccordionItem>

        {/* Global Comparison */}
        <AccordionItem title="How India Compares Globally" icon="🌍" accentColor="#4ecdc4">
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
                  {item.taxToGdp}% of GDP
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-[#0f0f23] border-l-2 border-[#4ecdc4]">
            <span className="text-sm text-[#c8d0dc]">
              India&apos;s tax-to-GDP ratio is low. More tax collection = better public services!
            </span>
          </div>
        </AccordionItem>

        {/* Income Tax Slabs */}
        <AccordionItem title="Income Tax Slabs (New Regime)" icon="💰" accentColor="#ffb000">
          <div className="space-y-2">
            {taxItems[1].breakdown.map((slab, i) => (
              <div key={i} className="flex justify-between items-center p-2 bg-[#0f0f23] text-sm">
                <span className="text-[#c8d0dc]">{slab.label}</span>
                <span className="text-[#ffb000]">
                  {slab.percent}%{slab.note && ` (${slab.note})`}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-[#0f0f23] border-l-2 border-[#ffb000]">
            <span className="text-sm text-[#c8d0dc]">
              💡 Only about 2% of Indians earn enough to pay income tax!
            </span>
          </div>
        </AccordionItem>

        {/* Fun Facts */}
        <AccordionItem title="Did You Know?" icon="⭐" accentColor="#fbbf24">
          <div className="space-y-2">
            {taxItems.flatMap((item) =>
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
              <div className="text-sm text-[#f472b6]">Your Tax Contribution</div>
              <div className="text-sm text-[#c8d0dc]">
                Every purchase you make includes GST - you&apos;re already a taxpayer!
              </div>
            </div>
            <div className="p-2 bg-[#0f0f23] border-l-2 border-[#f472b6]">
              <div className="text-sm text-[#f472b6]">Why It Matters</div>
              <div className="text-sm text-[#c8d0dc]">
                Low tax collection means fewer roads, hospitals, and schools.
              </div>
            </div>
            <div className="p-2 bg-[#0f0f23] border-l-2 border-[#f472b6]">
              <div className="text-sm text-[#f472b6]">Per Capita</div>
              <div className="text-sm text-[#c8d0dc]">
                Average tax paid per Indian: ~₹{Math.round(grossTaxRevenue / 140).toLocaleString('en-IN')}/year
              </div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
