import type { UserInfo } from '@/types/account'
import {
  CompanySizeType,
  GenderType,
  IndustryType,
  UserType,
} from '@/types/register'

// java的返回值离谱，个人和企业的详细信息还差一个层级，nickname居然用来存公司名称，居然密码都给返回来了
//   {
//     "msg": "操作成功",
//     "code": 200,
//     "permissions": [],
//     "roles": [],
//     "user": {
//         "createBy": "",
//         "createTime": "2024-11-26 18:03:33",
//         "updateBy": null,
//         "updateTime": null,
//         "remark": null,
//         "params": {
//             "@type": "java.util.HashMap"
//         },
//         "userId": 232,
//         "deptId": null,
//         "userName": "51ccf39bfd45",
//         "nickName": "test user",
//         "userType": "00",
//         "email": "testusereoC2ETRQ@example.com",
//         "idCard": "110101199001010000",
//         "address": "test address",
//         "birthday": "2024-11-14",
//         "phonenumber": "18888888888",
//         "sex": "0",
//         "avatar": "",
//         "password": "$2a$10$d8TpAim3Tz/E/a3HpeUpX.IMXVMCWjvXj.EdOK4DnqUDjiGdzY9oq",
//         "status": "0",
//         "delFlag": "0",
//         "loginIp": "10.105.21.47",
//         "loginDate": "2024-12-10T11:56:34.000+08:00",
//         "sysEnterprise": null,
//         "dept": null,
//         "roles": [],
//         "roleIds": null,
//         "postIds": null,
//         "roleId": null,
//         "admin": false
//     }
// }
// {
//   "msg": "操作成功",
//   "code": 200,
//   "permissions": [],
//   "roles": [],
//   "user": {
//       "createBy": "",
//       "createTime": "2024-11-27 11:25:40",
//       "updateBy": null,
//       "updateTime": null,
//       "remark": null,
//       "params": {
//           "@type": "java.util.HashMap"
//       },
//       "userId": 246,
//       "deptId": null,
//       "userName": "01fa98d390b5",
//       "nickName": "test company",
//       "userType": "11",
//       "email": "testcompanykWvl5dCv@example.com",
//       "idCard": null,
//       "address": "test address",
//       "birthday": null,
//       "phonenumber": "",
//       "sex": "0",
//       "avatar": "",
//       "password": "$2a$10$TpHWif93CP86Xp3CWpu1CuI6eV8VWpyLnh2JWNSN0Q7Mql4NE2G4u",
//       "status": "0",
//       "delFlag": "0",
//       "loginIp": "",
//       "loginDate": null,
//       "sysEnterprise": {
//           "createBy": null,
//           "createTime": null,
//           "updateBy": null,
//           "updateTime": null,
//           "remark": null,
//           "params": {
//               "@type": "java.util.HashMap"
//           },
//           "id": 148,
//           "userId": 246,
//           "code": "111111111111111111",
//           "contactsName": "test user",
//           "contactsPosition": "test position",
//           "contactsPhone": "18888888888",
//           "industryCategory": "information_technology",
//           "entScale": "large",
//           "entRemark": "test description"
//       },
//       "dept": null,
//       "roles": [],
//       "roleIds": null,
//       "postIds": null,
//       "roleId": null,
//       "admin": false
//   }
// }
export const userInfoConverter = (info: unknown): UserInfo => {
  const javaRes = info as {
    user: {
      admin: boolean
      address: string // 企业地址
      avatar: string
      birthday: string
      createTime: string
      email: string
      idCard: string
      sex: string
      loginDate: string
      loginIp: string
      nickName: string // 企业名称
      phonenumber: string
      userType: string
      userName: string
      sysEnterprise: {
        code: string
        contactsName: string
        contactsPhone: string
        contactsPosition: string
        entRemark: string // 企业简介
        entScale: string // 企业规模
        industryCategory: string // 行业类别
      }
    }
  }

  if (javaRes.user.userType === '00') {
    return {
      userName: javaRes.user.userName,
      email: javaRes.user.email,
      avatarUrl: javaRes.user.avatar,
      userType: UserType.Individual,
      fullName: javaRes.user.nickName,
      identificationNumber: javaRes.user.idCard,
      phoneNumber: javaRes.user.phonenumber,
      gender:
        javaRes.user.sex === '0'
          ? GenderType.Male
          : javaRes.user.sex === '1'
            ? GenderType.Female
            : GenderType.Other,
      dateOfBirth: javaRes.user.birthday,
      residentialAddress: javaRes.user.address,
    }
  } else {
    return {
      userName: javaRes.user.userName,
      email: javaRes.user.email,
      avatarUrl: javaRes.user.avatar,
      userType: UserType.Enterprise,
      enterpriseName: javaRes.user.nickName,
      enterpriseDescription: javaRes.user.sysEnterprise.entRemark,
      registrationNumber: javaRes.user.sysEnterprise.code,
      contactPersonName: javaRes.user.sysEnterprise.contactsName,
      contactPersonTitle: javaRes.user.sysEnterprise.contactsPosition,
      contactPhoneNumber: javaRes.user.sysEnterprise.contactsPhone,
      enterpriseAddress: javaRes.user.address,
      industryType: javaRes.user.sysEnterprise.industryCategory as IndustryType,
      companySize: javaRes.user.sysEnterprise.entScale as CompanySizeType,
    }
  }
}
