export interface IPersonalInfo {
  name: string
  idNumber: string
  phone: string
  gender: string
  birthDate: string
  address: string
}

export interface IEnterpriseInfo {
  companyName: string
  companyDescription: string
  companyCode: string
  contactName: string
  contactPosition: string
  contactPhone: string
  companyAddress: string
  industryCategory: string
  companySize: string
}

export interface IBaseInfo {
  email: string
  password: string
  confirmPassword: string
}
