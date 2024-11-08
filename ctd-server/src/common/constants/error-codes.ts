export enum ErrorCode {
  // 注册相关
  EMAIL_TAKEN = 1001,
  REGISTRATION_FAILED = 1002,
  // 激活相关
  INVALID_ACTIVATION_TOKEN = 2001,
  ACTIVATE_ACCOUNT_FAILED = 2002,
  // 邮件相关
  SEND_EMAIL_FAILED = 3001,
}

export const ErrorCodeMessages: { [key in ErrorCode]: string } = {
  // 注册相关
  [ErrorCode.EMAIL_TAKEN]: 'Email is already taken.',
  [ErrorCode.REGISTRATION_FAILED]:
    'Registration failed due to unexpected error.',

  // 激活相关
  [ErrorCode.INVALID_ACTIVATION_TOKEN]:
    'Activation token is invalid or has expired.',
  [ErrorCode.ACTIVATE_ACCOUNT_FAILED]:
    'Activation failed due to unexpected error.',
  // 邮件相关
  [ErrorCode.SEND_EMAIL_FAILED]: 'Failed to send email.',
};
