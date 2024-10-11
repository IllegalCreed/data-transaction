import type { IScene } from '@/types/scene'

export const primaryCases: IScene[] = [
  {
    id: 1,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description:
      '测试场景描述，测试场景描述，测试场景描述，测试场景描述,测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: 'https://via.placeholder.com/300',
    bannerUrl: new URL('@/assets/mock/newsBanner.png', import.meta.url).href,
    link: 'https://www.baidu.com'
  },
  {
    id: 2,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description: '测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: 'https://via.placeholder.com/300',
    bannerUrl: new URL('@/assets/mock/newsBanner.png', import.meta.url).href,
    link: 'https://www.baidu.com'
  }
]
