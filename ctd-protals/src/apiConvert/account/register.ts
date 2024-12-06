import { GenderType, UserType, type RegistrationInfo } from '@/types/register'

export const registInfoConverter = (info: RegistrationInfo) => {
  if (info.userType === UserType.Individual) {
    return {
      userType: '00',
      email: info.email,
      password: info.password,
      nickName: info.individualInfo.fullName,
      idCard: info.individualInfo.identificationNumber,
      phonenumber: info.individualInfo.phoneNumber,
      address: info.individualInfo.residentialAddress,
      birthday: info.individualInfo.dateOfBirth,
      sex: info.individualInfo.gender === GenderType.Male ? '0' : '1',
    }
  } else if (info.userType === UserType.Enterprise) {
    return {
      userType: '11',
      email: info.email,
      password: info.password,
      address: info.enterpriseInfo.enterpriseAddress,
      nickName: info.enterpriseInfo.enterpriseName,
      sysEnterprise: {
        code: info.enterpriseInfo.registrationNumber,
        entRemark: info.enterpriseInfo.enterpriseDescription,
        entScale: info.enterpriseInfo.companySize,
        contactsName: info.enterpriseInfo.contactPersonName,
        contactsPhone: info.enterpriseInfo.contactPhoneNumber,
        contactsPosition: info.enterpriseInfo.contactPersonTitle,
        industryCategory: info.enterpriseInfo.industryType,
      },
    }
  }
}
