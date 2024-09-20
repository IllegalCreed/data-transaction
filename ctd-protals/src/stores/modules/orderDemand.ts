import type { IOrderDemand } from '@/types/demand'
import { defineStore } from 'pinia'

export const useOrderDemandStore = defineStore('orderDemand', () => {
  const orderDemands = reactive<IOrderDemand[]>([
    {
      id: 1,
      title: '数据分析需求 A',
      shotDesc: '需要对用户行为数据进行分析，提供相关报告。',
      budget: 5000,
      transactionMode: { type: '招标', tenderType: '按项目' }, // 招标类型
      createTime: '2023-09-18 09:00:00',
      status: 'pending', // 待审核
      expectedDeliveryDate: '2023-09-26'
    },
    {
      id: 2,
      title: '数据可视化需求 B',
      shotDesc: '需要将销售数据可视化，提供图表和仪表盘。',
      budget: 3000,
      transactionMode: { type: '比稿' }, // 比稿类型
      createTime: '2023-09-19 10:30:00',
      status: 'bidding', // 投标/竞标中
      expectedDeliveryDate: '2023-09-26'
    },
    {
      id: 3,
      title: '机器学习模型需求 C',
      shotDesc: '需要构建一个机器学习模型，预测用户流失。',
      budget: 8000,
      transactionMode: { type: '招标', tenderType: '按时间' }, // 招标类型
      createTime: '2023-09-20 14:15:00',
      status: 'contract', // 合同协商
      expectedDeliveryDate: '2023-09-26'
    },
    {
      id: 4,
      title: '数据挖掘需求 D',
      shotDesc: '对电商用户数据进行挖掘，提供洞察。',
      budget: 4000,
      transactionMode: { type: '比稿' }, // 比稿类型
      createTime: '2023-09-21 11:45:00',
      status: 'to_deliver', // 待交付
      expectedDeliveryDate: '2023-09-26'
    },
    {
      id: 5,
      title: '系统集成需求 E',
      shotDesc: '将不同数据源整合到一个系统中，提供接口。',
      budget: 6000,
      transactionMode: { type: '招标', tenderType: '按项目' }, // 招标类型
      createTime: '2023-09-22 08:00:00',
      status: 'to_check', // 待验查
      actualDeliveryDate: '2023-09-28'
    },
    {
      id: 6,
      title: '用户体验研究需求 F',
      shotDesc: '研究用户在使用产品过程中的体验，提供反馈。',
      budget: 2500,
      transactionMode: { type: '比稿' }, // 比稿类型
      createTime: '2023-09-23 13:00:00',
      status: 'pending_review', // 待评价
      actualDeliveryDate: '2023-09-28'
    },
    {
      id: 7,
      title: '市场分析需求 G',
      shotDesc: '对市场趋势进行分析，撰写分析报告。',
      budget: 7000,
      transactionMode: { type: '招标', tenderType: '按时间' }, // 招标类型
      createTime: '2023-09-24 15:30:00',
      status: 'reviewed', // 已评价
      actualDeliveryDate: '2023-09-28'
    }
  ])

  return {
    orderDemands
  }
})
