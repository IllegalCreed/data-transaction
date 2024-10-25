import type { RegistInfoType } from '@/types/register'

export const registInfoConverter = (info: RegistInfoType) => {
  if (info.userIdentity === 'personal') {
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
      sex: info.gender === 'male' ? '0' : '1',
    }
  } else if (info.userIdentity === 'enterprise') {
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
        entScale: info.numberOfEmployees,
        contactsName: info.contactPersonName,
        contactsPhone: info.contactPhoneNumber,
        contactsPosition: info.contactPersonTitle,
        industryCategory: info.industryType,
      },
    }
  }
}
