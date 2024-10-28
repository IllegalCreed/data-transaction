export enum ErrorCode {
  // 注册相关
  USERNAME_TAKEN = 1001,
  EMAIL_TAKEN = 1002,
  WEAK_PASSWORD = 1003,
  INVALID_EMAIL_FORMAT = 1004,
  REGISTRATION_FAILED = 1005,
  // 激活相关
  RESEND_ACTIVATION_EMAIL_FAILED = 2001,
  ALREADY_ACTIVATED = 2002,
  USER_NOT_FOUND = 2003,
  ACTIVATION_TOKEN_HAS_EXPIRED = 2004,
  ACCOUNT_ALREADY_ACTIVATED = 2005,
  ACTIVATE_ACCOUNT_FAILED = 2006,
  // 省略其他错误码定义
}

export const ErrorCodeMessages: { [key in ErrorCode]: string } = {
  // 注册相关
  [ErrorCode.USERNAME_TAKEN]: 'Username is already taken.',
  [ErrorCode.EMAIL_TAKEN]: 'Email is already taken.',
  [ErrorCode.WEAK_PASSWORD]: 'Password does not meet strength requirements.',
  [ErrorCode.INVALID_EMAIL_FORMAT]: 'Invalid email format.',
  [ErrorCode.REGISTRATION_FAILED]:
    'Registration failed due to unexpected error.',
  // 激活相关
  [ErrorCode.RESEND_ACTIVATION_EMAIL_FAILED]:
    'Failed to resend activation email due to an unexpected error.',
  [ErrorCode.ALREADY_ACTIVATED]: 'The account is already activated.',
  [ErrorCode.USER_NOT_FOUND]: 'No such user with the given email.',
  [ErrorCode.ACTIVATION_TOKEN_HAS_EXPIRED]:
    'Activation token is invalid or has expired.',
  [ErrorCode.ACCOUNT_ALREADY_ACTIVATED]: 'Account is already activated.',
  [ErrorCode.ACTIVATE_ACCOUNT_FAILED]:
    'Activation failed due to unexpected error.',
  // 省略其他错误消息
};
