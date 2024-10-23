import type { IRegisterAdCarouselItem } from '@/types/advertisement'
import { useSettingsStore } from '../settings'
import {
  registerAPI,
  activationAccountAPI,
  tokenExchangeEmailAPI,
  reSendActivationEmailAPI,
} from '@/apis/account/register'
import { ads as mockAds } from '@/constants/mockData/account/register'
import type {
  IBaseInfo,
  IEnterpriseInfo,
  IPersonalInfo,
  RegistInfoType,
  RegistRoleType,
} from '@/types/register'

export const useRegister = () => {
  const settingsStore = useSettingsStore()

  const getAds = (): Promise<IRegisterAdCarouselItem[]> => {
    return new Promise<IRegisterAdCarouselItem[]>(resolve => {
      resolve(mockAds)
    })
  }

  const userIdentity = ref<RegistRoleType>()

  const setUserIdentity = (identity: RegistRoleType) => {
    userIdentity.value = identity
  }

  const personalInfo = reactive<IPersonalInfo>({
    name: '',
    idNumber: '',
    phone: '',
    gender: '',
    birthDate: '',
    address: '',
  })

  const enterpriseInfo = reactive<IEnterpriseInfo>({
    companyName: '',
    companyDescription: '',
    companyCode: '',
    contactName: '',
    contactPosition: '',
    contactPhone: '',
    companyAddress: '',
    industryCategory: '',
    companySize: '',
  })

  const baseInfo = reactive<IBaseInfo>({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const registerInfo = computed((): RegistInfoType => {
    if (userIdentity.value === 'enterprise') {
      return {
        ...baseInfo,
        ...enterpriseInfo,
        userIdentity: 'enterprise',
      }
    } else {
      return {
        ...baseInfo,
        ...personalInfo,
        userIdentity: 'personal',
      }
    }
  })

  const register = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        console.log(registerInfo.value)
        window.setTimeout(() => resolve(), 1000)
      } else {
        registerAPI(registerInfo.value)
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

  const activationAccount = (token: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => resolve(), 1000)
      } else {
        activationAccountAPI(token)
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

  const tokenExchangeEmail = (token: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => resolve('test@test.com'), 1000)
      } else {
        tokenExchangeEmailAPI(token)
          .then((res: any) => {
            console.log(res)
            resolve(res.data.email)
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const reSendActivationEmail = (email: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => resolve(), 1000)
      } else {
        reSendActivationEmailAPI(email)
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
    register,
    activationAccount,
    tokenExchangeEmail,
    reSendActivationEmail,
    getAds,
    userIdentity,
    setUserIdentity,
    personalInfo,
    enterpriseInfo,
    baseInfo,
  }
}
