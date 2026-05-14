'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { footer, siteConfig, podcastTeam, authorProfiles, contact } from '@/data/siteData'
import type { Episode } from '@/lib/data'

const XIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.967 6.817H1.677l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
  </svg>
)

const socialIcons: Record<string, React.ComponentType<{ size: number; className?: string }>> = {
  twitter: XIcon,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
}

interface FooterProps {
  episodes?: Episode[]
}

const Footer = ({ episodes }: FooterProps) => {
  const currentYear = new Date().getFullYear()

  // Build bar number string from authorProfiles
  const barNumbers = podcastTeam
    .map(member => {
      const profile = authorProfiles[member.slug]
      return profile?.barNumber ? `${member.name}, CA Bar #${profile.barNumber}` : null
    })
    .filter(Boolean)
    .join('. ')

  return (
    <footer className="bg-[#0a0a1a] text-white">
      {/* Marquee Section */}
      <div className="py-12 md:py-16 overflow-hidden">
        <div className="flex animate-marquee-fast">
          <span className="font-extrabold text-white whitespace-nowrap" style={{ fontSize: 'clamp(4rem, 8vw, 12.5rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
            SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01
          </span>
          <span className="font-extrabold text-white whitespace-nowrap ml-8" style={{ fontSize: 'clamp(4rem, 8vw, 12.5rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
            SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01
          </span>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-container mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column - Logo & Social */}
          <div>
            <div className="mb-6">
              <img
                src="/logo.svg"
                alt={footer.logo}
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-base text-white/70 leading-relaxed mb-8 max-w-md">
              {footer.description}
            </p>
            <div className="flex items-center gap-4">
              {Object.entries(footer.socialLinks).map(([platform, url]) => {
                const Icon = socialIcons[platform]
                if (!Icon || !url) return null
                return (
                  <Link key={platform} href={url} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                    <Icon size={20} className="text-white" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right Column - Episodes + Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Episodes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {(episodes ?? []).map((ep) => (
                <Link
                  key={ep.id}
                  href={`/episode/${ep.slug}`}
                  className="text-base text-white/80 hover:text-white transition-colors truncate"
                >
                  Ep. {ep.number}: {ep.title}
                </Link>
              ))}
            </div>

            <h3 className="text-xl font-bold text-white mb-4 mt-10">Listen On</h3>
            <div className="flex flex-wrap gap-4">
              {Object.entries(siteConfig.platformLinks).map(([platform, url]) => {
                if (!url || url === '#') return null
                const label = platform === 'apple' ? 'YouTube' : platform.charAt(0).toUpperCase() + platform.slice(1)
                return (
                  <Link key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-base text-white/80 hover:text-white transition-colors underline underline-offset-4">
                    {label}
                  </Link>
                )
              })}
              <Link href={`https://open.spotify.com/episode/5CF7pgUkEaP4X02bZ6ABQm`} target="_blank" rel="noopener noreferrer" className="text-base text-white/80 hover:text-white transition-colors underline underline-offset-4">
                Spotify (Ep. 1)
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright + Compliance */}
      <div className="border-t border-white/10">
        <div className="max-w-container mx-auto px-6 md:px-12 py-6">
          <p className="text-sm text-white/60 text-center">
            &copy; {currentYear} {footer.copyright}. All rights reserved.
          </p>
          <p className="text-xs text-white/40 text-center mt-2">
            Attorney Advertising. {barNumbers}. Past results do not guarantee future outcomes. Results may vary based on the facts of each case.
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <Link href="/privacy" className="text-xs text-white/40 underline hover:text-white/60">Privacy Policy</Link>
            <span className="text-xs text-white/20">|</span>
            <Link href={contact.website} target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 underline hover:text-white/60">{contact.website.replace('https://', '')}</Link>
            <span className="text-xs text-white/20">|</span>
            <span className="text-xs text-white/40">{contact.phone}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
