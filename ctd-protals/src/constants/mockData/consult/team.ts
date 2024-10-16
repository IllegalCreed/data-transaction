import type { ITeam } from '@/types/consult'

export const teams: ITeam[] = [
  {
    id: 1,
    title: '数据治理专家有限公司',
    description: '专注于提供数据治理、数据管理解决方案的专业公司。',
    imageUrl: new URL('@/assets/mock/partnerLogo.png', import.meta.url).href,
    link: 'https://www.baidu.com'
  },
  {
    id: 2,
    title: '合规性审查咨询有限公司',
    description: '为客户提供全面的数据合规性审查服务，确保符合最新法规要求。',
    imageUrl: new URL('@/assets/mock/partnerLogo.png', import.meta.url).href,
    link: 'https://www.baidu.com'
  },
  {
    id: 3,
    title: '资产价值评估有限公司',
    description: '专门从事数据资产评估，帮助企业量化数据的商业价值。',
    imageUrl: new URL('@/assets/mock/partnerLogo.png', import.meta.url).href,
    link: 'https://www.baidu.com'
  },
  {
    id: 4,
    title: '安全审计风险管理有限公司',
    description: '提供全方位的数据安全审计和风险管理服务，保障企业的数据安全。',
    imageUrl: new URL('@/assets/mock/partnerLogo.png', import.meta.url).href,
    link: 'https://www.baidu.com'
  }
]
