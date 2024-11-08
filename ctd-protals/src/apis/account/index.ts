import type { RegistrationInfo } from '@/types/register'
import * as javaRegister from './java/register'
import * as nestRegister from './nest/register'

interface IRegisterAPI {
  register: (registerInfo: RegistrationInfo) => Promise<unknown>
  activateAccount: (token: string) => Promise<unknown>
  tokenExchangeEmail?: (token: string) => Promise<unknown> // java 需要用 token 换取邮箱，nest 在 activateAccount 失败时直接返回 email，所以不需要该接口
  reSendActivationEmail: (email: string) => Promise<unknown>
  getRegisterAds?: () => Promise<unknown> // 目前后台不支持自定义广告
}

const javaAPI: IRegisterAPI = {
  ...javaRegister,
}

const nestAPI: IRegisterAPI = {
  ...nestRegister,
}

const registerAPI: IRegisterAPI =
  import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const {
  register,
  activateAccount,
  tokenExchangeEmail,
  reSendActivationEmail,
  getRegisterAds,
} = registerAPI
