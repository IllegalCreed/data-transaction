import { defineStore } from 'pinia'
import { useMenu } from './menu'

export const useMenuStore = defineStore('menu', () => {
  const { mainMenus, getMainMenus, mineMenus, getMineMenus } = useMenu()

  return {
    mainMenus,
    getMainMenus,
    mineMenus,
    getMineMenus
  }
})
