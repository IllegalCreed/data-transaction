import { useSettingsStore } from '@/stores/modules/settings'
import type { IProduct } from '@/types/product'
import { getProducts as getProductsAPI } from '@/apis/product/product'
import { products as mockProducts } from '@/constants/mockData/product/product'

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

  return {
    products,
    getProducts
  }
}
