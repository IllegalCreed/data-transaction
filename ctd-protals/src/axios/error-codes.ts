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
}

export const ErrorCodeMessages: { [key: number]: string } = {
  // 通用
  [ErrorCode.USER_NOT_FOUND]: '用户不存在',
  [ErrorCode.SEND_EMAIL_FAILED]: '发送邮件失败',

  // 注册相关
  [ErrorCode.EMAIL_TAKEN]: '邮箱地址已经存在',
  [ErrorCode.REGISTRATION_FAILED]: '注册失败',
  [ErrorCode.INVALID_ACTIVATION_TOKEN]: '激活凭据无效或已过期',
  [ErrorCode.ACTIVATE_ACCOUNT_FAILED]: '激活失败',
  [ErrorCode.ACCOUNT_ALREADY_ACTIVATED]: '用户已激活',
  [ErrorCode.RESEND_ACTIVATION_EMAIL_FAILED]: '发送激活邮件失败',
  [ErrorCode.ACCOUNT_PENDING_ACTIVATION]: '用户已注册但未激活',
  [ErrorCode.ACTIVATION_TOKEN_NOT_FOUND]: '激活凭据不存在',
}
