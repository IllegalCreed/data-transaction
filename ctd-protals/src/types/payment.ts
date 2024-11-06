export interface IPaymentLog {
  id: string
  orderNumber: string
  amount: number
  type: PaymentType
  remark: string
  createTime: string
}

export enum PaymentType {
  Deposit = 'Deposit', // 充值
  Refund = 'Refund', // 退款
  Freeze = 'Freeze', // 冻结
  Payment = 'Payment', // 支付
}

export const PAYMENT_TYPE_MAP = {
  [PaymentType.Deposit]: '充值',
  [PaymentType.Refund]: '退款',
  [PaymentType.Freeze]: '冻结',
  [PaymentType.Payment]: '支付',
}

export const PAYMENT_TYPE_COLOR_MAP = {
  [PaymentType.Deposit]: '#54D322', // 绿色
  [PaymentType.Refund]: '#EF3939', // 红色
  [PaymentType.Freeze]: '#FF8C2F', // 橙色
  [PaymentType.Payment]: '#386CE1', // 蓝色
}
