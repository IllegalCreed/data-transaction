import type { IFile } from './common'

export interface IRejectReason {
  id: number | string
  reason: string
  fileList: IFile[]
  createTime: string
}
