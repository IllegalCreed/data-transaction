import * as javaBanner from './java/banner'
import * as nestBanner from './nest/banner'
import * as javaPartner from './java/partner'
import * as nestPartner from './nest/partner'

interface IBannerAPI {
  getBanners: () => Promise<unknown>
}

interface IPartnerAPI {
  getTopPartner: () => Promise<unknown>
  getPartner: () => Promise<unknown>
}

type HomeAPIType = IBannerAPI & IPartnerAPI

const javaAPI: HomeAPIType = {
  ...javaBanner,
  ...javaPartner,
}

const nestAPI: HomeAPIType = {
  ...nestBanner,
  ...nestPartner,
}

const homeAPI: HomeAPIType =
  import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const { getBanners, getTopPartner, getPartner } = homeAPI
