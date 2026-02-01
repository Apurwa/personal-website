'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

type Currency = 'INR' | 'USD'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  exchangeRate: number
  isLoading: boolean
  formatCurrency: (valueInCrores: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

const STORAGE_KEY = 'budget-quest-currency'
const RATE_CACHE_KEY = 'budget-quest-exchange-rate'
const RATE_CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds
const DEFAULT_RATE = 83 // Fallback INR/USD rate

interface CachedRate {
  rate: number
  timestamp: number
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('INR')
  const [exchangeRate, setExchangeRate] = useState<number>(DEFAULT_RATE)
  const [isLoading, setIsLoading] = useState(false)

  // Load saved currency preference
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'USD' || saved === 'INR') {
      setCurrencyState(saved)
    }
  }, [])

  // Fetch and cache exchange rate
  useEffect(() => {
    async function fetchExchangeRate() {
      // Check cache first
      const cached = localStorage.getItem(RATE_CACHE_KEY)
      if (cached) {
        try {
          const { rate, timestamp }: CachedRate = JSON.parse(cached)
          if (Date.now() - timestamp < RATE_CACHE_DURATION) {
            setExchangeRate(rate)
            return
          }
        } catch {
          // Invalid cache, continue to fetch
        }
      }

      setIsLoading(true)
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        const rate = data.rates.INR || DEFAULT_RATE
        setExchangeRate(rate)

        // Cache the rate
        const cacheData: CachedRate = { rate, timestamp: Date.now() }
        localStorage.setItem(RATE_CACHE_KEY, JSON.stringify(cacheData))
      } catch {
        // Use fallback rate
        setExchangeRate(DEFAULT_RATE)
      } finally {
        setIsLoading(false)
      }
    }

    fetchExchangeRate()
  }, [])

  const setCurrency = useCallback((newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    localStorage.setItem(STORAGE_KEY, newCurrency)
  }, [])

  // Format currency value
  // Input: value in Crores of Rupees
  // Output: Formatted string based on selected currency
  const formatCurrency = useCallback((valueInCrores: number): string => {
    if (currency === 'INR') {
      return `₹${valueInCrores.toLocaleString('en-IN')} Cr`
    }

    // Convert Crores to USD Billions
    // 1 Crore = 10,000,000 INR
    // USD value = (Crores * 10,000,000) / exchangeRate
    // In Billions = USD value / 1,000,000,000
    const usdBillions = (valueInCrores * 10000000) / exchangeRate / 1000000000

    if (usdBillions >= 1) {
      return `$${usdBillions.toFixed(1)}B`
    }
    // For smaller values, show in millions
    const usdMillions = usdBillions * 1000
    if (usdMillions >= 1) {
      return `$${usdMillions.toFixed(1)}M`
    }
    // For even smaller values
    return `$${(usdMillions * 1000).toFixed(0)}K`
  }, [currency, exchangeRate])

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRate, isLoading, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
