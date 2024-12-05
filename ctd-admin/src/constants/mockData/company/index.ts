import { ActiveStatus } from '@/constants/mapData'
import { PartnerTypes } from '@/constants/mapData/company'
import type { IOption } from '@/types/common'
import type { ICompany } from '@/types/company'

export const companyOptions: IOption[] = [
  {
    value: 1,
    label: '合作伙伴1'
  },
  {
    value: 2,
    label: '合作伙伴2'
  },
  {
    value: 3,
    label: '合作伙伴3'
  }
]

export const companies: ICompany[] = [
  {
    id: 1,
    name: '测试公司1',
    description: '测试公司1的描述',
    link: 'www.baidu.com',
    logoUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    partnerType: PartnerTypes.None,
    isShowInFooter: false,
    status: ActiveStatus.Inactive,
    createTime: '2022-01-01 00:00:00',
    updateTime: '2022-01-01 00:00:00'
  },
  {
    id: 2,
    name: '测试公司2',
    description: '测试公司2的描述',
    link: 'www.baidu.com',
    logoUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    partnerType: PartnerTypes.Partner,
    isShowInFooter: false,
    status: ActiveStatus.Active,
    createTime: '2022-01-01 00:00:00',
    updateTime: '2022-01-01 00:00:00'
  },
  {
    id: 3,
    name: '测试公司3',
    description: '测试公司3的描述',
    link: 'www.baidu.com',
    logoUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    partnerType: PartnerTypes.TopPartner,
    isShowInFooter: true,
    status: ActiveStatus.Active,
    createTime: '2022-01-01 00:00:00',
    updateTime: '2022-01-01 00:00:00'
  }
]
