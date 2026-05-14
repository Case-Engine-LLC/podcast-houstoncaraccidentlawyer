import type { MetadataRoute } from 'next'
import { siteConfig, episodes, authorProfiles } from '@/data/siteData'

export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.podcastUrl
  const now = new Date()

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...Object.keys(authorProfiles).map((slug) => ({
      url: `${base}/author/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    .../* eslint-disable */ episodes.map((ep: { id: number | string; slug?: string; title?: string }) => ({
      url: `${base}/episode/${ep.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
