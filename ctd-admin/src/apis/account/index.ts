import type { ILogin } from '@/types/login'
import * as javaLogin from './java/login'
import * as nestLogin from './nest/login'
import * as javaAccount from './java/account'
import * as nestAccount from './nest/account'
import * as javaCaptcha from './java/captcha'
import * as nestCaptcha from './nest/captcha'

interface ILoginAPI {
  login: (login: ILogin) => Promise<unknown>
  logout?: () => Promise<unknown>
}

interface IAccountAPI {
  resetPwd: (oldPwd: string, newPwd: string) => Promise<unknown>
}

interface ICaptcha {
  getCaptcha: () => Promise<unknown>
}

type AccountAPIType = ILoginAPI & IAccountAPI & ICaptcha

const javaAPI: AccountAPIType = {
  ...javaLogin,
  ...javaAccount,
  ...javaCaptcha
}

const nestAPI: AccountAPIType = {
  ...nestLogin,
  ...nestAccount,
  ...nestCaptcha
}

const accountAPI: AccountAPIType = import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const { login, logout, resetPwd, getCaptcha } = accountAPI
