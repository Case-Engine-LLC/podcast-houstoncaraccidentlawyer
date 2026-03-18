import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@/themes/v1/variables.css'
import { siteConfig } from '@/data/siteData'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'The MVP of Personal Injury Law w. Brett & Chelsee Sachs',
  description: 'Brett Sachs founded MVP Accident Attorneys to fight for injured Californians against billion-dollar insurance companies. Listen to in-depth conversations about personal injury law, car accidents, wrongful death, and your rights after an accident.',
  openGraph: {
    title: 'The MVP of Personal Injury Law w. Brett & Chelsee Sachs',
    description: 'Brett Sachs founded MVP Accident Attorneys to fight for injured Californians against billion-dollar insurance companies. Listen to in-depth conversations about personal injury law.',
    url: 'https://mvppersonalinjury.com',
    siteName: 'MVP Personal Injury Law Podcast',
    type: 'website',
    images: [
      {
        url: 'https://mvppersonalinjury.com/Hero.jpg',
        width: 1200,
        height: 630,
        alt: 'The MVP of Personal Injury Law Podcast with Brett & Chelsee Sachs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The MVP of Personal Injury Law w. Brett & Chelsee Sachs',
    description: 'In-depth conversations about personal injury law, car accidents, and your rights. Hosted by Brett & Chelsee Sachs of MVP Accident Attorneys.',
    images: ['https://mvppersonalinjury.com/Hero.jpg'],
  },
  ...(siteConfig.rssFeedUrl
    ? {
        alternates: {
          types: {
            'application/rss+xml': siteConfig.rssFeedUrl,
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
