/// <reference types="cypress" />
import type { ICorporateUserData, IIndividualUserData } from '../support/types'
import {
  activateUser,
  generateUniqueEmail,
  registerCorporateUser,
  registerIndividualUser,
} from '../support/utils'

describe('注册', () => {
  it.only('注册个人用户并激活成功', () => {
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

    registerIndividualUser(testUser)
    activateUser(testUser.email)
  })

  it('注册企业用户并激活成功', () => {
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

    registerCorporateUser(testUser)
    activateUser(testUser.email)
  })

  it('注册任意用户，并在激活失败后重新发送激活邮件', () => {
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

    registerIndividualUser(testUser)

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

  it('注册任意用户两次，并在提示用户已存未激活后，重新发送激活邮件', () => {
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

    registerCorporateUser(testUser)

    registerCorporateUser(testUser, '账号已存在，请先激活后登录')

    cy.get('[data-testid="resend-activation-button"]').click()

    cy.contains('验证邮件已发送').should('be.visible')
  })

  it('注册任意用户并激活成功，再次注册该用户，提示用户已存已激活', () => {
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

    registerCorporateUser(testUser)
    activateUser(testUser.email)

    registerCorporateUser(testUser, '账号已存在，可直接登录')
  })

  it('不选择用户类型点击下一步，给予对应提示', () => {
    cy.visit('/register')
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请选择用户类型').should('be.visible')
  })

  it('基本信息邮箱不合规，给予对应提示', () => {
    cy.visit('/register')
    cy.get('[data-testid="individual-user-button"]').click()
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')
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

  it('基本信息密码不合规，给予对应提示', () => {
    cy.visit('/register')
    cy.get('[data-testid="individual-user-button"]').click()
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')
    // 检测必填项
    cy.get('[data-testid="password-input"]').clear()
    cy.get('[data-testid="password-input"]').blur()
    cy.contains('请输入密码').should('be.visible')
    // 检测格式合规
    const useCase = ['1234', '1234test', '1234testTEST', '1234TEST!']
    for (const item of useCase) {
      cy.get('[data-testid="password-input"]').clear()
      cy.get('[data-testid="password-input"]').type(item)
      cy.get('[data-testid="password-input"]').blur()
      cy.contains('密码必须大于8位，且至少包含大小写字母数字及特殊字符').should(
        'be.visible',
      )
    }
  })

  it('基本信息确认密码不合规，给予对应提示', () => {
    cy.visit('/register')
    cy.get('[data-testid="individual-user-button"]').click()
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')
    // 检测必填项
    cy.get('[data-testid="confirm-password-input"]').clear()
    cy.get('[data-testid="confirm-password-input"]').blur()
    cy.contains('请再次确认密码').should('be.visible')
    // 检测格式合规
    cy.get('[data-testid="password-input"]').type('Password@123!')
    cy.get('[data-testid="confirm-password-input"]').type('Password@123')
    cy.get('[data-testid="confirm-password-input"]').blur()
    cy.contains('请保证两次输入的密码一致').should('be.visible')
  })

  it('注册个人用户，个人信息姓名不合规，给予对应提示', () => {
    cy.visit('/register')
    cy.get('[data-testid="individual-user-button"]').click()
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')
    cy.contains('个人信息').should('be.visible')
    // 检测必填项
    cy.get('[data-testid="name-input"]').clear()
    cy.get('[data-testid="name-input"]').blur()
    cy.contains('请输入姓名').should('be.visible')
  })

  it('注册个人用户，个人信息身份证号不合规，给予对应提示', () => {
    cy.visit('/register')
    cy.get('[data-testid="individual-user-button"]').click()
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')
    cy.contains('个人信息').should('be.visible')
    // 检测必填项
    cy.get('[data-testid="idNumber-input"]').clear()
    cy.get('[data-testid="idNumber-input"]').blur()
    cy.contains('请输入身份证号').should('be.visible')
    // 检测格式合规
    const useCase = ['1234', '11010519990101136V']
    for (const item of useCase) {
      cy.get('[data-testid="idNumber-input"]').clear()
      cy.get('[data-testid="idNumber-input"]').type(item)
      cy.get('[data-testid="idNumber-input"]').blur()
      cy.contains('身份证号格式不正确').should('be.visible')
    }
  })

  it('注册个人用户，个人信息手机号不合规，给予对应提示', () => {
    cy.visit('/register')
    cy.get('[data-testid="individual-user-button"]').click()
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')
    cy.contains('个人信息').should('be.visible')
    // 检测必填项
    cy.get('[data-testid="phone-input"]').clear()
    cy.get('[data-testid="phone-input"]').blur()
    cy.contains('请输入联系电话').should('be.visible')
    // 检测格式合规
    const useCase = ['1234', '93336666999']
    for (const item of useCase) {
      cy.get('[data-testid="phone-input"]').clear()
      cy.get('[data-testid="phone-input"]').type(item)
      cy.get('[data-testid="phone-input"]').blur()
      cy.contains('手机号格式不正确').should('be.visible')
    }
  })

  it('注册企业用户，企业信息企业名称不合规，给予对应提示', () => {
    cy.visit('/register')
    cy.get('[data-testid="corporate-user-button"]').click()
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')
    cy.contains('企业信息').should('be.visible')
    // 检测必填项
    cy.get('[data-testid="companyName-input"]').clear()
    cy.get('[data-testid="companyName-input"]').blur()
    cy.contains('请输入企业名称').should('be.visible')
  })

  it('注册企业用户，企业信息统一社会信用代码不合规，给予对应提示', () => {
    cy.visit('/register')
    cy.get('[data-testid="corporate-user-button"]').click()
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')
    cy.contains('企业信息').should('be.visible')
    // 检测必填项
    cy.get('[data-testid="companyCode-input"]').clear()
    cy.get('[data-testid="companyCode-input"]').blur()
    cy.contains('请输入统一社会信用代码').should('be.visible')
    // 检测格式合规
    const useCase = ['1234', '12345678912345678z']
    for (const item of useCase) {
      cy.get('[data-testid="companyCode-input"]').clear()
      cy.get('[data-testid="companyCode-input"]').type(item)
      cy.get('[data-testid="companyCode-input"]').blur()
      cy.contains(
        '统一社会信用代码格式不正确，必须是18位大写字母或数字',
      ).should('be.visible')
    }
  })

  it('注册企业用户，企业信息企业地址不合规，给予对应提示', () => {
    cy.visit('/register')
    cy.get('[data-testid="corporate-user-button"]').click()
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')
    cy.contains('企业信息').should('be.visible')
    // 检测必填项
    cy.get('[data-testid="companyAddress-input"]').clear()
    cy.get('[data-testid="companyAddress-input"]').blur()
    cy.contains('请输入企业地址').should('be.visible')
  })

  it('注册企业用户，企业信息联系人名称不合规，给予对应提示', () => {
    cy.visit('/register')
    cy.get('[data-testid="corporate-user-button"]').click()
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')
    cy.contains('企业信息').should('be.visible')
    // 检测必填项
    cy.get('[data-testid="contactName-input"]').clear()
    cy.get('[data-testid="contactName-input"]').blur()
    cy.contains('请输入联系人姓名').should('be.visible')
  })

  it('注册企业用户，企业信息联系人电话不合规，给予对应提示', () => {
    cy.visit('/register')
    cy.get('[data-testid="corporate-user-button"]').click()
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')
    cy.contains('企业信息').should('be.visible')
    // 检测必填项
    cy.get('[data-testid="contactPhone-input"]').clear()
    cy.get('[data-testid="contactPhone-input"]').blur()
    cy.contains('请输入联系人电话').should('be.visible')
    // 检测格式合规
    const useCase = ['1234', '93336666999']
    for (const item of useCase) {
      cy.get('[data-testid="contactPhone-input"]').clear()
      cy.get('[data-testid="contactPhone-input"]').type(item)
      cy.get('[data-testid="contactPhone-input"]').blur()
      cy.contains('手机号格式不正确').should('be.visible')
    }
  })

  it('注册个人用户，个人信息性别选项显示正确', () => {
    cy.visit('/register')
    cy.get('[data-testid="individual-user-button"]').click()
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')
    cy.contains('个人信息').should('be.visible')
    // 检测选项
    cy.get('[data-testid="gender-select"]').click()
    cy.contains('男').should('be.exist')
    cy.contains('女').should('be.exist')
    cy.contains('其他').should('be.exist')
  })

  it('注册企业用户，企业信息行业类别选项显示正确', () => {
    cy.visit('/register')
    cy.get('[data-testid="corporate-user-button"]').click()
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')
    cy.contains('企业信息').should('be.visible')
    // 检测选项，只检测第一个和最后一个
    cy.get('[data-testid="industryType-select"]').click()
    cy.contains('农、林、牧、渔业').should('be.exist')
    cy.contains('其他').should('be.exist')
  })

  it('注册企业用户，企业信息行业类别选项显示正确', () => {
    cy.visit('/register')
    cy.get('[data-testid="corporate-user-button"]').click()
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')
    cy.contains('企业信息').should('be.visible')
    // 检测选项，只检测第一个和最后一个
    cy.get('[data-testid="companySize-select"]').click()
    cy.contains('微型企业（1-9人）').should('be.exist')
    cy.contains('超大型企业（1000人以上）').should('be.exist')
  })
})
