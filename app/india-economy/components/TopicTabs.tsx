'use client'

import { useState } from 'react'

interface Tab {
  id: string
  label: string
}

interface TopicTabsProps {
  tabs: Tab[]
  defaultTab?: string
  children: (activeTab: string) => React.ReactNode
}

export function TopicTabs({ tabs, defaultTab, children }: TopicTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '')

  return (
    <div>
      {/* Desktop tabs */}
      <div className="hidden sm:block border-b border-[#e5e0d8] mb-6">
        <nav className="flex gap-1" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-3 font-sans text-sm font-medium transition-all
                  border-b-2 -mb-[2px]
                  ${isActive
                    ? 'border-[#b85c38] text-[#b85c38]'
                    : 'border-transparent text-[#6b7c8f] hover:text-[#1a2e44] hover:border-[#d4cfc4]'
                  }
                `}
                aria-selected={isActive}
                role="tab"
              >
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Mobile dropdown */}
      <div className="sm:hidden mb-6">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="w-full bg-white/60 border border-[#e5e0d8] text-[#1a2e44] font-sans px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#b85c38]/20 focus:border-[#b85c38]"
          aria-label="Select tab"
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Tab content */}
      <div role="tabpanel">{children(activeTab)}</div>
    </div>
  )
}
