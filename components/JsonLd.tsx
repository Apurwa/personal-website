import { personalInfo } from '@/data/resume'

export function PersonJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Apurwa Sarwajit',
    alternateName: ['Apurwa', 'Apurva Sarwajit', 'Apurv Sarwajit'],
    url: 'https://apurwasarwajit.com',
    image: 'https://apurwasarwajit.com/apurwa-sarwajit.jpg',
    jobTitle: 'Product Lead',
    worksFor: {
      '@type': 'Organization',
      name: 'Redblock.ai',
      url: 'https://redblock.ai',
    },
    description: 'Product Lead building AI-powered enterprise solutions. Expert in fraud detection, agentic AI, and enterprise software.',
    email: personalInfo.email,
    sameAs: [
      personalInfo.linkedin,
      'https://apurwasarwajit.com',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Indian Institute of Technology Roorkee',
      alternateName: 'IIT Roorkee',
    },
    knowsAbout: [
      'Product Management',
      'Artificial Intelligence',
      'Fraud Detection',
      'Enterprise Software',
      'Agentic AI',
      'Machine Learning',
      'Fintech',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangalore',
      addressCountry: 'India',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function WebsiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Apurwa Sarwajit - Product Lead',
    alternateName: 'Apurwa Sarwajit Portfolio',
    url: 'https://apurwasarwajit.com',
    description: 'Personal website and portfolio of Apurwa Sarwajit, Product Lead at Redblock.ai',
    author: {
      '@type': 'Person',
      name: 'Apurwa Sarwajit',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://apurwasarwajit.com/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface BlogPostJsonLdProps {
  title: string
  description: string
  date: string
  slug: string
  tags: string[]
}

export function BlogPostJsonLd({ title, description, date, slug, tags }: BlogPostJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: 'Apurwa Sarwajit',
      url: 'https://apurwasarwajit.com',
    },
    datePublished: date,
    dateModified: date,
    url: `https://apurwasarwajit.com/blog/${slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://apurwasarwajit.com/blog/${slug}`,
    },
    keywords: tags.join(', '),
    publisher: {
      '@type': 'Person',
      name: 'Apurwa Sarwajit',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
