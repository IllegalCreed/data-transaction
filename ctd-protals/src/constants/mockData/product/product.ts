import type { IProduct, IProductBaseInfo } from '@/types/product'
import { v4 as uuidv4 } from 'uuid'

export const products: IProduct[] = [
  {
    id: 1,
    title: '道路数字化资产管理',
    tags: ['新款', '限量', '独家'],
    description: '先进的智能手表，支持多种健康监测功能',
    seller: '智能科技有限公司',
    price: 2999,
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href
  },
  {
    id: 2,
    title: '景区数字化资产管理',
    tags: ['热门', '推荐'],
    description: '高音质智能音箱，支持语音控制',
    seller: '智能科技有限公司',
    price: 799,
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href
  },
  {
    id: 3,
    title: '文化产品',
    tags: ['热门', '推荐'],
    description: '全屋智能家居解决方案，便捷、安全',
    seller: '智能科技有限公司',
    price: 9999,
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href
  },
  {
    id: 4,
    title: '文化遗产名录',
    tags: ['热门', '推荐'],
    description: '支持实时心率监测的智能跑步机',
    seller: '智能科技有限公司',
    price: 4999,
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href
  },
  {
    id: 5,
    title: '名胜古迹',
    tags: ['热门', '推荐'],
    description: '高安全性的智能门锁，支持多种开锁方式',
    seller: '智能科技有限公司',
    price: 1599,
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href
  },
  {
    id: 6,
    title: '小吃名录',
    tags: ['热门', '推荐'],
    description: '超高清智能电视，支持HDR10+',
    seller: '智能科技有限公司',
    price: 6999,
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href
  },
  {
    id: 7,
    title: '道路数字化资产管理',
    tags: ['新款', '限量', '独家'],
    description: '先进的智能手表，支持多种健康监测功能',
    seller: '智能科技有限公司',
    price: 2999,
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href
  },
  {
    id: 8,
    title: '景区数字化资产管理',
    tags: ['热门', '推荐'],
    description: '高音质智能音箱，支持语音控制',
    seller: '智能科技有限公司',
    price: 799,
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href
  },
  {
    id: 9,
    title: '文化产品',
    tags: ['热门', '推荐'],
    description: '全屋智能家居解决方案，便捷、安全',
    seller: '智能科技有限公司',
    price: 9999,
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href
  },
  {
    id: 10,
    title: '文化遗产名录',
    tags: ['热门', '推荐'],
    description: '支持实时心率监测的智能跑步机',
    seller: '智能科技有限公司',
    price: 4999,
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href
  },
  {
    id: 11,
    title: '名胜古迹',
    tags: ['热门', '推荐'],
    description: '高安全性的智能门锁，支持多种开锁方式',
    seller: '智能科技有限公司',
    price: 1599,
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href
  },
  {
    id: 12,
    title: '小吃名录',
    tags: ['热门', '推荐'],
    description: '超高清智能电视，支持HDR10+',
    seller: '智能科技有限公司',
    price: 6999,
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href
  }
]

export const productDetails: {
  id: string | number
  baseInfo: IProductBaseInfo
}[] = [
  {
    id: 1,
    baseInfo: {
      title: '文化产品',
      soldCount: 100,
      tags: ['热门', '推荐'],
      description: '全屋智能家居解决方案，便捷、安全,全屋智能家居解决方案，便捷、安全',
      sellerId: 1,
      hasCount: true,
      specGroups: [
        {
          key: uuidv4(),
          label: '数据完整度',
          specs: [
            {
              key: uuidv4(),
              label: '完整'
            },
            {
              key: uuidv4(),
              label: '精简'
            }
          ]
        },
        {
          key: uuidv4(),
          label: '购买方式',
          specs: [
            {
              key: uuidv4(),
              label: '包月'
            },
            {
              key: uuidv4(),
              label: '包年'
            },
            {
              key: uuidv4(),
              label: '永久'
            }
          ]
        }
      ]
    }
  }
]
