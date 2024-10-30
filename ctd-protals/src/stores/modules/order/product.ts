import { useSettingsStore } from '@/stores/modules/settings'
import { orderProducts as mockOrderProducts } from '@/constants/mockData/order/product'
import { getProductOrders as getProductOrdersAPI } from '@/apis/order/product'
import type { IOrderProduct } from '@/types/productOrder'

export const useOrderProduct = () => {
  const settingsStore = useSettingsStore()

  const productOrders = ref<IOrderProduct[]>()

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

  return {
    productOrders,
    getProductOrders,
  }
}
