export interface IFilter {
  id: string
  label: string
  items: IFilterItem[]
}

export interface IFilterItem {
  id: string
  label: string
}
