'use client'

import { BudgetData } from '../data/types'
import { Accordion, AccordionItem } from './Accordion'
import { useCurrency } from '../context/CurrencyContext'

interface DeficitDetailProps {
  budget: BudgetData
  type: 'fiscal' | 'revenue' | 'primary' | 'debt'
}

interface CountryData {
  country: string
  flag: string
  value: number
  isIndia?: boolean
}

export function DeficitDetail({ budget, type }: DeficitDetailProps) {
  const { formatCurrency } = useCurrency()
  const content = getContent(budget, type, formatCurrency)

  return (
    <div className="space-y-4">
      {/* Hero Stat */}
      <div className="p-4 border-2 bg-[#1a1a2e]" style={{ borderColor: content.color }}>
        <div className="text-center">
          <div className="text-xs text-[#b8c0cc] mb-1">{content.label}</div>
          <div className="text-3xl font-bold" style={{ color: content.color }}>
            {content.value}
          </div>
          <div className="text-sm text-[#e0e4ea] mt-1">{content.subtext}</div>
        </div>
      </div>

      {/* What is it? */}
      <div className="p-4 border border-[#3d3d54] bg-[#1a1a2e]/80">
        <div className="text-sm text-[#ffcc00] mb-2">❓ What is {content.label}?</div>
        <p className="text-sm text-[#c8d0dc] leading-relaxed">{content.explanation}</p>
      </div>

      <Accordion>
        {/* Why it matters */}
        <AccordionItem title="Why It Matters" icon="⚠️" accentColor="#ff6b6b" defaultOpen>
          <div className="space-y-2">
            {content.whyMatters.map((point, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="text-[#ff6b6b]">→</span>
                <span className="text-[#c8d0dc]">{point}</span>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Global Comparison */}
        <AccordionItem title="How India Compares Globally" icon="🌍" accentColor="#4ecdc4">
          <div className="space-y-2">
            {content.globalComparison.map((item, i) => (
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
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-[#0f0f23] border-l-2 border-[#4ecdc4]">
            <span className="text-sm text-[#c8d0dc]">{content.comparisonInsight}</span>
          </div>
        </AccordionItem>

        {/* Historical Trend */}
        <AccordionItem title="Historical Trend" icon="📈" accentColor="#a78bfa">
          <div className="space-y-2">
            {content.historicalTrend.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="text-[#a0a8b4]">{item.year}</span>
                <div className="flex-1 mx-3">
                  <div className="h-2 bg-[#0f0f23] rounded overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${(item.value / content.maxHistorical) * 100}%`,
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
          <div className="mt-3 text-sm text-[#c8d0dc]">{content.trendInsight}</div>
        </AccordionItem>

        {/* Impact on You */}
        <AccordionItem title="Impact on You" icon="👤" accentColor="#f472b6">
          <div className="space-y-3">
            {content.personalImpact.map((impact, i) => (
              <div key={i} className="p-2 bg-[#0f0f23] border-l-2 border-[#f472b6]">
                <div className="text-sm text-[#f472b6]">{impact.title}</div>
                <div className="text-sm text-[#c8d0dc]">{impact.description}</div>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Fun Facts */}
        <AccordionItem title="Did You Know?" icon="💡" accentColor="#fbbf24">
          <div className="space-y-2">
            {content.funFacts.map((fact, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="text-[#fbbf24]">★</span>
                <span className="text-[#c8d0dc]">{fact}</span>
              </div>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

function getContent(budget: BudgetData, type: 'fiscal' | 'revenue' | 'primary' | 'debt', formatCurrency: (value: number) => string) {
  // Helper to format lakh crore values
  const formatLakhCrore = (valueInLakhCrore: number) => {
    const valueInCrore = valueInLakhCrore * 100000
    return formatCurrency(valueInCrore)
  }

  const contents = {
    fiscal: {
      label: 'Fiscal Deficit',
      value: `${budget.fiscalDeficitPercent}%`,
      subtext: formatLakhCrore(budget.fiscalDeficit / 100000),
      color: '#ff6b6b',
      explanation:
        'Fiscal Deficit is the gap between government\'s total spending and total revenue (excluding borrowings). It shows how much the government needs to borrow to meet its expenses. Think of it like spending more than your salary and using credit cards to cover the gap.',
      whyMatters: [
        'Higher deficit means more borrowing → more interest payments in future',
        'Can lead to inflation if financed by printing money',
        'Affects India\'s credit rating and borrowing costs',
        'Leaves less room for spending during emergencies (like COVID)',
      ],
      globalComparison: [
        { country: 'USA', flag: '🇺🇸', value: 6.3 },
        { country: 'UK', flag: '🇬🇧', value: 5.1 },
        { country: 'India', flag: '🇮🇳', value: budget.fiscalDeficitPercent, isIndia: true },
        { country: 'Germany', flag: '🇩🇪', value: 2.5 },
        { country: 'China', flag: '🇨🇳', value: 3.0 },
      ] as CountryData[],
      comparisonInsight:
        'India\'s fiscal deficit is moderate compared to US/UK, but we pay higher interest rates on our debt.',
      historicalTrend: budget.historical.map((h) => ({
        year: h.year,
        value: h.fiscalDeficitPercent,
        isCurrent: h.year === budget.fiscalYear,
      })),
      maxHistorical: Math.max(...budget.historical.map((h) => h.fiscalDeficitPercent)),
      trendInsight:
        'The spike in 2020-21 was due to COVID stimulus spending. We\'re gradually bringing it down.',
      personalImpact: [
        {
          title: 'Your Share of Debt',
          description: `Every Indian citizen\'s share of government debt is approximately ₹1.5 lakh`,
        },
        {
          title: 'Future Taxes',
          description: 'Today\'s borrowing means tomorrow\'s taxes to repay the debt',
        },
        {
          title: 'Inflation Risk',
          description: 'High deficits can lead to inflation, reducing your purchasing power',
        },
      ],
      funFacts: [
        'India\'s first deficit target (FRBM Act) was 3% - we rarely achieve it!',
        'COVID year saw the highest ever deficit at 9.2% of GDP',
        'Interest payments alone consume 24% of government revenue',
      ],
    },
    revenue: {
      label: 'Revenue Deficit',
      value: formatCurrency(budget.revenueDeficit),
      subtext: 'Gap in day-to-day expenses',
      color: '#fbbf24',
      explanation:
        'Revenue Deficit is the gap between government\'s revenue receipts and revenue expenditure (day-to-day expenses like salaries, subsidies). It means the government is borrowing even to meet its regular expenses, not just for building assets.',
      whyMatters: [
        'Borrowing for daily expenses is like taking loans to pay rent',
        'Creates no assets for future generations',
        'Indicates structural problems in finances',
        'Ideally should be zero - all borrowing should be for capital assets',
      ],
      globalComparison: [
        { country: 'Japan', flag: '🇯🇵', value: 5.8 },
        { country: 'USA', flag: '🇺🇸', value: 4.2 },
        { country: 'India', flag: '🇮🇳', value: 1.6, isIndia: true },
        { country: 'Germany', flag: '🇩🇪', value: 0.5 },
        { country: 'Singapore', flag: '🇸🇬', value: -2.0 },
      ] as CountryData[],
      comparisonInsight:
        'Singapore actually has a revenue SURPLUS - they earn more than their daily expenses!',
      historicalTrend: [
        { year: '2020-21', value: 4.4, isCurrent: false },
        { year: '2021-22', value: 3.5, isCurrent: false },
        { year: '2022-23', value: 2.8, isCurrent: false },
        { year: '2023-24', value: 2.0, isCurrent: false },
        { year: '2024-25', value: 1.6, isCurrent: true },
      ],
      maxHistorical: 4.4,
      trendInsight: 'Improving trend! Government is reducing borrowing for day-to-day expenses.',
      personalImpact: [
        {
          title: 'Subsidy Sustainability',
          description: 'High revenue deficit means subsidies may be cut in future',
        },
        {
          title: 'Service Quality',
          description: 'Less money for improving government services and salaries',
        },
      ],
      funFacts: [
        'Revenue deficit was ZERO in 2007-08 before the global financial crisis',
        'Ideally, all borrowing should create assets (roads, schools, hospitals)',
        'States like Gujarat have very low or zero revenue deficits',
      ],
    },
    primary: {
      label: 'Primary Deficit',
      value: formatCurrency(budget.primaryDeficit),
      subtext: 'Deficit excluding interest payments',
      color: '#a78bfa',
      explanation:
        'Primary Deficit is Fiscal Deficit minus Interest Payments. It shows how much the government is borrowing for new expenses (excluding interest on past loans). If this is low, we\'re mainly borrowing just to pay interest on old debt!',
      whyMatters: [
        'Shows the "fresh" borrowing needed for new programs',
        'If primary deficit is low but fiscal deficit is high, we\'re in a debt trap',
        'A zero primary deficit means all new borrowing goes to interest payments only',
        'Important indicator of fiscal health excluding legacy debt burden',
      ],
      globalComparison: [
        { country: 'USA', flag: '🇺🇸', value: 3.8 },
        { country: 'Japan', flag: '🇯🇵', value: -0.5 },
        { country: 'India', flag: '🇮🇳', value: 1.4, isIndia: true },
        { country: 'Germany', flag: '🇩🇪', value: 0.2 },
        { country: 'Brazil', flag: '🇧🇷', value: -1.0 },
      ] as CountryData[],
      comparisonInsight:
        'Japan has a PRIMARY SURPLUS despite high fiscal deficit - they\'re not adding new debt beyond interest.',
      historicalTrend: [
        { year: '2020-21', value: 5.7, isCurrent: false },
        { year: '2021-22', value: 3.0, isCurrent: false },
        { year: '2022-23', value: 2.6, isCurrent: false },
        { year: '2023-24', value: 1.8, isCurrent: false },
        { year: '2024-25', value: 1.4, isCurrent: true },
      ],
      maxHistorical: 5.7,
      trendInsight:
        'Excellent improvement! Lower primary deficit means we\'re reducing fresh borrowing needs.',
      personalImpact: [
        {
          title: 'Future Programs',
          description: 'Low primary deficit leaves room for new welfare schemes',
        },
        {
          title: 'Escaping Debt Trap',
          description: 'Reducing primary deficit helps break the cycle of borrowing',
        },
      ],
      funFacts: [
        'Primary deficit was just 0.5% in 2007-08 - our best ever!',
        'A negative primary deficit (surplus) is the goal - it means debt is reducing',
        'Kerala has one of the highest primary deficits among states',
      ],
    },
    debt: {
      label: 'Debt to GDP',
      value: `${budget.debtToGdp}%`,
      subtext: 'Total government debt as % of economy',
      color: '#4ecdc4',
      explanation:
        'Debt to GDP ratio shows total government debt compared to the size of the economy. It indicates whether the government can sustainably service its debt. A ratio above 60% is considered concerning, though it varies by country.',
      whyMatters: [
        'Higher ratio means more tax money goes to interest payments',
        'Affects international credit ratings and borrowing costs',
        'Limits government\'s ability to respond to future crises',
        'Can trigger debt spiral if interest rate exceeds growth rate',
      ],
      globalComparison: [
        { country: 'Japan', flag: '🇯🇵', value: 263 },
        { country: 'Greece', flag: '🇬🇷', value: 171 },
        { country: 'USA', flag: '🇺🇸', value: 123 },
        { country: 'India', flag: '🇮🇳', value: budget.debtToGdp, isIndia: true },
        { country: 'China', flag: '🇨🇳', value: 77 },
        { country: 'Germany', flag: '🇩🇪', value: 66 },
        { country: 'Australia', flag: '🇦🇺', value: 45 },
      ] as CountryData[],
      comparisonInsight:
        'India\'s debt is moderate globally, but we pay higher interest rates than developed nations (7% vs 2-3%).',
      historicalTrend: [
        { year: '2019-20', value: 51.6, isCurrent: false },
        { year: '2020-21', value: 61.5, isCurrent: false },
        { year: '2021-22', value: 59.2, isCurrent: false },
        { year: '2022-23', value: 57.1, isCurrent: false },
        { year: '2024-25', value: budget.debtToGdp, isCurrent: true },
      ],
      maxHistorical: 61.5,
      trendInsight:
        'COVID pushed debt up, but strong GDP growth is bringing the ratio down. Growth helps!',
      personalImpact: [
        {
          title: 'Per Capita Debt',
          description: 'Each Indian\'s share of government debt: ~₹1.5 lakh',
        },
        {
          title: 'Tax Burden',
          description: 'Higher debt means higher taxes in future to service it',
        },
        {
          title: 'Crowding Out',
          description: 'Government borrowing leaves less credit for private sector',
        },
      ],
      funFacts: [
        'Japan has 263% debt-to-GDP but survives because most debt is domestic',
        'India\'s external debt is only 5% of total - a strength!',
        'The FRBM Act target is 40% for Centre - we\'re far from it',
        'Combined Centre + State debt is closer to 85% of GDP',
      ],
    },
  }

  return contents[type]
}
