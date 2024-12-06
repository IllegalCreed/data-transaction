export enum TransactionMode {
  Pitch = 'pitch',
  Tender = 'tender',
}

export const TRANSACTION_MODE_MAP = {
  [TransactionMode.Pitch]: '比稿类型',
  [TransactionMode.Tender]: '招标类型',
}

export enum PayType {
  ByWorkTime = 'byWorkTime',
  ByFixedPrice = 'byFixedPrice',
}

export const PAY_TYPE_MAP = {
  [PayType.ByWorkTime]: '按工时',
  [PayType.ByFixedPrice]: '一口价',
}

// 定义交易模式类型
export type TransactionType =
  | { mode: TransactionMode.Pitch } // 比稿类型
  | { mode: TransactionMode.Tender; payType: PayType } // 招标类型

export interface IDemandBase {
  title: string
  description: string
  publisher: string
  budget: number | null
  transactionType: TransactionType
  expectedDeliveryDate: string
  tags: string[]
}

export interface IDemand extends IDemandBase {
  id: string | number
}

export interface IDemandDetail extends IDemandBase {
  createTime: string
}

export interface IDemandContent {
  content: string
  attachments: { name: string; url: string }[]
}

export interface IBaseInfo {
  title: string
  description: string
  detail: string
  completionTime: string
}
