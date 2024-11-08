import { defineStore } from 'pinia'
import { useSettingsStore } from '@/stores/modules/settings'
import type { IProductReview, IDemandReview } from '@/types/review'
import { demandReviews as mockDemandReviews } from '@/constants/mockData/comment/demand'
import { productReviews as mockProductReviews } from '@/constants/mockData/comment/product'
import {
  getProductComments as getProductCommentsAPI,
  getDemandComments as getDemandCommentsAPI,
} from '@/apis/comment'

export const useCommentStore = defineStore('comment', () => {
  const settingsStore = useSettingsStore()

  const productReviews = ref<IProductReview[]>([])

  const getProductComments = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          productReviews.value = mockProductReviews
          resolve()
        }, 1000)
      } else {
        getProductCommentsAPI()
          .then((res: unknown) => {
            productReviews.value = res as IProductReview[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const demandReviews = ref<IDemandReview[]>([])

  const getDemandComments = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          demandReviews.value = mockDemandReviews
          resolve()
        }, 1000)
      } else {
        getDemandCommentsAPI()
          .then((res: unknown) => {
            demandReviews.value = res as IDemandReview[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    productReviews,
    getProductComments,
    demandReviews,
    getDemandComments,
  }
})
