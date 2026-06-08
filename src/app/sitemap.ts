import type { MetadataRoute } from 'next'
import { siteConfig, authorProfiles } from '@/data/siteData'
import { getAllEpisodes } from '@/lib/data'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.podcastUrl.replace(/\/$/, '')
  const now = new Date()
  const episodes = await getAllEpisodes()

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
    ...episodes.map((ep) => ({
      url: `${base}/episode/${ep.slug ?? ep.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
