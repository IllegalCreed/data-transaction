import { useTokenStore } from '../token'
import { useSettingsStore } from '../settings'
import {
  logout as logoutAPI,
  // resetPwd as resetPwdAPI,
  uploadAvatar as uploadAvatarAPI,
  getInfo as getInfoAPI,
  editInfo as editInfoAPI,
} from '@/apis/account'
import {
  individualUserInfo as mockIndividualUserInfo,
  enterpriseUserInfo as mockEnterpriseUserInfo,
} from '@/constants/mockData/account/account'
import type { UserInfo } from '@/types/account'
import { UserType, type IIndividualUserInfo } from '@/types/register'
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
          .catch((error: unknown) => {
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
              const result = (res as ICommonReturn<UserInfo>).data
              if (result.avatarUrl) {
                result.avatarUrl = `${import.meta.env.VITE_APP_BASE_API}/${result.avatarUrl}`
              }
              if (result.userType === UserType.Individual) {
                if (result.dateOfBirth) {
                  result.dateOfBirth = dayjs(result.dateOfBirth).format(
                    'YYYY-MM-DD',
                  )
                }
              }
              userinfo.value = result
            }
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const uploadAvatar = (file: File): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('账户')) {
        resolve()
      } else {
        uploadAvatarAPI(file)
          .then(() => {
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const editInfo = (userInfo: IIndividualUserInfo): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('账户')) {
        resolve()
      } else {
        editInfoAPI(userInfo)
          .then(() => {
            resolve()
          })
          .catch((error: unknown) => {
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
    editInfo,
  }
}
