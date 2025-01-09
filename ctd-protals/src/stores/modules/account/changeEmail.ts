import { useSettingsStore } from '../settings'
import {
  verifyRecoveryCode as verifyRecoveryCodeAPI,
  sendToNewEmail as sendToNewEmailAPI,
  changeEmail as changeEmailAPI,
} from '@/apis/account'
import type { ICommonReturn } from '@/axios/type'

export const useChangeEmail = () => {
  const { findMockTreeValueByKey } = useSettingsStore()

  const token = ref<string>('')
  const email = ref<string>('')

  const verifyRecoveryCode = (
    currentPassword: string,
    recoveryCode: string,
  ): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('修改邮箱')) {
        window.setTimeout(() => resolve(), 1000)
      } else {
        verifyRecoveryCodeAPI(currentPassword, recoveryCode)
          .then(res => {
            const resData = res as ICommonReturn<string>
            token.value = resData.data
            resolve()
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const sendToNewEmail = (newEmail: string): Promise<void> => {
    email.value = newEmail.trim()
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('修改邮箱')) {
        window.setTimeout(() => resolve(), 1000)
      } else {
        sendToNewEmailAPI(newEmail, token.value)
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const changeEmail = (code: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('修改邮箱')) {
        window.setTimeout(() => resolve(), 1000)
      } else {
        changeEmailAPI(email.value, code)
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  return {
    verifyRecoveryCode,
    sendToNewEmail,
    changeEmail,
    email,
  }
}
