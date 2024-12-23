import { userStatusOptions } from '@/constants/mapData/user'
import type { IFilter, ISort, ITableColumn } from '@/types/table'
import type { IEnterpriseUserItem } from '@/types/user'

export const sortList: ISort<IEnterpriseUserItem>[] = [
  {
    prop: 'email',
    order: undefined
  },
  {
    prop: 'enterpriseName',
    order: undefined
  },
  {
    prop: 'status',
    order: undefined
  }
]

export const filterList: IFilter<IEnterpriseUserItem>[] = [
  {
    prop: 'status',
    type: 'enum' as const,

    options: userStatusOptions
  },
  {
    prop: 'createdAt',
    type: 'date' as const
  },
  {
    prop: 'enterpriseName',
    type: 'input' as const
  }
]

export const columnList: ITableColumn<IEnterpriseUserItem>[] = [
  { prop: 'email', minWidth: '220', visible: true },
  { prop: 'enterpriseName', minWidth: '200', visible: true },
  { prop: 'registrationNumber', minWidth: '200', visible: true },
  { prop: 'contactPersonName', minWidth: '180', visible: true },
  { prop: 'contactPhoneNumber', minWidth: '120', visible: true },
  { prop: 'industryType', minWidth: '250', slot: 'industryType', visible: true },
  { prop: 'companySize', minWidth: '200', slot: 'companySize', visible: true },
  { prop: 'status', minWidth: '120', slot: 'status', visible: true },
  { prop: 'createdAt', minWidth: '130', visible: true },
  { prop: 'updatedAt', minWidth: '130', visible: true }
]
