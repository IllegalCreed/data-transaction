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
    prop: 'createTime',
    type: 'date' as const
  },
  {
    prop: 'enterpriseName',
    type: 'input' as const
  }
]

export const columnList: ITableColumn<IEnterpriseUserItem>[] = [
  { prop: 'email', minWidth: '220', visible: true },
  { prop: 'enterpriseName', width: '200', visible: true },
  { prop: 'registrationNumber', width: '200', visible: true },
  { prop: 'contactPersonName', width: '180', visible: true },
  { prop: 'contactPhoneNumber', width: '120', visible: true },
  { prop: 'industryType', width: '250', slot: 'industryType', visible: true },
  { prop: 'companySize', width: '200', slot: 'companySize', visible: true },
  { prop: 'status', width: '120', slot: 'status', visible: true },
  { prop: 'createTime', width: '130', visible: true },
  { prop: 'updateTime', width: '130', visible: true }
]
