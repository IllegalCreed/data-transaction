export interface IDemand {
  id: number
  name: string
  description: string
  publisher: string
  budget: number
  transactionMode: TransactionMode
  createTime: string
  status: string
  tags: string[]
}

// 定义招标类型
export type TenderType = '按项目' | '按时间'

// 定义交易模式类型
export type TransactionMode =
  | { type: '比稿' } // 比稿类型
  | { type: '招标'; tenderType: TenderType } // 招标类型
