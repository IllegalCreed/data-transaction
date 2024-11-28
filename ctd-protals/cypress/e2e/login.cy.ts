import type { IIndividualUserData } from '../support/types'
import { generateUniqueEmail } from '../support/utils'
import { registerIndividualUser } from '../support/utils'
import { activateUser } from '../support/utils'

describe('登录', () => {
  let testUser: IIndividualUserData

  before(() => {
    if (testUser) return
    // 注册并激活用户账号
    testUser = {
      email: generateUniqueEmail('testuser'),
      password: 'Password@123!',
      name: 'Test User',
      idNumber: '110101199001010000',
      phone: '18888888888',
      gender: 'male',
      birthday: '15',
      address: 'Test Address',
    }
    registerIndividualUser(testUser)
    activateUser(testUser.email)
  })

  it('登录成功', () => {
    cy.login(testUser.email)
  })

  it('记住密码，登录成功', () => {
    cy.visit('/login')
    cy.get('[data-testid="email-input"]').type(testUser.email)
    cy.get('[data-testid="password-input"]').type(testUser.password)
    cy.get('[data-testid="remember-me-checkbox"] .el-checkbox__original').check(
      { force: true },
    )
    cy.get('[data-testid="login-button"]').click()
    cy.get('.home-root-container').should('be.visible')

    // 检查 localStorage 中是否存在令牌
    cy.window().then(window => {
      const token = window.localStorage.getItem('token')
      expect(token).to.not.equal(null)
    })

    // 确认 sessionStorage 中没有令牌
    cy.window().then(window => {
      const token = window.sessionStorage.getItem('token')
      expect(token).to.equal(null)
    })
  })

  it('不记住密码，登录成功', () => {
    cy.visit('/login')
    cy.get('[data-testid="email-input"]').type(testUser.email)
    cy.get('[data-testid="password-input"]').type(testUser.password)
    cy.get(
      '[data-testid="remember-me-checkbox"] .el-checkbox__original',
    ).uncheck({ force: true })
    cy.get('[data-testid="login-button"]').click()
    cy.get('.home-root-container').should('be.visible')

    // 检查 sessionStorage 中是否存在令牌
    cy.window().then(window => {
      const token = window.sessionStorage.getItem('token')
      expect(token).to.not.equal(null)
    })

    // 确认 localStorage 中没有令牌
    cy.window().then(window => {
      const token = window.localStorage.getItem('token')
      expect(token).to.equal(null)
    })
  })
})
