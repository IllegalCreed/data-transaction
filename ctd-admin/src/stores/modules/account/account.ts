import type { ICommonReturn } from '@/types/common'
import { useSettingsStore } from '../settings'
import { useTokenStore } from '../token'
import { resetPwd as resetPwdAPI, getAdminName as getAdminNameAPI } from '@/apis/account'

export const useAccount = () => {
  const tokenStore = useTokenStore()
  const settingsStore = useSettingsStore()
  const { findMockTreeValueByKey } = settingsStore

  const resetPwd = (oldPwd: string, newPwd: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('admin')) {
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

  const getAdminName = (): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      if (findMockTreeValueByKey('admin')) {
        resolve('admin')
      } else {
        getAdminNameAPI()
          .then((res) => {
            const result = res as ICommonReturn<string>
            resolve(result.data)
          })
          .catch((error: Error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  return {
    resetPwd,
    getAdminName
  }
}
