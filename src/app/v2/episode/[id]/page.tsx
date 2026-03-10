import V2EpisodePage from '@/themes/v2/pages/V2EpisodePage'
import { generateEpisodeSchema } from '@/themes/v1/pages/V1EpisodePage'
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
  const schema = generateEpisodeSchema(id)
  const allEpisodes = await getAllEpisodes()
  const episode = await getEpisodeById(Number(id))
  const transcript = episode ? await getEpisodeTranscript(episode) : []

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <V2EpisodePage
        episodeId={id}
        episode={episode}
        allEpisodes={allEpisodes}
        transcript={transcript}
      />
    </>
  )
}
