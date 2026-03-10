'use client'

import React from 'react'
import Link from 'next/link'
import { podcastTeam } from '@/data/siteData'
import { about } from '@/lib/site-compat'

const About = () => {
  return (
    <section id="about" className="py-24 bg-zinc-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top: About Text - Centered */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 bg-white/5 rounded text-xs font-bold text-amber-500 uppercase tracking-widest mb-6">
            About the Show
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            {about.title}
          </h2>
          <p className="text-lg text-slate-400 font-light leading-relaxed mb-10">
            {about.description}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {about.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-400">
                <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center mt-0.5 shrink-0">
                  <svg className="w-3 h-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom: Two Host Cards - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {podcastTeam.map((host, index) => (
            <Link
              key={host.slug}
              href={`/v3/author/${host.slug}`}
              className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-500"
            >
              {/* Amber accent bar */}
              <div className={`absolute top-0 ${index === 0 ? 'left-0' : 'right-0'} w-1 h-full bg-gradient-to-b from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`} />

              <div className="relative">
                {/* Photo */}
                <div className="aspect-[4/5] bg-zinc-800 relative overflow-hidden">
                  <img
                    src={host.photo}
                    alt={host.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/30 to-transparent" />

                  {/* Episode badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur rounded-full text-[10px] font-bold text-amber-400 uppercase tracking-wider border border-white/10">
                    {host.episodes}
                  </div>

                  {/* Bottom text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-2xl text-white mb-1 group-hover:text-amber-400 transition-colors">
                      {host.name}
                    </h3>
                    <p className="text-amber-500 text-xs font-semibold uppercase tracking-wider">
                      {host.role}
                    </p>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="px-6 py-4 bg-[#0d0d0d] flex justify-between items-center border-t border-white/5">
                  <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                    View full profile
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
