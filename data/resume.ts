export const personalInfo = {
  name: 'Apurwa Sarwajit',
  tagline: 'Product Lead | Building AI-Powered Enterprise Solutions',
  email: 'apurvsingh28@gmail.com',
  phone: '8979791361',
  linkedin: 'https://www.linkedin.com/in/apurwa-sarwajit',
  location: 'Bangalore, India',
  summary: `Product leader with 5+ years of experience building AI-powered products that drive measurable business impact.
Currently leading the Product and Engineering teams at Redblock.ai, building an agentic AI platform for enterprise security teams.
Previously generated $4M ARR at BureauID through AI-powered fraud detection solutions adopted by India's top banks.`,
}

export const education = {
  institution: 'Indian Institute of Technology, Roorkee',
  degree: 'B.Tech. in Electrical Engineering',
  graduation: 'March 2017',
  highlight: 'President, Students\' Affairs Council (SAC)',
}

export interface Experience {
  id: string
  company: string
  location: string
  companyDescription: string
  roles: {
    title: string
    period: string
    achievements: string[]
  }[]
}

export const experiences: Experience[] = [
  {
    id: 'redblock',
    company: 'Redblock.ai',
    location: 'Bangalore, India',
    companyDescription: 'Agentic AI Platform for Enterprise Security Teams',
    roles: [
      {
        title: 'Product Lead, AI Studio',
        period: 'February 2025 – Present',
        achievements: [
          'Founding Product Lead, leading the Product and Engineering teams in Bangalore, owning product strategy, roadmap, and delivery.',
          'Acquired a top-tier US bank and other large enterprises, delivering POCs and early deployments with multiple Tier-1 banks; filed design patents on agent architecture and skill reuse.',
          'Built AI Studio (0→1): an on-prem agentic platform enabling Enterprise IT & Security teams to automate workflows across disconnected, legacy, and non-API applications.',
          'Launched a no-code Agent Builder, allowing enterprise teams to create and deploy agents that automate JML, access reviews, certifications, and password rotations.',
          'Defined core platform abstractions (AI Skills, Agents, Workflows, Agent Builder), creating a scalable foundation for enterprise-grade automation.',
          'Designed AI evaluation frameworks to ensure reliable agent performance across disconnected and legacy enterprise workflows.',
        ],
      },
    ],
  },
  {
    id: 'bureauId-fraud',
    company: 'BureauID',
    location: 'Bangalore, India',
    companyDescription: 'Compliance & Fraud Prevention Platform',
    roles: [
      {
        title: 'Senior Product Manager, Fraud Score',
        period: 'November 2023 - February 2025',
        achievements: [
          'Generated $4M ARR in 24 months by launching an AI-powered fraud detection solution adopted by India\'s top 6 banks and fintech.',
          'Pioneered India\'s first pre-onboarding fraud score, identifying over 170,000 fraudulent accounts, reducing false alerts by 71%, and preventing $12 million in fraud losses.',
          'Improved M6 and M9 retention rates by 40% through 12 months of Product-Market Fit (PMF) experiments, focusing on industry, use case, pricing model, and channel effectiveness.',
          'Increased product margins by 47% in 15 months by replacing vendors with proprietary solutions.',
          'Expanded to SEA, acquiring 12 new clients in 12 months, including 2 banks and achieving 50%+ M6 retention.',
          'Developed an NTC Lending Score using graph technology, onboarded 12 mid-market clients, and managed 4M monthly transactions.',
        ],
      },
      {
        title: 'Product Manager, Platform',
        period: 'December 2022 - November 2023',
        achievements: [
          'Built Bureau\'s proprietary Score Engine, powering fraud solutions for 35+ clients, processing 50M+ monthly transactions.',
          'Launched the Bulk Verification Tool, driving 60% of revenue and reducing turnaround time by 70%.',
          'Enhanced platform with PLG features, analytics, and workflow automation, boosting time-to-value by 15%.',
          'Introduced an internal Customer Onboarding Tool that automates manual tasks, cutting onboarding TAT by 25%.',
        ],
      },
    ],
  },
  {
    id: 'blaze',
    company: 'Blaze by BureauID',
    location: 'Bangalore, India',
    companyDescription: 'E-commerce',
    roles: [
      {
        title: 'Product Manager, RTO Guarantee Product',
        period: 'April 2022 - December 2022',
        achievements: [
          'Created Return to Order solution reducing RTO rates by 15% and safeguarding $10M monthly commerce for over 70 D2C brands.',
          'Built a client order management dashboard, increasing user engagement by 25% and reducing support tickets by 15%.',
        ],
      },
      {
        title: 'Associate Product Manager, 1-Click Checkout',
        period: 'October 2021 - April 2022',
        achievements: [
          'Launched a 1-Click Checkout solution for Shopify and WooCommerce stores, reducing checkout drop-off by 25%.',
          'Implemented a comprehensive Order Refund Management System, resulting in a 20% reduction in support inquiries.',
        ],
      },
    ],
  },
  {
    id: 'bs-healthcare',
    company: 'BS Healthcare Pvt Ltd.',
    location: 'Mumbai, India',
    companyDescription: 'Healthcare',
    roles: [
      {
        title: 'Full Stack Developer',
        period: 'June 2016 - October 2016',
        achievements: [
          'Designed a full-stack e-commerce platform from inception using WordPress / WooCommerce, supporting 40% of all sales.',
          'Enhanced efficiency and customer satisfaction by implementing an Order Refund System, resulting in 40% fewer support queries.',
        ],
      },
    ],
  },
]

export interface LeadershipExperience {
  title: string
  organization: string
  period: string
  description?: string
}

export const leadershipExperiences: LeadershipExperience[] = [
  {
    title: 'President and General Secretary',
    organization: 'Students\' Affairs Council, IIT Roorkee',
    period: 'June 2016 - May 2017',
    description: 'Led a historic, student-led initiative to implement gender-neutral timings and 24/7 campus access, driving increased participation in libraries, E-Cells, and clubs, which boosted entrepreneurship and innovation. Authored and executed key structural reforms in the Dean of Students\' Welfare organization, benefiting over 10,000 students.',
  },
  {
    title: 'Hostel and Sports Secretary',
    organization: 'Radhakrishnan Bhawan, IIT Roorkee',
    period: 'June 2015 - May 2016',
  },
  {
    title: 'Joint Secretary',
    organization: 'Himalayan Explorers\' Club',
    period: 'June 2015 - April 2016',
  },
  {
    title: 'Executive',
    organization: 'Unnat Bharat Abhiyan, IIT Roorkee',
    period: 'March 2016 - December 2017',
  },
]

export const skills = [
  'AI Tools',
  'Market Research',
  'A/B Testing Techniques',
  'Python',
  'MySQL',
  'Excel',
  'Product Strategy',
  'Roadmap Planning',
  'Agile/Scrum',
  'User Research',
  'Data Analysis',
]

export const interests = ['Artificial Intelligence', 'LLMs', 'Badminton']

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  category: string
  technologies: string[]
  achievements: string[]
  link?: string
  image?: string
}

export const projects: Project[] = [
  {
    id: 'ai-studio',
    title: 'AI Studio - Agentic Platform',
    description: 'Built an on-prem agentic AI platform enabling enterprise security teams to automate workflows across legacy systems.',
    longDescription: `AI Studio is an enterprise-grade agentic platform that I built from 0 to 1 at Redblock.ai.
The platform enables IT and Security teams to automate complex workflows across disconnected, legacy, and non-API applications.

Key innovations include a no-code Agent Builder that allows non-technical users to create and deploy automation agents,
and a robust AI evaluation framework ensuring reliable performance.`,
    category: 'AI',
    technologies: ['Agentic AI', 'Enterprise Security', 'No-Code Platform', 'Workflow Automation'],
    achievements: [
      'Acquired top-tier US bank as customer',
      'Filed design patents on agent architecture',
      'Deployed with multiple Tier-1 banks',
    ],
  },
  {
    id: 'fraud-score',
    title: 'AI-Powered Fraud Detection',
    description: 'Pioneered India\'s first pre-onboarding fraud score, generating $4M ARR and preventing $12M in fraud losses.',
    longDescription: `Led the development of an AI-powered fraud detection solution that became the first pre-onboarding fraud score in India.
The solution was adopted by India's top 6 banks and several fintech companies.

The product identified over 170,000 fraudulent accounts, reduced false alerts by 71%, and prevented $12 million in fraud losses.`,
    category: 'Fraud',
    technologies: ['Machine Learning', 'Graph Technology', 'Risk Scoring', 'Real-time Processing'],
    achievements: [
      '$4M ARR in 24 months',
      '170,000+ fraudulent accounts identified',
      '71% reduction in false alerts',
      '$12M fraud losses prevented',
    ],
  },
  {
    id: 'score-engine',
    title: 'Bureau Score Engine',
    description: 'Built a proprietary score engine powering fraud solutions for 35+ clients with 50M+ monthly transactions.',
    longDescription: `Designed and built Bureau's core Score Engine infrastructure that powers all fraud detection solutions.
The engine processes over 50 million transactions monthly and serves 35+ enterprise clients.`,
    category: 'Platform',
    technologies: ['Distributed Systems', 'Real-time Scoring', 'High-availability Architecture'],
    achievements: [
      '35+ enterprise clients',
      '50M+ monthly transactions',
      'Core revenue driver for the company',
    ],
  },
  {
    id: 'rto-guarantee',
    title: 'RTO Guarantee Product',
    description: 'Created a Return to Order solution reducing RTO rates by 15% for 70+ D2C brands.',
    longDescription: `Built an end-to-end RTO (Return to Origin) guarantee product for e-commerce brands.
The solution helps D2C brands reduce return rates and protect their revenue from failed deliveries.`,
    category: 'E-commerce',
    technologies: ['E-commerce', 'Risk Assessment', 'Dashboard Analytics'],
    achievements: [
      '15% reduction in RTO rates',
      '$10M monthly commerce protected',
      '70+ D2C brands onboarded',
    ],
  },
]
