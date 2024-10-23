/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import type { IIndividualUserData, ICorporateUserData } from './types'

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

declare global {
  namespace Cypress {
    interface Chainable {
      registerIndividualUser(userData: IIndividualUserData): Chainable<void>
      registerCorporateUser(userData: ICorporateUserData): Chainable<void>
      getActivationToken(baseUrl: string, email: string): Chainable<void>
    }
  }
}

Cypress.Commands.add(
  'registerIndividualUser',
  (userData: IIndividualUserData) => {
    cy.visit('/register')

    cy.get('[data-testid="individual-user-button"]').click()
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')

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
    cy.contains('验证邮件已发送').should('be.visible')
  },
)

Cypress.Commands.add(
  'registerCorporateUser',
  (userData: ICorporateUserData) => {
    cy.visit('/register')

    // 选择企业用户角色
    cy.get('[data-testid="corporate-user-button"]').click()

    // 点击下一步
    cy.get('[data-testid="next-button"]').click()

    // 确认进入填写基本信息页
    cy.contains('请您填写基本信息').should('be.visible')

    // 填写基本信息
    cy.get('[data-testid="email-input"]').type(userData.email)
    cy.get('[data-testid="password-input"]').type(userData.password)
    cy.get('[data-testid="confirm-password-input"]').type(userData.password)

    // 填写企业信息
    cy.get('[data-testid="companyName-input"]').type(userData.companyName)
    cy.get('[data-testid="companyCode-input"]').type(userData.companyCode)
    cy.get('[data-testid="contactName-input"]').type(userData.contactName)
    cy.get('[data-testid="contactPosition-input"]').type(
      userData.contactPosition,
    )
    cy.get('[data-testid="contactPhone-input"]').type(userData.contactPhone)
    cy.get('[data-testid="companyAddress-input"]').type(userData.companyAddress)

    // 选择行业类别
    cy.get('[data-testid="industryCategory-select"]').click()
    cy.get(
      `[data-testid="industryCategory-option-${userData.industryCategory}"]`,
    ).click()

    // 选择公司规模
    cy.get('[data-testid="companySize-select"]').click()
    cy.get(`[data-testid="companySize-option-${userData.companySize}"]`).click()

    // 填写公司描述
    cy.get('[data-testid="companyDescription-input"]').type(
      userData.companyDescription,
    )

    // 点击下一步，提交注册
    cy.get('[data-testid="next-button"]').click()

    // 确认验证邮件已发送
    cy.contains('验证邮件已发送').should('be.visible')
  },
)

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

export {}
