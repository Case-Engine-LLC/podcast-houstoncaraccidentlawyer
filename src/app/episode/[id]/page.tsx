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
