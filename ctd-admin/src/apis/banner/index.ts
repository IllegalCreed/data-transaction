import type { ActiveStatus } from '@/constants/mapData'
import * as javaBanner from './java/banner'
import * as nestBanner from './nest/banner'
import type { IBannerDTO, IBannerItem } from '@/types/banner'
import type { IFilterDTO, ISort, ITableColumnDTO } from '@/types/table'

interface IBannerAPI {
  getBanners: (
    searchQuery: string,
    filters: IFilterDTO<IBannerItem>[],
    sorts: ISort<IBannerItem>[],
    columns: ITableColumnDTO<IBannerItem>[],
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
