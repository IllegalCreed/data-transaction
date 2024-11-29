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
  [ErrorCode.ACCOUNT_PENDING_ACTIVATION]: 'Account is pending activation.',
  [ErrorCode.ACTIVATION_TOKEN_NOT_FOUND]: 'Activation token not found.',

  // 忘记密码相关
  [ErrorCode.INVALID_VERIFICATION_CODE_TYPE]: 'Invalid verification code type.',
  [ErrorCode.SEND_VERIFICATION_CODE_FAILED]:
    'Failed to send verification code.',
  [ErrorCode.INVALID_VERIFICATION_CODE]:
    'Verification code is invalid or has expired.',
  [ErrorCode.VERIFY_CODE_FAILED]: 'Verify code failed due to unexpected error.',
  [ErrorCode.ACCOUNT_NOT_ACTIVATED]: 'Account is not activated.',
  [ErrorCode.PASSWORD_RESET_FAILED]:
    'Password reset failed due to unexpected error.',
  [ErrorCode.VERIFICATION_CODE_NOT_FOUND]: 'Verification code not found.',
};
