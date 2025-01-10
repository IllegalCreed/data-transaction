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

  // 管理员相关
  ADMIN_ALREADY_EXISTS = 5001,
  CREATE_ADMIN_FAILED = 5002,
  UPDATE_ADMIN_PASSWORD_FAILED = 5003,
  GET_ADMIN_NAME_FAILED = 5004
}

export const ErrorCodeMessages: { [key: number]: string } = {
  // 通用
  [ErrorCode.INVALID_CREDENTIALS]: '身份验证失败',
  [ErrorCode.SEND_EMAIL_FAILED]: '发送邮件失败',
  [ErrorCode.ACCOUNT_SUSPENDED]: '账户已冻结',
  [ErrorCode.USER_NOT_FOUND]: '未找到用户',

  // 注册相关
  [ErrorCode.EMAIL_TAKEN]: '邮箱地址已经存在',
  [ErrorCode.REGISTRATION_FAILED]: '注册失败',
  [ErrorCode.INVALID_ACTIVATION_TOKEN]: '激活凭据无效或已过期',
  [ErrorCode.ACTIVATE_ACCOUNT_FAILED]:
    '服务端数据异常，请返回注册页手动填写邮件地址后再重新发送激活邮件',
  [ErrorCode.ACCOUNT_ALREADY_ACTIVATED]: '账号已存在并激活，请返回登录页面登录',
  [ErrorCode.RESEND_ACTIVATION_EMAIL_FAILED]: '发送激活邮件失败',
  [ErrorCode.ACCOUNT_PENDING_ACTIVATION]: '账号已存在，无法重复注册，完成激活操作即可登录',
  [ErrorCode.ACTIVATION_TOKEN_NOT_FOUND]: '激活凭据不存在',

  // 忘记密码相关
  [ErrorCode.INVALID_VERIFICATION_TOKEN]: '验证凭据无效或已过期',
  [ErrorCode.PASSWORD_RESET_FAILED]: '密码重置失败',

  // 图片验证码相关
  [ErrorCode.GET_CAPTCHA_FAILED]: '获取图片验证码失败',
  [ErrorCode.GENERATE_CAPTCHA_FAILED]: '生成图片验证码失败',
  [ErrorCode.INVALID_CAPTCHA]: '验证码无效或已过期',
  [ErrorCode.CAPTCHA_INCORRECT]: '验证码错误',
  [ErrorCode.CAPTCHA_NOT_FOUND]: '验证码不存在',
  [ErrorCode.CAPTCHA_VERIFICATION_FAILED]: '验证失败',

  // 邮件验证码相关
  [ErrorCode.INVALID_VERIFICATION_CODE_TYPE]: '无效的验证码类型',
  [ErrorCode.SEND_VERIFICATION_CODE_FAILED]: '发送验证码失败',
  [ErrorCode.INVALID_VERIFICATION_CODE]: '验证码无效或已过期',
  [ErrorCode.VERIFY_CODE_FAILED]: '验证失败',
  [ErrorCode.VERIFICATION_CODE_NOT_FOUND]: '验证码不存在',

  // 登录相关
  [ErrorCode.CAPTCHA_REQUIRED]: '请填写验证码',
  [ErrorCode.GET_LOGIN_LOG_FAILED]: '获取登录日志失败',
  [ErrorCode.LOGIN_LOG_NOT_FOUND]: '登录日志未找到',
  [ErrorCode.CREATE_LOGIN_LOG_FAILED]: '创建登录日志失败',
  [ErrorCode.LOGIN_FAILED]: '登录失败',
  [ErrorCode.RESET_USER_STATUS_FAILED]: '重置用户状态失败',

  // 用户相关
  [ErrorCode.GET_USERINFO_FAILED]: '获取用户信息失败',
  [ErrorCode.UPDATE_USER_AVATAR_FAILED]: '更新用户头像失败',
  [ErrorCode.UPDATE_USER_FAILED]: '更新用户信息失败',

  // 管理员相关
  [ErrorCode.ADMIN_ALREADY_EXISTS]: '管理员已存在',
  [ErrorCode.CREATE_ADMIN_FAILED]: '创建管理员失败',
  [ErrorCode.UPDATE_ADMIN_PASSWORD_FAILED]: '更新管理员密码失败',
  [ErrorCode.GET_ADMIN_NAME_FAILED]: '获取管理员姓名失败'
}
