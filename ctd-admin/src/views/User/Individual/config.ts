import { userStatusOptions, genderTypesOptions } from '@/constants/mapData/user'
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
    prop: 'identificationNumber',
    order: undefined
  },
  {
    prop: 'phoneNumber',
    order: undefined
  },
  {
    prop: 'gender',
    order: undefined
  },
  {
    prop: 'status',
    order: undefined
  },
  {
    prop: 'createTime',
    order: undefined
  },
  {
    prop: 'updateTime',
    order: undefined
  }
]

export const filterList: IFilter<IIndividualUserItem>[] = [
  {
    prop: 'email',
    type: 'input' as const
  },
  {
    prop: 'fullName',
    type: 'input' as const
  },
  {
    prop: 'identificationNumber',
    type: 'input' as const
  },
  {
    prop: 'phoneNumber',
    type: 'input' as const
  },
  {
    prop: 'gender',
    type: 'enum' as const,
    options: genderTypesOptions
  },
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
    prop: 'updateTime',
    type: 'date' as const
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
