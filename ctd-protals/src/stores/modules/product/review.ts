import { useSettingsStore } from '@/stores/modules/settings'
import type { IReview, IReviewInfo } from '@/types/review'
import {
  getProductReviewInfo as getProductReviewInfoAPI,
  getProductReviews as getProductReviewsAPI
} from '@/apis/product/review'
import {
  reviewInfo as mockReviewInfo,
  reviews as mockReviews
} from '@/constants/mockData/product/review'

export const useSeller = () => {
  const settingsStore = useSettingsStore()

  const getProductReviewInfo = (id: string | number): Promise<IReviewInfo> => {
    return new Promise<IReviewInfo>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve(mockReviewInfo)
        }, 1000)
      } else {
        getProductReviewInfoAPI(id)
          .then((res: unknown) => {
            const reviewInfo = res as IReviewInfo
            resolve(reviewInfo)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getProductReviews = (id: string | number): Promise<IReview[]> => {
    return new Promise<IReview[]>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve(mockReviews)
        }, 1000)
      } else {
        getProductReviewsAPI(id)
          .then((res: unknown) => {
            const reviews = res as IReview[]
            resolve(reviews)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    getProductReviewInfo,
    getProductReviews
  }
}
