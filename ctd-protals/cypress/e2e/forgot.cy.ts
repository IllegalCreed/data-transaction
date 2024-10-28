import type { IIndividualUserData } from '../support/types'
import { generateUniqueEmail } from '../support/utils'

describe('Forgot Password Flow', () => {
  let registeredUser: IIndividualUserData

  before(() => {
    // 注册并激活账号
    registeredUser = {
      email: generateUniqueEmail('testuser'),
      password: 'Password@123!',
      name: 'test user',
      idNumber: '110101199001010000',
      phone: '18888888888',
      gender: 'male',
      birthday: '15',
      address: 'test address',
    }

    cy.registerIndividualUser(registeredUser)

    cy.getActivationToken(Cypress.env('serverUrl'), registeredUser.email)

    cy.get('@activationToken').then(token => {
      cy.visit(`/register?token=${token}`)
      cy.contains('账号激活成功').should('be.visible')
    })
  })

  it('should successfully reset password', () => {
    cy.visit('/forgot')

    // 输入邮箱地址
    cy.get('[data-testid="email-input"]').type(registeredUser.email)
    cy.get('[data-testid="next-button"]').click()

    cy.contains('验证邮箱').should('be.visible')

    // 调用后门接口获取验证码
    cy.getVerificationCode(Cypress.env('serverUrl'), registeredUser.email)
    cy.get<string>('@verificationCode').then(verificationCode => {
      // 逐个输入验证码到各个输入框
      verificationCode.split('').forEach((char: string, index: number) => {
        cy.get(`[data-testid="verification-input-${index}"]`).type(char)
      })

      cy.get('[data-testid="next-button"]').click()

      cy.contains('设置新密码').should('be.visible')

      // 输入新密码
      cy.get('[data-testid="new-password-input"]').type('NewPassword@123!')
      cy.get('[data-testid="confirm-password-input"]').type('NewPassword@123!')
      cy.get('[data-testid="next-button"]').click()

      // 验证修改成功
      cy.contains('您的密码已经重置完成').should('be.visible')
    })
  })
})
