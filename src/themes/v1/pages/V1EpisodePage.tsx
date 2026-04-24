import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EpisodeHero from '../components/EpisodeHero'
import EpisodeContent from '../components/EpisodeContent'
import OtherEpisodes from '../components/OtherEpisodes'
import FAQ from '../components/FAQ'
import type { Episode } from '@/lib/data'
import type { TranscriptSegment } from '@/lib/rss'

const episodeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://podcast-houstoncaraccidentlawyer.vercel.app/episode/1#webpage",
      "url": "https://podcast-houstoncaraccidentlawyer.vercel.app/episode/1",
      "name": "Your Rights After a Houston Car Accident — with Ben Dominguez | Episode 1 | Houston Abogado de Accidentes with Ben Dominguez",
      "description": "Ben Dominguez walks through your rights after a Houston car accident — insurance, medical care, evidence preservation, and when a case needs a lawyer.",
      "isPartOf": {
        "@id": "https://podcast-houstoncaraccidentlawyer.vercel.app/#website"
      },
      "inLanguage": "en-US",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [
          "h1",
          ".episode-description",
          ".episode-overview",
          ".key-takeaways"
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
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Episodes",
            "item": "https://podcast-houstoncaraccidentlawyer.vercel.app/#episodes"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Your Rights After a Houston Car Accident — with Ben Dominguez",
            "item": "https://podcast-houstoncaraccidentlawyer.vercel.app/episode/1"
          }
        ]
      }
    },
    {
      "@type": "PodcastEpisode",
      "@id": "https://podcast-houstoncaraccidentlawyer.vercel.app/episode/1#episode",
      "name": "Your Rights After a Houston Car Accident — with Ben Dominguez",
      "description": "TODO — replace with the real Episode 1 description once the recording is complete. Structural placeholder: Ben Dominguez, solo-practice Houston personal injury and products liability attorney (Texas Bar since 1993), walks through what a Houston driver should do in the hours, days, and weeks after a serious collision under Texas law. Bilingual conversation (English / Spanish). Topics to cover: the Texas two-year statute of limitations, modified comparative fault (Texas Civil Practice & Remedies Code Section 33), dealing with adjusters, evidence preservation on Houston freeways, and when a solo practitioner is the right fit versus a larger firm.",
      "episodeNumber": 1,
      "url": "https://podcast-houstoncaraccidentlawyer.vercel.app/episode/1",
      "image": "https://podcast-houstoncaraccidentlawyer.vercel.app/cover.jpg",
      "partOfSeries": {
        "@id": "https://podcast-houstoncaraccidentlawyer.vercel.app/#podcast"
      },
      "author": {
        "@id": "https://podcast-houstoncaraccidentlawyer.vercel.app/#host"
      },
      "publisher": {
        "@id": "https://benwins.com/#org"
      },
      "inLanguage": "en-US",
      "genre": [
        "Personal Injury Law",
        "Legal Education",
        "Texas Personal Injury Law"
      ],
      "keywords": [
        "Ben Dominguez",
        "Houston",
        "Abogado de Accidentes",
        "Texas Personal Injury",
        "Products Liability"
      ],
      "isAccessibleForFree": true
    },
    {
      "@type": "FAQPage",
      "@id": "https://podcast-houstoncaraccidentlawyer.vercel.app/episode/1#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What rights does a Houston driver have after a car accident?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In Episode 1, Ben Dominguez walks through a Texas driver's core rights after a crash: the right to medical care (regardless of fault), to file a claim against the at-fault driver under Texas tort law, to recover under uninsured/underinsured motorist coverage, and to consult an attorney before giving any statement to an insurance carrier."
          }
        },
        {
          "@type": "Question",
          "name": "What is the statute of limitations for a Texas car accident claim?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ben Dominguez explains that Texas Civil Practice & Remedies Code Section 16.003 sets a two-year limitations period for most personal injury claims, measured from the date of the accident. Claims against government entities have shorter notice requirements. Missing the deadline typically forfeits the claim."
          }
        },
        {
          "@type": "Question",
          "name": "When does a Houston car accident case actually need a lawyer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ben walks through the common scenarios where a lawyer adds clear value — disputed liability, multiple vehicles, significant injuries, uninsured motorists, commercial defendants, and any case where the at-fault driver's insurance is inadequate and UIM stacking becomes a question. For low-value property-only claims, the firm will say so."
          }
        },
        {
          "@type": "Question",
          "name": "How do I reach Ben Dominguez after this episode?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Contact the firm through benwins.com or by calling (713) 224-7333. The firm takes calls in English and Spanish, offers free consultations, and works on contingency — no attorney’s fees unless a recovery is obtained."
          }
        }
      ]
    }
  ]
}

export function generateEpisodeSchema(_episodeId: string) {
  return episodeSchema
}

interface V1EpisodePageProps {
  episodeId: string
  episode?: Episode | null
  allEpisodes?: Episode[]
  transcript?: TranscriptSegment[]
}

const V1EpisodePage = ({ episodeId: _episodeId, episode: rssEpisode, allEpisodes, transcript }: V1EpisodePageProps) => {
  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(episodeSchema) }}
      />
      <Header variant="light" />

      <main className="pt-[6rem]">
        <EpisodeHero episode={rssEpisode} />
        <EpisodeContent episode={rssEpisode} transcript={transcript} />
        <OtherEpisodes episodes={allEpisodes} />
        <FAQ />
      </main>

      <Footer />
    </div>
  )
}

export default V1EpisodePage
