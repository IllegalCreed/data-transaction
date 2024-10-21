import { useTokenStore } from '../token'
import { useSettingsStore } from '../settings'
import { logoutAPI, resetPwdAPI, getInfoAPI } from '@/apis/account/account'
import { userInfo as mockUserInfo } from '@/constants/mockData/account/account'
import type { IUserInfo } from '@/types/master'

export const useAccount = () => {
  const tokenStore = useTokenStore()
  const settingsStore = useSettingsStore()

  const logout = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        tokenStore.clearToken()
        resolve()
      } else {
        logoutAPI()
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {
            tokenStore.clearToken()
          })
      }
    })
  }

  const resetPwd = (oldPwd: string, newPwd: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        resolve()
        tokenStore.clearToken()
      } else {
        resetPwdAPI(oldPwd, newPwd)
          .then(() => {
            resolve()
            tokenStore.clearToken()
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const userinfo = ref<IUserInfo>()
  const getUserInfo = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        userinfo.value = mockUserInfo
        resolve()
      } else {
        getInfoAPI()
          .then(res => {
            userinfo.value = res as IUserInfo
            resolve()
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  return { logout, resetPwd, userinfo, getUserInfo }
}
