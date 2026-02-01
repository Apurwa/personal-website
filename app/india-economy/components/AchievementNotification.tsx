'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Achievement } from '../hooks/useAchievements'

interface AchievementNotificationProps {
  achievement: Achievement | null
}

export function AchievementNotification({ achievement }: AchievementNotificationProps) {
  const notificationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!achievement || !notificationRef.current) return

    const el = notificationRef.current

    gsap.fromTo(
      el,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    )

    gsap.to(el, {
      y: -100,
      opacity: 0,
      duration: 0.3,
      delay: 2.5,
    })
  }, [achievement])

  if (!achievement) return null

  return (
    <div
      ref={notificationRef}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 p-4 bg-[#0f0f23] border-2 border-[#ffff00] shadow-lg"
      style={{ boxShadow: '0 0 20px rgba(255, 255, 0, 0.3)' }}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{achievement.icon}</span>
        <div>
          <div className="text-[#ffff00] text-xs uppercase tracking-wider">
            Achievement Unlocked!
          </div>
          <div className="text-[#00ff41] text-sm">{achievement.title}</div>
          <div className="text-[#00d4ff] text-xs">{achievement.description}</div>
        </div>
      </div>
    </div>
  )
}
