'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { personalInfo, projects, experiences } from '@/data/resume'
import ProjectCard from '@/components/ProjectCard'
import AnimatedSection, { StaggerContainer, AnimatedItem } from '@/components/AnimatedSection'
import { AnimatedStat, Typewriter, TextReveal } from '@/components/AnimatedText'
import HeroBackground, { DotPattern, GradientBackground } from '@/components/BackgroundPattern'
import { ScrollReveal, Parallax, Magnetic, CountUp, StaggerReveal } from '@/components/GSAPAnimations'

export default function Home() {
  const featuredProjects = projects.slice(0, 3)
  const latestExperience = experiences[0]

  return (
    <>
      {/* Hero Section */}
      <section className="section relative overflow-hidden" itemScope itemType="https://schema.org/Person">
        <HeroBackground className="opacity-50" />

        <div className="container-wide relative">
          <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm font-medium text-primary-600 dark:text-primary-400"
              >
                <span itemProp="jobTitle">Product Lead</span> at{' '}
                <span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
                  <span itemProp="name">Redblock.ai</span>
                </span>
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              >
                <span itemProp="name">{personalInfo.name}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6 text-xl text-neutral-600 dark:text-neutral-400"
                itemProp="description"
              >
                <Typewriter text={personalInfo.tagline} speed={30} delay={800} />
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-4 text-neutral-600 dark:text-neutral-400"
              >
                {personalInfo.summary}
              </motion.p>

              <meta itemProp="email" content={personalInfo.email} />
              <meta itemProp="url" content="https://apurwasarwajit.com" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Magnetic strength={0.2}>
                <Link href="/contact" className="btn-primary">
                  Get in Touch
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Link href="/experience" className="btn-secondary">
                  View Experience
                </Link>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 flex gap-4"
            >
              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                aria-label="Apurwa Sarwajit on LinkedIn"
                itemProp="sameAs"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                aria-label="Email Apurwa Sarwajit"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </motion.a>
            </motion.div>
            </motion.div>

            {/* Profile Image with Parallax */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative flex-shrink-0"
            >
              <Parallax speed={0.15} direction="vertical">
                <div className="relative">
                  {/* Decorative ring */}
                  <motion.div
                    className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary-500/20 via-primary-400/10 to-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  />
                  {/* Image container */}
                  <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-xl dark:border-neutral-800 sm:h-64 sm:w-64 lg:h-72 lg:w-72">
                    <Image
                      src="/profile.jpg"
                      alt="Apurwa Sarwajit"
                      fill
                      className="object-cover"
                      priority
                      itemProp="image"
                    />
                  </div>
                </div>
              </Parallax>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Summary - SEO rich content with GSAP */}
      <section className="border-t border-neutral-200 bg-white py-12 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="container-narrow">
          <h2 className="sr-only">About Apurwa Sarwajit</h2>
          <ScrollReveal direction="up" duration={0.8}>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              <strong>Apurwa Sarwajit</strong> is a seasoned Product Lead based in Bangalore, India,
              with expertise in building AI-powered enterprise solutions. An alumnus of{' '}
              <strong>IIT Roorkee</strong> (Indian Institute of Technology Roorkee), Apurwa has
              a proven track record of delivering products that generate significant business impact,
              including <strong>$4M+ ARR</strong> and preventing <strong>$12M in fraud losses</strong>.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Stats - Using GSAP CountUp */}
      <section className="relative border-y border-neutral-200 bg-neutral-50 py-12 dark:border-neutral-800 dark:bg-neutral-900">
        <DotPattern className="text-neutral-400 dark:text-neutral-600" opacity={0.08} />

        <div className="container-wide relative">
          <h2 className="sr-only">Key Achievements by Apurwa Sarwajit</h2>
          <StaggerReveal className="grid grid-cols-2 gap-8 md:grid-cols-4" stagger={0.15}>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl">
                <CountUp end={4} prefix="$" suffix="M+" duration={2.5} />
              </div>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">ARR Generated</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl">
                <CountUp end={12} prefix="$" suffix="M" duration={2.5} />
              </div>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Fraud Prevented</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl">
                <CountUp end={50} suffix="M+" duration={2.5} />
              </div>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Monthly Transactions</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl">
                <CountUp end={6} duration={2} />
              </div>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Top Banks as Clients</p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* Current Role Highlight - Using GSAP ScrollReveal */}
      <section className="section relative">
        <GradientBackground variant="radial" />

        <div className="container-wide relative">
          <ScrollReveal direction="up" duration={0.6}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Current Role</h2>
              <Magnetic strength={0.2}>
                <Link
                  href="/experience"
                  className="link-arrow text-sm font-medium"
                >
                  View all experience
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </Magnetic>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15} duration={0.7}>
            <article className="card-hover mt-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{latestExperience.roles[0].title}</h3>
                  <p className="mt-1 text-primary-600 dark:text-primary-400">
                    {latestExperience.company}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500">
                    {latestExperience.companyDescription}
                  </p>
                </div>
                <span className="text-sm text-neutral-500 dark:text-neutral-500">
                  {latestExperience.roles[0].period}
                </span>
              </div>
              <StaggerReveal className="mt-6 space-y-3" stagger={0.08} direction="left">
                {latestExperience.roles[0].achievements.slice(0, 3).map((achievement, index) => (
                  <div key={index} className="flex gap-3 text-neutral-600 dark:text-neutral-400">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                    {achievement}
                  </div>
                ))}
              </StaggerReveal>
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Projects - Using GSAP ScrollReveal */}
      <section className="section border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="container-wide">
          <ScrollReveal direction="up" duration={0.6}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Featured Projects by Apurwa Sarwajit</h2>
              <Magnetic strength={0.2}>
                <Link
                  href="/projects"
                  className="link-arrow text-sm font-medium"
                >
                  View all projects
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </Magnetic>
            </div>
          </ScrollReveal>

          <StaggerReveal className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} index={0} />
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Skills and Expertise - Using GSAP StaggerReveal */}
      <section className="section border-t border-neutral-200 dark:border-neutral-800">
        <div className="container-narrow">
          <ScrollReveal direction="up" className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">Areas of Expertise</h2>
          </ScrollReveal>

          <StaggerReveal
            className="mt-8 flex flex-wrap justify-center gap-3"
            stagger={0.05}
            direction="up"
          >
            {[
              'Product Management',
              'Agentic AI',
              'Fraud Detection',
              'Enterprise Software',
              'Machine Learning',
              'Fintech',
              'B2B SaaS',
              'Platform Engineering',
              'API Design',
              'Product Strategy',
            ].map((skill) => (
              <Magnetic key={skill} strength={0.15}>
                <span className="tag-neutral cursor-default">
                  {skill}
                </span>
              </Magnetic>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA Section - Using GSAP ScrollReveal and Magnetic */}
      <section className="section relative border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
        <GradientBackground variant="radial" />

        <div className="container-narrow relative text-center">
          <ScrollReveal direction="up">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              <TextReveal>Interested in working with Apurwa Sarwajit?</TextReveal>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              I&apos;m always open to discussing product opportunities, collaborations,
              or just having a chat about AI and technology.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="mt-8 flex justify-center gap-4">
              <Magnetic strength={0.25}>
                <Link href="/contact" className="btn-primary">
                  Get in Touch
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Connect on LinkedIn
                </a>
              </Magnetic>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
