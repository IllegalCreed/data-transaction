import type { RegistrationInfo } from '@/types/register'
import type { ILogin } from '@/types/login'
import * as javaMail from './java/mail'
import * as nestMail from './nest/mail'
import * as javaRegister from './java/register'
import * as nestRegister from './nest/register'
import * as javaForgot from './java/forgot'
import * as nestForgot from './nest/forgot'
import * as javaLogin from './java/login'
import * as nestLogin from './nest/login'
import * as javaCaptcha from './java/captcha'
import * as nestCaptcha from './nest/captcha'
import * as javaInfo from './java/info'
import * as nestInfo from './nest/info'
import type { VerificationCodes } from '@/constants/mapData/mail'

interface IMailAPI {
  sendVerificationCode: (
    email: string,
    type: VerificationCodes,
  ) => Promise<unknown>
  verifyCode: (
    email: string,
    code: string,
    type: VerificationCodes,
  ) => Promise<unknown>
}

interface IRegisterAPI {
  register: (registerInfo: RegistrationInfo) => Promise<unknown>
  activateAccount: (token: string) => Promise<unknown>
  tokenExchangeEmail?: (token: string) => Promise<unknown> // java 需要用 token 换取邮箱，nest 在 activateAccount 失败时直接返回 email，所以不需要该接口
  reSendActivationEmail: (email: string) => Promise<unknown>
  getRegisterAds?: () => Promise<unknown> // 目前后台不支持自定义广告
}

interface IForgotAPI {
  resetPasswordByToken: (token: string, password: string) => Promise<unknown>
  getForgotAds?: () => Promise<unknown> // 目前后台不支持自定义广告
}

interface ILoginAPI {
  login: (login: ILogin) => Promise<unknown>
  checkCaptcha: (email: string) => Promise<unknown>
  getLoginAds?: () => Promise<unknown> // 目前后台不支持自定义广告
}

interface ICaptcha {
  getCaptcha: () => Promise<unknown>
}

interface IInfoAPI {
  getInfo: () => Promise<unknown>
  editInfo: () => Promise<unknown>
}

type AccountAPIType = IMailAPI &
  IRegisterAPI &
  IForgotAPI &
  ILoginAPI &
  ICaptcha &
  IInfoAPI

const javaAPI: AccountAPIType = {
  ...javaMail,
  ...javaRegister,
  ...javaForgot,
  ...javaLogin,
  ...javaCaptcha,
  ...javaInfo,
}

const nestAPI: AccountAPIType = {
  ...nestMail,
  ...nestRegister,
  ...nestForgot,
  ...nestLogin,
  ...nestCaptcha,
  ...nestInfo,
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
  checkCaptcha,
  getLoginAds,
  getCaptcha,
  getInfo,
  editInfo,
} = accountAPI
