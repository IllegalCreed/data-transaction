import {
  mainMenus as mockMainMenus,
  mineMenus as mockMineMenus
} from '@/constants/mockData/menu/menu'
import type { IMenu } from '@/types/master'

export const useMenu = () => {
  const mainMenus = ref<IMenu[]>()

  const getMainMenus = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      mainMenus.value = mockMainMenus
      resolve()
    })
  }

  const mineMenus = ref<IMenu[]>()

  const getMineMenus = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      mineMenus.value = mockMineMenus
      resolve()
    })
  }

  return {
    mainMenus,
    getMainMenus,
    mineMenus,
    getMineMenus
  }
}
