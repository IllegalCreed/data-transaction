import { useSettingsStore } from '@/stores/modules/settings'
import type { IProduct, IProductBaseInfo } from '@/types/product'
import {
  getProducts as getProductsAPI,
  getProduct as getProductAPI,
  getPrice as getPriceAPI,
  getRecommendProducts as getRecommendProductsAPI,
  getProductImages as getProductImagesAPI
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

  const getRecommendProducts = (id: string | number): Promise<IProduct[]> => {
    return new Promise<IProduct[]>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const recommendProducts =
            mockProducts.length >= 6 ? mockProducts.slice(0, 6) : [...mockProducts]
          if (recommendProducts) {
            resolve(recommendProducts)
          } else {
            reject(new Error('Products not found'))
          }
        }, 1000)
      } else {
        getRecommendProductsAPI(id)
          .then((res: unknown) => {
            const recommendProducts = res as IProduct[]
            resolve(recommendProducts)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getProductImages = (id: string | number): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const productDetail = mockProductDetails.find((item) => item.id === Number(id))
          if (productDetail) {
            resolve(productDetail?.imageUrls)
          } else {
            reject(new Error('Product not found'))
          }
        }, 1000)
      } else {
        getProductImagesAPI(id)
          .then((res: unknown) => {
            const images = res as string[]
            resolve(images)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getProductContent = (id: string | number): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const productDetail = mockProductDetails.find((item) => item.id === Number(id))
          if (productDetail) {
            resolve(productDetail?.content)
          } else {
            reject(new Error('Product not found'))
          }
        }, 1000)
      } else {
        getProductImagesAPI(id)
          .then((res: unknown) => {
            const content = res as string
            resolve(content)
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
    getPrice,
    getRecommendProducts,
    getProductImages,
    getProductContent
  }
}
