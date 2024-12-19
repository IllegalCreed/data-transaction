import { useSettingsStore } from '@/stores/modules/settings'
import type {
  IProduct,
  IProductDetail,
  IProductPriceQuery,
} from '@/types/product'
import { getRecommendProducts as getRecommendProductsAPI } from '@/apis/product/product'
import {
  getProducts as getProductsAPI,
  getProduct as getProductAPI,
  getPrice as getPriceAPI,
  getProductImages as getProductImagesAPI,
  getProductContent as getProductContentAPI,
} from '@/apis/product'
import {
  products as mockProducts,
  productDetails as mockProductDetails,
} from '@/constants/mockData/product/product'
import {
  productConvert,
  productsConvert,
  type IProductFetchData,
} from '@/apiConvert/product'
import type { ICommonReturn } from '@/axios/type'
import type { ISortValue } from '@/types/sorting'

export const useProduct = () => {
  const settingsStore = useSettingsStore()
  const { findMockTreeValueByKey } = settingsStore

  const products = ref<IProduct[]>([])

  const getProducts = (
    pageNum: number,
    pageSize: number,
    searchType: string,
    searchValue: string,
    filters: Record<string, string>,
    sorts: ISortValue,
  ): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      if (findMockTreeValueByKey('产品')) {
        window.setTimeout(() => {
          products.value = mockProducts
          resolve(1000)
        }, 1000)
      } else {
        getProductsAPI(
          pageNum,
          pageSize,
          searchType,
          searchValue,
          filters,
          sorts,
        )
          .then((res: unknown) => {
            if (import.meta.env.VITE_BACK_TYPE === 'java') {
              const resData = res as ICommonReturn<IProductFetchData>
              products.value = productsConvert(resData.rows)
              resolve(resData.total)
            } else {
              const resData = res as ICommonReturn<IProduct>
              products.value = resData.rows
              resolve(resData.total)
            }
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getProduct = (id: string | number): Promise<IProductDetail> => {
    return new Promise<IProductDetail>((resolve, reject) => {
      if (findMockTreeValueByKey('产品')) {
        window.setTimeout(() => {
          const productDetail = mockProductDetails.find(
            item => item.id === Number(id),
          )
          if (productDetail) {
            resolve(productDetail?.detailInfo)
          } else {
            reject(new Error('Product not found'))
          }
        }, 1000)
      } else {
        getProductAPI(id)
          .then((res: unknown) => {
            if (import.meta.env.VITE_BACK_TYPE === 'java') {
              const resData = res as ICommonReturn<IProductFetchData>
              resolve(productConvert(resData.data))
            } else {
              const result = res as IProductDetail
              resolve(result)
            }
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getPrice = (
    id: string | number,
    versionId: string | number,
    specs: IProductPriceQuery[],
  ): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      if (findMockTreeValueByKey('产品')) {
        window.setTimeout(() => {
          resolve(Math.floor(Math.random() * 2000))
        }, 1000)
      } else {
        getPriceAPI(id, versionId, specs)
          .then((res: unknown) => {
            if (import.meta.env.VITE_BACK_TYPE === 'java') {
              const resData = res as ICommonReturn<{ price: number }>
              resolve(resData.data.price)
            } else {
              const resData = res as ICommonReturn<{ price: number }>
              resolve(resData.data.price)
            }
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
            mockProducts.length >= 6
              ? mockProducts.slice(0, 6)
              : [...mockProducts]
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
      if (findMockTreeValueByKey('产品')) {
        window.setTimeout(() => {
          const productDetail = mockProductDetails.find(
            item => item.id === Number(id),
          )
          if (productDetail) {
            resolve(productDetail?.imageUrls)
          } else {
            reject(new Error('Product not found'))
          }
        }, 1000)
      } else {
        getProductImagesAPI(id)
          .then((res: unknown) => {
            if (import.meta.env.VITE_BACK_TYPE === 'java') {
              const resData = res as ICommonReturn<IProductFetchData>
              resolve(
                resData.data.proVersion.productImgs
                  .split(',')
                  .map(item => item.trim()),
              )
            } else {
              const images = res as string[]
              resolve(images)
            }
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getProductContent = (id: string | number): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      if (findMockTreeValueByKey('产品')) {
        window.setTimeout(() => {
          const productDetail = mockProductDetails.find(
            item => item.id === Number(id),
          )
          if (productDetail) {
            resolve(productDetail?.content)
          } else {
            reject(new Error('Product not found'))
          }
        }, 1000)
      } else {
        getProductContentAPI(id)
          .then((res: unknown) => {
            if (import.meta.env.VITE_BACK_TYPE === 'java') {
              const resData = res as ICommonReturn<IProductFetchData>
              resolve(resData.data.proVersion.prodContent)
            } else {
              const content = res as string
              resolve(content)
            }
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
    getProductContent,
  }
}
