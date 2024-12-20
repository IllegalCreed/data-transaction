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

export const columns = ref<ITableColumn<IEnterpriseUserItem>[]>([
  { prop: 'email', minWidth: '220' },
  { prop: 'enterpriseName', width: '200' },
  { prop: 'registrationNumber', width: '200' },
  { prop: 'contactPersonName', width: '180' },
  { prop: 'contactPhoneNumber', width: '120' },
  { prop: 'industryType', width: '250', slot: 'industryType' },
  { prop: 'companySize', width: '200', slot: 'companySize' },
  { prop: 'status', width: '120', slot: 'status' },
  { prop: 'createTime', width: '130' },
  { prop: 'updateTime', width: '130' }
])
