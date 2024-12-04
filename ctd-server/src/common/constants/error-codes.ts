export enum ErrorCode {
  // 通用
  INVALID_CREDENTIALS = 9001,
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
  PASSWORD_RESET_FAILED = 1101,
  INVALID_VERIFICATION_TOKEN = 1102,

  // 图片验证码相关
  GET_CAPTCHA_FAILED = 1201,
  GENERATE_CAPTCHA_FAILED = 1202,
  INVALID_CAPTCHA = 1203,
  CAPTCHA_INCORRECT = 1204,
  CAPTCHA_NOT_FOUND = 1205,
  CAPTCHA_VERIFICATION_FAILED = 1206,

  // 邮件验证码相关
  INVALID_VERIFICATION_CODE_TYPE = 1301,
  SEND_VERIFICATION_CODE_FAILED = 1302,
  INVALID_VERIFICATION_CODE = 1303,
  VERIFY_CODE_FAILED = 1304,
  VERIFICATION_CODE_NOT_FOUND = 1305,

  // 登录相关
  NEED_CAPTCHA = 1401,
  FREEZE_ACCOUNT = 1402,
}

export const ErrorCodeMessages: { [key in ErrorCode]: string } = {
  // 通用
  [ErrorCode.INVALID_CREDENTIALS]: 'Invalid credentials.',
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
  [ErrorCode.ACCOUNT_PENDING_ACTIVATION]: 'Account is pending activation.',
  [ErrorCode.ACTIVATION_TOKEN_NOT_FOUND]: 'Activation token not found.',

  // 忘记密码相关
  [ErrorCode.INVALID_VERIFICATION_CODE_TYPE]: 'Invalid verification code type.',
  [ErrorCode.SEND_VERIFICATION_CODE_FAILED]:
    'Failed to send verification code.',
  [ErrorCode.INVALID_VERIFICATION_CODE]:
    'Verification code is invalid or has expired.',
  [ErrorCode.VERIFY_CODE_FAILED]: 'Verify code failed due to unexpected error.',
  [ErrorCode.VERIFICATION_CODE_NOT_FOUND]: 'Verification code not found.',

  // 图片验证码相关
  [ErrorCode.GET_CAPTCHA_FAILED]: 'Get captcha failed due to unexpected error.',
  [ErrorCode.GENERATE_CAPTCHA_FAILED]:
    'Failed to generate captcha due to unexpected error.',
  [ErrorCode.INVALID_CAPTCHA]: 'Captcha is invalid or has expired.',
  [ErrorCode.CAPTCHA_INCORRECT]: 'Captcha is incorrect.',
  [ErrorCode.CAPTCHA_NOT_FOUND]: 'Captcha not found.',
  [ErrorCode.CAPTCHA_VERIFICATION_FAILED]:
    'Captcha verification failed due to unexpected error.',

  // 邮件验证码相关
  [ErrorCode.PASSWORD_RESET_FAILED]:
    'Password reset failed due to unexpected error.',
  [ErrorCode.INVALID_VERIFICATION_TOKEN]:
    'Verification token is invalid or has expired.',

  // 登录相关
  [ErrorCode.NEED_CAPTCHA]: 'Need captcha.',
  [ErrorCode.FREEZE_ACCOUNT]: 'Account is frozen.',
};
