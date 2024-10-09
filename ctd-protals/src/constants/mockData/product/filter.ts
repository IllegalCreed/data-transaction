import type { IFilter } from '@/types/filter'

export const filterSource: IFilter[] = [
  {
    id: 'product-form',
    label: '产品形态',
    items: [
      { id: 'all', label: '全部' },
      { id: 'package', label: '数据集' },
      { id: 'api', label: 'API' },
      { id: 'multimedia', label: '多媒体' },
      { id: 'virtual-art', label: '虚拟艺术品' },
      { id: 'other', label: '其他' }
    ]
  },
  {
    id: 'data-field',
    label: '涉及领域',
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
]
