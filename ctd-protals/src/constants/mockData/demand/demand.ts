import { DemandOrderStatus, type IDemand } from '@/types/demand'

export const demands: IDemand[] = [
  {
    id: 1,
    title: 'Web 开发项目需求',
    description: '需要一个经验丰富的团队来开发一个新的公司网站，包括前端和后端功能。',
    publisher: 'ABC 科技公司',
    budget: 100000,
    transactionMode: { type: '比稿' },
    createTime: '2024-01-10',
    status: DemandOrderStatus.Bidding,
    tags: ['开发', 'Web', '技术']
  },
  {
    id: 2,
    title: '人工智能模型培训需求',
    description: '需要一个团队来帮助我们开发和训练一个新的机器学习模型，用于预测市场趋势。',
    publisher: 'XYZ 数据公司',
    budget: 150000,
    transactionMode: { type: '招标', tenderType: '按项目' },
    createTime: '2024-02-15',
    status: DemandOrderStatus.Bidding,
    tags: ['人工智能', '机器学习', '数据']
  },
  {
    id: 3,
    title: '年度市场营销咨询',
    description: '寻找一个市场营销咨询公司提供全年营销策略和执行支持。',
    publisher: 'MNO 市场营销公司',
    budget: 200000,
    transactionMode: { type: '招标', tenderType: '按时间' },
    createTime: '2024-03-05',
    status: DemandOrderStatus.Bidding,
    tags: ['咨询', '营销', '战略']
  },
  {
    id: 4,
    title: '云计算平台迁移',
    description: '需要一个专业团队帮助我们将现有 IT 基础设施迁移到云计算平台。',
    publisher: 'DEF 企业解决方案',
    budget: 250000,
    transactionMode: { type: '比稿' },
    createTime: '2024-01-20',
    status: DemandOrderStatus.Bidding,
    tags: ['云计算', '迁移', 'IT']
  },
  {
    id: 5,
    title: '移动应用开发',
    description: '开发一款移动应用，主要面向消费者市场，需要包括设计、开发、测试和部署。',
    publisher: 'GHI 移动开发公司',
    budget: 300000,
    transactionMode: { type: '招标', tenderType: '按项目' },
    createTime: '2024-02-25',
    status: DemandOrderStatus.Bidding,
    tags: ['开发', '移动应用', '设计']
  },
  {
    id: 6,
    title: '企业内部培训项目',
    description: '需要一个培训团队提供针对性培训，涵盖技术、软技能和领导力发展。',
    publisher: 'JKL 培训服务公司',
    budget: 80000,
    transactionMode: { type: '招标', tenderType: '按时间' },
    createTime: '2024-04-10',
    status: DemandOrderStatus.Bidding,
    tags: ['培训', '技术', '软技能']
  },
  {
    id: 7,
    title: '数据分析工具定制开发',
    description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
    publisher: 'QRS 数据科技',
    budget: 120000,
    transactionMode: { type: '比稿' },
    createTime: '2024-01-30',
    status: DemandOrderStatus.Bidding,
    tags: ['数据分析', '工具', '开发']
  },
  {
    id: 8,
    title: '数据分析工具定制开发',
    description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
    publisher: 'QRS 数据科技',
    budget: 120000,
    transactionMode: { type: '比稿' },
    createTime: '2024-01-30',
    status: DemandOrderStatus.Bidding,
    tags: ['数据分析', '工具', '开发']
  },
  {
    id: 9,
    title: '数据分析工具定制开发',
    description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
    publisher: 'QRS 数据科技',
    budget: 120000,
    transactionMode: { type: '比稿' },
    createTime: '2024-01-30',
    status: DemandOrderStatus.Bidding,
    tags: ['数据分析', '工具', '开发']
  },
  {
    id: 10,
    title: '数据分析工具定制开发',
    description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
    publisher: 'QRS 数据科技',
    budget: 120000,
    transactionMode: { type: '比稿' },
    createTime: '2024-01-30',
    status: DemandOrderStatus.Bidding,
    tags: ['数据分析', '工具', '开发']
  },
  {
    id: 11,
    title: '数据分析工具定制开发',
    description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
    publisher: 'QRS 数据科技',
    budget: 120000,
    transactionMode: { type: '比稿' },
    createTime: '2024-01-30',
    status: DemandOrderStatus.Bidding,
    tags: ['数据分析', '工具', '开发']
  },
  {
    id: 12,
    title: '数据分析工具定制开发',
    description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
    publisher: 'QRS 数据科技',
    budget: 120000,
    transactionMode: { type: '比稿' },
    createTime: '2024-01-30',
    status: DemandOrderStatus.Bidding,
    tags: ['数据分析', '工具', '开发']
  }
]
