import type { IProduct } from '@/types/product'

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
]
