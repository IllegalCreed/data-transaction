import { activeStatusOptions } from '@/constants/mapData'
import type { INewsItem } from '@/types/news'
import type { IFilter, ISort, ITableColumn } from '@/types/table'

export const sortList: ISort<INewsItem>[] = [
  {
    prop: 'title',
    order: undefined
  },
  {
    prop: 'author',
    order: undefined
  },
  {
    prop: 'readCount',
    order: undefined
  },
  {
    prop: 'status',
    order: undefined
  },
  {
    prop: 'publishedAt',
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

export const filterList: IFilter<INewsItem>[] = [
  {
    prop: 'title',
    type: 'input' as const
  },
  {
    prop: 'author',
    type: 'input' as const
  },
  {
    prop: 'readCount',
    type: 'number' as const,
    value: [null, null]
  },
  {
    prop: 'status',
    type: 'enum' as const,
    options: activeStatusOptions
  },
  {
    prop: 'publishedAt',
    type: 'date' as const
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

export const columnList: ITableColumn<INewsItem>[] = [
  { prop: 'title', minWidth: '200', visible: true },
  { prop: 'author', minWidth: '120', visible: true },
  { prop: 'readCount', minWidth: '100', visible: true },
  { prop: 'status', minWidth: '120', slot: 'status', visible: true },
  {
    prop: 'publishedAt',
    minWidth: '130',
    visible: true,
    formatter: (row: INewsItem) => {
      return dayjs(row.publishedAt).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    prop: 'createdAt',
    minWidth: '130',
    visible: true,
    formatter: (row: INewsItem) => {
      return dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    prop: 'updatedAt',
    minWidth: '130',
    visible: true,
    formatter: (row: INewsItem) => {
      return dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    }
  }
]
