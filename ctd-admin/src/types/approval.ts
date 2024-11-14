import type { IFile } from './common'

export interface IRejectReason {
  id: number | string
  reason: string
  fileList: IFile[]
  createTime: string
}

export interface IApprovalLog {
  id: number | string
  result: boolean
  reasonId?: string | number
  createVersion?: string | number
  submitTime?: string
  approvalTime: string
}
