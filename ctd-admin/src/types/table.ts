import type { TableColumnCtx } from 'element-plus'
import type { IOption } from './common'

export interface ISort<T> {
  prop: keyof T
  order?: 'asc' | 'desc'
}

// export interface IFilter<T> {
//   prop: keyof T
//   type: 'enum' | 'date' | 'input' | 'boolean' | 'number'
//   value?:
//     | string
//     | [string, string]
//     | Array<string>
//     | boolean
//     | [number | undefined, number | undefined]
//   options?: {
//     // 当 type 为 'enum' 时，可能会有 options
//     label: string
//     value: string | number
//   }[]
// }

export type FilterType = 'input' | 'enum' | 'date' | 'boolean' | 'number'

// 基础筛选接口，包含所有筛选类型共有的字段
interface BaseFilter<T> {
  prop: keyof T
  type: FilterType
}

// 输入类型筛选
export interface InputFilter<T> extends BaseFilter<T> {
  type: 'input'
  value?: string
}

// 枚举类型筛选
export interface EnumFilter<T> extends BaseFilter<T> {
  type: 'enum'
  value?: Array<string | number>
  options?: IOption[]
}

// 日期类型筛选
export interface DateFilter<T> extends BaseFilter<T> {
  type: 'date'
  value?: [string, string] // [start, end]
}

// 布尔类型筛选
export interface BooleanFilter<T> extends BaseFilter<T> {
  type: 'boolean'
  value?: boolean
}

// 数值类型筛选
export interface NumberFilter<T> extends BaseFilter<T> {
  type: 'number'
  value: [number | null, number | null] // [min, max]
}

// 组合所有筛选类型
export type IFilter<T> =
  | InputFilter<T>
  | EnumFilter<T>
  | DateFilter<T>
  | BooleanFilter<T>
  | NumberFilter<T>

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

export type ITableColumnDTO<T> = Omit<
  ITableColumn<T>,
  'width|minWidth|slot|align|showOverflowTooltip|formatter'
>
