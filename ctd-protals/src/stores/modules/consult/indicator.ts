import type { IIndicator } from '@/types/consult'
import { indicators as mockIndicators } from '@/constants/mockData/consult/indicator'

export const useIndicators = () => {
  const indicators = ref<IIndicator[]>()

  const getIndicators = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      indicators.value = mockIndicators
      resolve()
    })
  }

  return {
    indicators,
    getIndicators
  }
}
