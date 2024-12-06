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

  afterEach(() => {
    cy.login(testUser.email, testUser.password)
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
  })

  it('登录成功', () => {
    cy.login(testUser.email, testUser.password)
  })

  it('首次登录，记住密码，登录成功', () => {
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

  it('首次登录，不记住密码，登录成功', () => {
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

  it('密码错误三次后，显示验证码，正确输入后登录成功', () => {
    cy.visit('/login')
    cy.intercept('GET', /\/(?:dev-api\/)?captcha/).as('getCaptchaRequest')

    for (let i = 0; i < 3; i++) {
      cy.get('[data-testid="email-input"]').clear()
      cy.get('[data-testid="email-input"]').type(testUser.email)
      cy.get('[data-testid="password-input"]').clear()
      cy.get('[data-testid="password-input"]').type('WrongPwd')
      cy.get('[data-testid="login-button"]').click()
      cy.contains('身份验证失败').should('be.visible')
      cy.contains('身份验证失败').should('not.exist')
    }
    cy.get('[data-testid="captcha-input"]').should('be.visible')

    cy.wait('@getCaptchaRequest').then(interception => {
      const captchaId = interception.response?.body?.data.id
      cy.getCaptchaCode(Cypress.env('serverUrl'), captchaId)
      cy.get<string>('@captchaCode').then(code => {
        cy.get('[data-testid="password-input"]').clear()
        cy.get('[data-testid="password-input"]').type(testUser.password)
        cy.get('[data-testid="captcha-input"]').clear()
        cy.get('[data-testid="captcha-input"]').type(code)
        cy.get('[data-testid="login-button"]').click()
        cy.get('.home-root-container').should('be.visible')
      })
    })
  })

  it('登录表单，邮箱不合规，给予对应提示', () => {
    cy.visit('/login')
    // 检测必填项
    cy.get('[data-testid="email-input"]').clear()
    cy.get('[data-testid="email-input"]').blur()
    cy.contains('请输入邮箱地址').should('be.visible')
    // 检测格式合规
    const useCase = ['123', '123@', '@123']
    for (const item of useCase) {
      cy.get('[data-testid="email-input"]').clear()
      cy.get('[data-testid="email-input"]').type(item)
      cy.get('[data-testid="email-input"]').blur()
      cy.contains('请输入正确的邮箱地址').should('be.visible')
    }
  })

  it('登录表单，密码不合规，给予对应提示', () => {
    cy.visit('/login')
    // 检测必填项
    cy.get('[data-testid="password-input"]').clear()
    cy.get('[data-testid="password-input"]').blur()
    cy.contains('请输入密码').should('be.visible')
  })

  it('未注册账户登录，给予对应提示', () => {
    cy.visit('/login')
    cy.get('[data-testid="email-input"]').type(generateUniqueEmail('testuser'))
    cy.get('[data-testid="password-input"]').type(testUser.password)
    cy.get('[data-testid="login-button"]').click()
    cy.contains('用户不存在/密码错误').should('be.visible')
  })

  it('已注册未激活账户登录，给予对应提示', () => {
    const tempUser: IIndividualUserData = {
      email: generateUniqueEmail('testuser'),
      password: 'Password@123!',
      name: 'Test User',
      idNumber: '110101199001010000',
      phone: '18888888888',
      gender: 'male',
      birthday: '15',
      address: 'Test Address',
    }
    registerIndividualUser(tempUser)
    cy.visit('/login')
    cy.get('[data-testid="email-input"]').type(tempUser.email)
    cy.get('[data-testid="password-input"]').type(testUser.password)
    cy.get('[data-testid="login-button"]').click()
    cy.contains('用户未激活').should('be.visible')
  })

  it('已注册已激活账户登录，密码错误，给予对应提示', () => {
    cy.visit('/login')
    cy.get('[data-testid="email-input"]').type(testUser.email)
    cy.get('[data-testid="password-input"]').type('12345678')
    cy.get('[data-testid="login-button"]').click()
    cy.contains('用户不存在/密码错误').should('be.visible')
  })
})
