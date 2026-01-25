'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email'
  }

  if (!data.subject.trim()) {
    errors.subject = 'Subject is required'
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  return errors
}

interface FloatingInputProps {
  id: string
  label: string
  type?: 'text' | 'email'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  error?: string
  required?: boolean
}

function FloatingInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  required,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false)
          onBlur?.()
        }}
        className={`peer block w-full rounded-lg border bg-white px-4 pb-2 pt-6 text-neutral-900 transition-all focus:outline-none focus:ring-2 dark:bg-neutral-800 dark:text-white ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500/20 dark:border-neutral-700'
        }`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          isActive
            ? 'top-2 text-xs text-primary-600 dark:text-primary-400'
            : 'top-4 text-base text-neutral-500 dark:text-neutral-400'
        } ${error ? 'text-red-500' : ''}`}
      >
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-1 text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

interface FloatingTextareaProps {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: () => void
  error?: string
  required?: boolean
  rows?: number
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  rows = 5,
}: FloatingTextareaProps) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0

  return (
    <div className="relative">
      <textarea
        id={id}
        name={id}
        required={required}
        rows={rows}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false)
          onBlur?.()
        }}
        className={`peer block w-full rounded-lg border bg-white px-4 pb-2 pt-6 text-neutral-900 transition-all focus:outline-none focus:ring-2 dark:bg-neutral-800 dark:text-white ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500/20 dark:border-neutral-700'
        }`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          isActive
            ? 'top-2 text-xs text-primary-600 dark:text-primary-400'
            : 'top-4 text-base text-neutral-500 dark:text-neutral-400'
        } ${error ? 'text-red-500' : ''}`}
      >
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-1 text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function SuccessAnimation() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="flex flex-col items-center py-8"
    >
      <motion.div
        className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
      >
        <motion.svg
          className="h-10 w-10 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          />
        </motion.svg>
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-xl font-semibold text-neutral-900 dark:text-white"
      >
        Message Sent!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-2 text-center text-neutral-600 dark:text-neutral-400"
      >
        Thank you for reaching out. I&apos;ll get back to you soon.
      </motion.p>
    </motion.div>
  )
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newData = { ...formData, [field]: e.target.value }
    setFormData(newData)

    if (touched[field]) {
      const newErrors = validateForm(newData)
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }))
    }
  }

  const handleBlur = (field: keyof FormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const newErrors = validateForm(formData)
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm(formData)
    setErrors(validationErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setFormState({ status: 'submitting', message: '' })

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormState({
          status: 'success',
          message: 'Thank you for your message! I\'ll get back to you soon.',
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTouched({})
        setErrors({})
      } else {
        throw new Error('Failed to submit')
      }
    } catch {
      setFormState({
        status: 'error',
        message: 'Something went wrong. Please try again or email me directly.',
      })
    }
  }

  const resetForm = () => {
    setFormState({ status: 'idle', message: '' })
  }

  if (formState.status === 'success') {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <SuccessAnimation />
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={resetForm}
          className="mx-auto mt-4 block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Send another message
        </motion.button>
      </div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FloatingInput
        id="name"
        label="Name"
        value={formData.name}
        onChange={handleChange('name')}
        onBlur={handleBlur('name')}
        error={touched.name ? errors.name : undefined}
        required
      />

      <FloatingInput
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        error={touched.email ? errors.email : undefined}
        required
      />

      <FloatingInput
        id="subject"
        label="Subject"
        value={formData.subject}
        onChange={handleChange('subject')}
        onBlur={handleBlur('subject')}
        error={touched.subject ? errors.subject : undefined}
        required
      />

      <FloatingTextarea
        id="message"
        label="Message"
        value={formData.message}
        onChange={handleChange('message')}
        onBlur={handleBlur('message')}
        error={touched.message ? errors.message : undefined}
        required
      />

      <AnimatePresence>
        {formState.status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400"
          >
            {formState.message}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={formState.status === 'submitting'}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {formState.status === 'submitting' ? (
          <span className="flex items-center justify-center gap-2">
            <motion.svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </motion.svg>
            Sending...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Send Message
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        )}
      </motion.button>
    </motion.form>
  )
}
