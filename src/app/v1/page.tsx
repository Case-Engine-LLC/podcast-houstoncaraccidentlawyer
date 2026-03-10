import V1Home from '@/themes/v1/pages/V1Home'
import { getAllEpisodes } from '@/lib/data'

export const revalidate = 3600

export default async function Page() {
  const episodes = await getAllEpisodes()
  return <V1Home episodes={episodes} />
}
