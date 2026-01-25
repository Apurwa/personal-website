'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 60,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const directionMap = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { y: 0, x: distance },
      right: { y: 0, x: -distance },
    }

    const { x, y } = directionMap[direction]

    gsap.fromTo(
      ref.current,
      { opacity: 0, x, y },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill()
      })
    }
  }, [direction, delay, duration, distance, once])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface TextRevealProps {
  children: string
  className?: string
  type?: 'words' | 'chars' | 'lines'
  stagger?: number
  delay?: number
}

export function GSAPTextReveal({
  children,
  className = '',
  type = 'words',
  stagger = 0.05,
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const elements = ref.current.querySelectorAll('.gsap-text-item')

    gsap.fromTo(
      elements,
      { opacity: 0, y: 30, rotateX: -40 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill()
      })
    }
  }, [stagger, delay])

  const renderText = () => {
    if (type === 'words') {
      return children.split(' ').map((word, i) => (
        <span key={i} className="gsap-text-item inline-block mr-[0.25em]" style={{ perspective: '1000px' }}>
          {word}
        </span>
      ))
    }
    if (type === 'chars') {
      return children.split('').map((char, i) => (
        <span key={i} className="gsap-text-item inline-block" style={{ perspective: '1000px' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))
    }
    return <span className="gsap-text-item">{children}</span>
  }

  return (
    <div ref={ref} className={className} style={{ perspective: '1000px' }}>
      {renderText()}
    </div>
  )
}

interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: 'vertical' | 'horizontal'
}

export function Parallax({
  children,
  className = '',
  speed = 0.5,
  direction = 'vertical',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const movement = direction === 'vertical' ? { y: 100 * speed } : { x: 100 * speed }

    gsap.to(ref.current, {
      ...movement,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill()
      })
    }
  }, [speed, direction])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface ScaleOnScrollProps {
  children: ReactNode
  className?: string
  fromScale?: number
  toScale?: number
}

export function ScaleOnScroll({
  children,
  className = '',
  fromScale = 0.8,
  toScale = 1,
}: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      { scale: fromScale, opacity: 0 },
      {
        scale: toScale,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill()
      })
    }
  }, [fromScale, toScale])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface StaggerRevealProps {
  children: ReactNode
  className?: string
  childClassName?: string
  stagger?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function StaggerReveal({
  children,
  className = '',
  childClassName = '',
  stagger = 0.1,
  direction = 'up',
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const items = ref.current.querySelectorAll('.stagger-item')

    const directionMap = {
      up: { y: 40, x: 0 },
      down: { y: -40, x: 0 },
      left: { y: 0, x: 40 },
      right: { y: 0, x: -40 },
    }

    const { x, y } = directionMap[direction]

    gsap.fromTo(
      items,
      { opacity: 0, x, y },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.6,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill()
      })
    }
  }, [stagger, direction])

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} className={`stagger-item ${childClassName}`}>
              {child}
            </div>
          ))
        : children}
    </div>
  )
}

interface CountUpProps {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function CountUp({
  end,
  prefix = '',
  suffix = '',
  duration = 2,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const countRef = useRef({ value: 0 })

  useEffect(() => {
    if (!ref.current) return

    gsap.to(countRef.current, {
      value: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(countRef.current.value)}${suffix}`
        }
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill()
      })
    }
  }, [end, prefix, suffix, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({
  children,
  className = '',
  strength = 0.3,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
