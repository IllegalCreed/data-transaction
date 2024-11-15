import type { IApprovalLog, IRejectReason } from '@/types/approval'

export const reason: IRejectReason = {
  id: 1,
  reason: '商品描述不清晰',
  createTime: '2022-01-01 00:00:00',
  fileList: [
    {
      fileName: '截图1.png',
      url: ''
    },
    {
      fileName: '截图2.png',
      url: ''
    },
    {
      fileName: '《审核流程及规范》.txt',
      url: ''
    },
    {
      fileName: '审核报告.docx',
      url: ''
    }
  ]
}

export const approvalLogs: IApprovalLog[] = [
  {
    id: 1,
    result: false,
    reasonId: 1,
    submitTime: '2022-01-01 00:00:00',
    approvalTime: '2022-01-01 00:00:00'
  },
  {
    id: 2,
    result: true,
    createVersion: 1,
    submitTime: '2022-01-01 00:00:00',
    approvalTime: '2022-01-01 00:00:00'
  },
  {
    id: 3,
    result: false,
    reasonId: 1,
    approvalTime: '2022-01-01 00:00:00'
  }
]
