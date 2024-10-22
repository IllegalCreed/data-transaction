import type { IRegisterAdCarouselItem } from '@/types/advertisement'
import { useSettingsStore } from '../settings'
import { registerAPI } from '@/apis/account/register'
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
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const reSendEmail = (email: string) => {
    console.log('重新发送邮件', email)
  }

  return {
    register,
    getAds,
    userIdentity,
    setUserIdentity,
    personalInfo,
    enterpriseInfo,
    baseInfo,
    reSendEmail,
  }
}
