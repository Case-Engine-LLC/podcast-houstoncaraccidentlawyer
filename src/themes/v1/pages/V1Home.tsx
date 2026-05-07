'use client'

import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import TrustBadges from '../components/TrustBadges'
import StatsBanner from '../components/StatsBanner'
import About from '../components/About'
import PodcastTeam from '../components/PodcastTeam'
import LatestEpisodes from '../components/LatestEpisodes'
import PodcastSubscribeCTA from '../components/PodcastSubscribeCTA'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import TopicalEntryGrid from '../components/TopicalEntryGrid'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import type { Episode } from '@/lib/data'

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://benwins.com/#org",
      "name": "Ben Dominguez Car Accident Lawyer",
      "legalName": "Ben Dominguez Car Accident Lawyer",
      "url": "https://benwins.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://podcast-houstoncaraccidentlawyer.vercel.app/logo.svg",
        "width": 200,
        "height": 60
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://podcast-houstoncaraccidentlawyer.vercel.app/Hero.jpg",
        "width": 1200,
        "height": 630
      },
      "description": "Ben Dominguez is a fourth-generation Texan and solo-practice Houston personal injury and products liability attorney. He has been licensed by the State Bar of Texas since 1993 (Bar No. 00786415) and represents Spanish- and English-speaking clients across Greater Houston.",
      "telephone": "+17132247333",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "4899 Montrose Blvd., Suite 1512",
        "addressLocality": "Houston",
        "addressRegion": "TX",
        "postalCode": "77006",
        "addressCountry": "US"
      },
      "foundingDate": "1994",
      "areaServed": {
        "@type": "State",
        "name": "Texas"
      },
      "knowsAbout": [
        "Car Accident Law",
        "Truck Accident Law",
        "Motorcycle Accident Law",
        "Products Liability Law",
        "Wrongful Death Law"
      ],
      "sameAs": [
        "https://benwins.com/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://podcast-houstoncaraccidentlawyer.vercel.app/#website",
      "url": "https://podcast-houstoncaraccidentlawyer.vercel.app/",
      "name": "Houston Abogado de Accidentes with Ben Dominguez",
      "description": "A bilingual podcast by Ben Dominguez II — Houston personal injury, products liability, and construction accident law for English- and Spanish-speaking Texans.",
      "publisher": {
        "@id": "https://benwins.com/#org"
      },
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://podcast-houstoncaraccidentlawyer.vercel.app/?s={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://podcast-houstoncaraccidentlawyer.vercel.app/#webpage",
      "url": "https://podcast-houstoncaraccidentlawyer.vercel.app/",
      "name": "Houston Abogado de Accidentes with Ben Dominguez | Ben Dominguez Car Accident Lawyer",
      "description": "Ben Dominguez covers Texas personal injury, products liability, and construction accident law for Houston and Harris County — available in English and Spanish.",
      "isPartOf": {
        "@id": "https://podcast-houstoncaraccidentlawyer.vercel.app/#website"
      },
      "about": {
        "@id": "https://benwins.com/#org"
      },
      "inLanguage": "en-US",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [
          "h1",
          ".podcast-description",
          ".about-section",
          ".episode-description"
        ]
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://podcast-houstoncaraccidentlawyer.vercel.app/"
          }
        ]
      }
    },
    {
      "@type": "PodcastSeries",
      "@id": "https://podcast-houstoncaraccidentlawyer.vercel.app/#podcast",
      "name": "Houston Abogado de Accidentes with Ben Dominguez",
      "description": "Houston Abogado de Accidentes with Ben Dominguez covers Texas personal injury, products liability, and construction-accident law for Houston and Harris County residents — including bilingual representation for Spanish-speaking clients.",
      "url": "https://podcast-houstoncaraccidentlawyer.vercel.app/",
      "image": "https://podcast-houstoncaraccidentlawyer.vercel.app/Hero.jpg",
      "author": {
        "@type": "Person",
        "@id": "https://podcast-houstoncaraccidentlawyer.vercel.app/#host",
        "name": "Ben Dominguez",
        "givenName": "Ben",
        "familyName": "Dominguez",
        "jobTitle": "Personal Injury & Products Liability Attorney, Podcast Host",
        "image": "https://podcast-houstoncaraccidentlawyer.vercel.app/headshot-ben-dominguez.png",
        "worksFor": {
          "@id": "https://benwins.com/#org"
        },
        "sameAs": [
          "https://benwins.com/"
        ],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Vermont Law School"
        }
      },
      "webFeed": [],
      "genre": [
        "Legal",
        "Personal Injury Law",
        "Education"
      ],
      "inLanguage": "en-US",
      "publisher": {
        "@id": "https://benwins.com/#org"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://podcast-houstoncaraccidentlawyer.vercel.app/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What topics does Houston Abogado de Accidentes cover?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The podcast covers personal injury topics relevant to Houston and Harris County drivers — car, truck, motorcycle, rideshare, bicycle, and pedestrian accidents; construction accidents; products liability; and premises liability. Ben Dominguez hosts bilingually (English and Spanish), and episodes include Texas-specific insurance rules, the two-year statute of limitations, and what to do in the first days after a crash."
          }
        },
        {
          "@type": "Question",
          "name": "Who hosts the podcast?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ben Dominguez II hosts Houston Abogado de Accidentes. He has been a Texas-licensed attorney since 1993 (State Bar No. 00786415), established his Houston solo practice in 1994, and narrowed the practice to personal injury and products liability in 2015. Ben is a fourth-generation Texan and bilingual in English and Spanish."
          }
        },
        {
          "@type": "Question",
          "name": "Is the podcast available in Spanish?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Ben Dominguez is bilingual and serves Spanish-speaking clients across the Greater Houston area. Episodes and firm materials are available in both English and Spanish, and the firm takes calls in either language at (713) 224-7333."
          }
        },
        {
          "@type": "Question",
          "name": "How do I contact Ben Dominguez about a case?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Contact the firm through benwins.com or call (713) 224-7333. Listener questions shape future episodes. Consultations are free, and cases are handled on contingency — no attorney’s fees unless a recovery is obtained."
          }
        }
      ]
    }
  ]
}

interface V1HomeProps {
  episodes?: Episode[]
}

const V1Home = ({ episodes }: V1HomeProps) => {
  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Header />

      <main>
        <Hero />
        <TrustBadges />
        <StatsBanner />
        <About />
        <PodcastTeam />
        <LatestEpisodes episodes={episodes} />
        <Testimonials />
        <PodcastSubscribeCTA />
        <FAQ />
        <TopicalEntryGrid />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

export default V1Home
