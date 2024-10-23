describe('User Registration Flow', () => {
  const baseUrl = 'http://10.105.21.63:8080'

  it('should register as an individual user', () => {
    const testEmail = `testuser${(Math.random() * 1000).toFixed(0)}@example.com`

    cy.visit(`/register`)

    // 选择个人用户角色
    cy.get('[data-testid="individual-user-button"]').click()
    // 点击下一步
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')

    // 基本信息
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="password-input"]').type('Password@123!')
    cy.get('[data-testid="confirm-password-input"]').type('Password@123!')

    // 个人信息
    cy.get('[data-testid="name-input"]').type('test user')
    cy.get('[data-testid="idNumber-input"]').type('110101199001010000')
    cy.get('[data-testid="phone-input"]').type('18888888888')
    cy.get('[data-testid="gender-select"]').click()
    cy.get('[data-testid="gender-option-male"]').click()
    cy.get('#birthday-picker').click()
    cy.get('.el-picker-panel__body .el-date-table td.available')
      .contains('15')
      .click()
    cy.get('[data-testid="address-input"]').type('test address')

    // 点击下一步，提交注册
    cy.get('[data-testid="next-button"]').click()
    cy.contains('验证邮件已发送').should('be.visible')

    cy.request(
      'GET',
      `${baseUrl}/register/test/getToken?email=${testEmail}`,
    ).then(response => {
      expect(response.status).to.eq(200)
      console.log(response.body)
      const token = response.body

      cy.visit(`/register?token=${token}`)
      cy.contains('账号激活成功').should('be.visible')
    })
  })

  it('should register as a corporate user', () => {
    const testEmail = `testcompany${(Math.random() * 1000).toFixed(0)}@example.com`

    cy.visit(`/register`)

    // 选择企业用户角色
    cy.get('[data-testid="corporate-user-button"]').click()
    // 点击下一步
    cy.get('[data-testid="next-button"]').click()
    cy.contains('请您填写基本信息').should('be.visible')

    // 基本信息
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="password-input"]').type('Password@123!')
    cy.get('[data-testid="confirm-password-input"]').type('Password@123!')

    // 企业信息
    cy.get('[data-testid="companyName-input"]').type('test company')
    cy.get('[data-testid="companyCode-input"]').type('111111111111111111')
    cy.get('[data-testid="contactName-input"]').type('test user')
    cy.get('[data-testid="contactPosition-input"]').type('test position')
    cy.get('[data-testid="contactPhone-input"]').type('18888888888')
    cy.get('[data-testid="companyAddress-input"]').type('test address')
    cy.get('[data-testid="industryCategory-select"]').click()
    cy.get('[data-testid="industryCategory-option-IT"]').click()
    cy.get('[data-testid="companySize-select"]').click()
    cy.get('[data-testid="companySize-option-large"]').click()
    cy.get('[data-testid="companyDescription-input"]').type('test description')

    // 点击下一步，提交注册
    cy.get('[data-testid="next-button"]').click()
    cy.contains('验证邮件已发送').should('be.visible')

    cy.request(
      'GET',
      `${baseUrl}/register/test/getToken?email=${testEmail}`,
    ).then(response => {
      expect(response.status).to.eq(200)
      console.log(response.body)
      const token = response.body

      cy.visit(`/register?token=${token}`)
      cy.contains('账号激活成功').should('be.visible')
    })
  })
})
