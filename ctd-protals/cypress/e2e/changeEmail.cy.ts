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
      })
    })
  })
})

function enterVerificationCode(verificationCode: string) {
  verificationCode.split('').forEach((char: string, index: number) => {
    cy.get(`[data-testid="verification-input-${index}"]`).type(char)
  })
}
