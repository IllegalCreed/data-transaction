import type { IIndividualUserInfo, RegistrationInfo } from '@/types/register'
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
import * as javaChangePassword from './java/changePassword'
import * as nestChangePassword from './nest/changePassword'
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
  sendVerificationCodeAuth: (type: VerificationCodes) => Promise<unknown>
  verifyCodeAuth: (code: string, type: VerificationCodes) => Promise<unknown>
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
  logout?: () => Promise<unknown>
  checkCaptcha: (email: string) => Promise<unknown>
  getLoginAds?: () => Promise<unknown> // 目前后台不支持自定义广告
}

interface ICaptcha {
  getCaptcha: () => Promise<unknown>
}

interface IInfoAPI {
  getInfo: () => Promise<unknown>
  editInfo: (userInfo: IIndividualUserInfo) => Promise<unknown>
  uploadAvatar: (file: File) => Promise<unknown>
}

interface IChangePasswordAPI {
  verifyPassword: (currentPassword: string, token: string) => Promise<unknown>
  changePassword: (newPassword: string, token: string) => Promise<unknown>
}

type AccountAPIType = IMailAPI &
  IRegisterAPI &
  IForgotAPI &
  ILoginAPI &
  ICaptcha &
  IInfoAPI &
  IChangePasswordAPI

const javaAPI: AccountAPIType = {
  ...javaMail,
  ...javaRegister,
  ...javaForgot,
  ...javaLogin,
  ...javaCaptcha,
  ...javaInfo,
  ...javaChangePassword,
}

const nestAPI: AccountAPIType = {
  ...nestMail,
  ...nestRegister,
  ...nestForgot,
  ...nestLogin,
  ...nestCaptcha,
  ...nestInfo,
  ...nestChangePassword,
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
  sendVerificationCodeAuth,
  verifyCodeAuth,
  resetPasswordByToken,
  getForgotAds,
  login,
  logout,
  checkCaptcha,
  getLoginAds,
  getCaptcha,
  getInfo,
  editInfo,
  uploadAvatar,
  verifyPassword,
  changePassword,
} = accountAPI
