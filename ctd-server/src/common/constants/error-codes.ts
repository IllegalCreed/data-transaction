export enum ErrorCode {
  // 通用错误码
  USER_NOT_FOUND = 9001,
  SEND_EMAIL_FAILED = 9002,

  // 注册相关
  EMAIL_TAKEN = 1001,
  REGISTRATION_FAILED = 1002,
  INVALID_ACTIVATION_TOKEN = 1003,
  ACTIVATE_ACCOUNT_FAILED = 1004,
  ACCOUNT_ALREADY_ACTIVATED = 1005,
  RESEND_ACTIVATION_EMAIL_FAILED = 106,
}

export const ErrorCodeMessages: { [key in ErrorCode]: string } = {
  // 通用错误码
  [ErrorCode.USER_NOT_FOUND]: '用户不存在.',
  [ErrorCode.SEND_EMAIL_FAILED]: 'Failed to send email.',
  [ErrorCode.EMAIL_TAKEN]: 'Email is already taken.',
  [ErrorCode.REGISTRATION_FAILED]:
    'Registration failed due to unexpected error.',
  [ErrorCode.INVALID_ACTIVATION_TOKEN]:
    'Activation token is invalid or has expired.',
  [ErrorCode.ACTIVATE_ACCOUNT_FAILED]:
    'Activation failed due to unexpected error.',
  [ErrorCode.ACCOUNT_ALREADY_ACTIVATED]: '用户已激活.',
  [ErrorCode.RESEND_ACTIVATION_EMAIL_FAILED]: '重新发送激活邮件失败.',
};
