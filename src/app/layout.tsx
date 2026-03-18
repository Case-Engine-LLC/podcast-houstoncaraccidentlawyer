import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@/themes/v1/variables.css'
import { siteConfig, attorney, contact } from '@/data/siteData'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: siteConfig.podcastName,
  description: `${attorney.name} hosts ${siteConfig.podcastName} — conversations about personal injury law, car accidents, and your legal rights.`,
  openGraph: {
    title: siteConfig.podcastName,
    description: `${attorney.name} hosts ${siteConfig.podcastName} — conversations about personal injury law, car accidents, and your legal rights.`,
    url: contact.website,
    siteName: siteConfig.podcastName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.podcastName,
    description: `Conversations about personal injury law, car accidents, and your rights. Hosted by ${attorney.name}.`,
  },
  ...('rssFeedUrl' in siteConfig && (siteConfig as any).rssFeedUrl
    ? {
        alternates: {
          types: {
            'application/rss+xml': (siteConfig as any).rssFeedUrl,
          },
        },
      }
    : {}),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
