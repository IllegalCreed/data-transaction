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
  imageUrls: string[]
  content: string
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
    },
    imageUrls: [
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400'
    ],
    content: `
      <h3>数据产品介绍</h3>
      <p>我们的最新数据产品 <strong>“智能城市数据包”</strong> 提供了广泛的城市数据，包括交通、天气、人口统计等，适用于各类智能城市项目。</p>

      <h4>产品特点</h4>
      <ul>
        <li>涵盖多种城市数据：交通、天气、人口统计等。</li>
        <li>实时数据更新，确保信息的准确性和时效性。</li>
        <li>易于集成，支持多种开发平台和工具。</li>
      </ul>

      <h4>应用场景</h4>
      <p>该数据包可用于多个场景，如智能交通管理、城市规划、环境监测等。以下是一个示意图：</p>
      <img src="https://via.placeholder.com/800x400" alt="智能城市数据图" style="width:100%"/>

      <h4>产品示例</h4>
      <p>下面的视频展示了如何使用该数据包创建智能交通管理系统：</p>
      <video controls width="100%">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
        您的浏览器不支持视频标签。
      </video>

      <h4>潜在危险内容</h4>
      <p>以下内容是注入的潜在危险内容，用于测试过滤效果：</p>
      <img src="invalid.jpg" onerror="alert('XSS Attack!')" />

      <h4>客户评价</h4>
      <blockquote>
        <p>"这个数据包帮助我们显著提升了交通管理的效率，使得整个城市的通行情况得到了极大的改善。" - 城市交通管理局</p>
      </blockquote>

      <p>更多详情，请访问我们的官方网站。</p>
      <a href="https://example.com" target="_blank">点击这里了解更多</a>
    `
  }
]
