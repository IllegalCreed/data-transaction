/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      getActivationToken(baseUrl: string, email: string): Chainable<void>
      getVerificationCode(baseUrl: string, email: string): Chainable<void>
      login(email: string): Chainable<void>
    }
  }
}

/**
 * 获取激活 Token
 * @param baseUrl 服务器 URL
 * @param email 用户邮箱
 */
Cypress.Commands.add('getActivationToken', (baseUrl: string, email: string) => {
  if (Cypress.env('serverType') === 'java') {
    cy.request('GET', `${baseUrl}/register/test/getToken?email=${email}`).then(
      response => {
        expect(response.status).to.eq(200)
        const token = response.body
        cy.wrap(token).as('activationToken')
      },
    )
  } else {
    cy.request(
      'GET',
      `${baseUrl}/register/test/get-activation-token?email=${email}`,
    ).then(response => {
      expect(response.status).to.eq(200)
      const token = response.body.data
      cy.wrap(token).as('activationToken')
    })
  }
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

/**
 * 登录
 * @param email 用户名
 */
Cypress.Commands.add('login', email => {
  cy.session(
    [email],
    () => {
      cy.visit('/login')
      cy.get('[data-testid="email-input"]').type(email)
      cy.get('[data-testid="password-input"]').type('Password@123!')
      cy.get('[data-testid="login-button"]').click()
      cy.get('.home-root-container').should('be.visible')
    },
    {
      validate() {
        cy.window().then(window => {
          const token =
            window.localStorage.getItem('token') ||
            window.sessionStorage.getItem('token')
          expect(token).to.not.equal(null)
        })
      },
    },
  )
})

export {}
