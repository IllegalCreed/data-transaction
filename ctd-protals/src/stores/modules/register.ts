import { defineStore } from 'pinia'

export const useRegisterStore = defineStore('register', () => {
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
    userIdentity,
    setUserIdentity,
    personalInfo,
    enterpriseInfo,
    baseInfo,
    reSendEmail
  }
})
