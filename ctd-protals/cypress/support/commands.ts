/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      getActivationToken(baseUrl: string, email: string): Chainable<void>
      getVerificationCode(baseUrl: string, email: string): Chainable<void>
    }
  }
}

/**
 * 获取激活 Token
 * @param baseUrl 服务器 URL
 * @param email 用户邮箱
 */
Cypress.Commands.add('getActivationToken', (baseUrl: string, email: string) => {
  cy.request('GET', `${baseUrl}/register/test/getToken?email=${email}`).then(
    response => {
      expect(response.status).to.eq(200)
      const token = response.body
      cy.wrap(token).as('activationToken')
    },
  )
})

/**
 * 获取验证码
 * @param baseUrl 服务器 URL
 * @param email 用户邮箱
 */
Cypress.Commands.add(
  'getVerificationCode',
  (baseUrl: string, email: string) => {
    cy.request('GET', `${baseUrl}/register/test/getCode?email=${email}`).then(
      response => {
        expect(response.status).to.eq(200)
        const verificationCode = response.body
        cy.wrap(verificationCode).as('verificationCode')
      },
    )
  },
)

export {}
