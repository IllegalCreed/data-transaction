import type { IProduct, IProductDetail } from '@/types/product'
import { v4 as uuidv4 } from 'uuid'

export const products: IProduct[] = [
  {
    id: 1,
    name: '中国京剧像音像资源数据',
    tags: ['京剧', '短片', '音像'],
    description: '包含视频图片音频等不同类型的数据',
    sellerId: 1,
    sellerName: '-----',
    showPrice: null,
    imageUrl: new URL(
      '@/assets/placeholder/productDefault.png',
      import.meta.url,
    ).href,
  },
  {
    id: 2,
    name: '微班进京200周年影像',
    tags: ['京剧', '神话京剧', '现代京剧'],
    description: '《战洪州》《火凤凰》《五台山》等',
    sellerId: 1,
    sellerName: '-----',
    showPrice: null,
    imageUrl: new URL(
      '@/assets/placeholder/productDefault.png',
      import.meta.url,
    ).href,
  },
  {
    id: 3,
    name: '少儿京剧影像',
    tags: ['少儿', '京剧'],
    description: '《沉香习舞》、《乌盆记》、《探阴山》等',
    sellerId: 1,
    sellerName: '-----',
    showPrice: null,
    imageUrl: new URL(
      '@/assets/placeholder/productDefault.png',
      import.meta.url,
    ).href,
  },
  {
    id: 4,
    name: '北京三维数字地图',
    tags: ['web', 'API', '小程序'],
    description: '包含北京地形以及元、明、清等不同时期的三维数字地图',
    sellerId: 1,
    sellerName: '-----',
    showPrice: null,
    imageUrl: new URL(
      '@/assets/placeholder/productDefault.png',
      import.meta.url,
    ).href,
  },
  {
    id: 5,
    name: '大运河历史遗迹遗址模型',
    tags: ['三维', '模型', '文化'],
    description: '大运河北京段河道、水源、桥梁、古建筑等三维模型',
    sellerId: 1,
    sellerName: '-----',
    showPrice: null,
    imageUrl: new URL(
      '@/assets/placeholder/productDefault.png',
      import.meta.url,
    ).href,
  },
  {
    id: 6,
    name: '景区画像数据',
    tags: ['旅游', '画像', '数据'],
    description: '景区到访人员旅行偏好等分析数据',
    sellerId: 1,
    sellerName: '-----',
    showPrice: null,
    imageUrl: new URL(
      '@/assets/placeholder/productDefault.png',
      import.meta.url,
    ).href,
  },
  {
    id: 7,
    name: '客流态势检测数据',
    tags: ['画像', '消费', '数据'],
    description: '旅游目的地的游客来源、游客数量走势、游客男女和性别画像等数据',
    sellerId: 1,
    sellerName: '-----',
    showPrice: null,
    imageUrl: new URL(
      '@/assets/placeholder/productDefault.png',
      import.meta.url,
    ).href,
  },
  {
    id: 8,
    name: '游客画像数据集',
    tags: ['画像', '数据', '模型'],
    description: '游客属性、游客消费、游客偏好等类型数据',
    sellerId: 1,
    sellerName: '-----',
    showPrice: null,
    imageUrl: new URL(
      '@/assets/placeholder/productDefault.png',
      import.meta.url,
    ).href,
  },
  // {
  //   id: 9,
  //   title: '电信数据基础接口指标',
  //   tags: ['客流量', '游客来源', '首访区域'],
  //   description: '假日文旅报告维度——以报告服务和平台开发服务对外销售',
  //   sellerId: 1,
  //   sellerName: '-----',
  //   price: null,
  //   imageUrl: new URL(
  //     '@/assets/placeholder/productDefault.png',
  //     import.meta.url,
  //   ).href,
  // },
  // {
  //   id: 10,
  //   title: '景区经济外溢效应分析数据指标--报告+平台',
  //   tags: ['日度游客规模统计', '客流驻留时长', '月度游客规模趋势'],
  //   description:
  //     '大景区-经济外溢效应分析数据指标——以报告/平台对外服务已为北京市提供环球影城分析',
  //   sellerId: 1,
  //   sellerName: '-----',
  //   price: null,
  //   imageUrl: new URL(
  //     '@/assets/placeholder/productDefault.png',
  //     import.meta.url,
  //   ).href,
  // },
  // {
  //   id: 11,
  //   title: '北京数据基础制度先行区 数据落地与应用',
  //   tags: ['客流态势监测', '国内客流数据集', '游客画像数据集'],
  //   description:
  //     '依托职住模型对全国联通用户进行统计并结合国家文化和旅游部发布的扩样算法进行全网反推，为旅游目的地提供全域游客情从游客来源、游客数量走势、游客男女和性别画像等方面进行游客特征分析，帮助客户实时监测客流情况',
  //   seller: '联通数字科技有限公司',
  //   price: null,
  //   imageUrl: new URL(
  //     '@/assets/placeholder/productDefault.png',
  //     import.meta.url,
  //   ).href,
  // },
  // {
  //   id: 12,
  //   title: '北京文化资源数据清单',
  //   tags: ['三维地图', '主题信息', '地理信息'],
  //   description: '建设北京地形、元、明、清、现代五套三维数字地图。',
  //   seller: '中国电信股份有限公司北京分公司',
  //   price: null,
  //   imageUrl: new URL(
  //     '@/assets/placeholder/productDefault.png',
  //     import.meta.url,
  //   ).href,
  // },
]

export const productDetails: {
  id: string | number
  baseInfo: IProductDetail
  imageUrls: string[]
  content: string
}[] = [
  {
    id: 1,
    baseInfo: {
      id: 1,
      name: '文化产品',
      soldCount: 100,
      tags: ['热门', '推荐'],
      description:
        '全屋智能家居解决方案，便捷、安全,全屋智能家居解决方案，便捷、安全',
      sellerId: 1,
      sellerName: '',
      hasCount: true,
      specGroups: [
        {
          key: uuidv4(),
          label: '数据完整度',
          specs: [
            {
              key: uuidv4(),
              label: '完整',
            },
            {
              key: uuidv4(),
              label: '精简',
            },
          ],
        },
        {
          key: uuidv4(),
          label: '购买方式',
          specs: [
            {
              key: uuidv4(),
              label: '包月',
            },
            {
              key: uuidv4(),
              label: '包年',
            },
            {
              key: uuidv4(),
              label: '永久',
            },
          ],
        },
      ],
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
      'https://via.placeholder.com/600x400',
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
    `,
  },
]
