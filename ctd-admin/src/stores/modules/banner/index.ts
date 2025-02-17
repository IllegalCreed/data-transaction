import { defineStore } from 'pinia'
import { useSettingsStore } from '../settings'
import type { apiListResult, ICommonReturn } from '@/types/common'
import type { IBanner, IBannerDTO, IBannerItem } from '@/types/banner'
import {
  getBanners as getBannersAPI,
  getBanner as getBannerAPI,
  upsertBanner as upsertBannerAPI,
  changeBannersStatus as changeBannersStatusAPI,
  deleteBanners as deleteBannersAPI
} from '@/apis/banner'
import { banners as mockBanners } from '@/constants/mockData/banner'
import type { ActiveStatus } from '@/constants/mapData'
import type { IFilterDTO, ISort, ITableColumnDTO } from '@/types/table'

export const useBannerStore = defineStore('banner', () => {
  const settingsStore = useSettingsStore()
  const { findMockTreeValueByKey } = settingsStore

  const getBanners = (
    searchQuery: string,
    filters: IFilterDTO<IBannerItem>[],
    sorts: ISort<IBannerItem>[],
    columns: ITableColumnDTO<IBannerItem>[],
    pageNum: number,
    pageSize: number
  ): Promise<ICommonReturn<apiListResult<IBannerItem>>> => {
    return new Promise<ICommonReturn<apiListResult<IBannerItem>>>((resolve, reject) => {
      if (findMockTreeValueByKey('banner')) {
        window.setTimeout(() => {
          const result = mockBanners.filter((item) => {
            const searchMatch = searchQuery ? item.title.includes(searchQuery) : true

            return searchMatch
          })

          resolve({ data: { total: result.length, rows: result }, code: 0, msg: 'success' })
        }, 1000)
      } else {
        getBannersAPI(searchQuery, filters, sorts, columns, pageNum, pageSize)
          .then((res) => {
            const result = res as ICommonReturn<apiListResult<IBannerItem>>
            resolve(result)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const getBanner = (id: string | number): Promise<IBanner> => {
    return new Promise<IBanner>((resolve, reject) => {
      if (findMockTreeValueByKey('banner')) {
        window.setTimeout(() => {
          const result = mockBanners.find((item) => item.id === Number(id))
          if (result) {
            resolve(result)
          } else {
            reject(new Error('Banner not found'))
          }
        }, 1000)
      } else {
        getBannerAPI(id)
          .then((res) => {
            const result = res as ICommonReturn<IBanner>
            resolve(result.data)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const upsertBanner = (id: string | number, bannerInfo: IBannerDTO): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('banner')) {
        window.setTimeout(() => {
          resolve()
        }, 1000)
      } else {
        upsertBannerAPI(id, bannerInfo)
          .then(() => {
            resolve()
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const changeBannersStatus = (ids: (string | number)[], status: ActiveStatus): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('banner')) {
        window.setTimeout(() => {
          resolve()
        }, 1000)
      } else {
        changeBannersStatusAPI(ids, status)
          .then(() => {
            resolve()
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const deleteBanners = (ids: (string | number)[]): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('banner')) {
        window.setTimeout(() => {
          resolve()
        }, 1000)
      } else {
        deleteBannersAPI(ids)
          .then(() => {
            resolve()
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  return {
    getBanners,
    getBanner,
    upsertBanner,
    changeBannersStatus,
    deleteBanners
  }
})
