import type { IFilter } from '@/types/filter'
import type { IProduct } from '@/types/product'
import type { ISortItem } from '@/types/sorting'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
  const filterSource = ref<IFilter[]>([
    {
      id: 'product-form',
      label: '产品形态',
      items: [
        { id: 'all', label: '全部' },
        { id: 'document', label: '文档' },
        { id: 'table', label: '表格' },
        { id: 'data-package', label: '数据包' },
        { id: 'multimedia', label: '多媒体' },
        { id: 'api', label: 'API' },
        { id: 'virtual-art', label: '虚拟艺术品' },
        { id: 'course', label: '课程' },
        { id: 'map', label: '地图' },
        { id: 'custom-page', label: '定制页面' },
        { id: 'custom-product', label: '定制产品' },
        { id: 'physical-product', label: '实体商品' },
        { id: 'other', label: '其他' }
      ]
    },
    {
      id: 'data-field',
      label: '数据领域',
      items: [
        { id: 'all', label: '全部' },
        { id: 'scenic-spot', label: '景区' },
        { id: 'traffic', label: '交通' },
        { id: 'hotel', label: '酒店' },
        { id: 'shop', label: '商铺' },
        { id: 'weather', label: '气象' },
        { id: 'performance', label: '演出' },
        { id: 'other', label: '其他' }
      ]
    },
    {
      id: 'product-type',
      label: '产品类型',
      items: [
        { id: 'all', label: '全部' },
        { id: 'industry-report', label: '行业报告' },
        { id: 'tourist-profile', label: '游客画像' },
        { id: '3d-scene', label: '三维场景' },
        { id: 'geographic-information', label: '地理信息' },
        { id: 'raw-data', label: '原始数据' },
        { id: 'other', label: '其他' }
      ]
    },
    {
      id: 'data-source',
      label: '数据来源',
      items: [
        { id: 'all', label: '全部' },
        { id: 'platform-data', label: '平台数据' },
        { id: 'government-data', label: '政府数据' },
        { id: 'third-party-data', label: '第三方可信数据' },
        { id: 'open-data', label: '公开数据' },
        { id: 'other', label: '其他' }
      ]
    },
    {
      id: 'region',
      label: '区域',
      items: [
        { id: 'all', label: '全部' },
        { id: 'xicheng', label: '西城区' },
        { id: 'dongcheng', label: '东城区' },
        { id: 'chaoyang', label: '朝阳区' },
        { id: 'fengtai', label: '丰台区' },
        { id: 'shijingshan', label: '石景山区' },
        { id: 'haidian', label: '海淀区' },
        { id: 'tongzhou', label: '通州区' },
        { id: 'daxing', label: '大兴区' },
        { id: 'fangshan', label: '房山区' },
        { id: 'mentougou', label: '门头沟区' },
        { id: 'changping', label: '昌平区' },
        { id: 'shunyi', label: '顺义区' },
        { id: 'pinggu', label: '平谷区' },
        { id: 'yanqing', label: '延庆区' },
        { id: 'huairou', label: '怀柔区' },
        { id: 'miyun', label: '密云区' }
      ]
    },
    {
      id: 'time',
      label: '时间',
      items: [
        { id: 'all', label: '全部' },
        { id: 'holiday', label: '节假日' },
        { id: 'weekday', label: '平日' },
        { id: 'peak-season', label: '旺季' },
        { id: 'off-season', label: '淡季' },
        { id: 'other', label: '其他' }
      ]
    }
  ])

  const sortSource = ref<ISortItem[]>([
    { id: 'comprehensive', label: '综合', supportsToggle: false },
    { id: 'sales', label: '销量', supportsToggle: false },
    { id: 'time', label: '上架时间', supportsToggle: true },
    { id: 'price', label: '价格', supportsToggle: true }
  ])

  const products = ref<IProduct[]>([
    {
      id: 1,
      name: '道路数字化资产管理',
      tags: ['新款', '限量', '独家'],
      description: '先进的智能手表，支持多种健康监测功能。',
      seller: '智能科技有限公司',
      price: 2999,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+1'
    },
    {
      id: 2,
      name: '景区数字化资产管理',
      tags: ['热门', '推荐'],
      description: '高音质智能音箱，支持语音控制。',
      seller: '智能科技有限公司',
      price: 799,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+2'
    },
    {
      id: 3,
      name: '文化产品',
      tags: ['热门', '推荐'],
      description: '全屋智能家居解决方案，便捷、安全。',
      seller: '智能科技有限公司',
      price: 9999,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+3'
    },
    {
      id: 4,
      name: '文化遗产名录',
      tags: ['热门', '推荐'],
      description: '支持实时心率监测的智能跑步机。',
      seller: '智能科技有限公司',
      price: 4999,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+4'
    },
    {
      id: 5,
      name: '名胜古迹',
      tags: ['热门', '推荐'],
      description: '高安全性的智能门锁，支持多种开锁方式。',
      seller: '智能科技有限公司',
      price: 1599,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+5'
    },
    {
      id: 6,
      name: '小吃名录',
      tags: ['热门', '推荐'],
      description: '超高清智能电视，支持HDR10+。',
      seller: '智能科技有限公司',
      price: 6999,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+6'
    },
    {
      id: 7,
      name: '道路数字化资产管理',
      tags: ['新款', '限量', '独家'],
      description: '先进的智能手表，支持多种健康监测功能。',
      seller: '智能科技有限公司',
      price: 2999,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+1'
    },
    {
      id: 8,
      name: '景区数字化资产管理',
      tags: ['热门', '推荐'],
      description: '高音质智能音箱，支持语音控制。',
      seller: '智能科技有限公司',
      price: 799,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+2'
    },
    {
      id: 9,
      name: '文化产品',
      tags: ['热门', '推荐'],
      description: '全屋智能家居解决方案，便捷、安全。',
      seller: '智能科技有限公司',
      price: 9999,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+3'
    },
    {
      id: 10,
      name: '文化遗产名录',
      tags: ['热门', '推荐'],
      description: '支持实时心率监测的智能跑步机。',
      seller: '智能科技有限公司',
      price: 4999,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+4'
    },
    {
      id: 11,
      name: '名胜古迹',
      tags: ['热门', '推荐'],
      description: '高安全性的智能门锁，支持多种开锁方式。',
      seller: '智能科技有限公司',
      price: 1599,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+5'
    },
    {
      id: 12,
      name: '小吃名录',
      tags: ['热门', '推荐'],
      description: '超高清智能电视，支持HDR10+。',
      seller: '智能科技有限公司',
      price: 6999,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+6'
    }
  ])

  return {
    filterSource,
    sortSource,
    products
  }
})
