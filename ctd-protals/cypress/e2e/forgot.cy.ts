import type { IIndividualUserData } from '../support/types'
import {
  activateUser,
  generateUniqueEmail,
  registerIndividualUser,
} from '../support/utils'

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

    registerIndividualUser(registeredUser)

    activateUser(registeredUser.email)
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
      enterVerificationCode(verificationCode)
      resetPassword('NewPassword@123!')
    })
  })

  it('should handle resend verification code when email not received', () => {
    cy.visit('/forgot')

    // 输入邮箱地址
    cy.get('[data-testid="email-input"]').type(registeredUser.email)
    cy.get('[data-testid="next-button"]').click()

    cy.contains('验证邮箱').should('be.visible')

    cy.get('[data-testid="resend-email-button"]').click()

    cy.contains('邮件发送成功').should('be.visible')

    // 调用后门接口获取验证码
    cy.getVerificationCode(Cypress.env('serverUrl'), registeredUser.email)
    cy.get<string>('@verificationCode').then(verificationCode => {
      enterVerificationCode(verificationCode)
      resetPassword('NewPassword@123!')
    })
  })

  function enterVerificationCode(verificationCode: string) {
    verificationCode.split('').forEach((char: string, index: number) => {
      cy.get(`[data-testid="verification-input-${index}"]`).type(char)
    })
    cy.get('[data-testid="next-button"]').click()
  }

  function resetPassword(newPassword: string) {
    cy.contains('设置新密码').should('be.visible')
    cy.get('[data-testid="new-password-input"]').type(newPassword)
    cy.get('[data-testid="confirm-password-input"]').type(newPassword)
    cy.get('[data-testid="next-button"]').click()
    cy.contains('您的密码已经重置完成').should('be.visible')
  }
})
