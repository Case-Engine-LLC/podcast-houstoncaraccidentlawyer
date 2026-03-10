'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { podcastTeam, authorProfiles, attorney } from '@/data/siteData'
import { about } from '@/lib/site-compat'

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const hosts = podcastTeam.map(member => {
    const profile = authorProfiles[member.slug]
    return {
      name: member.name,
      role: member.role,
      photo: member.photo,
      slug: member.slug,
      shortBio: member.bio,
      longBio: profile?.bio || [],
    }
  })

  const host = hosts[currentIndex]

  const next = () => setCurrentIndex((prev) => (prev + 1) % hosts.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + hosts.length) % hosts.length)

  return (
    <section id="about" className="py-24 bg-[#10284B] text-[#f4f2ed] relative overflow-hidden">
      {/* Decorative skew */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#091830] opacity-30 skew-x-12 transform origin-top-right" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-16 items-center">
        {/* Photo */}
        <div className="w-full md:w-1/2 relative">
          <div className="aspect-[4/5] bg-gray-700 rounded-tr-[100px] rounded-bl-[100px] overflow-hidden shadow-2xl relative">
            <img
              key={host.slug}
              src={host.photo}
              alt={host.name}
              className="w-full h-full object-cover object-top opacity-90 transition-opacity duration-500"
            />
            {/* Mini profile card */}
            <div className="absolute bottom-8 right-6 bg-[#f4f2ed]/95 backdrop-blur text-[#10284B] p-5 rounded-xl max-w-[320px] shadow-lg">
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={host.photo}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#FF9E00]"
                  alt={host.name}
                />
                <div>
                  <div className="font-bold text-base">{host.name}</div>
                  <div className="text-xs uppercase tracking-wide opacity-70">{host.role}</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed opacity-80">{host.shortBio}</p>
            </div>
          </div>

          {/* Slider arrows */}
          <div className="flex gap-3 mt-6 justify-center md:justify-start">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-[#f4f2ed]/30 flex items-center justify-center hover:bg-[#FF9E00] hover:border-[#FF9E00] hover:text-[#091830] transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-[#FF9E00] text-[#091830] flex items-center justify-center hover:bg-white transition-all shadow-lg"
            >
              <ChevronRight size={20} />
            </button>
            {/* Dots */}
            <div className="flex items-center gap-2 ml-4">
              {hosts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-[#FF9E00] w-6' : 'bg-[#f4f2ed]/30'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2">
          <span className="inline-block py-1 px-3 border border-[#FF9E00]/50 rounded-full text-[#FF9E00] text-xs tracking-widest uppercase mb-6">
            About the Hosts
          </span>
          <h2 className="font-heading text-4xl md:text-5xl mb-8 leading-tight">
            Who Runs The <br />
            <span className="text-[#FF9E00] italic">{attorney.firm}</span>?
          </h2>

          <div className="space-y-6 text-[#f4f2ed]/80 text-lg font-light leading-relaxed">
            <p>{about.description}</p>
          </div>

          <Link
            href={`/v2/author/${host.slug}`}
            className="inline-flex items-center gap-2 mt-8 text-[#FF9E00] font-medium hover:gap-4 transition-all"
          >
            Read {host.name}&apos;s Full Bio
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default About
