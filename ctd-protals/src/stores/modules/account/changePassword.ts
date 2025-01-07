import { useSettingsStore } from '../settings'
import {
  sendVerificationCodeAuth as sendVerificationCodeAuthAPI,
  verifyCodeAuth as verifyCodeAuthAPI,
  verifyPassword as verifyPasswordAPI,
  changePassword as changePasswordAPI,
} from '@/apis/account'
import type { ICommonReturn } from '@/axios/type'
import { VerificationCodes } from '@/constants/mapData/mail'

export const useChangePassword = () => {
  const { findMockTreeValueByKey } = useSettingsStore()

  const token = ref<string>('')

  const sendEmail = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('修改密码')) {
        window.setTimeout(() => resolve(), 1000)
      } else {
        sendVerificationCodeAuthAPI(VerificationCodes.ChangePWD)
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

  const verifyCode = (code: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('修改密码')) {
        window.setTimeout(() => resolve(), 1000)
      } else {
        verifyCodeAuthAPI(code, VerificationCodes.ChangePWD)
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

  const verifyPassword = (currentPassword: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('修改密码')) {
        window.setTimeout(() => resolve(), 1000)
      } else {
        verifyPasswordAPI(currentPassword, token.value)
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

  const changePassword = (currentPassword: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('修改密码')) {
        window.setTimeout(() => resolve(), 1000)
      } else {
        changePasswordAPI(currentPassword, token.value)
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
    sendEmail,
    verifyCode,
    verifyPassword,
    changePassword,
  }
}
