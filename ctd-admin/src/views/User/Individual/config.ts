import { userStatusOptions } from '@/constants/mapData/user'
import type { IFilter, ISort, ITableColumn } from '@/types/table'
import type { IIndividualUserItem } from '@/types/user'

export const sortList: ISort<IIndividualUserItem>[] = [
  {
    prop: 'email',
    order: undefined
  },
  {
    prop: 'fullName',
    order: undefined
  },
  {
    prop: 'status',
    order: undefined
  }
]

export const filterList: IFilter<IIndividualUserItem>[] = [
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
    prop: 'fullName',
    type: 'input' as const
  }
]

export const columns = ref<ITableColumn<IIndividualUserItem>[]>([
  { prop: 'email', minWidth: '200' },
  { prop: 'fullName', width: '120' },
  { prop: 'identificationNumber', width: '200' },
  { prop: 'phoneNumber', width: '180' },
  { prop: 'gender', width: '120', slot: 'gender' },
  { prop: 'status', width: '120', slot: 'status' },
  { prop: 'createTime', width: '130' },
  { prop: 'updateTime', width: '130' }
])
