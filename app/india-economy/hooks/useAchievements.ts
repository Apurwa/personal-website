'use client'

import { useState, useEffect, useCallback } from 'react'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: number
}

const ACHIEVEMENTS: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
  { id: 'welcome', title: 'Budget Rookie', description: 'Started exploring the budget', icon: '🎮' },
  { id: 'revenue', title: 'Tax Expert', description: 'Learned about revenue sources', icon: '💰' },
  { id: 'expenditure', title: 'Spending Analyst', description: 'Explored ministry allocations', icon: '📊' },
  { id: 'deficit', title: 'Boss Fighter', description: 'Faced the fiscal deficit boss', icon: '👾' },
  { id: 'complete', title: 'Budget Master', description: 'Completed the entire journey', icon: '🏆' },
]

const STORAGE_KEY = 'budget-quest-achievements'

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Record<string, number>
        setAchievements(
          ACHIEVEMENTS.map((a) => ({
            ...a,
            unlocked: !!parsed[a.id],
            unlockedAt: parsed[a.id],
          }))
        )
      } catch {
        setAchievements(ACHIEVEMENTS.map((a) => ({ ...a, unlocked: false })))
      }
    } else {
      setAchievements(ACHIEVEMENTS.map((a) => ({ ...a, unlocked: false })))
    }
  }, [])

  const unlock = useCallback((id: string) => {
    setAchievements((prev) => {
      const existing = prev.find((a) => a.id === id)
      if (!existing || existing.unlocked) return prev

      const updated = prev.map((a) =>
        a.id === id ? { ...a, unlocked: true, unlockedAt: Date.now() } : a
      )

      // Save to localStorage
      const toStore = updated.reduce(
        (acc, a) => (a.unlocked ? { ...acc, [a.id]: a.unlockedAt } : acc),
        {} as Record<string, number | undefined>
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore))

      // Trigger notification
      const unlocked = updated.find((a) => a.id === id)
      if (unlocked) {
        setNewlyUnlocked(unlocked)
        setTimeout(() => setNewlyUnlocked(null), 3000)
      }

      return updated
    })
  }, [])

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setAchievements(ACHIEVEMENTS.map((a) => ({ ...a, unlocked: false })))
  }, [])

  return { achievements, unlock, reset, newlyUnlocked }
}
