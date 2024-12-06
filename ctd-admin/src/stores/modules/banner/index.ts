import { defineStore } from 'pinia'
import { useSettingsStore } from '../settings'
import type { apiListResult } from '@/types/common'
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
import type { LinkTypes } from '@/constants/mapData/banner'

export const useBannerStore = defineStore('banner', () => {
  const settingsStore = useSettingsStore()

  const getBanners = (
    searchQuery: string,
    status: ActiveStatus | null,
    linkType: LinkTypes | null,
    pageNum: number,
    pageSize: number
  ): Promise<apiListResult<IBannerItem>> => {
    return new Promise<apiListResult<IBannerItem>>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockBanners.filter((item) => {
            const statusMatch = status ? item.status === status : true
            const linkTypeMatch = linkType ? item.linkType === linkType : true
            const searchMatch = searchQuery ? item.title.includes(searchQuery) : true

            return statusMatch && searchMatch && linkTypeMatch
          })

          resolve({ total: result.length, rows: result })
        }, 1000)
      } else {
        getBannersAPI(searchQuery, status, linkType, pageNum, pageSize)
          .then((res) => {
            const result = res as apiListResult<IBannerItem>
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
      if (settingsStore.mockEnabled) {
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
            const result = res as IBanner
            resolve(result)
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
      if (settingsStore.mockEnabled) {
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
      if (settingsStore.mockEnabled) {
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
      if (settingsStore.mockEnabled) {
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
