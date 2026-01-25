'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TypewriterProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  cursor?: boolean
  onComplete?: () => void
}

export function Typewriter({
  text,
  className = '',
  delay = 0,
  speed = 50,
  cursor = true,
  onComplete,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let currentIndex = 0
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(intervalId)
          setIsComplete(true)
          onComplete?.()
        }
      }, speed)

      return () => clearInterval(intervalId)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [isInView, text, delay, speed, onComplete])

  return (
    <span ref={ref} className={className}>
      {displayedText}
      {cursor && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block ml-0.5"
        >
          |
        </motion.span>
      )}
    </span>
  )
}

interface CounterProps {
  value: number
  prefix?: string
  suffix?: string
  className?: string
  duration?: number
  delay?: number
  decimals?: number
}

export function Counter({
  value,
  prefix = '',
  suffix = '',
  className = '',
  duration = 2,
  delay = 0,
  decimals = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: duration * 1000,
  })
  const displayValue = useTransform(springValue, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString()
  )

  const [displayText, setDisplayText] = useState('0')

  useEffect(() => {
    if (!isInView) return

    const timeoutId = setTimeout(() => {
      motionValue.set(value)
    }, delay * 1000)

    return () => clearTimeout(timeoutId)
  }, [isInView, value, motionValue, delay])

  useEffect(() => {
    const unsubscribe = displayValue.on('change', (latest) => {
      setDisplayText(latest)
    })
    return () => unsubscribe()
  }, [displayValue])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayText}
      {suffix}
    </span>
  )
}

interface AnimatedStatProps {
  value: string
  label: string
  className?: string
  delay?: number
}

export function AnimatedStat({
  value,
  label,
  className = '',
  delay = 0,
}: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const parseValue = (val: string): { num: number; prefix: string; suffix: string } => {
    const match = val.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/)
    if (match) {
      return {
        prefix: match[1] || '',
        num: parseFloat(match[2]),
        suffix: match[3] || '',
      }
    }
    return { prefix: '', num: 0, suffix: val }
  }

  const { num, prefix, suffix } = parseValue(value)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
        <Counter value={num} prefix={prefix} suffix={suffix} delay={delay + 0.3} />
      </p>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{label}</p>
    </motion.div>
  )
}

interface GradientTextProps {
  children: string
  className?: string
  animate?: boolean
}

export function GradientText({
  children,
  className = '',
  animate = true,
}: GradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent ${
        animate ? 'animate-gradient-x bg-[length:200%_auto]' : ''
      } ${className}`}
    >
      {children}
    </span>
  )
}

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
}

export function TextReveal({
  children,
  className = '',
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const words = children.split(' ')

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
