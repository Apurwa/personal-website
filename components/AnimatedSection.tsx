'use client'

import { ReactNode, useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

type AnimationVariant = 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'fadeInUp'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  variant?: AnimationVariant
  delay?: number
  duration?: number
  once?: boolean
  amount?: number | 'some' | 'all'
  staggerChildren?: number
  as?: 'div' | 'section' | 'article' | 'ul' | 'li' | 'span'
}

const variants: Record<AnimationVariant, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
}

export default function AnimatedSection({
  children,
  className = '',
  variant = 'fadeInUp',
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.2,
  staggerChildren,
  as = 'div',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once, amount })

  const containerVariants: Variants = {
    hidden: variants[variant].hidden,
    visible: {
      ...variants[variant].visible,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
        ...(staggerChildren && {
          staggerChildren,
          delayChildren: delay,
        }),
      },
    },
  }

  const MotionComponent = motion[as] as typeof motion.div

  return (
    <MotionComponent
      ref={ref as React.RefObject<HTMLDivElement>}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </MotionComponent>
  )
}

interface AnimatedItemProps {
  children: ReactNode
  className?: string
  variant?: AnimationVariant
  duration?: number
}

export function AnimatedItem({
  children,
  className = '',
  variant = 'fadeInUp',
  duration = 0.5,
}: AnimatedItemProps) {
  const itemVariants: Variants = {
    hidden: variants[variant].hidden,
    visible: {
      ...variants[variant].visible,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delay?: number
  once?: boolean
  amount?: number | 'some' | 'all'
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  delay = 0,
  once = true,
  amount = 0.2,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
