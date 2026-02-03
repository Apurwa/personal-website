import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { projects } from '@/data/resume'

// India Economy sections for sitemap
const indiaEconomySections = [
  { slug: '', title: 'India Economy Hub' },
  { slug: '/budget', title: 'Union Budget' },
  { slug: '/rbi', title: 'RBI & Monetary Policy' },
  { slug: '/gdp', title: 'GDP & Growth' },
  { slug: '/inflation', title: 'Inflation & Prices' },
  { slug: '/trade', title: 'Trade & Exports' },
  { slug: '/banking', title: 'Banking System' },
  { slug: '/markets', title: 'Stock Markets' },
  { slug: '/taxes', title: 'Taxation' },
  { slug: '/employment', title: 'Employment' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://apurwasarwajit.com'

  const posts = getAllPosts()

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // India Economy URLs with high priority (educational content)
  const indiaEconomyUrls = indiaEconomySections.map((section) => ({
    url: `${baseUrl}/india-economy${section.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: section.slug === '' ? 0.9 : 0.8, // Hub page gets higher priority
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...indiaEconomyUrls,
    ...projectUrls,
    ...blogUrls,
  ]
}
