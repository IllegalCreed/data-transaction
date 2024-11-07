import { ActiveStatus } from '@/types/common'
import type { ICompany } from '@/types/company'
import { PayType, TransactionMode } from '@/types/demand'
import {
  DemandOrderStatus,
  type IOrderDemand,
  type IOrderDemandDetail,
} from '@/types/demandOrder'
import type { IContract } from '@/types/productOrder'
import type { IReview } from '@/types/review'

export const orderDemands: IOrderDemand[] = [
  {
    id: 1,
    title: '数据分析需求 A',
    budget: 5000,
    transactionType: {
      mode: TransactionMode.Tender,
      payType: PayType.ByFixedPrice,
    },
    createTime: '2023-09-18 09:00:00',
    status: DemandOrderStatus.Pending, // 待审核
    activeStatus: ActiveStatus.Enabled, // 启用
    expectedDeliveryDate: '2023-09-26',
  },
  {
    id: 2,
    title: '数据可视化需求 B',
    budget: 3000,
    transactionType: { mode: TransactionMode.Pitch },
    createTime: '2023-09-19 10:30:00',
    status: DemandOrderStatus.Bidding, // 投标/竞标中
    activeStatus: ActiveStatus.Enabled, // 停用
    expectedDeliveryDate: '2023-09-26',
  },
  {
    id: 3,
    title: '机器学习模型需求 C',
    budget: 8000,
    transactionType: {
      mode: TransactionMode.Tender,
      payType: PayType.ByFixedPrice,
    },
    createTime: '2023-09-20 14:15:00',
    status: DemandOrderStatus.Contract, // 合同协商
    activeStatus: ActiveStatus.Enabled, // 启用
    expectedDeliveryDate: '2023-09-26',
  },
  {
    id: 4,
    title: '数据挖掘需求 D',
    budget: 4000,
    transactionType: { mode: TransactionMode.Pitch },
    createTime: '2023-09-21 11:45:00',
    status: DemandOrderStatus.ToDeliver, // 待交付
    activeStatus: ActiveStatus.Enabled, // 停用
    expectedDeliveryDate: '2023-09-26',
  },
  {
    id: 5,
    title: '系统集成需求 E',
    budget: 6000,
    transactionType: {
      mode: TransactionMode.Tender,
      payType: PayType.ByFixedPrice,
    },
    createTime: '2023-09-22 08:00:00',
    status: DemandOrderStatus.ToCheck, // 待验查
    activeStatus: ActiveStatus.Enabled, // 启用
    expectedDeliveryDate: '2023-09-26',
    actualDeliveryDate: '2023-09-28',
  },
  {
    id: 6,
    title: '用户体验研究需求 F',
    budget: 2500,
    transactionType: { mode: TransactionMode.Pitch },
    createTime: '2023-09-23 13:00:00',
    status: DemandOrderStatus.ToReview, // 待评价
    activeStatus: ActiveStatus.Enabled, // 停用
    expectedDeliveryDate: '2023-09-26',
    actualDeliveryDate: '2023-09-28',
  },
  {
    id: 7,
    title: '市场分析需求 G',
    budget: 7000,
    transactionType: {
      mode: TransactionMode.Tender,
      payType: PayType.ByFixedPrice,
    },
    createTime: '2023-09-24 15:30:00',
    status: DemandOrderStatus.Completed, // 已评价
    activeStatus: ActiveStatus.Enabled, // 停用
    expectedDeliveryDate: '2023-09-26',
    actualDeliveryDate: '2023-09-28',
  },
  {
    id: 8,
    title: '信息安全需求 H',
    budget: 5500,
    transactionType: {
      mode: TransactionMode.Tender,
      payType: PayType.ByFixedPrice,
    },
    createTime: '2023-09-25 12:00:00',
    status: DemandOrderStatus.Pending, // 待审核
    activeStatus: ActiveStatus.Disabled, // 停用
    expectedDeliveryDate: '2023-09-30',
  },
  {
    id: 9,
    title: '云计算解决方案需求 I',
    budget: 10000,
    transactionType: { mode: TransactionMode.Pitch }, // 比稿类型
    createTime: '2023-09-26 14:00:00',
    status: DemandOrderStatus.Bidding, // 投标/竞标中
    activeStatus: ActiveStatus.Disabled, // 停用
    expectedDeliveryDate: '2023-10-05',
  },
]

export const orderDemandDetails: {
  id: string | number
  detailInfo: IOrderDemandDetail
  tenderCompanies: ICompany[]
  recommendCompanies: ICompany[]
  contract: IContract
  review: IReview
}[] = [
  {
    id: 1,
    detailInfo: {
      id: 1,
      title: '高性能企业级网站开发需求',
      tags: ['开发', 'Web', '企业级'],
      description:
        '我们正在寻找一家经验丰富的开发团队，帮助我们打造一个高性能、可扩展的企业级网站。这个网站将作为我们公司数字化转型的重要组成部分，需要具有现代化的用户界面、强大的后端功能，以及能够支持高并发用户访问的架构。开发团队应具备丰富的全栈开发经验，能够从前端设计、后端开发到数据库管理全面把控项目进度。同时，我们希望该网站能够无缝集成第三方服务，如支付网关、客户关系管理系统，以及营销自动化工具，以便我们能够更好地服务客户、提升运营效率。此外，开发团队需具备良好的沟通能力，能够与我们的内部团队密切合作，确保项目的每一个阶段都符合我们的商业目标和技术规范。预计完成时间为2024年底，预算为150,000元。',
      transactionType: {
        mode: TransactionMode.Tender,
        payType: PayType.ByFixedPrice,
      },
      budget: 120000,
      createTime: '2024-01-30',
      expectedDeliveryDate: '2024-01-30',
      actualDeliveryDate: '2024-01-30',
      status: DemandOrderStatus.Pending,
      activeStatus: ActiveStatus.Enabled,
    },
    tenderCompanies: [
      {
        id: '1',
        name: '数据科技有限公司',
        avatar: 'https://via.placeholder.com/100',
        tags: ['数据分析', '机器学习'],
        rating: 4.5,
      },
      {
        id: '2',
        name: '视觉设计公司',
        avatar: 'https://via.placeholder.com/100',
        tags: ['UI设计', '用户体验'],
        rating: 4.8,
      },
      {
        id: '3',
        name: '云计算服务商',
        avatar: 'https://via.placeholder.com/100',
        tags: ['云服务', '大数据'],
        rating: 4.2,
      },
    ],
    recommendCompanies: [
      {
        id: '4',
        name: '市场研究机构',
        avatar: 'https://via.placeholder.com/100',
        tags: ['市场分析', '数据挖掘'],
        rating: 4.7,
      },
      {
        id: '5',
        name: '品牌营销公司',
        avatar: 'https://via.placeholder.com/100',
        tags: ['品牌战略', '广告'],
        rating: 4.6,
      },
      {
        id: '6',
        name: '移动开发团队',
        avatar: 'https://via.placeholder.com/100',
        tags: ['移动应用', '产品开发'],
        rating: 4.3,
      },
    ],
    contract: {
      id: 1,
      contractNum: 'C-20240425-001',
      contractUrl: 'www.baidu.com',
      signingTime: '2024-04-25 10:30:00',
      partyA: '消费者名称',
      partyB: '科技商家有限公司',
    },
    review: {
      id: 1,
      name: '消费者名称',
      usefulCount: 10,
      rating: 5,
      createTime: '2024-04-25 10:30:00',
      content: '消费者信息',
      reply: '商家回复信息',
    },
  },
]
