export interface IIndividualUserData {
  email: string
  password: string
  name: string
  idNumber: string
  phone: string
  gender: 'male' | 'female'
  birthday: string
  address: string
}

export interface ICorporateUserData {
  email: string
  password: string
  companyName: string
  companyCode: string
  contactName: string
  contactPosition: string
  contactPhone: string
  companyAddress: string
  industryCategory: string
  companySize: string
  companyDescription: string
}
