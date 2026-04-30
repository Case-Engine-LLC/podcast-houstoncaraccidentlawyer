import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { MarkerWidget } from '@/components/MarkerWidget'
import SchemaJsonLd from '@/components/SchemaJsonLd'
import { siteConfig, about, contact, attorney } from '@/data/siteData'
import './globals.css'
import '@/themes/v2/variables.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
})

const SITE_URL =
  siteConfig.podcastUrl ||
  contact.website ||
  'https://podcast-houstoncaraccidentlawyer.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteConfig.podcastName,
    template: `%s | ${siteConfig.podcastName}`,
  },
  description: about.description,
  applicationName: siteConfig.podcastName,
  authors: [{ name: attorney.name, url: contact.website || SITE_URL }],
  keywords: [
    attorney.name,
    attorney.firm,
    'Houston Abogado de Accidentes',
    'Houston accident attorney',
    'Houston car accident lawyer',
    'Texas personal injury podcast',
    'Texas personal injury attorney',
    'abogado Houston',
    'abogado de accidentes Houston',
    'bilingual accident attorney Texas',
    'Harris County injury lawyer',
  ],
  category: 'Legal Podcast',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.podcastName,
    title: siteConfig.podcastName,
    description: about.description,
    url: SITE_URL,
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteConfig.podcastName} — hosted by ${attorney.name}, ${attorney.firm}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.podcastName,
    description: about.description,
    images: ['/opengraph-image'],
  },
  icons: {
    icon: [{ url: '/icon', type: 'image/png' }],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0f0f0f' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <SchemaJsonLd />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <MarkerWidget />
      </body>
    </html>
  )
}
