import { defineStore } from 'pinia'
import type { IMenu } from '@/types/common'
import { mainMenus as mockMainMenus } from '@/constants/mockData/menu'

export const useMenuStore = defineStore('menu', () => {
  const mainMenus = ref<IMenu[]>()

  const getMainMenus = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      mainMenus.value = mockMainMenus
      resolve()
    })
  }

  return {
    mainMenus,
    getMainMenus
  }
})
