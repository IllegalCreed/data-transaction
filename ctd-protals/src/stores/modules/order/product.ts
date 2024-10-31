import { useSettingsStore } from '@/stores/modules/settings'
import {
  orderProducts as mockOrderProducts,
  orderProductDetails as mockOrderProductDetails,
} from '@/constants/mockData/order/product'
import {
  getProductOrders as getProductOrdersAPI,
  getProductOrderDetail as getProductOrderDetailAPI,
} from '@/apis/order/product'
import type { IOrderProduct, IOrderProductDetail } from '@/types/productOrder'

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

  return {
    productOrders,
    getProductOrders,
    getProductOrderDetail,
  }
}
