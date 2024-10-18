import {
  mainMenus as mockMainMenus,
  mineMenus as mockMineMenus,
  systemSettingMenus as mockSystemSettingMenus,
  logoutMenu as mockLogoutMenu,
} from '@/constants/mockData/menu/menu'
import type { IMenu } from '@/types/master'

export const useMenu = () => {
  const mainMenus = ref<IMenu[]>()

  const getMainMenus = (): Promise<void> => {
    return new Promise<void>(resolve => {
      mainMenus.value = mockMainMenus
      resolve()
    })
  }

  const mineMenus = ref<IMenu[]>()

  const getMineMenus = (): Promise<void> => {
    return new Promise<void>(resolve => {
      mineMenus.value = mockMineMenus
      resolve()
    })
  }

  const systemSettingMenus = ref<IMenu[]>()

  const getSystemSettingMenus = (): Promise<void> => {
    return new Promise<void>(resolve => {
      systemSettingMenus.value = mockSystemSettingMenus
      resolve()
    })
  }

  const logoutMenu = ref<IMenu>({
    label: '',
    icon: '',
    path: '',
  })

  const getLogoutMenu = (): Promise<void> => {
    return new Promise<void>(resolve => {
      logoutMenu.value = mockLogoutMenu
      resolve()
    })
  }

  return {
    mainMenus,
    getMainMenus,
    mineMenus,
    getMineMenus,
    systemSettingMenus,
    getSystemSettingMenus,
    logoutMenu,
    getLogoutMenu,
  }
}
