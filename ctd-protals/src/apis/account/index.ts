import type { RegistrationInfo } from '@/types/register'
import type { ILogin } from '@/types/login'
import * as javaRegister from './java/register'
import * as nestRegister from './nest/register'
import * as javaForgot from './java/forgot'
import * as nestForgot from './nest/forgot'
import * as javaLogin from './java/login'
import * as nestLogin from './nest/login'

interface IRegisterAPI {
  register: (registerInfo: RegistrationInfo) => Promise<unknown>
  activateAccount: (token: string) => Promise<unknown>
  tokenExchangeEmail?: (token: string) => Promise<unknown> // java 需要用 token 换取邮箱，nest 在 activateAccount 失败时直接返回 email，所以不需要该接口
  reSendActivationEmail: (email: string) => Promise<unknown>
  getRegisterAds?: () => Promise<unknown> // 目前后台不支持自定义广告
}

interface IForgotAPI {
  sendVerificationCode: (email: string) => Promise<unknown>
  verifyCode: (email: string, code: string) => Promise<unknown>
  resetPasswordByToken: (token: string, password: string) => Promise<unknown>
  getForgotAds?: () => Promise<unknown> // 目前后台不支持自定义广告
}

interface ILoginAPI {
  login: (login: ILogin) => Promise<unknown>
  getCode: () => Promise<unknown>
  getLoginAds?: () => Promise<unknown> // 目前后台不支持自定义广告
}

type AccountAPIType = IRegisterAPI & IForgotAPI & ILoginAPI

const javaAPI: AccountAPIType = {
  ...javaRegister,
  ...javaForgot,
  ...javaLogin,
}

const nestAPI: AccountAPIType = {
  ...nestRegister,
  ...nestForgot,
  ...nestLogin,
}

const accountAPI: AccountAPIType =
  import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const {
  register,
  activateAccount,
  tokenExchangeEmail,
  reSendActivationEmail,
  getRegisterAds,
  sendVerificationCode,
  verifyCode,
  resetPasswordByToken,
  getForgotAds,
  login,
  getCode,
  getLoginAds,
} = accountAPI
