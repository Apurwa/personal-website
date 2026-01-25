'use client'

import { useEffect, useLayoutEffect, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

interface GSAPProviderProps {
  children: ReactNode
}

export default function GSAPProvider({ children }: GSAPProviderProps) {
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Set defaults for smooth animations
    gsap.defaults({
      ease: 'power2.out',
      duration: 1,
    })

    // Refresh ScrollTrigger on route changes
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return <>{children}</>
}
