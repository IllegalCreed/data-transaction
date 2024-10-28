import type { ICorporateUserData, IIndividualUserData } from './types'

/**
 * 生成一个包含大小写字母和8位随机数字的唯一邮箱地址
 * @param prefix 邮箱前缀，默认为 'testuser'
 * @returns 生成的唯一邮箱地址
 */
export const generateUniqueEmail = (prefix: string = 'testuser'): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const randomChars = Array.from(
    { length: 8 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join('')
  return `${prefix}${randomChars}@example.com`
}

/**
 * 注册个人用户
 * @param userData - 包含用户信息的对象
 * @param userData.email - 用户的电子邮件地址
 * @param userData.password - 用户的密码
 * @param userData.name - 用户的姓名
 * @param userData.idNumber - 用户的身份证号码
 * @param userData.phone - 用户的电话号码
 * @param userData.gender - 用户的性别
 * @param userData.birthday - 用户的生日
 * @param userData.address - 用户的地址
 * @param expectMessage - 期望看到的消息，默认为 '验证邮件已发送'
 * @returns 注册成功后，页面上应该显示 expectMessage 指定的消息
 */
export function registerIndividualUser(
  userData: IIndividualUserData,
  expectMessage: string = '验证邮件已发送',
) {
  cy.visit('/register')

  cy.get('[data-testid="individual-user-button"]').click()
  cy.get('[data-testid="next-button"]').click()
  cy.contains('请您填写基本信息').should('be.visible')

  // 填写表单
  cy.get('[data-testid="email-input"]').type(userData.email)
  cy.get('[data-testid="password-input"]').type(userData.password)
  cy.get('[data-testid="confirm-password-input"]').type(userData.password)

  cy.get('[data-testid="name-input"]').type(userData.name)
  cy.get('[data-testid="idNumber-input"]').type(userData.idNumber)
  cy.get('[data-testid="phone-input"]').type(userData.phone)
  cy.get('[data-testid="gender-select"]').click()
  cy.get(`[data-testid="gender-option-${userData.gender}"]`).click()

  cy.get('#birthday-picker').click()
  cy.get('.el-picker-panel__body .el-date-table td.available')
    .contains(userData.birthday)
    .click()

  cy.get('[data-testid="address-input"]').type(userData.address)

  cy.get('[data-testid="next-button"]').click()

  // 验证期望的消息
  cy.contains(expectMessage).should('be.visible')
}

/**
 * 注册企业用户
 * @param userData - 包含用户信息的对象
 * @param userData.email - 用户的电子邮件地址
 * @param userData.password - 用户的密码
 * @param userData.companyName - 企业名称
 * @param userData.companyCode - 企业代码
 * @param userData.contactName - 联系人姓名
 * @param userData.contactPosition - 联系人职位
 * @param userData.contactPhone - 联系人电话号码
 * @param userData.companyAddress - 企业地址
 * @param userData.industryCategory - 行业类别
 * @param userData.companySize - 公司规模
 * @param userData.companyDescription - 公司描述
 * @param expectMessage - 期望看到的消息，默认为 '验证邮件已发送'
 * @returns 注册成功后，页面上应该显示 expectMessage 指定的消息
 */
export function registerCorporateUser(
  userData: ICorporateUserData,
  expectMessage: string = '验证邮件已发送',
) {
  cy.visit('/register')

  cy.get('[data-testid="corporate-user-button"]').click()
  cy.get('[data-testid="next-button"]').click()
  cy.contains('请您填写基本信息').should('be.visible')

  // 填写表单
  cy.get('[data-testid="email-input"]').type(userData.email)
  cy.get('[data-testid="password-input"]').type(userData.password)
  cy.get('[data-testid="confirm-password-input"]').type(userData.password)

  cy.get('[data-testid="companyName-input"]').type(userData.companyName)
  cy.get('[data-testid="companyCode-input"]').type(userData.companyCode)
  cy.get('[data-testid="contactName-input"]').type(userData.contactName)
  cy.get('[data-testid="contactPosition-input"]').type(userData.contactPosition)
  cy.get('[data-testid="contactPhone-input"]').type(userData.contactPhone)
  cy.get('[data-testid="companyAddress-input"]').type(userData.companyAddress)

  cy.get('[data-testid="industryType-select"]').click()
  cy.get(
    `[data-testid="industryType-option-${userData.industryCategory}"]`,
  ).click()

  cy.get('[data-testid="companySize-select"]').click()
  cy.get(`[data-testid="companySize-option-${userData.companySize}"]`).click()

  cy.get('[data-testid="companyDescription-input"]').type(
    userData.companyDescription,
  )

  cy.get('[data-testid="next-button"]').click()

  // 验证期望的消息
  cy.contains(expectMessage).should('be.visible')
}

export function activateUser(email: string) {
  cy.getActivationToken(Cypress.env('serverUrl'), email)

  cy.get('@activationToken').then(token => {
    cy.visit(`/register?token=${token}`)
    cy.contains('账号激活成功').should('be.visible')
  })
}
