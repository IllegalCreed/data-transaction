import type { PartnerTypes } from '@/constants/mapData/company'
import type { ICompanyDTO } from '@/types/company'
import type { ActiveStatus } from '@/constants/mapData'
import * as javaCompany from './java/company'
import * as nestCompany from './nest/company'

interface ICompanyAPI {
  getCompanies: (
    searchQuery: string,
    status: ActiveStatus | null,
    partnerType: PartnerTypes | null,
    isShowInFooter: boolean | null,
    pageNum: number,
    pageSize: number
  ) => Promise<unknown>
  getCompany: (id: string | number) => Promise<unknown>
  upsertCompany: (id: string | number, companyInfo: ICompanyDTO) => Promise<unknown>
  changeCompaniesStatus: (ids: (string | number)[], status: ActiveStatus) => Promise<unknown>
  deleteCompanies: (ids: (string | number)[]) => Promise<unknown>
  getCompanyOptionsByName: (searchQuery: string) => Promise<unknown>
  getCompanyOptionsByID: (id: string | number) => Promise<unknown>
}

type CompanyAPIType = ICompanyAPI

const javaAPI: CompanyAPIType = {
  ...javaCompany
}

const nestAPI: CompanyAPIType = {
  ...nestCompany
}

const companyAPI: CompanyAPIType = import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const {
  getCompanies,
  getCompany,
  upsertCompany,
  changeCompaniesStatus,
  deleteCompanies,
  getCompanyOptionsByName,
  getCompanyOptionsByID
} = companyAPI
