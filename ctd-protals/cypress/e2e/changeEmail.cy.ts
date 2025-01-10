import type { IIndividualUserData } from '../support/types'
import { generateUniqueEmail } from '../support/utils'
import { registerIndividualUser } from '../support/utils'
import { activateUser } from '../support/utils'

describe('修改密码', () => {
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

  beforeEach(() => {
    cy.login(testUser.email, testUser.password)
  })

  it('个人用户进入资料页，修改验证邮箱成功', () => {
    cy.visit('/mine/profile')

    // 点击修改密码按钮，进入修改密码页面
    cy.get('[data-testid="change-email-btn"]').click()
    cy.get('.change-email-dialog-container').should('be.visible')

    // 获取救援代码并填写密码和救援代码
    cy.contains('请输入登录密码及救援代码').should('be.visible')
    cy.getRecoveryCode(Cypress.env('serverUrl'), testUser.email)
    cy.get<string>('@recoveryCode').then(code => {
      cy.get('[data-testid="password-input"]').type(testUser.password)
      cy.get('[data-testid="recovery-code-input"]').type(code)

      // 点击提交按钮
      cy.get('[data-testid="next-button"]').click()

      // 验证是否跳转到邮箱验证页面
      cy.contains('我们将会更新您的验证邮箱').should('be.visible')
      const newEmail = generateUniqueEmail('testuser')
      cy.get('[data-testid="email-input"]').type(newEmail)

      // 点击提交按钮
      cy.get('[data-testid="next-button"]').click()

      // 验证页面元素是否正常显示
      cy.get('[data-testid="send-email-address"]').should(
        'contain.text',
        newEmail,
      )

      // 调用后门接口获取验证码
      cy.getVerificationCode(Cypress.env('serverUrl'), newEmail, 3)
      cy.get<string>('@verificationCode').then(verificationCode => {
        enterVerificationCode(verificationCode)

        cy.get('[data-testid="next-button"]').click()

        cy.contains('您的验证邮箱已经修改完成').should('be.visible')
        cy.get('[data-testid="close-button"]').click()
        cy.get('.change-password-dialog-container').should('not.exist')
        testUser.email = newEmail
      })
    })
  })

  it('在身份验证页面，密码不合规，给予对应提示', () => {
    cy.visit('/mine/profile')

    // 点击修改密码按钮，进入修改密码页面
    cy.get('[data-testid="change-email-btn"]').click()
    cy.get('.change-email-dialog-container').should('be.visible')

    // 检测必填项
    cy.get('[data-testid="password-input"]').clear()
    cy.get('[data-testid="password-input"]').blur()
    cy.contains('请输入密码').should('be.visible')

    // 检测错误密码
    cy.get('[data-testid="password-input"]').clear()
    cy.get('[data-testid="password-input"]').type('WrongPwd')
    cy.getRecoveryCode(Cypress.env('serverUrl'), testUser.email)
    cy.get<string>('@recoveryCode').then(code => {
      cy.get('[data-testid="recovery-code-input"]').type(code)
      cy.get('[data-testid="next-button"]').click()

      cy.contains('验证密码失败').should('be.visible')
      cy.contains('验证密码失败').should('not.exist')
    })
  })

  it('在身份验证页面，救援代码不合规，给予对应提示', () => {
    cy.visit('/mine/profile')

    // 点击修改密码按钮，进入修改密码页面
    cy.get('[data-testid="change-email-btn"]').click()
    cy.get('.change-email-dialog-container').should('be.visible')

    // 检测必填项
    cy.get('[data-testid="recovery-code-input"]').clear()
    cy.get('[data-testid="recovery-code-input"]').blur()
    cy.contains('请输入救援代码').should('be.visible')

    // 检测错误救援代码
    cy.get('[data-testid="recovery-code-input"]').clear()
    cy.get('[data-testid="recovery-code-input"]').type('WrongCode')
    cy.get('[data-testid="password-input"]').type(testUser.password)

    cy.get('[data-testid="next-button"]').click()

    cy.contains('未找到救援代码').should('be.visible')
    cy.contains('未找到救援代码').should('not.exist')
  })

  it('在修改邮件页面，邮件地址不合规，给予对应提示', () => {
    cy.visit('/mine/profile')

    // 点击修改密码按钮，进入修改密码页面
    cy.get('[data-testid="change-email-btn"]').click()
    cy.get('.change-email-dialog-container').should('be.visible')

    // 获取救援代码并填写密码和救援代码
    cy.contains('请输入登录密码及救援代码').should('be.visible')
    cy.getRecoveryCode(Cypress.env('serverUrl'), testUser.email)
    cy.get<string>('@recoveryCode').then(code => {
      cy.get('[data-testid="password-input"]').type(testUser.password)
      cy.get('[data-testid="recovery-code-input"]').type(code)

      // 点击提交按钮
      cy.get('[data-testid="next-button"]').click()

      // 验证是否跳转到邮箱验证页面
      cy.contains('我们将会更新您的验证邮箱').should('be.visible')

      // 检测必填项
      cy.get('[data-testid="email-input"]').clear()
      cy.get('[data-testid="email-input"]').blur()
      cy.contains('请输入邮箱').should('be.visible')

      // 提交重复邮箱
      cy.get('[data-testid="email-input"]').clear()
      cy.get('[data-testid="email-input"]').type(testUser.email)
      cy.get('[data-testid="next-button"]').click()
      cy.contains('邮箱地址已经存在').should('be.visible')
    })
  })

  it('在邮件验证码页面，验证码不合规，给予对应提示', () => {
    cy.visit('/mine/profile')

    // 点击修改密码按钮，进入修改密码页面
    cy.get('[data-testid="change-email-btn"]').click()
    cy.get('.change-email-dialog-container').should('be.visible')

    // 获取救援代码并填写密码和救援代码
    cy.contains('请输入登录密码及救援代码').should('be.visible')
    cy.getRecoveryCode(Cypress.env('serverUrl'), testUser.email)
    cy.get<string>('@recoveryCode').then(code => {
      cy.get('[data-testid="password-input"]').type(testUser.password)
      cy.get('[data-testid="recovery-code-input"]').type(code)

      // 点击提交按钮
      cy.get('[data-testid="next-button"]').click()

      // 验证是否跳转到邮箱验证页面
      cy.contains('我们将会更新您的验证邮箱').should('be.visible')
      const newEmail = generateUniqueEmail('testuser')
      cy.get('[data-testid="email-input"]').type(newEmail)

      // 点击提交按钮
      cy.get('[data-testid="next-button"]').click()

      // 验证页面元素是否正常显示
      cy.get('[data-testid="send-email-address"]').should(
        'contain.text',
        newEmail,
      )

      // 完整度校验
      cy.get('[data-testid="next-button"]').click()
      cy.contains('请输入完整的验证码').should('be.visible')
      cy.contains('请输入完整的验证码').should('not.visible')
      enterVerificationCode('12345')
      cy.get('[data-testid="next-button"]').click()
      cy.contains('请输入完整的验证码').should('be.visible')
      cy.contains('请输入完整的验证码').should('not.visible')
      // 正确性校验
      enterVerificationCode('123456')
      cy.get('[data-testid="next-button"]').click()
      cy.contains('验证码无效或已过期').should('be.visible')
      cy.contains('验证码无效或已过期').should('not.visible')
    })
  })
})

function enterVerificationCode(verificationCode: string) {
  verificationCode.split('').forEach((char: string, index: number) => {
    cy.get(`[data-testid="verification-input-${index}"]`).type(char)
  })
}
