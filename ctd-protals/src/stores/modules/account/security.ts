import { useSettingsStore } from '../settings'
import type { ISecurityInfo } from '@/types/account'
import { securityInfo as mockSecurityInfo } from '@/constants/mockData/account/account'
import { getSecurityInfo as getSecurityInfoAPI } from '@/apis/account/account'

export const useSecurity = () => {
  const settingsStore = useSettingsStore()

  const securityInfo = ref<ISecurityInfo>({
    lastLoginDate: '--',
    lastLoginDevice: '--',
    lastLoginLocation: '--',
  })

  const getSecurityInfo = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          securityInfo.value = mockSecurityInfo
          resolve()
        }, 1000)
      } else {
        getSecurityInfoAPI()
          .then(() => {
            resolve()
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  return {
    securityInfo,
    getSecurityInfo,
  }
}
