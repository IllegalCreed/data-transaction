import type { IIndividualUserData } from '../support/types'
import { generateUniqueEmail } from '../support/utils'
import { registerIndividualUser } from '../support/utils'
import { activateUser } from '../support/utils'

describe('Login Flow', () => {
  let testUser: IIndividualUserData

  before(() => {
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

  it('should successfully login with valid credentials', () => {
    // 访问登录页面
    cy.visit('/login')

    // 输入邮箱和密码
    cy.get('[data-testid="email-input"]').type(testUser.email)
    cy.get('[data-testid="password-input"]').type(testUser.password)

    // 点击登录按钮
    cy.get('[data-testid="login-button"]').click()

    // 验证登录成功后页面包含指定的元素
    cy.get('.home-root-container').should('be.visible')
  })

  it('should store token in localStorage when "Remember Me" is checked', () => {
    // 访问登录页面
    cy.visit('/login')

    // 输入邮箱和密码
    cy.get('[data-testid="email-input"]').type(testUser.email)
    cy.get('[data-testid="password-input"]').type(testUser.password)

    // 勾选“记住登录状态”复选框
    cy.get('[data-testid="remember-me-checkbox"] .el-checkbox__original').check(
      { force: true },
    )

    // 点击登录按钮
    cy.get('[data-testid="login-button"]').click()

    // 验证登录成功
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

  it('should store token in sessionStorage when "Remember Me" is not checked', () => {
    // 访问登录页面
    cy.visit('/login')

    // 输入邮箱和密码
    cy.get('[data-testid="email-input"]').type(testUser.email)
    cy.get('[data-testid="password-input"]').type(testUser.password)

    // 确保未勾选“记住登录状态”复选框
    cy.get(
      '[data-testid="remember-me-checkbox"] .el-checkbox__original',
    ).uncheck({ force: true })

    // 点击登录按钮
    cy.get('[data-testid="login-button"]').click()

    // 验证登录成功
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
