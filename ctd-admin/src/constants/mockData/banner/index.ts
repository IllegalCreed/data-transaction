import { ActiveStatus } from '@/constants/mapData'
import { LinkTypes } from '@/constants/mapData/banner'
import type { IBanner } from '@/types/banner'

export const banners: IBanner[] = [
  {
    id: 1,
    title: '测试横幅1',
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    linkType: LinkTypes.None,
    status: ActiveStatus.Inactive,
    createdAt: '2022-01-01 00:00:00',
    updatedAt: '2022-01-01 00:00:00'
  },
  {
    id: 2,
    title: '测试横幅2',
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    linkType: LinkTypes.OuterLink,
    data: 'www.baidu.com',
    status: ActiveStatus.Active,
    createdAt: '2022-01-01 00:00:00',
    updatedAt: '2022-01-01 00:00:00'
  },
  {
    id: 3,
    title: '测试横幅3',
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    linkType: LinkTypes.Scene,
    data: {
      id: 1
    },
    status: ActiveStatus.Active,
    createdAt: '2022-01-01 00:00:00',
    updatedAt: '2022-01-01 00:00:00'
  },
  {
    id: 4,
    title: '测试横幅4',
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    linkType: LinkTypes.Product,
    data: {
      id: 1
    },
    status: ActiveStatus.Active,
    createdAt: '2022-01-01 00:00:00',
    updatedAt: '2022-01-01 00:00:00'
  }
]
