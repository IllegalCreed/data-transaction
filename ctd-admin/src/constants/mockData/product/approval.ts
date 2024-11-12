import type { IRejectReason } from '@/types/approval'

export const lastReason: IRejectReason = {
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
