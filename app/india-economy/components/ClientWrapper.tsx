'use client'

import { ReactNode } from 'react'
import { CurrencyProvider } from '../context/CurrencyContext'

interface ClientWrapperProps {
  children: ReactNode
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <CurrencyProvider>
      {children}
    </CurrencyProvider>
  )
}
