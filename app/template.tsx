'use client'

import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TemplateProps {
  children: ReactNode
}

export default function Template({ children }: TemplateProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
