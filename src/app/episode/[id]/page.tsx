import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import V2EpisodePage from '@/themes/v2/pages/V2EpisodePage'
import { getAllEpisodes, getEpisodeByIdOrSlug, getEpisodeTranscript } from '@/lib/data'
import { siteConfig } from '@/data/siteData'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const episodes = await getAllEpisodes()
    return episodes.map(ep => ({ id: ep.slug ?? String(ep.id) }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const episode = await getEpisodeByIdOrSlug(id)
  const siteHost = (siteConfig.podcastUrl || '').replace(/\/$/, '')

  if (!episode) {
    return { title: 'Episode Not Found' }
  }

  const description = episode.description.length > 200
    ? episode.description.slice(0, 200) + '...'
    : episode.description

  const canonicalPath = `/episode/${episode.slug ?? episode.id}`

  return {
    title: `${episode.title} | ${siteConfig.podcastName}`,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: episode.title,
      description,
      url: `${siteHost}${canonicalPath}`,
      siteName: siteConfig.podcastName,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: episode.title,
      description,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const allEpisodes = await getAllEpisodes()
  const episode = await getEpisodeByIdOrSlug(id)
  if (!episode) notFound()

  const transcript = await getEpisodeTranscript(episode)

  return (
    <V2EpisodePage
      episodeId={id}
      episode={episode}
      allEpisodes={allEpisodes}
      transcript={transcript}
    />
  )
}
