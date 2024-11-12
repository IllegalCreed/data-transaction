import * as javaBusiness from './java/business'
import * as nestBusiness from './nest/business'

interface IBusinessAPI {
  getBusinessOptionsByName: (searchQuery: string) => Promise<unknown>
}

type BusinessAPIType = IBusinessAPI

const javaAPI: BusinessAPIType = {
  ...javaBusiness
}

const nestAPI: BusinessAPIType = {
  ...nestBusiness
}

const businessAPI: BusinessAPIType = import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const { getBusinessOptionsByName } = businessAPI
