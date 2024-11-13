import { useSettingsStore } from '../settings'
import type { apiListResult } from '@/types/common'
import type { IProductItem } from '@/types/product'
import { getProducts as getProductsAPI, delProducts as delProductsAPI } from '@/apis/product'
import { products as mockProducts } from '@/constants/mockData/product/product'

export const useProduct = () => {
  const settingsStore = useSettingsStore()

  const getProducts = (
    searchQuery: string,
    status: string,
    sellerId: string | number,
    pageNum: number,
    pageSize: number
  ): Promise<apiListResult<IProductItem>> => {
    return new Promise<apiListResult<IProductItem>>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockProducts.filter((item) => {
            const statusMatch = status ? item.status === status : true
            const sellerMatch = sellerId ? item.sellerId === sellerId : true
            const searchMatch = searchQuery ? item.name.includes(searchQuery) : true

            return statusMatch && sellerMatch && searchMatch
          })
          resolve({ total: result.length, rows: result })
        }, 1000)
      } else {
        getProductsAPI(searchQuery, status, sellerId, pageNum, pageSize)
          .then((res) => {
            const result = res as apiListResult<IProductItem>
            resolve(result)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const delProducts = (ids: (string | number)[]): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve()
        }, 1000)
      } else {
        delProductsAPI(ids)
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
    getProducts,
    delProducts
  }
}
