'use client'

import { useState, useRef, ReactNode } from 'react'
import gsap from 'gsap'

interface AccordionItemProps {
  title: string
  icon?: string
  accentColor?: string
  defaultOpen?: boolean
  children: ReactNode
}

export function AccordionItem({
  title,
  icon,
  accentColor = '#00ff41',
  defaultOpen = false,
  children,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)

  const toggle = () => {
    if (!contentRef.current || !arrowRef.current) return

    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      })
      gsap.to(arrowRef.current, {
        rotation: 0,
        duration: 0.2,
      })
    } else {
      gsap.set(contentRef.current, { height: 'auto', opacity: 1 })
      const height = contentRef.current.offsetHeight
      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        { height, opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      gsap.to(arrowRef.current, {
        rotation: 90,
        duration: 0.2,
      })
    }

    setIsOpen(!isOpen)
  }

  return (
    <div className="border border-[#2d2d44] bg-[#1a1a2e]/80 overflow-hidden">
      <button
        onClick={toggle}
        className="w-full p-3 flex items-center justify-between text-left hover:bg-[#2d2d44]/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span className="text-sm" style={{ color: accentColor }}>
            {title}
          </span>
        </div>
        <span
          ref={arrowRef}
          className="text-[#888] text-sm"
          style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          ▶
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: defaultOpen ? 'auto' : 0, opacity: defaultOpen ? 1 : 0 }}
      >
        <div className="p-3 pt-0 border-t border-[#2d2d44]">{children}</div>
      </div>
    </div>
  )
}

interface AccordionProps {
  children: ReactNode
  className?: string
}

export function Accordion({ children, className = '' }: AccordionProps) {
  return <div className={`space-y-2 ${className}`}>{children}</div>
}
