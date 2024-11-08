import type { ISearchResult } from '@/types/search'

export const historyRecords: ISearchResult[] = [
  {
    module: 'produce' as const,
    id: 1,
    title: '数据产品',
    description:
      '详细记录了2023年4月15日发布的数据产品，包括产品名称、版本、发布者及相关功能说明。',
  },
  {
    module: 'service' as const,
    id: 1,
    title: '服务请求',
    description:
      '记录了2023年5月10日提交的客户服务请求，涉及数据分析服务的具体需求和处理进度。',
  },
  {
    module: 'scene' as const,
    id: 1,
    title: '场景',
    description:
      '资产目录中的场景条目，描述了2023年第三季度的市场推广活动及其效果评估。',
  },
]

export const searchResults: ISearchResult[] = [
  {
    module: 'produce' as const,
    id: 1,
    title: '数据产品',
    description:
      '记录了2023年5月20日发布的新数据产品，涵盖功能更新、目标用户及使用反馈。',
  },
  {
    module: 'service' as const,
    id: 1,
    title: '服务记录',
    description:
      '详细描述了2023年6月5日的技术支持服务，包括问题描述、解决方案及响应时间。',
  },
  {
    module: 'demand' as const,
    id: 1,
    title: '需求',
    description:
      '资产需求目录中的新条目，涵盖了2023年最新的产品发布会需求及相关资源。',
  },
  {
    module: 'consult' as const,
    id: 1,
    title: '咨询记录',
    description:
      '记录了2023年7月12日的资产管理咨询会谈，包含客户需求分析和建议方案。',
  },
  {
    module: 'scene' as const,
    id: 1,
    title: '社区活动',
    description:
      '描述了2023年8月举办的社区数据分享会，包括参与人数、活动内容及反馈结果。',
  },
]
