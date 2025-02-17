import { activeStatusOptions } from '@/constants/mapData'
import { linkTypesOptions } from '@/constants/mapData/banner'
import type { IBannerItem } from '@/types/banner'
import type { IFilter, ISort, ITableColumn } from '@/types/table'

export const sortList: ISort<IBannerItem>[] = [
  {
    prop: 'title',
    order: undefined
  },
  {
    prop: 'linkType',
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

export const filterList: IFilter<IBannerItem>[] = [
  {
    prop: 'title',
    type: 'input' as const
  },
  {
    prop: 'linkType',
    type: 'enum' as const,
    options: linkTypesOptions
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

export const columnList: ITableColumn<IBannerItem>[] = [
  { prop: 'title', minWidth: '200', visible: true },
  { prop: 'linkType', minWidth: '120', slot: 'linkType', visible: true },
  { prop: 'status', minWidth: '120', slot: 'status', visible: true },
  {
    prop: 'createdAt',
    minWidth: '130',
    visible: true,
    formatter: (row: IBannerItem) => {
      return dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    prop: 'updatedAt',
    minWidth: '130',
    visible: true,
    formatter: (row: IBannerItem) => {
      return dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    }
  }
]
