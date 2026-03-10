'use client'

import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Scale, GraduationCap, Award, Briefcase, Users, ExternalLink, FileText, ChevronRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TrustBadges from '../components/TrustBadges'
import StatsBanner from '../components/StatsBanner'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import { authorProfiles, siteConfig, contact } from '@/data/siteData'

interface V2AuthorPageProps {
  slug: string
}

const V2AuthorPage = ({ slug }: V2AuthorPageProps) => {
  const author = authorProfiles[slug]

  if (!author) {
    notFound()
  }

  return (
    <div className="bg-[#f4f2ed] text-[#091830] min-h-screen overflow-x-hidden selection:bg-[#FF9E00] selection:text-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-28 pb-16 bg-[#10284B] overflow-hidden">

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/50 mb-12">
              <Link href="/v2" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link href="/v2#about" className="hover:text-white transition-colors">Team</Link>
              <ChevronRight size={14} />
              <span className="text-white">{author.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-end">
              {/* Photo */}
              <div className="flex justify-center lg:justify-start items-end self-end -mb-16">
                <img
                  src={author.photo}
                  alt={author.name}
                  className="w-full max-w-[480px] h-auto object-contain object-bottom"
                />
              </div>

              {/* Info */}
              <div className="text-center lg:text-left">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#FF9E00] text-[#091830] mb-6">
                  {author.role}
                </span>
                <h1 className="font-heading text-5xl md:text-6xl text-white mb-4 leading-tight">
                  {author.name}
                </h1>
                <p className="text-xl md:text-2xl text-[#FF9E00] font-semibold mb-6">
                  {author.title}
                </p>
                <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
                  {author.bio[0]}
                </p>

                {/* Bar Admissions */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                  {author.admissions.map((admission, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                      <Scale size={14} className="text-[#FF9E00]" />
                      <span className="text-sm text-white">{admission.jurisdiction} ({admission.year})</span>
                    </div>
                  ))}
                  <a
                    href={author.barUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <span className="text-sm text-white">Bar #{author.barNumber}</span>
                    <ExternalLink size={12} className="text-white/60" />
                  </a>
                </div>

                {/* CTA */}
                <Link
                  href={siteConfig.formCTA?.href || '#contact'}
                  className="inline-flex items-center gap-3 bg-[#FF9E00] text-[#091830] px-8 py-4 rounded-xl font-bold hover:bg-[#ffb133] transition-colors shadow-lg"
                >
                  <FileText className="w-5 h-5" />
                  <span>{siteConfig.formCTA?.text || 'Free Consultation'}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-10 bg-white border-y border-gray-100">
          <TrustBadges />
        </section>

        {/* Bio + Education/Awards */}
        <section className="py-20 bg-[#f4f2ed]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left: Full Bio */}
              <div>
                <span className="text-[#FF9E00] font-bold uppercase tracking-widest text-xs">Biography</span>
                <h2 className="font-heading text-3xl md:text-4xl text-[#10284B] mt-2 mb-8">
                  About {author.name}
                </h2>
                <div className="space-y-6 text-[#091830]/70 text-base leading-relaxed">
                  {author.bio.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Right: Education, Awards, Memberships */}
              <div className="space-y-10">
                {/* Education */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#10284B]/10 flex items-center justify-center">
                      <GraduationCap size={20} className="text-[#10284B]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#10284B]">Education</h3>
                  </div>
                  <div className="space-y-3">
                    {author.education.map((edu, i) => (
                      <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                        <p className="font-bold text-[#10284B]">{edu.degree}{edu.honors ? ` — ${edu.honors}` : ''}</p>
                        <p className="text-gray-500 text-sm mt-1">{edu.school}</p>
                        <p className="text-gray-400 text-sm">Class of {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Awards */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#FF9E00]/10 flex items-center justify-center">
                      <Award size={20} className="text-[#FF9E00]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#10284B]">Awards & Recognition</h3>
                  </div>
                  <div className="space-y-3">
                    {author.awards.map((award, i) => (
                      <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-bold text-[#10284B]">{award.name}</p>
                            <p className="text-gray-500 text-sm mt-1">{award.description}</p>
                          </div>
                          <span className="text-xs px-3 py-1 bg-[#FF9E00]/10 text-[#FF9E00] rounded-full whitespace-nowrap font-bold">
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
                    <div className="w-10 h-10 rounded-xl bg-[#10284B]/10 flex items-center justify-center">
                      <Users size={20} className="text-[#10284B]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#10284B]">Professional Memberships</h3>
                  </div>
                  <ul className="space-y-3">
                    {author.memberships.map((org, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#091830]/70">
                        <span className="w-2 h-2 rounded-full bg-[#FF9E00] mt-2 flex-shrink-0" />
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
        <section className="py-20 bg-[#10284B]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-[#FF9E00] font-bold uppercase tracking-widest text-xs">Specializations</span>
              <h2 className="font-heading text-3xl md:text-4xl text-white mt-2 mb-4">
                Practice Areas
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                {author.name} focuses on the following areas of personal injury law.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {author.practiceAreas.map((area, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur rounded-xl p-6 text-center hover:bg-white/20 transition-colors border border-white/5"
                >
                  <p className="font-bold text-white text-sm">{area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-white border-y border-gray-100">
          <StatsBanner />
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Social Links + Contact CTA */}
        <section className="py-16 bg-[#f4f2ed]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <span className="text-[#FF9E00] font-bold uppercase tracking-widest text-xs">Connect</span>
              <h2 className="font-heading text-3xl text-[#10284B] mt-2">Get in Touch</h2>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {author.socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#10284B] text-white px-6 py-3 rounded-full hover:bg-[#091830] transition-colors font-semibold"
                >
                  <ExternalLink size={16} />
                  {link.platform}
                </a>
              ))}
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 bg-[#FF9E00] text-[#091830] px-6 py-3 rounded-full hover:bg-[#ffb133] transition-colors font-bold"
              >
                Call {contact.phone}
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-[#f4f2ed]">
          <div className="max-w-4xl mx-auto px-6">
            <FAQ />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default V2AuthorPage
