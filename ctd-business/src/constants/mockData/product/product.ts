import {
  ProductDataField,
  ProductDataSource,
  ProductForm,
  ProductPriceTypes,
  ProductStatus,
  Region,
  Time
} from '@/constants/mapData/product'
import type { IProductItem, IProductSpecsPriceDefinition, IProductVersion } from '@/types/product'

export const products: IProductItem[] = [
  {
    id: 1,
    name: '测试产品1',
    description: '测试描述',
    coverImageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    showPrice: 200,
    soldCount: 0,
    rating: 0,
    status: ProductStatus.Approving,
    createTime: '2022-01-01 00:00:00',
    updateTime: '2022-01-01 00:00:00'
  },
  {
    id: 2,
    name: '测试产品2',
    description: '测试描述',
    coverImageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    showPrice: 200.0,
    soldCount: 200,
    rating: 5,
    currentVersion: 1,
    status: ProductStatus.OffSale,
    createTime: '2022-01-01 00:00:00',
    updateTime: '2022-01-01 00:00:00'
  },
  {
    id: 3,
    name: '测试产品3',
    description: '测试描述',
    coverImageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    showPrice: 200.0,
    soldCount: 200,
    rating: 5,
    currentVersion: 1,
    status: ProductStatus.OnSale,
    createTime: '2022-01-01 00:00:00',
    updateTime: '2022-01-01 00:00:00'
  },
  {
    id: 4,
    name: '测试产品4',
    description: '测试描述',
    coverImageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    showPrice: 200.0,
    soldCount: 200,
    rating: 5,
    currentVersion: 1,
    status: ProductStatus.Rejected,
    reasonId: 1,
    createTime: '2022-01-01 00:00:00',
    updateTime: '2022-01-01 00:00:00'
  },
  {
    id: 5,
    name: '测试产品5',
    description: '测试描述',
    coverImageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    showPrice: 200.0,
    soldCount: 200,
    rating: 5,
    currentVersion: 2,
    status: ProductStatus.Approving,
    createTime: '2022-01-01 00:00:00',
    updateTime: '2022-01-01 00:00:00'
  }
]

export const versions: IProductVersion[] = [
  {
    version: 0,
    name: '测试产品5',
    description: '修改了测试描述',
    showPrice: 2000,
    tags: ['测试标签1', '测试标签2', '增加的测试标签3'],
    coverImageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    imageUrls: [],
    detail: `
      <h1>测试标题</h1>
      <p>测试内容</p>
      <p>增加的测试内容</p>
    `,
    form: ProductForm.Package,
    dataFields: [ProductDataField.Traffic, ProductDataField.Hotel],
    dataSources: [ProductDataSource.GovernmentData],
    regions: [Region.Chaoyang, Region.Tongzhou],
    times: [Time.Holiday],
    priceType: ProductPriceTypes.Specs,
    createTime: '2022-01-01 00:00:00'
  },
  {
    version: 1,
    name: '测试产品5',
    description: '测试描述',
    showPrice: 200,
    tags: ['测试标签1', '测试标签2'],
    coverImageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    imageUrls: [
      new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
      new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
      new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
      new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
      new URL('@/assets/placeholder/productDefault.png', import.meta.url).href
    ],
    detail: `
      <h1>测试标题</h1>
      <p>测试内容</p>
    `,
    form: ProductForm.Package,
    dataFields: [ProductDataField.Performance, ProductDataField.Hotel],
    dataSources: [ProductDataSource.GovernmentData],
    regions: [Region.Chaoyang, Region.Fangshan],
    times: [Time.Holiday],
    priceType: ProductPriceTypes.Specs,
    createTime: '2022-01-01 00:00:00'
  },
  {
    version: 2,
    name: '测试产品5',
    description: '测试描述测试描述测试描述测试描述',
    showPrice: 1000,
    tags: ['测试标签1', '测试标签2', '测试标签3'],
    coverImageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    imageUrls: [
      new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
      new URL('@/assets/placeholder/productDefault.png', import.meta.url).href
    ],
    detail: `
      <h1>测试标题</h1>
      <p>测试内容</p>
    `,
    form: ProductForm.Package,
    dataFields: [ProductDataField.Traffic, ProductDataField.Hotel],
    dataSources: [ProductDataSource.GovernmentData],
    regions: [Region.Chaoyang, Region.Pinggu],
    times: [Time.Holiday],
    priceType: ProductPriceTypes.Specs,
    createTime: '2022-01-01 00:00:00'
  }
]

export const prices: { version: string | number; prices: IProductSpecsPriceDefinition }[] = [
  {
    version: 0,
    prices: {
      defaultPrice: 0,
      mainSpecGroupId: '1',
      specs: [
        {
          id: '1',
          label: '颜色',
          affectsPrice: true,
          children: [
            {
              id: '1-1',
              label: '白色'
            },
            {
              id: '1-2',
              label: '蓝色'
            }
          ]
        },
        {
          id: '2',
          label: '型号',
          affectsPrice: true,
          children: [
            {
              id: '2-1',
              label: '大'
            },
            {
              id: '2-2',
              label: '中'
            },
            {
              id: '2-3',
              label: '小'
            }
          ]
        },
        {
          id: '3',
          label: '形状',
          affectsPrice: false,
          children: [
            {
              id: '3-1',
              label: '圆形'
            },
            {
              id: '3-2',
              label: '方形'
            }
          ]
        }
      ],
      prices: [
        {
          price: 200,
          specs: [
            {
              groupId: '1',
              specId: '1-1'
            },
            {
              groupId: '2',
              specId: '2-1'
            }
          ]
        }
      ]
    }
  },
  {
    version: 1,
    prices: {
      defaultPrice: 100,
      mainSpecGroupId: '1',
      specs: [
        {
          id: '1',
          label: '颜色',
          affectsPrice: true,
          children: [
            {
              id: '1-1',
              label: '白色'
            },
            {
              id: '1-2',
              label: '蓝色'
            }
          ]
        },
        {
          id: '2',
          label: '型号',
          affectsPrice: true,
          children: [
            {
              id: '2-1',
              label: '大'
            },
            {
              id: '2-2',
              label: '中'
            },
            {
              id: '2-3',
              label: '小'
            }
          ]
        },
        {
          id: '3',
          label: '形状',
          affectsPrice: false,
          children: [
            {
              id: '3-1',
              label: '圆形'
            },
            {
              id: '3-2',
              label: '方形'
            }
          ]
        }
      ],
      prices: [
        {
          price: 200,
          specs: [
            {
              groupId: '1',
              specId: '1-1'
            },
            {
              groupId: '2',
              specId: '2-1'
            }
          ]
        }
      ]
    }
  },
  {
    version: 2,
    prices: {
      defaultPrice: 300,
      mainSpecGroupId: '1',
      specs: [
        {
          id: '1',
          label: '颜色',
          affectsPrice: true,
          children: [
            {
              id: '1-1',
              label: '白色'
            },
            {
              id: '1-2',
              label: '蓝色'
            }
          ]
        },
        {
          id: '2',
          label: '型号',
          affectsPrice: true,
          children: [
            {
              id: '2-1',
              label: '大'
            },
            {
              id: '2-2',
              label: '中'
            },
            {
              id: '2-3',
              label: '小'
            }
          ]
        }
      ],
      prices: [
        {
          price: 200,
          specs: [
            {
              groupId: '1',
              specId: '1-1'
            },
            {
              groupId: '2',
              specId: '2-1'
            }
          ]
        }
      ]
    }
  }
]
