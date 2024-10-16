import type { ISafe } from '@/types/safe'
import { safes as mockSafes } from '@/constants/mockData/product/safe'

export const useSafe = () => {
  const safes = ref<ISafe[]>([])

  const getSafes = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      safes.value = mockSafes
      resolve()
    })
  }

  return {
    safes,
    getSafes
  }
}
