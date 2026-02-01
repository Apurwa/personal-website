'use client'

import { BudgetData } from '../data/types'

interface TaxRevenueDetailProps {
  budget: BudgetData
}

export function TaxRevenueDetail({ budget }: TaxRevenueDetailProps) {
  const { taxRevenue, grossTaxRevenue } = budget

  const taxItems = [
    {
      name: 'GST',
      value: taxRevenue.gst,
      description: 'Goods & Services Tax - Unified indirect tax replacing multiple levies',
      breakdown: [
        { label: 'CGST (Central)', percent: 50 },
        { label: 'SGST (State)', percent: 50 },
      ],
      funFact: 'GST was introduced in July 2017, unifying 17 different taxes!',
    },
    {
      name: 'Income Tax',
      value: taxRevenue.incomeTax,
      description: 'Tax on individual earnings above exemption limit',
      breakdown: [
        { label: 'Up to ₹3L', percent: 0, note: 'Nil' },
        { label: '₹3L - ₹7L', percent: 5 },
        { label: '₹7L - ₹10L', percent: 10 },
        { label: '₹10L - ₹12L', percent: 15 },
        { label: '₹12L - ₹15L', percent: 20 },
        { label: 'Above ₹15L', percent: 30 },
      ],
      funFact: 'Only ~2% of Indians pay income tax!',
    },
    {
      name: 'Corporate Tax',
      value: taxRevenue.corporateTax,
      description: 'Tax on company profits',
      breakdown: [
        { label: 'New Companies', percent: 15, note: 'With conditions' },
        { label: 'Existing Companies', percent: 22 },
        { label: 'Large Companies', percent: 30 },
      ],
      funFact: 'Corporate tax was slashed from 30% to 22% in 2019 to boost manufacturing.',
    },
    {
      name: 'Customs Duty',
      value: taxRevenue.customsDuty,
      description: 'Tax on imports entering India',
      breakdown: [],
      funFact: 'Customs duty helps protect domestic industries from cheap imports.',
    },
    {
      name: 'Excise Duty',
      value: taxRevenue.exciseDuty,
      description: 'Tax on goods manufactured in India (mainly fuel)',
      breakdown: [],
      funFact: 'Fuel excise duty is a major revenue source - you pay ~50% tax on petrol!',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="p-4 border-2 border-[#00ff41] bg-[#1a1a2e]">
        <div className="text-xs text-[#00d4ff] mb-2">GROSS TAX REVENUE</div>
        <div className="text-2xl text-[#00ff41]">
          ₹{grossTaxRevenue.toLocaleString('en-IN')} Cr
        </div>
        <div className="text-xs text-[#ffb000] mt-1">
          ~{((grossTaxRevenue / budget.totalExpenditure) * 100).toFixed(0)}% of total budget
        </div>
      </div>

      {/* Tax breakdown */}
      {taxItems.map((item) => (
        <div key={item.name} className="border border-[#2d2d44] bg-[#1a1a2e]/50">
          {/* Header */}
          <div className="p-3 border-b border-[#2d2d44] flex justify-between items-center">
            <span className="text-[#00d4ff] text-sm">{item.name}</span>
            <span className="text-[#ffb000] text-sm">
              ₹{item.value.toLocaleString('en-IN')} Cr
            </span>
          </div>

          {/* Content */}
          <div className="p-3 space-y-3">
            <p className="text-xs text-[#888]">{item.description}</p>

            {/* Breakdown if available */}
            {item.breakdown.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs text-[#00d4ff] mb-2">
                  {item.name === 'Income Tax' ? 'Tax Slabs (New Regime)' : 'Breakdown'}
                </div>
                {item.breakdown.map((b, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-[#888]">{b.label}</span>
                    <span className="text-[#ffff00]">
                      {b.percent}%{b.note && ` (${b.note})`}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Fun fact */}
            <div className="mt-3 p-2 bg-[#0f0f23] border-l-2 border-[#ff00ff]">
              <span className="text-[#ff00ff] text-xs">💡 </span>
              <span className="text-xs text-[#00d4ff]">{item.funFact}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Visual pie representation */}
      <div className="p-4 border border-[#ffff00] bg-[#1a1a2e]">
        <div className="text-xs text-[#ffff00] mb-3 text-center">TAX MIX</div>
        <div className="flex flex-wrap justify-center gap-2">
          {taxItems.map((item) => {
            const percent = ((item.value / grossTaxRevenue) * 100).toFixed(1)
            return (
              <div
                key={item.name}
                className="px-2 py-1 text-xs border border-[#2d2d44]"
              >
                <span className="text-[#00d4ff]">{item.name}: </span>
                <span className="text-[#00ff41]">{percent}%</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
