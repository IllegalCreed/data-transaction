import type { ILogin } from '@/types/login'
import * as javaLogin from './java/login'
import * as nestLogin from './nest/login'
import * as javaAccount from './java/account'
import * as nestAccount from './nest/account'

interface ILoginAPI {
  login: (login: ILogin) => Promise<unknown>
  getCode: () => Promise<unknown>
  logout: () => Promise<unknown>
}

interface IAccountAPI {
  resetPwd: (oldPwd: string, newPwd: string) => Promise<unknown>
}

type AccountAPIType = ILoginAPI & IAccountAPI

const javaAPI: AccountAPIType = {
  ...javaLogin,
  ...javaAccount
}

const nestAPI: AccountAPIType = {
  ...nestLogin,
  ...nestAccount
}

const accountAPI: AccountAPIType = import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const { login, getCode, logout, resetPwd } = accountAPI
