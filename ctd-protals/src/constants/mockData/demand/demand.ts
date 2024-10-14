import {
  DemandOrderStatus,
  PayType,
  TransactionMode,
  type IDemand,
  type IDemandBaseInfo
} from '@/types/demand'

export const demands: IDemand[] = [
  {
    id: 1,
    title: 'Web 开发项目需求',
    description: '需要一个经验丰富的团队来开发一个新的公司网站，包括前端和后端功能。',
    publisher: 'ABC 科技公司',
    budget: 100000,
    transactionType: { mode: TransactionMode.Pitch },
    createTime: '2024-01-10',
    tags: ['开发', 'Web', '技术']
  },
  {
    id: 2,
    title: '人工智能模型培训需求',
    description: '需要一个团队来帮助我们开发和训练一个新的机器学习模型，用于预测市场趋势。',
    publisher: 'XYZ 数据公司',
    budget: 150000,
    transactionType: { mode: TransactionMode.Tender, payType: PayType.ByWorkTime },
    createTime: '2024-02-15',
    tags: ['人工智能', '机器学习', '数据']
  },
  {
    id: 3,
    title: '年度市场营销咨询',
    description: '寻找一个市场营销咨询公司提供全年营销策略和执行支持。',
    publisher: 'MNO 市场营销公司',
    budget: 200000,
    transactionType: { mode: TransactionMode.Tender, payType: PayType.ByFixedPrice },
    createTime: '2024-03-05',
    tags: ['咨询', '营销', '战略']
  },
  {
    id: 4,
    title: '云计算平台迁移',
    description: '需要一个专业团队帮助我们将现有 IT 基础设施迁移到云计算平台。',
    publisher: 'DEF 企业解决方案',
    budget: 250000,
    transactionType: { mode: TransactionMode.Pitch },
    createTime: '2024-01-20',
    tags: ['云计算', '迁移', 'IT']
  },
  {
    id: 5,
    title: '移动应用开发',
    description: '开发一款移动应用，主要面向消费者市场，需要包括设计、开发、测试和部署。',
    publisher: 'GHI 移动开发公司',
    budget: 300000,
    transactionType: { mode: TransactionMode.Pitch },
    createTime: '2024-02-25',
    tags: ['开发', '移动应用', '设计']
  },
  {
    id: 6,
    title: '企业内部培训项目',
    description: '需要一个培训团队提供针对性培训，涵盖技术、软技能和领导力发展。',
    publisher: 'JKL 培训服务公司',
    budget: 80000,
    transactionType: { mode: TransactionMode.Pitch },
    createTime: '2024-04-10',
    tags: ['培训', '技术', '软技能']
  },
  {
    id: 7,
    title: '数据分析工具定制开发',
    description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
    publisher: 'QRS 数据科技',
    budget: 120000,
    transactionType: { mode: TransactionMode.Pitch },
    createTime: '2024-01-30',
    tags: ['数据分析', '工具', '开发']
  },
  {
    id: 8,
    title: '数据分析工具定制开发',
    description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
    publisher: 'QRS 数据科技',
    budget: 120000,
    transactionType: { mode: TransactionMode.Pitch },
    createTime: '2024-01-30',
    tags: ['数据分析', '工具', '开发']
  },
  {
    id: 9,
    title: '数据分析工具定制开发',
    description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
    publisher: 'QRS 数据科技',
    budget: 120000,
    transactionType: { mode: TransactionMode.Pitch },
    createTime: '2024-01-30',
    tags: ['数据分析', '工具', '开发']
  },
  {
    id: 10,
    title: '数据分析工具定制开发',
    description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
    publisher: 'QRS 数据科技',
    budget: 120000,
    transactionType: { mode: TransactionMode.Pitch },
    createTime: '2024-01-30',
    tags: ['数据分析', '工具', '开发']
  },
  {
    id: 11,
    title: '数据分析工具定制开发',
    description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
    publisher: 'QRS 数据科技',
    budget: 120000,
    transactionType: { mode: TransactionMode.Pitch },
    createTime: '2024-01-30',
    tags: ['数据分析', '工具', '开发']
  },
  {
    id: 12,
    title: '数据分析工具定制开发',
    description: '开发一个定制化的数据分析工具，支持多种数据源的集成和高级分析功能。',
    publisher: 'QRS 数据科技',
    budget: 120000,
    transactionType: { mode: TransactionMode.Pitch },
    createTime: '2024-01-30',
    tags: ['数据分析', '工具', '开发']
  }
]

export const demandDetails: {
  id: string | number
  baseInfo: IDemandBaseInfo
  content: string
}[] = [
  {
    id: 1,
    baseInfo: {
      title: '高性能企业级网站开发需求',
      tags: ['开发', 'Web', '企业级'],
      description:
        '我们正在寻找一家经验丰富的开发团队，帮助我们打造一个高性能、可扩展的企业级网站。这个网站将作为我们公司数字化转型的重要组成部分，需要具有现代化的用户界面、强大的后端功能，以及能够支持高并发用户访问的架构。开发团队应具备丰富的全栈开发经验，能够从前端设计、后端开发到数据库管理全面把控项目进度。同时，我们希望该网站能够无缝集成第三方服务，如支付网关、客户关系管理系统，以及营销自动化工具，以便我们能够更好地服务客户、提升运营效率。此外，开发团队需具备良好的沟通能力，能够与我们的内部团队密切合作，确保项目的每一个阶段都符合我们的商业目标和技术规范。预计完成时间为2024年底，预算为150,000元。',
      transactionType: { mode: TransactionMode.Tender, payType: PayType.ByFixedPrice },
      publisher: 'QRS 数据科技',
      budget: 120000,
      createTime: '2024-01-30',
      expectedDeliveryDate: '2024-01-30',
      status: DemandOrderStatus.Bidding
    },
    content: `
      <h2>项目背景</h2>
      <p>我们正在寻求一个专业开发团队来建立一个具有以下特点的企业级网站：</p>
      <ul>
        <li>高性能，能够支持大规模用户访问</li>
        <li>现代化设计，符合当前用户体验标准</li>
        <li>可扩展性强，能够随着业务增长快速扩展功能</li>
        <li>需要集成第三方服务，例如支付网关和CRM系统</li>
      </ul>
      <p>我们的目标是打造一个不仅仅是展示信息的平台，而是一个可以有效提升客户体验和公司运营效率的工具。</p>
    `
  }
]
