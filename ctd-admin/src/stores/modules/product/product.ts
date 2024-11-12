import { useSettingsStore } from '../settings'
import type { IProduct } from '@/types/product'
import { getProducts as getProductsAPI } from '@/apis/product'
import { products as mockProducts } from '@/constants/mockData/product/product'
import type { apiListResult } from '@/types/common'

export const useProduct = () => {
  const settingsStore = useSettingsStore()

  const getProducts = (
    searchQuery: string,
    status: string,
    sellerId: string | number,
    pageNum: number,
    pageSize: number
  ): Promise<apiListResult<IProduct>> => {
    return new Promise<apiListResult<IProduct>>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        resolve({ total: mockProducts.length, rows: mockProducts })
      } else {
        getProductsAPI(searchQuery, status, sellerId, pageNum, pageSize)
          .then((res) => {
            const result = res as apiListResult<IProduct>
            resolve(result)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  return {
    getProducts
  }
}
