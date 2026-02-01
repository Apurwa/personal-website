'use client'

import { useEffect } from 'react'
import { useAchievements } from '../hooks/useAchievements'
import { AchievementNotification } from './AchievementNotification'

export function AchievementTracker() {
  const { achievements, unlock, newlyUnlocked } = useAchievements()

  useEffect(() => {
    // Unlock welcome achievement on page load
    const timer = setTimeout(() => unlock('welcome'), 1000)

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100

      // Unlock based on scroll progress
      if (scrollPercent > 20) unlock('revenue')
      if (scrollPercent > 45) unlock('expenditure')
      if (scrollPercent > 70) unlock('deficit')
      if (scrollPercent > 95) unlock('complete')
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [unlock])

  return (
    <>
      <AchievementNotification achievement={newlyUnlocked} />

      {/* Achievement counter in corner */}
      <div className="fixed bottom-4 right-4 z-40 p-2 bg-[#0f0f23]/90 border border-[#2d2d44] text-xs">
        <div className="text-[#ffff00]">🏆 Achievements</div>
        <div className="text-[#00ff41]">
          {achievements.filter((a) => a.unlocked).length} / {achievements.length}
        </div>
      </div>
    </>
  )
}
