import React from 'react'
import { notFound } from 'next/navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TrustBadges from '../components/TrustBadges'
import StatsBanner from '../components/StatsBanner'
import Testimonials from '../components/Testimonials'
import ContactSection from '../components/ContactSection'
import FAQ from '../components/FAQ'
import LatestEpisodes from '../components/LatestEpisodes'
import { authorProfiles, siteConfig, contact, stats, testimonials, footer, attorney } from '@/data/siteData'
import { Scale, GraduationCap, Award, Briefcase, Users, ExternalLink, FileText } from 'lucide-react'
import Link from 'next/link'

const SITE_URL = contact.website

export function generateAuthorSchema(author: typeof authorProfiles[string], slug: string) {
  const pageUrl = `${SITE_URL}/author/${slug}`
  const imageUrl = `${SITE_URL}${author.photo}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        'url': SITE_URL,
        'name': siteConfig.podcastName,
        'inLanguage': 'en',
        'publisher': { '@id': `${SITE_URL}/#org` },
      },
      {
        '@type': ['LegalService', 'Organization'],
        '@id': `${SITE_URL}/#org`,
        'name': attorney.firm,
        'legalName': attorney.firm,
        'url': contact.website,
        'telephone': contact.phone,
        'email': contact.email,
        'foundingDate': '',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': contact.address,
          'addressLocality': '',
          'addressRegion': '',
          'postalCode': '',
          'addressCountry': 'US',
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': String(stats.rating),
          'ratingCount': String(stats.reviewCount),
          'bestRating': '5',
          'worstRating': '1',
        },
        'sameAs': Object.values(footer.socialLinks).filter(Boolean),
        'knowsAbout': [
          'Personal Injury Law',
          'Car Accident Claims',
          'Wrongful Death',
          'Premises Liability',
          'Insurance Negotiations',
        ],
      },
      {
        '@type': ['WebPage', 'ProfilePage'],
        '@id': `${pageUrl}#webpage`,
        'url': pageUrl,
        'name': `${author.name} — ${author.title}`,
        'headline': `${author.name} — Personal Injury Attorney`,
        'inLanguage': 'en',
        'isPartOf': { '@id': `${SITE_URL}/#website` },
        'about': { '@id': `${pageUrl}#person` },
        'mainEntity': { '@id': `${pageUrl}#person` },
        'primaryImageOfPage': {
          '@type': 'ImageObject',
          '@id': `${imageUrl}#primaryimage`,
          'url': imageUrl,
        },
        'breadcrumb': { '@id': `${pageUrl}#breadcrumb` },
        'speakable': {
          '@type': 'SpeakableSpecification',
          'name': ['headline', 'description'],
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Team', 'item': `${SITE_URL}/#about` },
          { '@type': 'ListItem', 'position': 3, 'name': author.name, 'item': pageUrl },
        ],
      },
      {
        '@type': 'Person',
        '@id': `${pageUrl}#person`,
        'name': author.name,
        'givenName': author.name.split(' ')[0],
        'familyName': author.name.split(' ').slice(1).join(' '),
        'jobTitle': author.title,
        'description': author.bio[0],
        'image': {
          '@type': 'ImageObject',
          '@id': `${imageUrl}#image`,
          'url': imageUrl,
        },
        'url': pageUrl,
        'worksFor': { '@id': `${SITE_URL}/#org` },
        'alumniOf': author.education.map(edu => ({
          '@type': 'CollegeOrUniversity',
          'name': edu.school,
        })),
        'hasCredential': author.admissions.map(admission => ({
          '@type': 'EducationalOccupationalCredential',
          'credentialCategory': 'Professional license',
          'name': `${admission.jurisdiction} — Bar Admission`,
          'identifier': author.barNumber,
          'url': author.barUrl,
        })),
        'hasOccupation': {
          '@type': 'Occupation',
          'name': 'Attorney',
          'occupationalCategory': '23-1011.00',
          'description': 'Personal Injury Attorney',
          'qualifications': author.awards.map(a => a.name).join(', '),
        },
        'sameAs': author.socialLinks.map(link => link.url),
        'knowsAbout': author.practiceAreas,
        'memberOf': author.memberships.map(org => ({
          '@type': 'Organization',
          'name': org.replace(/ — .*/, ''),
        })),
        'award': author.awards.map(a => `${a.name} (${a.years})`),
        'review': testimonials.slice(0, 2).map(t => ({
          '@type': 'Review',
          'author': { '@type': 'Person', 'name': t.name },
          'reviewBody': t.text,
          'reviewRating': {
            '@type': 'Rating',
            'ratingValue': String(t.rating),
            'bestRating': '5',
            'worstRating': '1',
          },
        })),
      },
      {
        '@type': 'Role',
        '@id': `${pageUrl}#role`,
        'roleName': author.role,
        'startDate': '2017-08-01',
        'member': { '@id': `${pageUrl}#person` },
        'organization': { '@id': `${SITE_URL}/#org` },
      },
      {
        '@type': 'PodcastSeries',
        '@id': `${SITE_URL}/#podcast`,
        'name': siteConfig.podcastName,
        'url': SITE_URL,
        'webFeed': SITE_URL,
        'host': { '@id': `${pageUrl}#person` },
        'productionCompany': { '@id': `${SITE_URL}/#org` },
        'inLanguage': 'en',
        'genre': ['Law', 'Personal Injury', 'Legal Education'],
      },
    ],
  }
}

interface V1AuthorPageProps {
  slug: string
}

const V1AuthorPage = ({ slug }: V1AuthorPageProps) => {
  const author = authorProfiles[slug]

  if (!author) {
    notFound()
  }

  const schema = generateAuthorSchema(author, slug)

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header variant="light" />

      <main className="pt-[6rem]">
        {/* Author Hero */}
        <section className="relative bg-primary py-16 md:py-24 overflow-hidden">
          <div className="max-w-container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Photo */}
              <div className="flex justify-center">
                <div className="w-full max-w-[420px] aspect-[3/4] rounded-[20px] overflow-hidden bg-white/10">
                  <img
                    src={author.photo}
                    alt={author.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="text-center md:text-left">
                <div className="inline-block bg-[#FAA31A] px-6 py-1.5 rounded-[6px] text-[12px] font-bold text-black uppercase tracking-[0.96px] mb-6">
                  {author.role}
                </div>
                <h1 className="text-[2.25rem] leading-[1.1] md:text-5xl font-bold text-white mb-4">
                  {author.name}
                </h1>
                <p className="text-xl md:text-2xl text-[#FAA31A] font-semibold mb-6">
                  {author.title}
                </p>
                <p className="text-base md:text-lg text-white/80 leading-relaxed mb-8">
                  {author.bio[0]}
                </p>

                {/* Bar Info */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
                  {author.admissions.map((admission, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                      <Scale size={16} className="text-[#FAA31A]" />
                      <span className="text-sm text-white">{admission.jurisdiction} ({admission.year})</span>
                    </div>
                  ))}
                  <a
                    href={author.barUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <span className="text-sm text-white">Bar #{author.barNumber}</span>
                    <ExternalLink size={14} className="text-white/60" />
                  </a>
                </div>

                {/* CTA */}
                <Link
                  href={siteConfig.formCTA?.href || '#contact'}
                  className="inline-flex items-center gap-3 bg-[#FAA31A] text-black px-8 py-4 rounded-2xl transition-transform hover:scale-105 font-bold"
                >
                  <FileText className="w-5 h-5" />
                  <span>{siteConfig.formCTA?.text || 'Free Consultation'}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <TrustBadges />

        {/* Bio Section */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Left: Bio */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-none">
                  About {author.name}
                </h2>
                <div className="text-base md:text-lg text-gray-700 leading-relaxed space-y-6">
                  {author.bio.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Right: Education & Admissions */}
              <div className="space-y-8">
                {/* Education */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap size={24} className="text-[#FAA31A]" />
                    <h3 className="text-xl font-bold text-black">Education</h3>
                  </div>
                  <div className="space-y-4">
                    {author.education.map((edu, index) => (
                      <div key={index} className="bg-[#f1f2f4] rounded-xl p-5">
                        <p className="font-bold text-black">{edu.degree}{edu.honors ? ` — ${edu.honors}` : ''}</p>
                        <p className="text-gray-600 text-sm">{edu.school}</p>
                        <p className="text-gray-500 text-sm">Class of {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Awards */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Award size={24} className="text-[#FAA31A]" />
                    <h3 className="text-xl font-bold text-black">Awards & Recognition</h3>
                  </div>
                  <div className="space-y-3">
                    {author.awards.map((award, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-bold text-black">{award.name}</p>
                            <p className="text-gray-600 text-sm mt-1">{award.description}</p>
                          </div>
                          <span className="text-xs px-3 py-1 bg-[#FAA31A]/10 text-[#FAA31A] rounded-full whitespace-nowrap font-semibold">
                            {award.years}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Memberships */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Users size={24} className="text-[#FAA31A]" />
                    <h3 className="text-xl font-bold text-black">Professional Memberships</h3>
                  </div>
                  <ul className="space-y-2">
                    {author.memberships.map((org, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FAA31A] mt-2.5 flex-shrink-0" />
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
        <section className="bg-[#f1f2f4] py-16 md:py-20">
          <div className="max-w-container mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Briefcase size={24} className="text-[#FAA31A]" />
                <h2 className="text-3xl md:text-4xl font-bold text-black leading-none">
                  Practice Areas
                </h2>
              </div>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                {author.name} focuses on the following areas of personal injury law at {attorney.firm}.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {author.practiceAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <p className="font-bold text-black">{area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <StatsBanner />

        {/* Episodes */}
        <LatestEpisodes />

        {/* Testimonials */}
        <Testimonials />

        {/* Social Links */}
        <section className="bg-white py-12">
          <div className="max-w-container mx-auto px-6 md:px-12">
            <div className="flex flex-wrap gap-4 justify-center">
              {author.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/80 transition-colors font-semibold"
                >
                  <ExternalLink size={16} />
                  {link.platform}
                </a>
              ))}
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 bg-[#FAA31A] text-black px-6 py-3 rounded-full hover:bg-[#e09000] transition-colors font-bold"
              >
                Call {contact.phone}
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ />

        {/* Contact */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

export default V1AuthorPage
