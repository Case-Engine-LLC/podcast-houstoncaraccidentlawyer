'use client'

import React from 'react'
import Link from 'next/link'
import { footer, episodes, siteConfig, attorney } from '@/data/siteData'

const Footer = () => {
  return (
    <footer className="bg-[#091830] text-white pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="mb-6">
            <img src="/palceholder.jpg" alt="Logo" className="h-10 w-auto object-contain" />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">{footer.description}</p>
          <div className="text-sm font-bold text-white mb-2">Listen on:</div>
          <div className="flex gap-4">
            <a href={siteConfig.platformLinks.spotify} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF9E00] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            </a>
            <a href={siteConfig.platformLinks.apple} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF9E00] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.06 2.77.74 3.55 1.91-2.9 1.67-2.43 5.48.51 6.71-.57 1.69-1.44 3.25-2.65 4.41zM11.96 4.96c.64-1.09.43-2.32.41-2.56-1.09.11-2.36.78-2.95 1.81-.55.95-.36 2.22-.36 2.44 1.23.14 2.34-.69 2.9-1.69z"/></svg>
            </a>
          </div>
        </div>

        {/* Episodes */}
        <div>
          <h3 className="font-heading text-lg font-bold mb-6 text-[#FF9E00]">Episodes</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            {episodes.slice(0, 4).map((ep) => (
              <li key={ep.id}>
                <Link href={`/v2/episode/${ep.id}`} className="hover:text-white transition-colors">Episode {ep.number}</Link>
              </li>
            ))}
            <li><Link href="#episodes" className="hover:text-white transition-colors">View All</Link></li>
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-heading text-lg font-bold mb-6 text-[#FF9E00]">Navigation</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/v2" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="#about" className="hover:text-white transition-colors">About Host</Link></li>
            <li><Link href="#reviews" className="hover:text-white transition-colors">Reviews</Link></li>
            <li><Link href="#faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-heading text-lg font-bold mb-6 text-[#FF9E00]">Legal</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <div className="flex gap-6 mb-4 md:mb-0">
          {Object.entries(footer.socialLinks).map(([platform, url]) => (
            <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="hover:text-white capitalize">
              {platform}
            </a>
          ))}
        </div>
        <div>&copy; {new Date().getFullYear()} {footer.copyright}. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Footer
