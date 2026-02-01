'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useCurrency } from '../context/CurrencyContext'

interface ScoreCounterProps {
  value: number
  label: string
  duration?: number
  className?: string
}

export function ScoreCounter({
  value,
  label,
  duration = 2,
  className = '',
}: ScoreCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [displayValue, setDisplayValue] = useState(0)
  const { currency, exchangeRate, formatCurrency } = useCurrency()

  useEffect(() => {
    if (!counterRef.current || hasAnimated) return

    const counter = { value: 0 }

    gsap.to(counter, {
      value,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayValue(Math.floor(counter.value))
      },
      onComplete: () => setHasAnimated(true),
    })
  }, [value, duration, hasAnimated])

  // Get formatted display based on currency
  const getFormattedDisplay = () => {
    if (currency === 'INR') {
      return {
        prefix: '₹',
        number: displayValue.toLocaleString('en-IN'),
        suffix: ' Cr',
      }
    }
    // For USD, calculate the value in billions
    const usdBillions = (displayValue * 10000000) / exchangeRate / 1000000000
    if (usdBillions >= 1) {
      return {
        prefix: '$',
        number: usdBillions.toFixed(1),
        suffix: 'B',
      }
    }
    const usdMillions = usdBillions * 1000
    return {
      prefix: '$',
      number: usdMillions.toFixed(1),
      suffix: 'M',
    }
  }

  const display = getFormattedDisplay()

  return (
    <div className={`text-center ${className}`}>
      <div className="text-[#ffb000] text-xs mb-2 uppercase tracking-widest">
        {label}
      </div>
      <div className="text-2xl md:text-4xl">
        <span className="text-[#00d4ff]">{display.prefix}</span>
        <span ref={counterRef} className="text-[#00ff41]">{display.number}</span>
        <span className="text-[#00d4ff]">{display.suffix}</span>
      </div>
    </div>
  )
}
