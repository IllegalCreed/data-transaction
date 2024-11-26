/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

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
