import {
  companySizeTypesOptions,
  industryTypesOptions,
  userStatusOptions
} from '@/constants/mapData/user'
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
    prop: 'registrationNumber',
    order: undefined
  },
  {
    prop: 'contactPersonName',
    order: undefined
  },
  {
    prop: 'contactPhoneNumber',
    order: undefined
  },
  {
    prop: 'industryType',
    order: undefined
  },
  {
    prop: 'companySize',
    order: undefined
  },
  {
    prop: 'status',
    order: undefined
  },
  {
    prop: 'createdAt',
    order: undefined
  },
  {
    prop: 'updatedAt',
    order: undefined
  }
]

export const filterList: IFilter<IEnterpriseUserItem>[] = [
  {
    prop: 'email',
    type: 'input' as const
  },
  {
    prop: 'enterpriseName',
    type: 'input' as const
  },
  {
    prop: 'registrationNumber',
    type: 'input' as const
  },
  {
    prop: 'contactPersonName',
    type: 'input' as const
  },
  {
    prop: 'contactPhoneNumber',
    type: 'input' as const
  },
  {
    prop: 'industryType',
    type: 'enum' as const,
    options: industryTypesOptions
  },
  {
    prop: 'companySize',
    type: 'enum' as const,
    options: companySizeTypesOptions
  },
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
    prop: 'updatedAt',
    type: 'date' as const
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
  {
    prop: 'createdAt',
    minWidth: '130',
    visible: true,
    formatter: (row: IEnterpriseUserItem) => {
      return dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    prop: 'updatedAt',
    minWidth: '130',
    visible: true,
    formatter: (row: IEnterpriseUserItem) => {
      return dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    }
  }
]
