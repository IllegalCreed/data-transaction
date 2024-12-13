export interface ICommonReturn<T> {
  code: number
  msg: string
  data: T
  rows: T[]
  total: number
}
