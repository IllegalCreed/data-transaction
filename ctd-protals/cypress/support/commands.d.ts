/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      getActivationToken(baseUrl: string, email: string): Chainable<void>
      getVerificationCode(baseUrl: string, email: string): Chainable<void>
    }
  }
}

export {}
