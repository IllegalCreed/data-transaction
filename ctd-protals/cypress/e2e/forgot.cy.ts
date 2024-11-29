import type { IIndividualUserData } from '../support/types'
import {
  activateUser,
  generateUniqueEmail,
  registerIndividualUser,
} from '../support/utils'

describe('忘记密码', () => {
  let testUser: IIndividualUserData

  before(() => {
    if (testUser) return
    // 注册并激活账号
    testUser = {
      email: generateUniqueEmail('testuser'),
      password: 'Password@123!',
      name: 'test user',
      idNumber: '110101199001010000',
      phone: '18888888888',
      gender: 'male',
      birthday: '15',
      address: 'test address',
    }

    registerIndividualUser(testUser)
    activateUser(testUser.email)
  })

  it('重置密码成功', () => {
    cy.visit('/forgot')

    // 输入邮箱地址
    cy.contains('忘记密码').should('be.visible')
    cy.get('[data-testid="email-input"]').type(testUser.email)
    cy.get('[data-testid="next-button"]').click()

    cy.contains('验证邮箱').should('be.visible')
    getVerificationCodeAndResetPwd(testUser.email)
  })

  it('重新发送验证码邮件，重置密码成功', () => {
    cy.visit('/forgot')

    // 输入邮箱地址
    cy.contains('忘记密码').should('be.visible')
    cy.get('[data-testid="email-input"]').type(testUser.email)
    cy.get('[data-testid="next-button"]').click()

    cy.contains('验证邮箱').should('be.visible')
    cy.get('[data-testid="resend-email-button"]').click()
    cy.contains('邮件发送成功').should('be.visible')
    getVerificationCodeAndResetPwd(testUser.email)
  })

  it('在验证码输入页面，点击上一步，回到邮箱填写页面，重新完成重置密码流程', () => {
    cy.visit('/forgot')

    // 输入邮箱地址
    cy.contains('忘记密码').should('be.visible')
    cy.get('[data-testid="email-input"]').type(testUser.email)
    cy.get('[data-testid="next-button"]').click()
    cy.contains('验证邮箱').should('be.visible')

    cy.get('[data-testid="prev-button"]').click()

    cy.contains('忘记密码').should('be.visible')
    cy.get('[data-testid="email-input"]').clear()
    cy.get('[data-testid="email-input"]').type(testUser.email)
    cy.get('[data-testid="next-button"]').click()
    cy.contains('验证邮箱').should('be.visible')

    getVerificationCodeAndResetPwd(testUser.email)
  })

  it('填写邮件地址不合规，给予对应提示', () => {
    cy.visit('/forgot')

    // 输入邮箱地址
    cy.contains('忘记密码').should('be.visible')
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

  it('未注册用户无法发送验证码邮件，给予对应提示', () => {
    cy.visit('/forgot')

    // 输入邮箱地址
    cy.contains('忘记密码').should('be.visible')
    cy.get('[data-testid="email-input"]').type(generateUniqueEmail('testuser'))
    cy.get('[data-testid="next-button"]').click()
    cy.contains('用户不存在').should('be.visible')
  })

  it('已注册未激活用户无法发送验证码邮件，给予对应提示', () => {
    const unActivationUser: IIndividualUserData = {
      email: generateUniqueEmail('testuser'),
      password: 'Password@123!',
      name: 'test user',
      idNumber: '110101199001010000',
      phone: '18888888888',
      gender: 'male',
      birthday: '15',
      address: 'test address',
    }

    registerIndividualUser(unActivationUser)

    cy.visit('/forgot')

    // 输入邮箱地址
    cy.contains('忘记密码').should('be.visible')
    cy.get('[data-testid="email-input"]').type(unActivationUser.email)
    cy.get('[data-testid="next-button"]').click()
    cy.contains('用户未激活').should('be.visible')
  })

  it('验证码输入不合规，给予对应提示', () => {
    cy.visit('/forgot')

    // 输入邮箱地址
    cy.contains('忘记密码').should('be.visible')
    cy.get('[data-testid="email-input"]').type(testUser.email)
    cy.get('[data-testid="next-button"]').click()

    cy.contains('验证邮箱').should('be.visible')
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请输入完整的验证码').should('be.visible')
    enterVerificationCode('12345')
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请输入完整的验证码').should('be.visible')
  })

  it('验证码失效后，填写验证码并点击下一步，给予对应提示', () => {
    cy.visit('/forgot')

    // 输入邮箱地址
    cy.contains('忘记密码').should('be.visible')
    cy.get('[data-testid="email-input"]').type(testUser.email)
    cy.get('[data-testid="next-button"]').click()

    cy.contains('验证邮箱').should('be.visible')
    cy.getVerificationCode(Cypress.env('serverUrl'), testUser.email, 1)
    cy.get<string>('@verificationCode').then(verificationCode => {
      enterVerificationCode(verificationCode)
      cy.intercept(
        'POST',
        /\/(?:dev-api\/)?register\/forgotPwdVerifyEmailCode/,
        {
          statusCode: 200,
          body: { code: 500, msg: '验证码已失效' },
        },
      ).as('verifyCode')
      cy.get('[data-testid="next-button"]').click()
      cy.wait('@verifyCode')
      cy.contains('验证码已失效').should('be.visible')
    })
  })

  it('修改密码表单，密码不合规，给予对应提示', () => {
    cy.visit('/forgot')

    // 输入邮箱地址
    cy.contains('忘记密码').should('be.visible')
    cy.get('[data-testid="email-input"]').type(testUser.email)
    cy.get('[data-testid="next-button"]').click()

    cy.contains('验证邮箱').should('be.visible')
    cy.getVerificationCode(Cypress.env('serverUrl'), testUser.email, 1)
    cy.get<string>('@verificationCode').then(verificationCode => {
      enterVerificationCode(verificationCode)
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

  it('修改密码表单，确认密码不合规，给予对应提示', () => {
    cy.visit('/forgot')

    // 输入邮箱地址
    cy.contains('忘记密码').should('be.visible')
    cy.get('[data-testid="email-input"]').type(testUser.email)
    cy.get('[data-testid="next-button"]').click()

    cy.contains('验证邮箱').should('be.visible')
    cy.getVerificationCode(Cypress.env('serverUrl'), testUser.email, 1)
    cy.get<string>('@verificationCode').then(verificationCode => {
      enterVerificationCode(verificationCode)
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

  it('token失效后，填写修改密码表单并点击下一步，给予对应提示', () => {
    cy.visit('/forgot')

    // 输入邮箱地址
    cy.contains('忘记密码').should('be.visible')
    cy.get('[data-testid="email-input"]').type(testUser.email)
    cy.get('[data-testid="next-button"]').click()

    cy.contains('验证邮箱').should('be.visible')
    cy.getVerificationCode(Cypress.env('serverUrl'), testUser.email, 1)
    cy.get<string>('@verificationCode').then(verificationCode => {
      enterVerificationCode(verificationCode)
      cy.get('[data-testid="next-button"]').click()
      cy.contains('设置新密码').should('be.visible')
      enterResetPasswordForm('NewPassword@123!')
      cy.intercept('POST', /\/(?:dev-api\/)?register\/forgotPwdReset/, {
        statusCode: 200,
        body: { code: 500, msg: '令牌已失效' },
      }).as('resetPassword')
      cy.get('[data-testid="next-button"]').click()
      cy.wait('@resetPassword')
      cy.contains('令牌已失效').should('be.visible')
    })
  })

  function enterVerificationCode(verificationCode: string) {
    verificationCode.split('').forEach((char: string, index: number) => {
      cy.get(`[data-testid="verification-input-${index}"]`).type(char)
    })
  }

  function enterResetPasswordForm(newPassword: string) {
    cy.get('[data-testid="new-password-input"]').type(newPassword)
    cy.get('[data-testid="confirm-password-input"]').type(newPassword)
  }

  function getVerificationCodeAndResetPwd(email: string) {
    // 调用后门接口获取验证码
    cy.getVerificationCode(Cypress.env('serverUrl'), email, 1)
    cy.get<string>('@verificationCode').then(verificationCode => {
      enterVerificationCode(verificationCode)
      cy.get('[data-testid="next-button"]').click()
      cy.contains('设置新密码').should('be.visible')
      enterResetPasswordForm('NewPassword@123!')
      cy.get('[data-testid="next-button"]').click()
      cy.contains('您的密码已经重置完成').should('be.visible')
    })
  }
})
