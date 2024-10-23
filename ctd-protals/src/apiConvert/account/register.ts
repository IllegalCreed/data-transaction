import type { RegistInfoType } from '@/types/register'

export const registInfoConverter = (info: RegistInfoType) => {
  if (info.userIdentity === 'personal') {
    return {
      userType: '00',
      email: info.email,
      password: info.password,
      nickName: info.name,
      idCard: info.idNumber,
      phonenumber: info.phone,
      username: info.email,
      address: info.address,
      birthday: info.birthDate,
      sex: info.gender === 'male' ? '0' : '1',
    }
  } else if (info.userIdentity === 'enterprise') {
    return {
      userType: '11',
      email: info.email,
      username: info.email,
      password: info.password,
      address: info.companyAddress,
      nickName: info.companyName,
      sysEnterprise: {
        code: info.companyCode,
        entRemark: info.companyDescription,
        entScale: info.companySize,
        contactsName: info.contactName,
        contactsPhone: info.contactPhone,
        contactsPosition: info.contactPosition,
        industryCategory: info.industryCategory,
      },
    }
  }
}
