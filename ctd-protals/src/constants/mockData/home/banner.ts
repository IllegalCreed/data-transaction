import type { IBanner } from '@/types/home'

export const bannerList: IBanner[] = [
  {
    id: 1,
    imageUrl: new URL('@/assets/mock/banner.png', import.meta.url).href,
    route: '/scene/1'
  }
]
