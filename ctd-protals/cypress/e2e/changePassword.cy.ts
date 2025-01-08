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

  it('个人用户进入资料页，修改密码成功', () => {
    cy.visit('/mine/profile')

    cy.intercept(
      'POST',
      /\/(?:dev-api\/)?mailer\/send-verification-code\/auth/,
    ).as('sendEmailRequest')

    // 点击修改密码按钮，进入修改密码页面
    cy.get('[data-testid="change-password-btn"]').click()
    cy.get('.change-password-dialog-container').should('be.visible')

    // 验证修改页面的初始值是否正确
    cy.get('[data-testid="send-email-address"]').should(
      'contain.text',
      testUser.email,
    )

    // 在这里需要等待验证码发送成功再执行接下来的代码
    cy.wait('@sendEmailRequest').then(interception => {
      // 断言请求响应成功
      expect(interception.response?.statusCode).to.equal(201)

      expect(interception.response?.body).to.have.property(
        'msg',
        'SEND_VERIFICATION_CODE_SUCCEED',
      )

      // 获取验证码并输入
      getVerificationCodeAndResetPwd(testUser.email, testUser.password)
      testUser.password = 'NewPassword@123!'
    })
  })

  it('个人用户修改密码，点击重新发送验证码，修改密码成功', () => {
    cy.visit('/mine/profile')

    // 点击修改密码按钮，进入修改密码页面
    cy.get('[data-testid="change-password-btn"]').click()
    cy.get('.change-password-dialog-container').should('be.visible')

    // 验证修改页面的初始值是否正确
    cy.get('[data-testid="send-email-address"]').should(
      'contain.text',
      testUser.email,
    )

    cy.intercept(
      'POST',
      /\/(?:dev-api\/)?mailer\/send-verification-code\/auth/,
    ).as('sendEmailRequest')

    // 点击重新发送验证码按钮
    cy.get('[data-testid="resend-email-button"]').click()

    // 在这里需要等待验证码发送成功再执行接下来的代码
    cy.wait('@sendEmailRequest').then(interception => {
      // 断言请求响应成功
      expect(interception.response?.statusCode).to.equal(201)

      expect(interception.response?.body).to.have.property(
        'msg',
        'SEND_VERIFICATION_CODE_SUCCEED',
      )

      // 获取验证码并输入
      getVerificationCodeAndResetPwd(testUser.email, testUser.password)
      testUser.password = 'NewPassword@123!'
    })
  })

  it('在邮件验证码页面，验证码不合规，给予对应提示', () => {
    cy.visit('/mine/profile')

    // 点击修改密码按钮，进入修改密码页面
    cy.get('[data-testid="change-password-btn"]').click()
    cy.get('.change-password-dialog-container').should('be.visible')

    // 验证修改页面的初始值是否正确
    cy.get('[data-testid="send-email-address"]').should(
      'contain.text',
      testUser.email,
    )

    cy.get('[data-testid="next-button"]').click()
    cy.contains('请输入完整的验证码').should('be.visible')
    cy.contains('请输入完整的验证码').should('not.visible')
    enterVerificationCode('12345')
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请输入完整的验证码').should('be.visible')
  })

  it('在身份验证页面，密码不合规，给予对应提示', () => {
    cy.visit('/mine/profile')

    cy.intercept(
      'POST',
      /\/(?:dev-api\/)?mailer\/send-verification-code\/auth/,
    ).as('sendEmailRequest')

    // 点击修改密码按钮，进入修改密码页面
    cy.get('[data-testid="change-password-btn"]').click()
    cy.get('.change-password-dialog-container').should('be.visible')

    cy.wait('@sendEmailRequest').then(interception => {
      // 断言请求响应成功
      expect(interception.response?.statusCode).to.equal(201)

      expect(interception.response?.body).to.have.property(
        'msg',
        'SEND_VERIFICATION_CODE_SUCCEED',
      )

      cy.getVerificationCode(Cypress.env('serverUrl'), testUser.email, 2)
      cy.get<string>('@verificationCode').then(verificationCode => {
        enterVerificationCode(verificationCode)
        cy.get('[data-testid="next-button"]').click()
        cy.contains('请输入登录密码').should('be.visible')

        // 检测必填项
        cy.get('[data-testid="current-password-input"]').clear()
        cy.get('[data-testid="current-password-input"]').blur()
        cy.contains('请输入密码').should('be.visible')

        // 检测错误密码
        cy.get('[data-testid="current-password-input"]').clear()
        cy.get('[data-testid="current-password-input"]').type('WrongPwd')
        cy.get('[data-testid="next-button"]').click()
        cy.contains('验证密码失败').should('be.visible')
        cy.contains('验证密码失败').should('not.exist')
      })
    })
  })

  it('设置新密码页面，密码不合规，给予对应提示', () => {
    cy.visit('/mine/profile')

    cy.intercept(
      'POST',
      /\/(?:dev-api\/)?mailer\/send-verification-code\/auth/,
    ).as('sendEmailRequest')

    // 点击修改密码按钮，进入修改密码页面
    cy.get('[data-testid="change-password-btn"]').click()
    cy.get('.change-password-dialog-container').should('be.visible')

    cy.wait('@sendEmailRequest').then(interception => {
      // 断言请求响应成功
      expect(interception.response?.statusCode).to.equal(201)

      expect(interception.response?.body).to.have.property(
        'msg',
        'SEND_VERIFICATION_CODE_SUCCEED',
      )

      cy.getVerificationCode(Cypress.env('serverUrl'), testUser.email, 2)
      cy.get<string>('@verificationCode').then(verificationCode => {
        enterVerificationCode(verificationCode)
        cy.get('[data-testid="next-button"]').click()
        cy.contains('请输入登录密码').should('be.visible')

        enterVerificationPassword(testUser.password)
        cy.get('[data-testid="next-button"]').click()
        cy.contains('设置新密码').should('be.visible')

        // 检测必填项
        cy.get('[data-testid="new-password-input"]').clear()
        cy.get('[data-testid="new-password-input"]').blur()
        cy.contains('请输入密码').should('be.visible')
        // 检测格式合规
        const useCase = ['1234', '1234test', '1234testTEST', '1234TEST!']
        for (const item of useCase) {
          cy.get('[data-testid="new-password-input"]').clear()
          cy.get('[data-testid="new-password-input"]').type(item)
          cy.get('[data-testid="new-password-input"]').blur()
          cy.contains(
            '密码必须大于8位，且至少包含大小写字母数字及特殊字符',
          ).should('be.visible')
        }
      })
    })
  })

  it.only('设置新密码页面，确认密码不合规，给予对应提示', () => {
    cy.visit('/mine/profile')

    cy.intercept(
      'POST',
      /\/(?:dev-api\/)?mailer\/send-verification-code\/auth/,
    ).as('sendEmailRequest')

    // 点击修改密码按钮，进入修改密码页面
    cy.get('[data-testid="change-password-btn"]').click()
    cy.get('.change-password-dialog-container').should('be.visible')

    cy.wait('@sendEmailRequest').then(interception => {
      // 断言请求响应成功
      expect(interception.response?.statusCode).to.equal(201)

      expect(interception.response?.body).to.have.property(
        'msg',
        'SEND_VERIFICATION_CODE_SUCCEED',
      )

      cy.getVerificationCode(Cypress.env('serverUrl'), testUser.email, 2)
      cy.get<string>('@verificationCode').then(verificationCode => {
        enterVerificationCode(verificationCode)
        cy.get('[data-testid="next-button"]').click()
        cy.contains('请输入登录密码').should('be.visible')

        enterVerificationPassword(testUser.password)
        cy.get('[data-testid="next-button"]').click()
        cy.contains('设置新密码').should('be.visible')

        // 检测必填项
        cy.get('[data-testid="confirm-password-input"]').clear()
        cy.get('[data-testid="confirm-password-input"]').blur()
        cy.contains('请再次确认密码').should('be.visible')
        // 检测格式合规
        cy.get('[data-testid="new-password-input"]').type('Password@123!')
        cy.get('[data-testid="confirm-password-input"]').type('Password@123')
        cy.get('[data-testid="confirm-password-input"]').blur()
        cy.contains('请保证两次输入的密码一致').should('be.visible')
      })
    })
  })
})

function enterVerificationCode(verificationCode: string) {
  verificationCode.split('').forEach((char: string, index: number) => {
    cy.get(`[data-testid="verification-input-${index}"]`).type(char)
  })
}

function enterVerificationPassword(currentPassword: string) {
  cy.get('[data-testid="current-password-input"]').type(currentPassword)
}

function enterNewPasswordForm(newPassword: string) {
  cy.get('[data-testid="new-password-input"]').type(newPassword)
  cy.get('[data-testid="confirm-password-input"]').type(newPassword)
}

function getVerificationCodeAndResetPwd(email: string, password: string) {
  // 调用后门接口获取验证码
  cy.getVerificationCode(Cypress.env('serverUrl'), email, 2)
  cy.get<string>('@verificationCode').then(verificationCode => {
    enterVerificationCode(verificationCode)
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请输入登录密码').should('be.visible')
    enterVerificationPassword(password)
    cy.get('[data-testid="next-button"]').click()
    cy.contains('设置新密码').should('be.visible')
    enterNewPasswordForm('NewPassword@123!')
    cy.get('[data-testid="next-button"]').click()
    cy.contains('您的密码已经修改完成').should('be.visible')
    cy.get('[data-testid="close-button"]').click()
    cy.get('.change-password-dialog-container').should('not.exist')
  })
}
