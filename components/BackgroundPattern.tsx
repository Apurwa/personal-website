'use client'

import { motion } from 'framer-motion'

interface GridPatternProps {
  className?: string
  size?: number
  opacity?: number
}

export function GridPattern({
  className = '',
  size = 40,
  opacity = 0.03,
}: GridPatternProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, currentColor ${1}px, transparent ${1}px),
          linear-gradient(to bottom, currentColor ${1}px, transparent ${1}px)
        `,
        backgroundSize: `${size}px ${size}px`,
        opacity,
      }}
    />
  )
}

interface DotPatternProps {
  className?: string
  size?: number
  gap?: number
  opacity?: number
}

export function DotPattern({
  className = '',
  size = 2,
  gap = 24,
  opacity = 0.15,
}: DotPatternProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, currentColor ${size}px, transparent ${size}px)`,
        backgroundSize: `${gap}px ${gap}px`,
        opacity,
      }}
    />
  )
}

interface GradientBlobProps {
  className?: string
  colors?: [string, string]
  size?: number
  blur?: number
  animate?: boolean
}

export function GradientBlob({
  className = '',
  colors = ['#3b82f6', '#8b5cf6'],
  size = 400,
  blur = 100,
  animate = true,
}: GradientBlobProps) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colors[0]} 0%, ${colors[1]} 50%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity: 0.3,
      }}
      animate={
        animate
          ? {
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }
          : undefined
      }
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

interface FloatingElementsProps {
  className?: string
  count?: number
}

export function FloatingElements({
  className = '',
  count = 5,
}: FloatingElementsProps) {
  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 10 + Math.random() * 30,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-primary-500/10 dark:bg-primary-400/10"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

interface GradientBackgroundProps {
  variant?: 'hero' | 'subtle' | 'radial'
  className?: string
}

export function GradientBackground({
  variant = 'subtle',
  className = '',
}: GradientBackgroundProps) {
  const gradients = {
    hero: 'bg-gradient-to-br from-primary-50 via-white to-primary-100/50 dark:from-primary-950/30 dark:via-neutral-950 dark:to-primary-900/20',
    subtle: 'bg-gradient-to-b from-neutral-50/50 to-white dark:from-neutral-900/50 dark:to-neutral-950',
    radial: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100/40 via-transparent to-transparent dark:from-primary-900/20',
  }

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${gradients[variant]} ${className}`}
    />
  )
}

interface HeroBackgroundProps {
  className?: string
}

export default function HeroBackground({ className = '' }: HeroBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <GradientBackground variant="hero" />
      <DotPattern className="text-neutral-400 dark:text-neutral-600" opacity={0.1} />
      <GradientBlob
        className="-top-40 -right-40"
        colors={['#3b82f6', '#8b5cf6']}
        size={500}
        blur={120}
      />
      <GradientBlob
        className="-bottom-40 -left-40"
        colors={['#06b6d4', '#3b82f6']}
        size={400}
        blur={100}
      />
      <FloatingElements count={8} />
    </div>
  )
}

interface SectionDividerProps {
  variant?: 'wave' | 'gradient' | 'simple'
  className?: string
  flip?: boolean
}

export function SectionDivider({
  variant = 'gradient',
  className = '',
  flip = false,
}: SectionDividerProps) {
  if (variant === 'wave') {
    return (
      <div className={`w-full overflow-hidden ${flip ? 'rotate-180' : ''} ${className}`}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-16"
          fill="currentColor"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
        </svg>
      </div>
    )
  }

  if (variant === 'gradient') {
    return (
      <div
        className={`h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700 ${className}`}
      />
    )
  }

  return (
    <div className={`h-px w-full bg-neutral-200 dark:bg-neutral-800 ${className}`} />
  )
}
