import { useSettingsStore } from '@/stores/modules/settings'
import type { ISeller } from '@/types/seller'
import { getSeller as getSellerAPI } from '@/apis/product/seller'
import { sellers as mockSellers } from '@/constants/mockData/product/seller'

export const useSeller = () => {
  const settingsStore = useSettingsStore()

  const getSeller = (id: string | number): Promise<ISeller> => {
    return new Promise<ISeller>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const seller = mockSellers.find((item) => item.id === Number(id))
          if (seller) {
            resolve(seller)
          } else {
            reject(new Error('Seller not found'))
          }
        }, 1000)
      } else {
        getSellerAPI(id)
          .then((res: unknown) => {
            const content = res as ISeller
            resolve(content)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    getSeller
  }
}
