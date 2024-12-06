/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      getActivationToken(baseUrl: string, email: string): Chainable<void>
      getVerificationCode(
        baseUrl: string,
        email: string,
        type: number,
      ): Chainable<void>
      getCaptchaCode(baseUrl: string, captchaId: string): Chainable<void>
      login(email: string, password: string): Chainable<void>
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
  (baseUrl: string, email: string, type: number) => {
    if (Cypress.env('serverType') === 'java') {
      cy.request(
        'GET',
        `${baseUrl}/register/test/getCode?email=${email}&type=${type}`,
      ).then(response => {
        expect(response.status).to.eq(200)
        const verificationCode = response.body
        cy.wrap(verificationCode).as('verificationCode')
      })
    } else {
      cy.request(
        'GET',
        `${baseUrl}/mailer/test/get-code?email=${email}&type=${type}`,
      ).then(response => {
        expect(response.status).to.eq(200)
        const verificationCode = response.body.data
        cy.wrap(verificationCode).as('verificationCode')
      })
    }
  },
)

Cypress.Commands.add('getCaptchaCode', (baseUrl: string, captchaId: string) => {
  if (Cypress.env('serverType') === 'java') {
    cy.request(
      'GET',
      `${baseUrl}/register/test/getCode?captchaId=${captchaId}`,
    ).then(response => {
      expect(response.status).to.eq(200)
      const captchaCode = response.body
      cy.wrap(captchaCode).as('captchaCode')
    })
  } else {
    cy.request(
      'GET',
      `${baseUrl}/captcha/test/get-code?captchaId=${captchaId}`,
    ).then(response => {
      expect(response.status).to.eq(200)
      const captchaCode = response.body.data
      cy.wrap(captchaCode).as('captchaCode')
    })
  }
})

/**
 * 登录
 * @param email 用户名
 */
Cypress.Commands.add('login', (email, password) => {
  cy.session(
    [email, password],
    () => {
      cy.visit('/login')
      cy.get('[data-testid="email-input"]').clear()
      cy.get('[data-testid="email-input"]').type(email)
      cy.get('[data-testid="password-input"]').clear()
      cy.get('[data-testid="password-input"]').type(password)
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
