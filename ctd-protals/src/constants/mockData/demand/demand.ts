import {
  PayType,
  TransactionMode,
  type IDemand,
  type IDemandContent,
  type IDemandDetail,
} from '@/types/demand'

export const demands: IDemand[] = [
  {
    id: 1,
    title: '智能客流分析系统',
    description: '实时监测景区游客密度，优化流量管理。',
    publisher: 'ABC 科技公司',
    budget: 100000,
    transactionType: { mode: TransactionMode.Pitch },
    expectedDeliveryDate: '2024-01-10',
    tags: ['开发', 'Web', '技术'],
  },
  {
    id: 2,
    title: '旅游消费者行为画像',
    description: '深入分析游客偏好，提升个性化服务体验。',
    publisher: 'XYZ 数据公司',
    budget: 150000,
    transactionType: {
      mode: TransactionMode.Tender,
      payType: PayType.ByWorkTime,
    },
    expectedDeliveryDate: '2024-02-15',
    tags: ['人工智能', '机器学习', '数据'],
  },
  {
    id: 3,
    title: '景区运营数据可视化平台',
    description: '直观展示运营数据，辅助决策，提升效率。',
    publisher: 'MNO 市场营销公司',
    budget: 200000,
    transactionType: {
      mode: TransactionMode.Tender,
      payType: PayType.ByFixedPrice,
    },
    expectedDeliveryDate: '2024-03-05',
    tags: ['咨询', '营销', '战略'],
  },
  {
    id: 4,
    title: '旅游市场趋势预测工具',
    description: '预测市场趋势，为旅游企业战略规划提供支持。',
    publisher: 'DEF 企业解决方案',
    budget: 250000,
    transactionType: { mode: TransactionMode.Pitch },
    expectedDeliveryDate: '2024-01-20',
    tags: ['云计算', '迁移', 'IT'],
  },
  {
    id: 5,
    title: '智慧景区规划与管理服务',
    description: '利用大数据优化景区规划，提升游客满意度。',
    publisher: 'GHI 移动开发公司',
    budget: 300000,
    transactionType: { mode: TransactionMode.Pitch },
    expectedDeliveryDate: '2024-02-25',
    tags: ['开发', '移动应用', '设计'],
  },
  {
    id: 6,
    title: '旅游产品推荐算法服务',
    description: '基于用户行为，智能推荐旅游产品和服务。',
    publisher: 'JKL 培训服务公司',
    budget: 80000,
    transactionType: { mode: TransactionMode.Pitch },
    expectedDeliveryDate: '2024-04-10',
    tags: ['培训', '技术', '软技能'],
  },
]

export const demandDetails: {
  id: string | number
  detailInfo: IDemandDetail
  content: IDemandContent
}[] = [
  {
    id: 1,
    detailInfo: {
      title: '高性能企业级网站开发需求',
      tags: ['开发', 'Web', '企业级'],
      description:
        '我们正在寻找一家经验丰富的开发团队，帮助我们打造一个高性能、可扩展的企业级网站。这个网站将作为我们公司数字化转型的重要组成部分，需要具有现代化的用户界面、强大的后端功能，以及能够支持高并发用户访问的架构。开发团队应具备丰富的全栈开发经验，能够从前端设计、后端开发到数据库管理全面把控项目进度。同时，我们希望该网站能够无缝集成第三方服务，如支付网关、客户关系管理系统，以及营销自动化工具，以便我们能够更好地服务客户、提升运营效率。此外，开发团队需具备良好的沟通能力，能够与我们的内部团队密切合作，确保项目的每一个阶段都符合我们的商业目标和技术规范。预计完成时间为2024年底，预算为150,000元。',
      transactionType: {
        mode: TransactionMode.Tender,
        payType: PayType.ByFixedPrice,
      },
      publisher: 'QRS 数据科技',
      budget: 120000,
      createTime: '2024-01-30',
      expectedDeliveryDate: '2024-01-30',
    },
    content: {
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
      `,
      attachments: [
        {
          name: '项目需求文档.pdf',
          url: 'https://example.com/files/需求文档.pdf',
        },
        {
          name: '技术规格说明.docx',
          url: 'https://example.com/files/技术规格说明.docx',
        },
        {
          name: '技术规格说明.xlsx',
          url: 'https://example.com/files/技术规格说明.xlsx',
        },
        {
          name: '技术规格说明.pptx',
          url: 'https://example.com/files/技术规格说明.pptx',
        },
        {
          name: '技术规格说明.txt',
          url: 'https://example.com/files/技术规格说明.txt',
        },
        { name: '设计草图.zip', url: 'https://example.com/files/设计草图.zip' },
        { name: '设计草图.abc', url: 'https://example.com/files/设计草图.abc' },
      ],
    },
  },
]
