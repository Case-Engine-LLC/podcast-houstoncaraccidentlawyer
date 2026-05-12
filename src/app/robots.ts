import type { MetadataRoute } from 'next'
import { siteConfig } from '@/data/siteData'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/v1/', '/v2/', '/v3/', '/api/'],
    },
    sitemap: `${siteConfig.podcastUrl}/sitemap.xml`,
  }
}
