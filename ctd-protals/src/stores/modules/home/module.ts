import type { IModule } from '@/types/home'
import { moduleList as mockModules } from '@/constants/mockData/home/module'

export const useModules = () => {
  const modules = ref<IModule[]>()

  const getModules = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      modules.value = mockModules
      resolve()
    })
  }

  return {
    modules,
    getModules
  }
}
