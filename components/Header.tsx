'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import ScrollProgress from './ScrollProgress'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Experience', href: '/experience' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <ScrollProgress />
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-neutral-200 bg-white/90 backdrop-blur-md shadow-sm dark:border-neutral-800 dark:bg-neutral-950/90'
            : 'border-transparent bg-white/80 backdrop-blur-sm dark:bg-neutral-950/80'
        }`}
      >
        <nav className="container-wide flex h-16 items-center justify-between">
          <Link
            href="/"
            className="group relative text-lg font-semibold tracking-tight text-neutral-900 dark:text-white"
          >
            <span className="relative z-10">AS</span>
            <motion.span
              className="absolute inset-0 -z-10 rounded-lg bg-primary-100 dark:bg-primary-900/30"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.2, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'text-neutral-900 dark:text-white'
                      : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 -z-10 rounded-lg bg-neutral-100 dark:bg-neutral-800"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}

            <motion.button
              onClick={toggleTheme}
              className="ml-2 rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
              aria-label="Toggle theme"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
              aria-label="Toggle theme"
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'light' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </motion.button>

            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
              aria-label="Open menu"
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  variants={{
                    open: { d: 'M6 18L18 6M6 6l12 12' },
                    closed: { d: 'M4 6h16M4 12h16M4 18h16' },
                  }}
                  initial="closed"
                  animate={mobileMenuOpen ? 'open' : 'closed'}
                  transition={{ duration: 0.2 }}
                />
              </svg>
            </motion.button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 md:hidden"
            >
              <motion.div
                className="container-wide py-4"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                }}
              >
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.name}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -20 },
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block rounded-lg px-3 py-2 text-base ${
                          isActive
                            ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                            : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
