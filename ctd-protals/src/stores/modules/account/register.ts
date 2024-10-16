import type { IRegisterAdCarouselItem } from '@/types/advertisement'
import { useSettingsStore } from '../settings'
import { getAdsAPI } from '@/apis/account/register'
import { ads as mockAds } from '@/constants/mockData/account/register'

export const useRegister = () => {
  const settingsStore = useSettingsStore()

  const getAds = (): Promise<IRegisterAdCarouselItem[]> => {
    return new Promise<IRegisterAdCarouselItem[]>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => resolve(mockAds), 1000)
      } else {
        getAdsAPI()
          .then((res) => {
            resolve(res as IRegisterAdCarouselItem[])
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {})
      }
    })
  }

  const userIdentity = ref<string>('')

  const setUserIdentity = (identity: string) => {
    userIdentity.value = identity
  }

  const personalInfo = reactive({
    name: '',
    idNumber: '',
    phone: '',
    gender: '',
    birthDate: '',
    address: ''
  })

  const enterpriseInfo = reactive({
    companyName: '',
    companyDescription: '',
    companyCode: '',
    contactName: '',
    contactPosition: '',
    contactPhone: '',
    companyAddress: '',
    industryCategory: '',
    companySize: ''
  })

  const baseInfo = reactive({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const reSendEmail = (email: string) => {
    console.log('重新发送邮件', email)
  }

  return {
    getAds,

    userIdentity,
    setUserIdentity,
    personalInfo,
    enterpriseInfo,
    baseInfo,
    reSendEmail
  }
}
