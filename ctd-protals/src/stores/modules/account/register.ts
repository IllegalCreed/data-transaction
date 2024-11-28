import type { IRegisterAdCarouselItem } from '@/types/advertisement'
import { useSettingsStore } from '../settings'
import {
  register as registerAPI,
  activateAccount as activateAccountAPI,
  tokenExchangeEmail as tokenExchangeEmailAPI,
  reSendActivationEmail as reSendActivationEmailAPI,
} from '@/apis/account'
import { ads as mockAds } from '@/constants/mockData/account/register'
import {
  GenderType,
  IndustryType,
  UserType,
  type IBaseInfo,
  type IEnterpriseInfo,
  type IIndividualUserInfo,
  type RegistrationInfo,
} from '@/types/register'
import type { ICommonReturn } from '@/axios/type'

export const useRegister = () => {
  const { findMockTreeValueByKey } = useSettingsStore()

  const userType = ref<UserType>()

  const setUserType = (value: UserType) => {
    userType.value = value
  }

  const personalInfo = reactive<IIndividualUserInfo>({
    fullName: '',
    identificationNumber: '',
    phoneNumber: '',
    gender: GenderType.Male,
    dateOfBirth: '',
    residentialAddress: '',
  })

  const enterpriseInfo = reactive<IEnterpriseInfo>({
    enterpriseName: '',
    enterpriseDescription: '',
    registrationNumber: '',
    contactPersonName: '',
    contactPersonTitle: '',
    contactPhoneNumber: '',
    enterpriseAddress: '',
    industryType: IndustryType.Other,
    companySize: undefined,
  })

  const baseInfo = reactive<IBaseInfo>({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const registerInfo = computed((): RegistrationInfo => {
    if (userType.value === UserType.Enterprise) {
      return {
        ...baseInfo,
        ...enterpriseInfo,
        userType: UserType.Enterprise,
      }
    } else {
      return {
        ...baseInfo,
        ...personalInfo,
        userType: UserType.Individual,
      }
    }
  })

  const register = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('注册')) {
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

  const activateAccount = (token: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('注册')) {
        window.setTimeout(() => resolve(), 1000)
      } else {
        activateAccountAPI(token)
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
      if (findMockTreeValueByKey('注册')) {
        window.setTimeout(() => resolve('test@test.com'), 1000)
      } else {
        if (tokenExchangeEmailAPI) {
          tokenExchangeEmailAPI(token)
            .then((res: unknown) => {
              const resData = res as ICommonReturn<string>
              resolve(resData.data)
            })
            .catch(error => {
              reject(error)
            })
            .finally(() => {})
        } else {
          reject('tokenExchangeEmailAPI is not defined')
        }
      }
    })
  }

  const reSendActivationEmail = (email: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (findMockTreeValueByKey('注册')) {
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

  const getAds = (): Promise<IRegisterAdCarouselItem[]> => {
    return new Promise<IRegisterAdCarouselItem[]>(resolve => {
      resolve(mockAds)
    })
  }

  return {
    register,
    activateAccount,
    tokenExchangeEmail,
    reSendActivationEmail,
    getAds,
    userType,
    setUserType,
    personalInfo,
    enterpriseInfo,
    baseInfo,
  }
}
