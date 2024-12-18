import { BannerType } from '@/constants/mapData/banner'
import type { IBanner } from '@/types/home'

export const bannerList: IBanner[] = [
  {
    id: 1,
    imageUrl: new URL('@/assets/mock/banner.png', import.meta.url).href,
    type: BannerType.Scene,
    payload: '2',
  },
]
