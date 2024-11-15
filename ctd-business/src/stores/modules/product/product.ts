import { useSettingsStore } from '../settings'
import type { apiListResult } from '@/types/common'
import type {
  IProductDetail,
  IProductItem,
  IProductSpecsPriceDefinition,
  IProductVersion
} from '@/types/product'
import {
  getProducts as getProductsAPI,
  getProduct as getProductAPI,
  delProducts as delProductsAPI,
  getVersion as getVersionAPI,
  getPriceDefinition as getPriceDefinitionAPI
} from '@/apis/product'
import {
  products as mockProducts,
  versions as mockVersions,
  prices as mockPrices
} from '@/constants/mockData/product/product'

export const useProduct = () => {
  const settingsStore = useSettingsStore()

  const getProducts = (
    searchQuery: string,
    status: string,
    pageNum: number,
    pageSize: number
  ): Promise<apiListResult<IProductItem>> => {
    return new Promise<apiListResult<IProductItem>>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockProducts.filter((item) => {
            const statusMatch = status ? item.status === status : true
            const searchMatch = searchQuery ? item.name.includes(searchQuery) : true

            return statusMatch && searchMatch
          })
          resolve({ total: result.length, rows: result })
        }, 1000)
      } else {
        getProductsAPI(searchQuery, status, pageNum, pageSize)
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

  const getProduct = (id: string | number): Promise<IProductDetail> => {
    return new Promise<IProductDetail>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockProducts.find((item) => item.id === Number(id))
          if (result) {
            resolve(result)
          } else {
            reject(new Error('Product not found'))
          }
        }, 1000)
      } else {
        getProductAPI(id)
          .then((res) => {
            const result = res as IProductDetail
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

  const getVersion = (
    productId: string | number,
    version: string | number
  ): Promise<IProductVersion> => {
    return new Promise<IProductVersion>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockVersions.find((item) => item.version === Number(version))
          if (result) {
            resolve(result)
          } else {
            reject(new Error('Product version not found'))
          }
        }, 1000)
      } else {
        getVersionAPI(productId, version)
          .then((res) => {
            const result = res as IProductVersion
            resolve(result)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const getPriceDefinition = (
    productId: string | number,
    version: string | number
  ): Promise<IProductSpecsPriceDefinition> => {
    return new Promise<IProductSpecsPriceDefinition>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const result = mockPrices.find((item) => item.version === Number(version))
          if (result) {
            resolve(result.prices)
          } else {
            reject(new Error('Product version not found'))
          }
        }, 1000)
      } else {
        getPriceDefinitionAPI(productId, version)
          .then((res) => {
            const result = res as IProductSpecsPriceDefinition
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
    getProducts,
    getProduct,
    delProducts,
    getVersion,
    getPriceDefinition
  }
}
