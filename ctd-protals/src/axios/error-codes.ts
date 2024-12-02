export enum ErrorCode {
  // 通用
  USER_NOT_FOUND = 9001,
  SEND_EMAIL_FAILED = 9002,

  // 注册相关
  EMAIL_TAKEN = 1001,
  REGISTRATION_FAILED = 1002,
  INVALID_ACTIVATION_TOKEN = 1003,
  ACTIVATE_ACCOUNT_FAILED = 1004,
  ACCOUNT_ALREADY_ACTIVATED = 1005,
  RESEND_ACTIVATION_EMAIL_FAILED = 1006,
  ACCOUNT_PENDING_ACTIVATION = 1007,
  ACTIVATION_TOKEN_NOT_FOUND = 1008,

  // 忘记密码相关
  INVALID_VERIFICATION_CODE_TYPE = 1101,
  SEND_VERIFICATION_CODE_FAILED = 1102,
  INVALID_VERIFICATION_CODE = 1103,
  VERIFY_CODE_FAILED = 1104,
  ACCOUNT_NOT_ACTIVATED = 1105,
  PASSWORD_RESET_FAILED = 1106,
  VERIFICATION_CODE_NOT_FOUND = 1107,
  INVALID_VERIFICATION_TOKEN = 1108,
}

export const ErrorCodeMessages: { [key: number]: string } = {
  // 通用
  [ErrorCode.USER_NOT_FOUND]: '用户不存在',
  [ErrorCode.SEND_EMAIL_FAILED]: '发送邮件失败',

  // 注册相关
  [ErrorCode.EMAIL_TAKEN]: '邮箱地址已经存在',
  [ErrorCode.REGISTRATION_FAILED]: '注册失败',
  [ErrorCode.INVALID_ACTIVATION_TOKEN]: '激活凭据无效或已过期',
  [ErrorCode.ACTIVATE_ACCOUNT_FAILED]:
    '服务端数据异常，请返回注册页手动填写邮件地址后再重新发送激活邮件',
  [ErrorCode.ACCOUNT_ALREADY_ACTIVATED]: '账号已存在并激活，请返回登录页面登录',
  [ErrorCode.RESEND_ACTIVATION_EMAIL_FAILED]: '发送激活邮件失败',
  [ErrorCode.ACCOUNT_PENDING_ACTIVATION]:
    '账号已存在，无法重复注册，完成激活操作即可登录',
  [ErrorCode.ACTIVATION_TOKEN_NOT_FOUND]: '激活凭据不存在',

  // 忘记密码相关
  [ErrorCode.INVALID_VERIFICATION_CODE_TYPE]: '无效的验证码类型',
  [ErrorCode.SEND_VERIFICATION_CODE_FAILED]: '发送验证码失败',
  [ErrorCode.INVALID_VERIFICATION_CODE]: '验证码无效或已过期',
  [ErrorCode.VERIFY_CODE_FAILED]: '验证失败',
  [ErrorCode.ACCOUNT_NOT_ACTIVATED]: '用户未激活，请先激活账户',
  [ErrorCode.PASSWORD_RESET_FAILED]: '密码重置失败',
  [ErrorCode.VERIFICATION_CODE_NOT_FOUND]: '验证码不存在',
  [ErrorCode.INVALID_VERIFICATION_TOKEN]: '验证凭据无效或已过期',
}
