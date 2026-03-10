'use client'

import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { authorProfiles, siteConfig, contact } from '@/data/siteData'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TrustBadges from '../components/TrustBadges'
import StatsBanner from '../components/StatsBanner'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'

interface V3AuthorPageProps {
  slug: string
}

const V3AuthorPage = ({ slug }: V3AuthorPageProps) => {
  const author = authorProfiles[slug]

  if (!author) {
    notFound()
  }

  return (
    <div className="bg-[#050505] text-[#e2e8f0] min-h-screen overflow-x-hidden selection:bg-amber-500 selection:text-black">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-[#050505] overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-12">
              <Link href="/v3" className="hover:text-white transition-colors">Home</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/v3#about" className="hover:text-white transition-colors">Team</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white">{author.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
              {/* Photo */}
              <div className="relative group order-2 lg:order-1">
                <div className="absolute inset-0 border border-amber-500/20 translate-x-4 translate-y-4 rounded-2xl" />
                <div className="relative bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <div className="aspect-[3/4] bg-zinc-800">
                    <img
                      src={author.photo}
                      alt={author.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium tracking-wide uppercase">
                  {author.role}
                </div>

                <h1 className="font-heading text-5xl md:text-6xl text-white leading-tight">
                  {author.name}
                </h1>

                <p className="text-xl text-amber-500 font-semibold">{author.title}</p>

                <p className="text-slate-400 leading-relaxed">{author.bio[0]}</p>

                {/* Bar Admissions */}
                <div className="flex flex-wrap gap-3">
                  {author.admissions.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                      <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                      <span className="text-sm text-white">{a.jurisdiction} ({a.year})</span>
                    </div>
                  ))}
                  <a
                    href={author.barUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-sm text-white">Bar #{author.barNumber}</span>
                    <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <Link
                  href={siteConfig.formCTA?.href || '#contact'}
                  className="inline-flex items-center gap-3 bg-amber-500 text-black px-8 py-4 rounded-full font-bold hover:bg-amber-400 transition-all"
                >
                  {siteConfig.formCTA?.text || 'Free Consultation'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <TrustBadges />

        {/* Bio + Education/Awards */}
        <section className="py-20 bg-[#050505]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Full Bio */}
              <div>
                <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Biography</span>
                <h2 className="font-heading text-3xl md:text-4xl text-white mt-2 mb-8">
                  About {author.name}
                </h2>
                <div className="space-y-6 text-slate-400 leading-relaxed">
                  {author.bio.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Education, Awards, Memberships */}
              <div className="space-y-10">
                {/* Education */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Education</h3>
                  </div>
                  <div className="space-y-3">
                    {author.education.map((edu, i) => (
                      <div key={i} className="bg-zinc-900 rounded-xl p-5 border border-white/5">
                        <p className="font-bold text-white">{edu.degree}{edu.honors ? ` — ${edu.honors}` : ''}</p>
                        <p className="text-slate-500 text-sm mt-1">{edu.school}</p>
                        <p className="text-slate-600 text-sm">Class of {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Awards */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Awards & Recognition</h3>
                  </div>
                  <div className="space-y-3">
                    {author.awards.map((award, i) => (
                      <div key={i} className="bg-zinc-900 rounded-xl p-5 border border-white/5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-bold text-white">{award.name}</p>
                            <p className="text-slate-500 text-sm mt-1">{award.description}</p>
                          </div>
                          <span className="text-xs px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full whitespace-nowrap font-bold">
                            {award.years}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Memberships */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Professional Memberships</h3>
                  </div>
                  <ul className="space-y-3">
                    {author.memberships.map((org, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        {org}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Areas */}
        <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Specializations</span>
              <h2 className="font-heading text-3xl md:text-4xl text-white mt-2 mb-4">Practice Areas</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                {author.name} focuses on the following areas of personal injury law.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {author.practiceAreas.map((area, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] rounded-xl p-6 text-center hover:border-amber-500/30 transition-colors border border-white/5"
                >
                  <p className="font-bold text-white text-sm">{area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <StatsBanner />

        {/* Testimonials */}
        <Testimonials />

        {/* Social Links + Contact CTA */}
        <section className="py-16 bg-[#050505]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Connect</span>
              <h2 className="font-heading text-3xl text-white mt-2">Get in Touch</h2>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {author.socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-full hover:bg-zinc-800 transition-colors font-semibold border border-white/5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {link.platform}
                </a>
              ))}
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 bg-amber-500 text-black px-6 py-3 rounded-full hover:bg-amber-400 transition-colors font-bold"
              >
                Call {contact.phone}
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-[#050505]">
          <div className="max-w-4xl mx-auto px-6">
            <FAQ />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default V3AuthorPage
