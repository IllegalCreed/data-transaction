export interface ISortItem {
  id: string
  label: string
  supportsToggle: boolean
}

export interface ISortValue {
  sortType: string
  order: 'asc' | 'desc'
}
