import type { Metadata } from 'next'
import V1EpisodePage from '@/themes/v1/pages/V1EpisodePage'
import { getAllEpisodes, getEpisodeById, getEpisodeTranscript } from '@/lib/data'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const episodes = await getAllEpisodes()
    return episodes.map(ep => ({ id: String(ep.id) }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const episode = await getEpisodeById(Number(id))

  if (!episode) {
    return { title: 'Episode Not Found' }
  }

  const description = episode.description.length > 200
    ? episode.description.slice(0, 200) + '...'
    : episode.description
  const imageUrl = episode.logo || 'https://mvppersonalinjury.com/Hero.jpg'

  return {
    title: `${episode.title} | MVP Personal Injury Law Podcast`,
    description,
    openGraph: {
      title: episode.title,
      description,
      url: `https://mvppersonalinjury.com/episode/${id}`,
      siteName: 'MVP Personal Injury Law Podcast',
      type: 'article',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: episode.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: episode.title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const allEpisodes = await getAllEpisodes()
  const episode = await getEpisodeById(Number(id))
  const transcript = episode ? await getEpisodeTranscript(episode) : []

  return (
    <V1EpisodePage
      episodeId={id}
      episode={episode}
      allEpisodes={allEpisodes}
      transcript={transcript}
    />
  )
}
