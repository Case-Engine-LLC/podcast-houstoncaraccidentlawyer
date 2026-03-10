import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@/themes/v1/variables.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Podcast Landing Page',
  description: 'Subscribe to our podcast and learn how to protect your rights after a car accident.',
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
