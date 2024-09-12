import type { IDemand } from '@/types/demand'
import type { IFilter } from '@/types/filter'
import type { ISortItem } from '@/types/sorting'
import { defineStore } from 'pinia'

export const useDemandStore = defineStore('demand', () => {
  const filterSource = ref<IFilter[]>([
    {
      id: 'transaction-mode',
      label: '交易模式',
      items: [
        { id: 'all', label: '全部' },
        { id: 'tender', label: '招标' },
        { id: 'comparison', label: '比稿' }
      ]
    },
    {
      id: 'demand-category',
      label: '需求分类',
      items: [
        { id: 'all', label: '全部' },
        { id: 'development', label: '开发' },
        { id: 'training', label: '培训' },
        { id: 'consulting', label: '咨询' },
        { id: 'data-processing', label: '数据处理' },
        { id: 'artificial-intelligence', label: '人工智能' },
        { id: 'other', label: '其他' }
      ]
    },
    {
      id: 'budget-type',
      label: '预算类型',
      items: [
        { id: 'all', label: '全部' },
        { id: 'fixed-budget', label: '明确预算' },
        { id: 'to-be-quoted', label: '待报价' },
        { id: 'other', label: '其他' }
      ]
    },
    {
      id: 'provider-type',
      label: '服务商类型',
      items: [
        { id: 'all', label: '全部' },
        { id: 'individual', label: '个人' },
        { id: 'enterprise', label: '企业' }
      ]
    },
    {
      id: 'location',
      label: '所在地',
      items: [
        { id: 'all', label: '全部' },
        { id: 'local', label: '本地' },
        { id: 'domestic', label: '外地' },
        { id: 'foreign', label: '外国' }
      ]
    }
  ])

  const sortSource = ref<ISortItem[]>([
    { id: 'comprehensive', label: '综合', supportsToggle: false },
    { id: 'time', label: '发布时间', supportsToggle: true },
    { id: 'budget', label: '预算', supportsToggle: true }
  ])

  const demands = ref<IDemand[]>([
    {
      id: 1,
      name: 'Web 开发项目需求',
      description: '需要一个经验丰富的团队来开发一个新的公司网站，包括前端和后端功能。',
      publisher: 'ABC 科技公司',
      budget: 100000,
      transactionMode: { type: '比稿' },
      createTime: '2024-01-10',
      status: '进行中',
      tags: ['开发', 'Web', '技术']
    },
    {
      id: 2,
      name: '人工智能模型培训需求',
      description: '需要一个团队来帮助我们开发和训练一个新的机器学习模型，用于预测市场趋势。',
      publisher: 'XYZ 数据公司',
      budget: 150000,
      transactionMode: { type: '招标', tenderType: '按项目' },
      createTime: '2024-02-15',
      status: '已完成',
      tags: ['人工智能', '机器学习', '数据']
    },
    {
      id: 3,
      name: '年度市场营销咨询',
      description: '寻找一个市场营销咨询公司提供全年营销策略和执行支持。',
      publisher: 'MNO 市场营销公司',
      budget: 200000,
      transactionMode: { type: '招标', tenderType: '按时间' },
      createTime: '2024-03-05',
      status: '已取消',
      tags: ['咨询', '营销', '战略']
    },
    {
      id: 4,
      name: '云计算平台迁移',
      description: '需要一个专业团队帮助我们将现有 IT 基础设施迁移到云计算平台。',
      publisher: 'DEF 企业解决方案',
      budget: 250000,
      transactionMode: { type: '比稿' },
      createTime: '2024-01-20',
      status: '进行中',
      tags: ['云计算', '迁移', 'IT']
    },
    {
      id: 5,
      name: '移动应用开发',
      description: '开发一款移动应用，主要面向消费者市场，需要包括设计、开发、测试和部署。',
      publisher: 'GHI 移动开发公司',
      budget: 300000,
      transactionMode: { type: '招标', tenderType: '按项目' },
      createTime: '2024-02-25',
      status: '进行中',
      tags: ['开发', '移动应用', '设计']
    },
    {
      id: 6,
      name: '企业内部培训项目',
      description: '需要一个培训团队提供针对性培训，涵盖技术、软技能和领导力发展。',
      publisher: 'JKL 培训服务公司',
      budget: 80000,
      transactionMode: { type: '招标', tenderType: '按时间' },
      createTime: '2024-04-10',
      status: '进行中',
      tags: ['培训', '技术', '软技能']
    },
    {
      id: 7,
      name: '数据分析工具定制开发',
      description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
      publisher: 'QRS 数据科技',
      budget: 120000,
      transactionMode: { type: '比稿' },
      createTime: '2024-01-30',
      status: '已完成',
      tags: ['数据分析', '工具', '开发']
    },
    {
      id: 8,
      name: '数据分析工具定制开发',
      description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
      publisher: 'QRS 数据科技',
      budget: 120000,
      transactionMode: { type: '比稿' },
      createTime: '2024-01-30',
      status: '已完成',
      tags: ['数据分析', '工具', '开发']
    },
    {
      id: 9,
      name: '数据分析工具定制开发',
      description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
      publisher: 'QRS 数据科技',
      budget: 120000,
      transactionMode: { type: '比稿' },
      createTime: '2024-01-30',
      status: '已完成',
      tags: ['数据分析', '工具', '开发']
    },
    {
      id: 10,
      name: '数据分析工具定制开发',
      description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
      publisher: 'QRS 数据科技',
      budget: 120000,
      transactionMode: { type: '比稿' },
      createTime: '2024-01-30',
      status: '已完成',
      tags: ['数据分析', '工具', '开发']
    },
    {
      id: 11,
      name: '数据分析工具定制开发',
      description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
      publisher: 'QRS 数据科技',
      budget: 120000,
      transactionMode: { type: '比稿' },
      createTime: '2024-01-30',
      status: '已完成',
      tags: ['数据分析', '工具', '开发']
    },
    {
      id: 12,
      name: '数据分析工具定制开发',
      description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
      publisher: 'QRS 数据科技',
      budget: 120000,
      transactionMode: { type: '比稿' },
      createTime: '2024-01-30',
      status: '已完成',
      tags: ['数据分析', '工具', '开发']
    }
  ])

  return {
    filterSource,
    sortSource,
    demands
  }
})
