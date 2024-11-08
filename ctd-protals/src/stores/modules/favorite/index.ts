import { defineStore } from 'pinia'
import { useSettingsStore } from '@/stores/modules/settings'
import type { IDemand } from '@/types/demand'
import type { IProduct } from '@/types/product'
import { products as mockProducts } from '@/constants/mockData/favorite/product'
import { demands as mockDemands } from '@/constants/mockData/favorite/demand'
import {
  getFavoriteProducts as getFavoriteProductsAPI,
  getFavoriteDemands as getFavoriteDemandsAPI,
} from '@/apis/favorite'

export const useFavoriteStore = defineStore('favorite', () => {
  const settingsStore = useSettingsStore()

  const favoriteProducts = ref<IProduct[]>([])

  const getFavoriteProducts = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          favoriteProducts.value = mockProducts
          resolve()
        }, 1000)
      } else {
        getFavoriteProductsAPI()
          .then((res: unknown) => {
            favoriteProducts.value = res as IProduct[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const favoriteDemands = ref<IDemand[]>([])

  const getFavoriteDemands = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          favoriteDemands.value = mockDemands
          resolve()
        }, 1000)
      } else {
        getFavoriteDemandsAPI()
          .then((res: unknown) => {
            favoriteDemands.value = res as IDemand[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    favoriteProducts,
    getFavoriteProducts,
    favoriteDemands,
    getFavoriteDemands,
  }
})
