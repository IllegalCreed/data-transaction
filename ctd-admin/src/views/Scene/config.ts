import { activeStatusOptions } from '@/constants/mapData'
import type { ISceneItem } from '@/types/scene'
import type { IFilter, ISort, ITableColumn } from '@/types/table'

export const sortList: ISort<ISceneItem>[] = [
  {
    prop: 'title',
    order: undefined
  },
  {
    prop: 'companyName',
    order: undefined
  },
  {
    prop: 'readCount',
    order: undefined
  },
  {
    prop: 'isOuterLink',
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

export const filterList: IFilter<ISceneItem>[] = [
  {
    prop: 'title',
    type: 'input' as const
  },
  {
    prop: 'companyName',
    type: 'input' as const
  },
  {
    prop: 'readCount',
    type: 'number' as const,
    value: [null, null]
  },
  {
    prop: 'isOuterLink',
    type: 'boolean' as const
  },
  {
    prop: 'status',
    type: 'enum' as const,
    options: activeStatusOptions
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

export const columnList: ITableColumn<ISceneItem>[] = [
  { prop: 'coverImageUrl', minWidth: '80', slot: 'coverImageUrl', visible: true },
  { prop: 'title', minWidth: '200', visible: true },
  { prop: 'companyName', minWidth: '200', visible: true },
  { prop: 'readCount', minWidth: '100', visible: true },
  { prop: 'isOuterLink', minWidth: '100', slot: 'isOuterLink', visible: true },
  { prop: 'status', minWidth: '120', slot: 'status', visible: true },
  {
    prop: 'createdAt',
    minWidth: '130',
    visible: true,
    formatter: (row: ISceneItem) => {
      return dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    prop: 'updatedAt',
    minWidth: '130',
    visible: true,
    formatter: (row: ISceneItem) => {
      return dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    }
  }
]
