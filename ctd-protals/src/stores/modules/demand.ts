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

  return {
    filterSource,
    sortSource
  }
})
