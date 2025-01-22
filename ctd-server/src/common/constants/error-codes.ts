export enum ErrorCode {
  // 通用
  INVALID_CREDENTIALS = 9001,
  SEND_EMAIL_FAILED = 9002,
  ACCOUNT_SUSPENDED = 9003,
  USER_NOT_FOUND = 9004,

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
  CAPTCHA_REQUIRED = 1401,
  GET_LOGIN_LOG_FAILED = 1402,
  LOGIN_LOG_NOT_FOUND = 1403,
  CREATE_LOGIN_LOG_FAILED = 1404,
  LOGIN_FAILED = 1405,
  RESET_USER_STATUS_FAILED = 1406,

  // 用户相关
  GET_USERINFO_FAILED = 1501,
  UPDATE_USER_AVATAR_FAILED = 1502,
  UPDATE_USER_FAILED = 1503,

  // 修改密码相关
  VERIFY_PASSWORD_FAILED = 1601,
  CHANGE_PASSWORD_FAILED = 1602,

  // 修改验证邮箱相关
  RECOVERY_CODE_NOT_FOUND = 1701,
  GET_RECOVERY_CODE_FAILED = 1702,
  CHANGE_EMAIL_FAILED = 1703,

  // 管理员相关
  ADMIN_ALREADY_EXISTS = 5001,
  CREATE_ADMIN_FAILED = 5002,
  UPDATE_ADMIN_PASSWORD_FAILED = 5003,
  GET_ADMIN_NAME_FAILED = 5004,

  // 用户管理相关
  GET_USER_LIST_FAILED = 5102,
  GET_USER_DETAIL_FAILED = 5103,
  UPDATE_USER_STATUS_FAILED = 5104,
  DELETE_USER_FAILED = 5105,

  // 公司管理相关
  GET_COMPANY_LIST_FAILED = 5201,
  UPSERT_COMPANY_FAILED = 5202,
  GET_COMPANY_DETAIL_FAILED = 5203,
  COMPANY_NOT_FOUND = 5204,
  UPDATE_COMPANY_STATUS_FAILED = 5205,
  DELETE_COMPANY_FAILED = 5206,
  GET_COMPANY_OPTIONS_BY_NAME_FAILED = 5207,
  GET_COMPANY_OPTIONS_BY_ID_FAILED = 5208,

  // 场景管理相关
  GET_SCENE_LIST_FAILED = 5301,
  GET_SCENE_OPTIONS_BY_TITLE_FAILED = 5302,
  GET_SCENE_OPTIONS_BY_ID_FAILED = 5303,
  SCENE_NOT_FOUND = 5304,
}

export const ErrorCodeMessages: { [key in ErrorCode]: string } = {
  // 通用
  [ErrorCode.INVALID_CREDENTIALS]: 'Invalid credentials.',
  [ErrorCode.SEND_EMAIL_FAILED]: 'Failed to send email.',
  [ErrorCode.ACCOUNT_SUSPENDED]: 'Account is suspended.',
  [ErrorCode.USER_NOT_FOUND]: 'User not found.',

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
  [ErrorCode.PASSWORD_RESET_FAILED]:
    'Password reset failed due to unexpected error.',
  [ErrorCode.INVALID_VERIFICATION_TOKEN]:
    'Verification token is invalid or has expired.',

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
  [ErrorCode.INVALID_VERIFICATION_CODE_TYPE]: 'Invalid verification code type.',
  [ErrorCode.SEND_VERIFICATION_CODE_FAILED]:
    'Failed to send verification code.',
  [ErrorCode.INVALID_VERIFICATION_CODE]:
    'Verification code is invalid or has expired.',
  [ErrorCode.VERIFY_CODE_FAILED]: 'Verify code failed due to unexpected error.',
  [ErrorCode.VERIFICATION_CODE_NOT_FOUND]: 'Verification code not found.',

  // 登录相关
  [ErrorCode.GET_LOGIN_LOG_FAILED]:
    'Get login log failed due to unexpected error.',
  [ErrorCode.LOGIN_LOG_NOT_FOUND]: 'Login log not found.',
  [ErrorCode.CREATE_LOGIN_LOG_FAILED]:
    'Create login log failed due to unexpected error.',
  [ErrorCode.LOGIN_FAILED]: 'Login failed due to unexpected error.',
  [ErrorCode.CAPTCHA_REQUIRED]: 'Captcha is required.',
  [ErrorCode.RESET_USER_STATUS_FAILED]:
    'Reset user status failed due to unexpected error.',

  // 用户相关
  [ErrorCode.GET_USERINFO_FAILED]:
    'Get user info failed due to unexpected error.',
  [ErrorCode.UPDATE_USER_AVATAR_FAILED]:
    'Update user avatar failed due to unexpected error.',
  [ErrorCode.UPDATE_USER_FAILED]: 'Update user failed due to unexpected error.',

  // 修改密码相关
  [ErrorCode.VERIFY_PASSWORD_FAILED]:
    'Verify password failed due to unexpected error.',
  [ErrorCode.CHANGE_PASSWORD_FAILED]:
    'Change password failed due to unexpected error.',

  // 修改验证邮箱相关
  [ErrorCode.RECOVERY_CODE_NOT_FOUND]: 'Recovery code not found.',
  [ErrorCode.GET_RECOVERY_CODE_FAILED]:
    'Get recovery code failed due to unexpected error.',
  [ErrorCode.CHANGE_EMAIL_FAILED]:
    'Change email failed due to unexpected error.',

  // 管理员相关
  [ErrorCode.ADMIN_ALREADY_EXISTS]: 'Admin already exists.',
  [ErrorCode.CREATE_ADMIN_FAILED]:
    'Create admin failed due to unexpected error.',
  [ErrorCode.UPDATE_ADMIN_PASSWORD_FAILED]:
    'Update admin password failed due to unexpected error.',
  [ErrorCode.GET_ADMIN_NAME_FAILED]:
    'Get admin name failed due to unexpected error.',

  // 用户管理相关
  [ErrorCode.GET_USER_LIST_FAILED]:
    'Get user list failed due to unexpected error.',
  [ErrorCode.GET_USER_DETAIL_FAILED]:
    'Get user detail failed due to unexpected error.',
  [ErrorCode.UPDATE_USER_STATUS_FAILED]:
    'Update user status failed due to unexpected error.',
  [ErrorCode.DELETE_USER_FAILED]: 'Delete user failed due to unexpected error.',

  // 公司管理相关
  [ErrorCode.GET_COMPANY_LIST_FAILED]:
    'Get company list failed due to unexpected error.',
  [ErrorCode.UPSERT_COMPANY_FAILED]:
    'Upsert company failed due to unexpected error.',
  [ErrorCode.GET_COMPANY_DETAIL_FAILED]:
    'Get company detail failed due to unexpected error.',
  [ErrorCode.COMPANY_NOT_FOUND]: 'Company not found.',
  [ErrorCode.UPDATE_COMPANY_STATUS_FAILED]:
    'Update company status failed due to unexpected error.',
  [ErrorCode.DELETE_COMPANY_FAILED]:
    'Delete company failed due to unexpected error.',
  [ErrorCode.GET_COMPANY_OPTIONS_BY_NAME_FAILED]:
    'Get company options by name failed due to unexpected error.',
  [ErrorCode.GET_COMPANY_OPTIONS_BY_ID_FAILED]:
    'Get company options by id failed due to unexpected error.',

  // 场景管理相关
  [ErrorCode.GET_SCENE_LIST_FAILED]:
    'Get scene list failed due to unexpected error.',
  [ErrorCode.GET_SCENE_OPTIONS_BY_TITLE_FAILED]:
    'Get scene options by title failed due to unexpected error.',
  [ErrorCode.GET_SCENE_OPTIONS_BY_ID_FAILED]:
    'Get scene options by id failed due to unexpected error.',
  [ErrorCode.SCENE_NOT_FOUND]: 'Scene not found.',
};
