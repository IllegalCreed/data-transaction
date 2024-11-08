import { PaymentType, type IPaymentLog } from '@/types/payment'

export const paymentLogs: IPaymentLog[] = [
  {
    id: '1',
    orderNumber: 'ORD202309180001',
    amount: 500.0,
    type: PaymentType.Deposit, // 充值
    remark: '用户充值500元',
    createTime: '2023-09-18 09:00:00',
  },
  {
    id: '2',
    orderNumber: 'ORD202309180002',
    amount: -200.0,
    type: PaymentType.Freeze,
    remark: '订单金额冻结200元',
    createTime: '2023-09-18 10:00:00',
  },
  {
    id: '3',
    orderNumber: 'ORD202309180002',
    amount: -200.0,
    type: PaymentType.Payment, // 支付
    remark: '订单支付200元',
    createTime: '2023-09-18 11:00:00',
  },
  {
    id: '4',
    orderNumber: 'ORD202309180003',
    amount: 150.0,
    type: PaymentType.Refund, // 退款
    remark: '订单退款150元',
    createTime: '2023-09-18 12:00:00',
  },
]
