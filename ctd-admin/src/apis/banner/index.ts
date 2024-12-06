import type { LinkTypes } from '@/constants/mapData/banner'
import type { IBannerDTO } from '@/types/banner'
import type { ActiveStatus } from '@/constants/mapData'
import * as javaBanner from './java/banner'
import * as nestBanner from './nest/banner'

interface IBannerAPI {
  getBanners: (
    searchQuery: string,
    status: ActiveStatus | null,
    linkType: LinkTypes | null,
    pageNum: number,
    pageSize: number
  ) => Promise<unknown>
  getBanner: (id: string | number) => Promise<unknown>
  upsertBanner: (id: string | number, companyInfo: IBannerDTO) => Promise<unknown>
  changeBannersStatus: (ids: (string | number)[], status: ActiveStatus) => Promise<unknown>
  deleteBanners: (ids: (string | number)[]) => Promise<unknown>
}

type BannerAPIType = IBannerAPI

const javaAPI: BannerAPIType = {
  ...javaBanner
}

const nestAPI: BannerAPIType = {
  ...nestBanner
}

const bannerAPI: BannerAPIType = import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const { getBanners, getBanner, upsertBanner, changeBannersStatus, deleteBanners } = bannerAPI
