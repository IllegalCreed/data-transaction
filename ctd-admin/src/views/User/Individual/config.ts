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

export const columnList: ITableColumn<IIndividualUserItem>[] = [
  { prop: 'email', minWidth: '200', visible: true },
  { prop: 'fullName', minWidth: '120', visible: true },
  { prop: 'identificationNumber', minWidth: '200', visible: true },
  { prop: 'phoneNumber', minWidth: '180', visible: true },
  { prop: 'gender', minWidth: '120', slot: 'gender', visible: true },
  { prop: 'status', minWidth: '120', slot: 'status', visible: true },
  { prop: 'createTime', minWidth: '130', visible: true },
  { prop: 'updateTime', minWidth: '130', visible: true }
]
