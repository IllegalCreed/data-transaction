import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  const { mainMenus, getMainMenus, mineMenus, getMineMenus } = useMenu()

  return {
    mainMenus,
    getMainMenus,
    mineMenus,
    getMineMenus
  }
})
