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
}

export const ErrorCodeMessages: { [key in ErrorCode]: string } = {
  // 通用
  [ErrorCode.USER_NOT_FOUND]: 'User does not exist.',
  [ErrorCode.SEND_EMAIL_FAILED]: 'Failed to send email.',

  // 注册相关
  [ErrorCode.EMAIL_TAKEN]: 'Email is already taken.',
  [ErrorCode.REGISTRATION_FAILED]:
    'Registration failed due to unexpected error.',
  [ErrorCode.INVALID_ACTIVATION_TOKEN]:
    'Activation token is invalid or has expired.',
  [ErrorCode.ACTIVATE_ACCOUNT_FAILED]:
    'Activation failed due to unexpected error.',
  [ErrorCode.ACCOUNT_ALREADY_ACTIVATED]: 'Account is already activated.',
  [ErrorCode.RESEND_ACTIVATION_EMAIL_FAILED]:
    'Failed to resend activation email.',
};
