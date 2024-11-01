import { GenderType, UserType, type RegistrationInfo } from '@/types/register'

export const registInfoConverter = (info: RegistrationInfo) => {
  if (info.userType === UserType.Individual) {
    return {
      userType: '00',
      email: info.email,
      password: info.password,
      nickName: info.fullName,
      idCard: info.identificationNumber,
      phonenumber: info.phoneNumber,
      username: info.email,
      address: info.residentialAddress,
      birthday: info.dateOfBirth,
      sex: info.gender === GenderType.Male ? '0' : '1',
    }
  } else if (info.userType === UserType.Enterprise) {
    return {
      userType: '11',
      email: info.email,
      username: info.email,
      password: info.password,
      address: info.enterpriseAddress,
      nickName: info.enterpriseName,
      sysEnterprise: {
        code: info.registrationNumber,
        entRemark: info.enterpriseDescription,
        entScale: info.companySize,
        contactsName: info.contactPersonName,
        contactsPhone: info.contactPhoneNumber,
        contactsPosition: info.contactPersonTitle,
        industryCategory: info.industryType,
      },
    }
  }
}
