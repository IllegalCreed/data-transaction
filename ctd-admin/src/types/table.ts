import type { TableColumnCtx } from 'element-plus'

export interface ISort<T> {
  prop: keyof T
  order?: 'asc' | 'desc'
}

export interface IFilter<T> {
  prop: keyof T
  type: 'enum' | 'date' | 'input'
  value?: string | [string, string]
  options?: {
    // 当 type 为 'enum' 时，可能会有 options
    label: string
    value: string | number
  }[]
}

export type IFilterDTO<T> = Omit<IFilter<T>, 'options'>

export interface ITableColumn<T> {
  prop: keyof T
  width?: string
  minWidth?: string
  slot?: string
  align?: 'left' | 'center' | 'right'
  showOverflowTooltip?: boolean
  formatter?: (row: T, column: TableColumnCtx<T>) => string
  visible: boolean
}
