import type { ICorporateUserData, IIndividualUserData } from '../support/types'
import {
  activateUser,
  generateUniqueEmail,
  registerCorporateUser,
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

  it('个人用户登录并进入资料页，修改个人资料成功', () => {
    cy.login(testUser.email, testUser.password)
    cy.visit('/')
    cy.get('[data-testid="main-menu"]').click()
    cy.contains(testUser.name).should('be.visible')
    cy.contains('个人用户').should('be.visible')
    cy.get('[data-testid="menu-profile"]').should('be.visible').click()

    // 验证个人资料显示是否正确
    cy.get('[data-testid="email-span"]').should('have.text', testUser.email)
    cy.get('[data-testid="full-name-span"]').should('have.text', testUser.name)
    cy.get('[data-testid="identification-number-span"]').should(
      'have.text',
      testUser.idNumber,
    )
    cy.get('[data-testid="phone-number-span"]').should(
      'have.text',
      testUser.phone,
    )
    cy.get('[data-testid="gender-span"]').should(
      'have.text',
      GENDER_TYPE_MAP[testUser.gender],
    )
    cy.get('[data-testid="date-of-birth-span"]').should(
      'have.text',
      formatDate(),
    )
    cy.get('[data-testid="residential-address-span"]').should(
      'have.text',
      testUser.address,
    )

    // 点击修改按钮，进入修改页面
    cy.get('[data-testid="edit-button"]').click()
    cy.get('.edit-personal-dialog-container').should('be.visible')

    // 验证修改页面的初始值是否正确
    cy.get('[data-testid="full-name-input"]').should(
      'have.value',
      testUser.name,
    )
    cy.get('[data-testid="identification-number-input"]').should(
      'have.value',
      testUser.idNumber,
    )
    cy.get('[data-testid="phone-number-input"]').should(
      'have.value',
      testUser.phone,
    )
    cy.get('[data-testid="gender-select"]').should(
      'contain.text',
      GENDER_TYPE_MAP[testUser.gender],
    )
    cy.get('[data-testid="phone-number-input"]').should(
      'have.value',
      testUser.phone,
    )
    cy.get('#date-of-birth-picker').and('have.value', formatDate())
    cy.get('[data-testid="residential-address-input"]').should(
      'have.value',
      testUser.address,
    )
  })

  it('企业用户登录并进入资料页，无法修改资料', () => {
    const tempUser: ICorporateUserData = {
      email: generateUniqueEmail('testcompany'),
      password: 'Password@123!',
      companyName: 'test company',
      companyCode: '111111111111111111',
      contactName: 'test user',
      contactPosition: 'test position',
      contactPhone: '18888888888',
      companyAddress: 'test address',
      industryCategory: 'information_technology',
      companySize: 'large',
      companyDescription: 'test description',
    }

    registerCorporateUser(tempUser)
    activateUser(tempUser.email)

    cy.login(tempUser.email, tempUser.password)
    cy.visit('/')
    cy.get('[data-testid="main-menu"]').click()
    cy.contains(tempUser.companyName).should('be.visible')
    cy.contains('企业用户').should('be.visible')
    cy.get('[data-testid="menu-profile"]').should('be.visible').click()

    // 验证企业资料显示是否正确
    cy.get('[data-testid="email-span"]').should('have.text', tempUser.email)
    cy.get('[data-testid="enterprise-name-span"]').should(
      'have.text',
      tempUser.companyName,
    )
    cy.get('[data-testid="registration-number-span"]').should(
      'have.text',
      tempUser.companyCode,
    )
    cy.get('[data-testid="contact-person-name-span"]').should(
      'have.text',
      tempUser.contactName,
    )
    cy.get('[data-testid="contact-person-title-span"]').should(
      'have.text',
      tempUser.contactPosition,
    )
    cy.get('[data-testid="contact-phone-number-span"]').should(
      'have.text',
      tempUser.contactPhone,
    )
    cy.get('[data-testid="enterprise-address-span"]').should(
      'have.text',
      tempUser.companyAddress,
    )
    cy.get('[data-testid="industry-type-span"]').should(
      'have.text',
      INDUSTRY_TYPE_MAP[tempUser.industryCategory],
    )
    cy.get('[data-testid="company-size-span"]').should(
      'have.text',
      COMPANY_SIZE_TYPE_MAP[tempUser.companySize],
    )
    cy.get('[data-testid="enterprise-description-span"]').should(
      'have.text',
      tempUser.companyDescription,
    )

    // 点击修改按钮，进入修改页面
    cy.get('[data-testid="edit-button"]').click()
    cy.contains('企业用户请前往 企业管理端 进行编辑').should('be.visible')
  })

  it('不登录，进入首页，主菜单没有个人资料菜单', () => {
    cy.visit('/')
    cy.get('[data-testid="main-menu"]').click()
    cy.get('[data-testid="menu-profile"]').should('not.exist')
  })

  it.only('不登录，进入个人资料页，提示401', () => {
    cy.visit('/mine/profile')
    cy.contains('401').should('be.visible')
  })
})

const formatDate = () => {
  // 获取当前日期
  const now = new Date()

  // 提取当前年份和月份
  const year = now.getFullYear()
  const month = now.getMonth() // 注意：月份从0开始，0表示1月

  // 创建本月15号的日期对象
  const date = new Date(year, month, 15)

  // 提取年份、月份和日期
  const formattedYear = date.getFullYear()
  const formattedMonth = String(date.getMonth() + 1).padStart(2, '0') // 加1是因为月份从0开始
  const formattedDay = String(date.getDate()).padStart(2, '0')

  // 拼接为 YYYY-MM-DD 格式
  const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`

  return formattedDate
}

const GENDER_TYPE_MAP: Record<string, string> = {
  male: '男',
  female: '女',
  other: '其他',
}

const INDUSTRY_TYPE_MAP: Record<string, string> = {
  agriculture: '农、林、牧、渔业',
  mining: '采矿业',
  manufacturing: '制造业',
  utilities: '电力、热力、燃气及水生产和供应业',
  information_technology: '信息传输、软件和信息技术服务业',
}

const COMPANY_SIZE_TYPE_MAP: Record<string, string> = {
  micro: '微型企业（1-9人）',
  small: '小型企业（10-49人）',
  medium: '中型企业（50-249人）',
  large: '大型企业（250-999人）',
  extra_large: '超大型企业（1000人以上）',
}
