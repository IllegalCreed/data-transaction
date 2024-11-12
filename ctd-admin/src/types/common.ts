export interface apiListResult<T> {
  rows: T[]
  total: number
}

export interface IOption {
  value: string | number
  label: string
}

export interface IFile {
  fileName: string
  url: string
}
