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
  { prop: 'email', width: '200', visible: true },
  { prop: 'fullName', width: '120', visible: true },
  { prop: 'identificationNumber', width: '200', visible: true },
  { prop: 'phoneNumber', width: '180', visible: true },
  { prop: 'gender', width: '120', slot: 'gender', visible: true },
  { prop: 'status', width: '120', slot: 'status', visible: true },
  { prop: 'createTime', width: '130', visible: true },
  { prop: 'updateTime', width: '130', visible: true }
]
