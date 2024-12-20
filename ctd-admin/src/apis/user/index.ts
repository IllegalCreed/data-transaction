import type { UserStatus } from '@/constants/mapData/user'
import * as javaIndividual from './java/individual'
import * as nestIndividual from './nest/individual'
import * as javaEnterprise from './java/enterprise'
import * as nestEnterprise from './nest/enterprise'
import * as javaUser from './java/user'
import * as nestUser from './nest/user'
import type { IFilterDTO, ISort, ITableColumn } from '@/types/table'
import type { IEnterpriseUserItem, IIndividualUserItem } from '@/types/user'

interface IIndividualAPI {
  getIndividualUsers: (
    searchQuery: string,
    filters: IFilterDTO<IIndividualUserItem>[],
    sorts: ISort<IIndividualUserItem>[],
    columns: ITableColumn<IIndividualUserItem>[],
    pageNum: number,
    pageSize: number
  ) => Promise<unknown>
  getIndividualUser: (id: string | number) => Promise<unknown>
}

interface IEnterpriseAPI {
  getEnterpriseUsers: (
    searchQuery: string,
    filters: IFilterDTO<IEnterpriseUserItem>[],
    sorts: ISort<IEnterpriseUserItem>[],
    columns: ITableColumn<IEnterpriseUserItem>[],
    pageNum: number,
    pageSize: number
  ) => Promise<unknown>
  getEnterpriseUser: (id: string | number) => Promise<unknown>
}

interface IUserAPI {
  changeUsersStatus: (ids: (string | number)[], status: UserStatus) => Promise<unknown>
  deleteUsers: (ids: (string | number)[]) => Promise<unknown>
}

type UserAPIType = IIndividualAPI & IEnterpriseAPI & IUserAPI

const javaAPI: UserAPIType = {
  ...javaIndividual,
  ...javaEnterprise,
  ...javaUser
}

const nestAPI: UserAPIType = {
  ...nestIndividual,
  ...nestEnterprise,
  ...nestUser
}

const userAPI: UserAPIType = import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const {
  getIndividualUsers,
  getIndividualUser,
  getEnterpriseUsers,
  getEnterpriseUser,
  changeUsersStatus,
  deleteUsers
} = userAPI
