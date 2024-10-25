import type { ICorporateUserData, IIndividualUserData } from '../support/types'
import { generateUniqueEmail } from '../support/utils'

describe('User Registration Flow', () => {
  it('should register as an individual user', () => {
    const testUser: IIndividualUserData = {
      email: generateUniqueEmail('testuser'),
      password: 'Password@123!',
      name: 'test user',
      idNumber: '110101199001010000',
      phone: '18888888888',
      gender: 'male',
      birthday: '15',
      address: 'test address',
    }

    cy.registerIndividualUser(testUser)

    cy.getActivationToken(Cypress.env('serverUrl'), testUser.email)

    cy.get('@activationToken').then(token => {
      cy.visit(`/register?token=${token}`)
      cy.contains('账号激活成功').should('be.visible')
    })
  })

  it('should register as a corporate user', () => {
    const testUser: ICorporateUserData = {
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

    cy.registerCorporateUser(testUser)

    cy.getActivationToken(Cypress.env('serverUrl'), testUser.email)

    cy.get('@activationToken').then(token => {
      cy.visit(`/register?token=${token}`)
      cy.contains('账号激活成功').should('be.visible')
    })
  })

  it('should register as an individual user and handle activation failure with resend', () => {
    const testUser: IIndividualUserData = {
      email: generateUniqueEmail('testuser'),
      password: 'Password@123!',
      name: 'test user',
      idNumber: '110101199001010000',
      phone: '18888888888',
      gender: 'male',
      birthday: '15',
      address: 'test address',
    }

    cy.registerIndividualUser(testUser)

    cy.getActivationToken(Cypress.env('serverUrl'), testUser.email)

    cy.get('@activationToken').then(token => {
      cy.intercept('GET', /\/(?:dev-api\/)?register\/activation/, {
        statusCode: 200,
        body: { code: 500, msg: '您的token不合法或已过期' },
      }).as('activationRequest')

      cy.visit(`/register?token=${token}`)

      cy.wait('@activationRequest')

      cy.contains('激活失败').should('be.visible')

      cy.get('[data-testid="resend-activation-button"]').click()

      cy.contains('验证邮件已发送').should('be.visible')
    })
  })

  it('should not allow registering with an existing email and allow resending activation email', () => {
    const testUser: ICorporateUserData = {
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

    cy.registerCorporateUser(testUser)

    cy.registerCorporateUser(testUser, '注册账号已存在')

    cy.get('[data-testid="resend-activation-button"]').click()

    cy.contains('验证邮件已发送').should('be.visible')
  })
})
