import { useTokenStore } from '../token'
import { useSettingsStore } from '../settings'
import {
  logout as logoutAPI,
  // resetPwd as resetPwdAPI,
  uploadAvatar as uploadAvatarAPI,
  getInfo as getInfoAPI,
} from '@/apis/account'
import {
  individualUserInfo as mockIndividualUserInfo,
  enterpriseUserInfo as mockEnterpriseUserInfo,
} from '@/constants/mockData/account/account'
import type { UserInfo } from '@/types/account'
import { UserType } from '@/types/register'
import type { ICommonReturn } from '@/axios/type'
import { userInfoConverter } from '@/apiConvert/account/userInfo'

export const useAccount = () => {
  const tokenStore = useTokenStore()
  const settingsStore = useSettingsStore()
  const { findMockTreeValueByKey } = settingsStore

  const logout = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('账户')) {
        tokenStore.clearToken()
        resolve()
      } else {
        if (import.meta.env.VITE_BACK_TYPE === 'java' && logoutAPI) {
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
        } else {
          tokenStore.clearToken()
          resolve()
        }
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
      if (findMockTreeValueByKey('账户')) {
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
            if (import.meta.env.VITE_BACK_TYPE === 'java') {
              userinfo.value = userInfoConverter(res)
            } else {
              userinfo.value = (res as ICommonReturn<UserInfo>).data
            }
            resolve()
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const uploadAvatar = (file: File): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        resolve()
      } else {
        uploadAvatarAPI(file)
          .then(() => {
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
    uploadAvatar,
  }
}
