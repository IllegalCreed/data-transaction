import type { IBanner } from '@/types/banner'

export const bannerList: IBanner[] = [
  {
    id: 1,
    imageUrl: new URL('@/assets/banner.png', import.meta.url).href,
    route: '/product/1'
  }
]
