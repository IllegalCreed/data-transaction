import { useTokenStore } from '../token'
import { useSettingsStore } from '../settings'
import {
  logout as logoutAPI,
  resetPwd as resetPwdAPI,
  getInfo as getInfoAPI,
} from '@/apis/account/account'
import {
  individualUserInfo as mockIndividualUserInfo,
  enterpriseUserInfo as mockEnterpriseUserInfo,
} from '@/constants/mockData/account/account'
import type { UserInfo } from '@/types/account'
import { UserType } from '@/types/register'

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

  const mockInfoType = ref<UserType>(UserType.Individual)

  const setMockInfoType = (type: UserType) => {
    mockInfoType.value = type
  }

  const userinfo = ref<UserInfo>()
  const getUserInfo = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          if (mockInfoType.value === UserType.Individual) {
            userinfo.value = mockIndividualUserInfo
          } else {
            userinfo.value = mockEnterpriseUserInfo
          }
          resolve()
        }, 1000)
      } else {
        getInfoAPI()
          .then(res => {
            userinfo.value = res as UserInfo
            resolve()
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  return {
    logout,
    resetPwd,
    userinfo,
    getUserInfo,
    mockInfoType,
    setMockInfoType,
  }
}
