'use client'

import { useCurrency } from '../context/CurrencyContext'

export function CurrencyToggle() {
  const { currency, setCurrency, isLoading } = useCurrency()

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[#888] hidden sm:inline">CURRENCY</span>
      <div className="flex border-2 border-[#2d2d44] bg-[#0f0f23]">
        <button
          onClick={() => setCurrency('INR')}
          disabled={isLoading}
          className={`px-3 py-1 text-xs font-bold transition-all ${
            currency === 'INR'
              ? 'bg-[#00ff41] text-[#0f0f23]'
              : 'text-[#888] hover:text-[#00ff41] hover:bg-[#1a1a2e]'
          }`}
        >
          ₹ INR
        </button>
        <button
          onClick={() => setCurrency('USD')}
          disabled={isLoading}
          className={`px-3 py-1 text-xs font-bold transition-all ${
            currency === 'USD'
              ? 'bg-[#00d4ff] text-[#0f0f23]'
              : 'text-[#888] hover:text-[#00d4ff] hover:bg-[#1a1a2e]'
          }`}
        >
          $ USD
        </button>
      </div>
      {isLoading && (
        <span className="text-xs text-[#ffb000] animate-pulse">...</span>
      )}
    </div>
  )
}
