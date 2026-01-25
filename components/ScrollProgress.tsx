'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

interface ScrollProgressProps {
  className?: string
  color?: string
  height?: number
  position?: 'top' | 'bottom'
}

export default function ScrollProgress({
  className = '',
  color,
  height = 3,
  position = 'top',
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const positionClasses = position === 'top' ? 'top-0' : 'bottom-0'

  return (
    <motion.div
      className={`fixed ${positionClasses} left-0 right-0 z-[100] origin-left ${className}`}
      style={{
        scaleX,
        height,
        backgroundColor: color || undefined,
      }}
    >
      {!color && (
        <div className="h-full w-full bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600" />
      )}
    </motion.div>
  )
}

export function CircularProgress({
  size = 40,
  strokeWidth = 3,
  className = '',
}: {
  size?: number
  strokeWidth?: number
  className?: string
}) {
  const { scrollYProgress } = useScroll()
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        className="rotate-[-90deg]"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-neutral-200 dark:text-neutral-700"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{
            pathLength,
            strokeDashoffset: 0,
          }}
          className="text-primary-500"
        />
      </svg>
    </div>
  )
}
