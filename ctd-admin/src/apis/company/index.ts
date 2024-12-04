import * as javaCompany from './java/company'
import * as nestCompany from './nest/company'

interface ICompanyAPI {
  getCompanyOptionsByName: (searchQuery: string) => Promise<unknown>
}

type CompanyAPIType = ICompanyAPI

const javaAPI: CompanyAPIType = {
  ...javaCompany
}

const nestAPI: CompanyAPIType = {
  ...nestCompany
}

const companyAPI: CompanyAPIType = import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const { getCompanyOptionsByName } = companyAPI
