import type { IModule } from '@/types/home'
import { banner as mockBanner } from '@/constants/mockData/service/banner'

export const useBanner = () => {
  const banner = ref<IModule>()

  const getBanner = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      banner.value = mockBanner
      resolve()
    })
  }

  return {
    banner,
    getBanner
  }
}
