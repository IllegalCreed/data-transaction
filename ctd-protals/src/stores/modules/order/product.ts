import { useSettingsStore } from '@/stores/modules/settings'
import {
  orderProducts as mockOrderProducts,
  orderProductDetails as mockOrderProductDetails,
} from '@/constants/mockData/order/product'
import {
  getProductOrders as getProductOrdersAPI,
  getProductOrderDetail as getProductOrderDetailAPI,
  getProductOrderContract as getProductOrderContractAPI,
  getProductOrderReview as getProductOrderReviewAPI,
} from '@/apis/order/product'
import type {
  IContract,
  IOrderProduct,
  IOrderProductDetail,
} from '@/types/productOrder'
import type { IReview } from '@/types/review'

export const useOrderProduct = () => {
  const settingsStore = useSettingsStore()

  const productOrders = ref<IOrderProduct[]>([])

  const getProductOrders = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          productOrders.value = mockOrderProducts
          resolve()
        }, 1000)
      } else {
        getProductOrdersAPI()
          .then((res: unknown) => {
            productOrders.value = res as IOrderProduct[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getProductOrderDetail = (
    id: string | number,
  ): Promise<IOrderProductDetail> => {
    return new Promise<IOrderProductDetail>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const productDetail = mockOrderProductDetails.find(
            item => item.id === Number(id),
          )
          if (productDetail) {
            resolve(productDetail?.detailInfo)
          } else {
            reject(new Error('Order not found'))
          }
        }, 1000)
      } else {
        getProductOrderDetailAPI(id)
          .then((res: unknown) => {
            const productOrderDetail = res as IOrderProductDetail
            resolve(productOrderDetail)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getProductOrderContract = (id: string | number): Promise<IContract> => {
    return new Promise<IContract>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const productDetail = mockOrderProductDetails.find(
            item => item.id === Number(id),
          )
          if (productDetail) {
            resolve(productDetail?.contract)
          } else {
            reject(new Error('Order not found'))
          }
        }, 1000)
      } else {
        getProductOrderContractAPI(id)
          .then((res: unknown) => {
            const productOrderContract = res as IContract
            resolve(productOrderContract)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getProductOrderReview = (id: string | number): Promise<IReview> => {
    return new Promise<IReview>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const productDetail = mockOrderProductDetails.find(
            item => item.id === Number(id),
          )
          if (productDetail) {
            resolve(productDetail?.review)
          } else {
            reject(new Error('Order not found'))
          }
        }, 1000)
      } else {
        getProductOrderReviewAPI(id)
          .then((res: unknown) => {
            const productOrderReview = res as IReview
            resolve(productOrderReview)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    productOrders,
    getProductOrders,
    getProductOrderDetail,
    getProductOrderContract,
    getProductOrderReview,
  }
}
