import type { ISortItem } from '@/types/sorting'

export const sortingSource: ISortItem[] = [
  { id: 'comprehensive', label: '综合', supportsToggle: false },
  { id: 'time', label: '发布时间', supportsToggle: true },
  { id: 'budget', label: '预算', supportsToggle: true }
]
