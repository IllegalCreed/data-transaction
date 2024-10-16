import type { IFilter } from '@/types/filter'

export const filterSource: IFilter[] = [
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
      { id: 'development', label: '数据采集' },
      { id: 'data-processing', label: '数据处理' },
      { id: 'consult', label: '咨询' },
      { id: 'agent', label: '代办' },
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
    id: 'location',
    label: '所在地',
    items: [
      { id: 'all', label: '全部' },
      { id: 'local', label: '同城' },
      { id: 'Province', label: '同省' },
      { id: 'out-of-Province', label: '省外' }
    ]
  }
]
