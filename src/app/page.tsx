import V2Home from '@/themes/v2/pages/V2Home'
import { getAllEpisodes } from '@/lib/data'

export const revalidate = 3600

export default async function Home() {
  const episodes = await getAllEpisodes()
  return <V2Home episodes={episodes} />
}
