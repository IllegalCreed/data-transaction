import type { ISortItem } from '@/types/sorting'

export const sortingSource: ISortItem[] = [
  { id: 'comprehensive', label: '综合', supportsToggle: false },
  { id: 'sales', label: '销量', supportsToggle: false },
  { id: 'time', label: '上架时间', supportsToggle: true },
  { id: 'price', label: '价格', supportsToggle: true }
]
