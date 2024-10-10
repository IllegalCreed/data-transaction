import { useSettingsStore } from '@/stores/modules/settings'
import type { IProduct, IProductBaseInfo } from '@/types/product'
import {
  getProducts as getProductsAPI,
  getProduct as getProductAPI,
  getPrice as getPriceAPI
} from '@/apis/product/product'
import {
  products as mockProducts,
  productDetails as mockProductDetails
} from '@/constants/mockData/product/product'

export const useProduct = () => {
  const settingsStore = useSettingsStore()

  const products = ref<IProduct[]>([])

  const getProducts = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          products.value = mockProducts
          resolve()
        }, 1000)
      } else {
        getProductsAPI()
          .then((res: unknown) => {
            products.value = res as IProduct[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getProduct = (id: string | number): Promise<IProductBaseInfo> => {
    return new Promise<IProductBaseInfo>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const productDetail = mockProductDetails.find((item) => item.id === Number(id))
          if (productDetail) {
            resolve(productDetail?.baseInfo)
          } else {
            reject(new Error('Product not found'))
          }
        }, 1000)
      } else {
        getProductAPI(id)
          .then((res: unknown) => {
            const product = res as IProductBaseInfo
            resolve(product)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getPrice = (specs: Record<string, string>): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          resolve(Math.floor(Math.random() * 2000))
        }, 1000)
      } else {
        getPriceAPI(specs)
          .then((res: unknown) => {
            const price = res as number
            resolve(price)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    products,
    getProducts,
    getProduct,
    getPrice
  }
}
