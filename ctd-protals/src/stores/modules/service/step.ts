import type { IStep } from '@/types/service'
import { steps as mockSteps } from '@/constants/mockData/service/step'

export const useSteps = () => {
  const steps = ref<IStep[]>()

  const getSteps = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      steps.value = mockSteps
      resolve()
    })
  }

  return {
    steps,
    getSteps
  }
}
