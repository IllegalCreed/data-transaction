import type { TableColumnCtx } from 'element-plus'

export interface ISort {
  columns: {
    key: string
    label: string
  }
  order?: 'asc' | 'desc'
}

export interface ISortDTO {
  key: string
  order?: 'asc' | 'desc'
}

export interface IFilter {
  columns: {
    key: string
    label: string
    type: 'enum' | 'date' | 'input'
  }
  value?: string | [string, string]
  options?: {
    // 当 type 为 'enum' 时，可能会有 options
    label: string
    value: string | number
  }[]
}

export interface IFilterDTO {
  key: string
  type: 'enum' | 'date' | 'input'
  value?: string | [string, string]
}

export interface ITableColumn<T> {
  prop: keyof T
  label: string
  width?: string
  minWidth?: string
  slot?: string
  align?: 'left' | 'center' | 'right'
  showOverflowTooltip?: boolean
  formatter?: (row: T, column: TableColumnCtx<T>) => string
}
