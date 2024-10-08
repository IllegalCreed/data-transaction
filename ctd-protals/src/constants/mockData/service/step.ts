import type { IStep } from '@/types/service'

export const steps: IStep[] = [
  {
    id: 1,
    stepNumber: '01',
    title: '需求分析',
    description: '了解您的数据处理需求，进行初步咨询和沟通，评估项目的范围和复杂性。',
    icon: 'i-mdi:file-chart-outline'
  },
  {
    id: 2,
    stepNumber: '02',
    title: '方案设计',
    description: '根据您的需求定制数据处理方案，包括所需的技术、工具、时间框架和成本估算。',
    icon: 'i-ic:round-design-services'
  },
  {
    id: 3,
    stepNumber: '03',
    title: '数据处理',
    description: '实施数据处理服务，确保数据质量达到您的要求，并符合标准。',
    icon: 'i-eos-icons:hardware-circuit'
  },
  {
    id: 4,
    stepNumber: '04',
    title: '结果交付与支持',
    description: '将处理后的数据和报告交付给您，提供后续支持和优化建议，确保您的满意度。',
    icon: 'i-icon-park-outline:delivery'
  }
]
