'use client'

import { MinistryAllocation } from '../data/types'
import { Accordion, AccordionItem } from './Accordion'

interface MinistryDetailProps {
  ministry: MinistryAllocation
  totalExpenditure: number
}

interface MinistryInfo {
  fullName: string
  description: string
  keyPrograms: { name: string; description: string }[]
  funFacts: string[]
  breakdown?: { label: string; percent: number }[]
  impactMetric?: { label: string; value: string }
  globalComparison?: { country: string; flag: string; value: number; isIndia?: boolean }[]
  comparisonMetric?: string
}

const ministryData: Record<string, MinistryInfo> = {
  Defence: {
    fullName: 'Ministry of Defence',
    description: 'Responsible for national security, armed forces, and defense equipment procurement.',
    keyPrograms: [
      { name: 'Capital Acquisition', description: 'Fighter jets, submarines, missiles' },
      { name: 'Revenue Expenditure', description: 'Salaries, pensions, maintenance' },
      { name: 'Make in India Defence', description: 'Indigenous manufacturing push' },
      { name: 'Border Infrastructure', description: 'Roads, tunnels in border areas' },
    ],
    breakdown: [
      { label: 'Army', percent: 56 },
      { label: 'Air Force', percent: 23 },
      { label: 'Navy', percent: 15 },
      { label: 'R&D (DRDO)', percent: 6 },
    ],
    funFacts: [
      'India has the 4th largest defence budget in the world!',
      'Over 50% goes to salaries and pensions of 14 lakh+ personnel.',
      'Tejas fighter jet is fully Made in India.',
    ],
    impactMetric: { label: 'Active Personnel', value: '14.5 Lakh' },
    globalComparison: [
      { country: 'USA', flag: '🇺🇸', value: 886 },
      { country: 'China', flag: '🇨🇳', value: 224 },
      { country: 'Russia', flag: '🇷🇺', value: 109 },
      { country: 'India', flag: '🇮🇳', value: 83, isIndia: true },
      { country: 'UK', flag: '🇬🇧', value: 75 },
    ],
    comparisonMetric: 'Defence Budget (Billion USD)',
  },
  'Road Transport': {
    fullName: 'Ministry of Road Transport & Highways',
    description: 'Building and maintaining national highways and expressways across India.',
    keyPrograms: [
      { name: 'Bharatmala Pariyojana', description: '35,000 km of new highways' },
      { name: 'Expressway Program', description: 'High-speed corridors' },
      { name: 'Setu Bandhan', description: 'Bridge construction in rural areas' },
      { name: 'Road Safety', description: 'Reducing accidents and fatalities' },
    ],
    funFacts: [
      'India builds ~28 km of highways per day!',
      "The Delhi-Mumbai Expressway will be India's longest at 1,386 km.",
      'National Highways carry 40% of road traffic but are only 2% of total roads.',
    ],
    impactMetric: { label: 'NH Length', value: '1.46 Lakh km' },
    globalComparison: [
      { country: 'China', flag: '🇨🇳', value: 177000 },
      { country: 'USA', flag: '🇺🇸', value: 78000 },
      { country: 'India', flag: '🇮🇳', value: 6600, isIndia: true },
      { country: 'Germany', flag: '🇩🇪', value: 13200 },
    ],
    comparisonMetric: 'Expressway Length (km)',
  },
  Railways: {
    fullName: 'Ministry of Railways',
    description: "Operating the world's 4th largest railway network connecting the nation.",
    keyPrograms: [
      { name: 'Vande Bharat', description: 'Semi-high-speed trains' },
      { name: 'Kavach', description: 'Anti-collision safety system' },
      { name: 'Station Redevelopment', description: 'Modern stations with amenities' },
      { name: 'Dedicated Freight Corridors', description: 'Faster goods movement' },
    ],
    breakdown: [
      { label: 'Operations', percent: 35 },
      { label: 'Staff Costs', percent: 30 },
      { label: 'New Projects', percent: 25 },
      { label: 'Safety', percent: 10 },
    ],
    funFacts: [
      "Indian Railways employs 12 lakh+ people - one of world's largest employers!",
      '23 million passengers travel daily on Indian trains.',
      'Railways is going for 100% electrification by 2024.',
    ],
    impactMetric: { label: 'Daily Passengers', value: '2.3 Crore' },
    globalComparison: [
      { country: 'China', flag: '🇨🇳', value: 159000 },
      { country: 'USA', flag: '🇺🇸', value: 140000 },
      { country: 'Russia', flag: '🇷🇺', value: 85000 },
      { country: 'India', flag: '🇮🇳', value: 68000, isIndia: true },
    ],
    comparisonMetric: 'Railway Track Length (km)',
  },
  'Home Affairs': {
    fullName: 'Ministry of Home Affairs',
    description: 'Internal security, border management, and law enforcement.',
    keyPrograms: [
      { name: 'CAPF Forces', description: 'CRPF, BSF, CISF, ITBP, SSB' },
      { name: 'Smart Policing', description: 'Modernizing state police forces' },
      { name: 'Border Management', description: 'Fencing, surveillance, checkposts' },
      { name: 'Disaster Response', description: 'NDRF operations' },
    ],
    funFacts: [
      'India has 10 lakh+ paramilitary personnel under MHA.',
      'BSF guards the world longest border with Bangladesh.',
      "CRPF is the world's largest paramilitary force.",
    ],
    impactMetric: { label: 'CAPF Strength', value: '10 Lakh+' },
  },
  Education: {
    fullName: 'Ministry of Education',
    description: 'School education, higher education, and skill development.',
    keyPrograms: [
      { name: 'Samagra Shiksha', description: 'Universal school education' },
      { name: 'PM SHRI Schools', description: 'Model schools in every block' },
      { name: 'National Education Policy', description: 'NEP 2020 implementation' },
      { name: 'IITs/IIMs/Central Unis', description: 'Higher education institutions' },
    ],
    breakdown: [
      { label: 'School Education', percent: 55 },
      { label: 'Higher Education', percent: 35 },
      { label: 'Research', percent: 10 },
    ],
    funFacts: [
      'India has 23 IITs and 20 IIMs!',
      'Mid-Day Meal scheme feeds 12 crore children daily.',
      'India aims for 50% Gross Enrollment Ratio in higher education by 2035.',
    ],
    impactMetric: { label: 'Students Enrolled', value: '26 Crore+' },
    globalComparison: [
      { country: 'Norway', flag: '🇳🇴', value: 7.4 },
      { country: 'UK', flag: '🇬🇧', value: 5.5 },
      { country: 'USA', flag: '🇺🇸', value: 5.4 },
      { country: 'India', flag: '🇮🇳', value: 3.1, isIndia: true },
      { country: 'China', flag: '🇨🇳', value: 3.6 },
    ],
    comparisonMetric: 'Education Spending (% of GDP)',
  },
  Health: {
    fullName: 'Ministry of Health & Family Welfare',
    description: 'Healthcare infrastructure, disease control, and medical education.',
    keyPrograms: [
      { name: 'Ayushman Bharat', description: '₹5 lakh health cover for 50 crore people' },
      { name: 'PM-ABHIM', description: 'Health infrastructure in rural areas' },
      { name: 'AIIMS Expansion', description: 'New AIIMS in every state' },
      { name: 'Vaccination', description: 'Universal Immunization Programme' },
    ],
    funFacts: [
      "India's health spending is only ~2% of GDP (global avg is 6%).",
      "Ayushman Bharat is world's largest health insurance scheme.",
      '200 crore+ COVID vaccines were administered in India.',
    ],
    impactMetric: { label: 'Ayushman Cards', value: '30 Crore+' },
    globalComparison: [
      { country: 'USA', flag: '🇺🇸', value: 18.3 },
      { country: 'Germany', flag: '🇩🇪', value: 12.8 },
      { country: 'UK', flag: '🇬🇧', value: 11.9 },
      { country: 'China', flag: '🇨🇳', value: 7.1 },
      { country: 'India', flag: '🇮🇳', value: 3.0, isIndia: true },
    ],
    comparisonMetric: 'Health Spending (% of GDP)',
  },
  Agriculture: {
    fullName: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Supporting farmers through subsidies, insurance, and procurement.',
    keyPrograms: [
      { name: 'PM-KISAN', description: '₹6,000/year to 11 crore farmers' },
      { name: 'PM Fasal Bima', description: 'Crop insurance for farmers' },
      { name: 'MSP Procurement', description: 'Minimum Support Price for crops' },
      { name: 'Soil Health Cards', description: 'Customized fertilizer advice' },
    ],
    funFacts: [
      "42% of India's workforce is in agriculture but it's only 15% of GDP.",
      'India is #1 producer of milk, pulses, and spices.',
      'PM-KISAN has transferred ₹2.5 lakh crore to farmers since 2019.',
    ],
    impactMetric: { label: 'PM-KISAN Beneficiaries', value: '11 Crore' },
    globalComparison: [
      { country: 'China', flag: '🇨🇳', value: 25 },
      { country: 'India', flag: '🇮🇳', value: 42, isIndia: true },
      { country: 'Indonesia', flag: '🇮🇩', value: 29 },
      { country: 'USA', flag: '🇺🇸', value: 1.3 },
    ],
    comparisonMetric: 'Agricultural Employment (%)',
  },
  'Rural Development': {
    fullName: 'Ministry of Rural Development',
    description: 'Employment, housing, and infrastructure for rural India.',
    keyPrograms: [
      { name: 'MGNREGA', description: '100 days guaranteed employment' },
      { name: 'PM Awas Yojana (Gramin)', description: 'Housing for rural poor' },
      { name: 'PMGSY', description: 'All-weather rural roads' },
      { name: 'Jal Jeevan Mission', description: 'Piped water to every home' },
    ],
    funFacts: [
      "MGNREGA is world's largest employment guarantee program.",
      '4.5 crore houses built under PM Awas Yojana since 2014.',
      '7 lakh km of rural roads built under PMGSY.',
    ],
    impactMetric: { label: 'MGNREGA Jobs/Year', value: '6 Crore+' },
  },
  'Interest Payments': {
    fullName: 'Interest on Government Debt',
    description: 'Paying interest on loans taken by the government over the years.',
    keyPrograms: [
      { name: 'G-Sec Interest', description: 'Interest on government bonds' },
      { name: 'T-Bill Interest', description: 'Short-term borrowing costs' },
      { name: 'Small Savings Interest', description: 'PPF, NSC, etc.' },
      { name: 'External Debt Interest', description: 'Foreign currency loans' },
    ],
    funFacts: [
      'Interest payments are the LARGEST single expense in the budget!',
      'We pay more in interest than we spend on Defence, Education & Health combined.',
      'Every rupee borrowed today means interest payments for decades.',
    ],
    impactMetric: { label: 'Daily Interest', value: '₹3,100 Cr' },
    globalComparison: [
      { country: 'Brazil', flag: '🇧🇷', value: 6.1 },
      { country: 'India', flag: '🇮🇳', value: 4.0, isIndia: true },
      { country: 'USA', flag: '🇺🇸', value: 2.4 },
      { country: 'Germany', flag: '🇩🇪', value: 0.8 },
      { country: 'Japan', flag: '🇯🇵', value: 1.4 },
    ],
    comparisonMetric: 'Interest Payments (% of GDP)',
  },
  Others: {
    fullName: 'Other Ministries & Departments',
    description: 'Combined allocation for all other ministries and departments.',
    keyPrograms: [
      { name: 'IT & Electronics', description: 'Digital India, semiconductors' },
      { name: 'Commerce', description: 'Trade promotion, exports' },
      { name: 'Environment', description: 'Climate action, forests' },
      { name: 'Social Justice', description: 'Welfare of marginalized groups' },
    ],
    funFacts: [
      'India has 50+ ministries and departments.',
      'Space budget (ISRO) is just ₹13,000 crore - incredibly efficient!',
      'Culture ministry budget is less than what India spends on statues!',
    ],
    impactMetric: { label: 'Ministries', value: '50+' },
  },
}

const iconMap: Record<string, string> = {
  shield: '🛡️',
  road: '🛣️',
  train: '🚂',
  home: '🏠',
  book: '📚',
  heart: '❤️',
  wheat: '🌾',
  village: '🏘️',
  coins: '💰',
  misc: '📦',
}

export function MinistryDetail({ ministry, totalExpenditure }: MinistryDetailProps) {
  const info = ministryData[ministry.name] || ministryData['Others']
  const percentOfBudget = ((ministry.allocation / totalExpenditure) * 100).toFixed(1)
  const perCapita = Math.round(ministry.allocation / 140) // 140 crore population

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="p-4 border-2 border-[#ffff00] bg-[#1a1a2e]">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{iconMap[ministry.icon] || '📦'}</span>
          <div>
            <div className="text-xs text-[#b8c0cc]">{info.fullName}</div>
            <div className="text-xl text-[#00ff41]">
              ₹{ministry.allocation.toLocaleString('en-IN')} Cr
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-[#0f0f23] text-center">
            <div className="text-[#b8c0cc]">Share of Budget</div>
            <div className="text-[#ffb000] text-lg">{percentOfBudget}%</div>
          </div>
          <div className="p-2 bg-[#0f0f23] text-center">
            <div className="text-[#b8c0cc]">Per Citizen</div>
            <div className="text-[#00d4ff] text-lg">₹{perCapita}</div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-4 border border-[#3d3d54] bg-[#1a1a2e]/80">
        <p className="text-sm text-[#c8d0dc] leading-relaxed">{info.description}</p>
      </div>

      {/* Impact Metric */}
      {info.impactMetric && (
        <div className="p-3 border border-[#00ff41] bg-[#00ff41]/10 text-center">
          <div className="text-xs text-[#b8c0cc]">{info.impactMetric.label}</div>
          <div className="text-2xl text-[#00ff41]">{info.impactMetric.value}</div>
        </div>
      )}

      <Accordion>
        {/* Breakdown if available */}
        {info.breakdown && (
          <AccordionItem title="Allocation Breakdown" icon="📊" accentColor="#00ff41" defaultOpen>
            <div className="space-y-3">
              {info.breakdown.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#c8d0dc]">{item.label}</span>
                      <span className="text-[#ffb000]">{item.percent}%</span>
                    </div>
                    <div className="h-2 bg-[#0f0f23] border border-[#2d2d44] rounded overflow-hidden">
                      <div
                        className="h-full bg-[#00ff41] rounded"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AccordionItem>
        )}

        {/* Global Comparison if available */}
        {info.globalComparison && (
          <AccordionItem title="How India Compares Globally" icon="🌍" accentColor="#4ecdc4">
            {info.comparisonMetric && (
              <div className="text-xs text-[#b8c0cc] mb-3">{info.comparisonMetric}</div>
            )}
            <div className="space-y-2">
              {info.globalComparison.map((item, i) => (
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
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </AccordionItem>
        )}

        {/* Key Programs */}
        <AccordionItem title="Key Programs" icon="🎯" accentColor="#00d4ff">
          <div className="space-y-2">
            {info.keyPrograms.map((program, i) => (
              <div key={i} className="p-2 bg-[#0f0f23] border-l-2 border-[#00d4ff]">
                <div className="text-sm text-[#00ff41]">{program.name}</div>
                <div className="text-xs text-[#888]">{program.description}</div>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Fun Facts */}
        <AccordionItem title="Did You Know?" icon="💡" accentColor="#fbbf24">
          <div className="space-y-2">
            {info.funFacts.map((fact, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="text-[#fbbf24]">★</span>
                <span className="text-[#c8d0dc]">{fact}</span>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Impact on You */}
        <AccordionItem title="Impact on You" icon="👤" accentColor="#f472b6">
          <div className="space-y-3">
            <div className="p-2 bg-[#0f0f23] border-l-2 border-[#f472b6]">
              <div className="text-sm text-[#f472b6]">Your Contribution</div>
              <div className="text-sm text-[#c8d0dc]">
                ₹{perCapita} of your taxes go to {info.fullName} every year.
              </div>
            </div>
            <div className="p-2 bg-[#0f0f23] border-l-2 border-[#f472b6]">
              <div className="text-sm text-[#f472b6]">Budget Priority</div>
              <div className="text-sm text-[#c8d0dc]">
                This ministry receives {percentOfBudget}% of the total budget.
              </div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>

      {/* Special callout for Interest Payments */}
      {ministry.name === 'Interest Payments' && (
        <div className="p-4 border-2 border-[#ff00ff] bg-[#ff00ff]/10 text-center animate-pulse">
          <div className="text-[#ff00ff] text-sm mb-2">⚠️ WARNING</div>
          <p className="text-sm text-[#c8d0dc]">
            This is DEAD MONEY - it doesn&apos;t build roads, schools, or hospitals.
            It just pays for money we borrowed in the past!
          </p>
        </div>
      )}
    </div>
  )
}
