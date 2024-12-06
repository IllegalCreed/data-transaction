import { useSettingsStore } from '../settings'
import { useTokenStore } from '../token'
import { resetPwd as resetPwdAPI } from '@/apis/account'

export const useAccount = () => {
  const tokenStore = useTokenStore()
  const settingsStore = useSettingsStore()

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

  return {
    resetPwd
  }
}
