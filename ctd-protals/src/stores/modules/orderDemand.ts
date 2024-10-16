import {
  DemandActiveStatus,
  TransactionMode,
  type IOrderDemand,
  DemandOrderStatus,
  PayType
} from '@/types/demand'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useOrderDemandStore = defineStore('orderDemand', () => {
  const orderDemands = reactive<IOrderDemand[]>([
    {
      id: 1,
      title: '数据分析需求 A',
      budget: 5000,
      transactionType: { mode: TransactionMode.Tender, payType: PayType.ByFixedPrice },
      createTime: '2023-09-18 09:00:00',
      status: DemandOrderStatus.Pending, // 待审核
      activeStatus: DemandActiveStatus.Enabled, // 启用
      expectedDeliveryDate: '2023-09-26'
    },
    {
      id: 2,
      title: '数据可视化需求 B',
      budget: 3000,
      transactionType: { mode: TransactionMode.Pitch },
      createTime: '2023-09-19 10:30:00',
      status: DemandOrderStatus.Bidding, // 投标/竞标中
      activeStatus: DemandActiveStatus.Enabled, // 停用
      expectedDeliveryDate: '2023-09-26'
    },
    {
      id: 3,
      title: '机器学习模型需求 C',
      budget: 8000,
      transactionType: { mode: TransactionMode.Tender, payType: PayType.ByFixedPrice },
      createTime: '2023-09-20 14:15:00',
      status: DemandOrderStatus.Contract, // 合同协商
      activeStatus: DemandActiveStatus.Enabled, // 启用
      expectedDeliveryDate: '2023-09-26'
    },
    {
      id: 4,
      title: '数据挖掘需求 D',
      budget: 4000,
      transactionType: { mode: TransactionMode.Pitch },
      createTime: '2023-09-21 11:45:00',
      status: DemandOrderStatus.ToDeliver, // 待交付
      activeStatus: DemandActiveStatus.Enabled, // 停用
      expectedDeliveryDate: '2023-09-26'
    },
    {
      id: 5,
      title: '系统集成需求 E',
      budget: 6000,
      transactionType: { mode: TransactionMode.Tender, payType: PayType.ByFixedPrice },
      createTime: '2023-09-22 08:00:00',
      status: DemandOrderStatus.ToCheck, // 待验查
      activeStatus: DemandActiveStatus.Enabled, // 启用
      expectedDeliveryDate: '2023-09-26',
      actualDeliveryDate: '2023-09-28'
    },
    {
      id: 6,
      title: '用户体验研究需求 F',
      budget: 2500,
      transactionType: { mode: TransactionMode.Pitch },
      createTime: '2023-09-23 13:00:00',
      status: DemandOrderStatus.ToReview, // 待评价
      activeStatus: DemandActiveStatus.Enabled, // 停用
      expectedDeliveryDate: '2023-09-26',
      actualDeliveryDate: '2023-09-28'
    },
    {
      id: 7,
      title: '市场分析需求 G',
      budget: 7000,
      transactionType: { mode: TransactionMode.Tender, payType: PayType.ByFixedPrice },
      createTime: '2023-09-24 15:30:00',
      status: DemandOrderStatus.Reviewed, // 已评价
      activeStatus: DemandActiveStatus.Enabled, // 停用
      expectedDeliveryDate: '2023-09-26',
      actualDeliveryDate: '2023-09-28'
    },
    {
      id: 8,
      title: '信息安全需求 H',
      budget: 5500,
      transactionType: { mode: TransactionMode.Tender, payType: PayType.ByFixedPrice },
      createTime: '2023-09-25 12:00:00',
      status: DemandOrderStatus.Pending, // 待审核
      activeStatus: DemandActiveStatus.Disabled, // 停用
      expectedDeliveryDate: '2023-09-30'
    },
    {
      id: 9,
      title: '云计算解决方案需求 I',
      budget: 10000,
      transactionType: { mode: TransactionMode.Pitch }, // 比稿类型
      createTime: '2023-09-26 14:00:00',
      status: DemandOrderStatus.Bidding, // 投标/竞标中
      activeStatus: DemandActiveStatus.Disabled, // 停用
      expectedDeliveryDate: '2023-10-05'
    }
  ])

  return {
    orderDemands
  }
})
