import { activeStatusOptions, boolenaTypesOptions } from '@/constants/mapData'
import { partnerTypesOptions } from '@/constants/mapData/company'
import type { ICompanyItem } from '@/types/company'
import type { IFilter, ISort, ITableColumn } from '@/types/table'

export const sortList: ISort<ICompanyItem>[] = [
  {
    prop: 'name',
    order: undefined
  },
  {
    prop: 'link',
    order: undefined
  },
  {
    prop: 'partnerType',
    order: undefined
  },
  {
    prop: 'isShowInFooter',
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

export const filterList: IFilter<ICompanyItem>[] = [
  {
    prop: 'name',
    type: 'input' as const
  },
  {
    prop: 'link',
    type: 'input' as const
  },
  {
    prop: 'isShowInFooter',
    type: 'enum' as const,
    options: boolenaTypesOptions
  },
  {
    prop: 'partnerType',
    type: 'enum' as const,
    options: partnerTypesOptions
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

export const columnList: ITableColumn<ICompanyItem>[] = [
  { prop: 'logoUrl', minWidth: '80', slot: 'logoUrl', visible: true },
  { prop: 'name', minWidth: '200', visible: true },
  { prop: 'link', minWidth: '200', visible: true },
  { prop: 'partnerType', minWidth: '150', slot: 'partnerType', visible: true },
  { prop: 'isShowInFooter', minWidth: '120', slot: 'isShowInFooter', visible: true },
  { prop: 'status', minWidth: '120', slot: 'status', visible: true },
  {
    prop: 'createdAt',
    minWidth: '130',
    visible: true,
    formatter: (row: ICompanyItem) => {
      return dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    prop: 'updatedAt',
    minWidth: '130',
    visible: true,
    formatter: (row: ICompanyItem) => {
      return dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    }
  }
]
