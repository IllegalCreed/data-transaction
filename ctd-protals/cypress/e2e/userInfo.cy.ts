import type { IIndividualUserData } from '../support/types'
import {
  activateUser,
  generateUniqueEmail,
  registerIndividualUser,
} from '../support/utils'

describe('修改个人信息', () => {
  let testUser: IIndividualUserData

  before(() => {
    if (testUser) return
    // 注册并激活账号
    testUser = {
      email: generateUniqueEmail('testuser'),
      password: 'Password@123!',
      name: 'test user',
      idNumber: '110101199001010000',
      phone: '18888888888',
      gender: 'male',
      birthday: '15',
      address: 'test address',
    }

    registerIndividualUser(testUser)
    activateUser(testUser.email)
  })
})
