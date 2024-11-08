import { PayType, TransactionMode } from '@/types/demand'
import type { IDemandReview } from '@/types/review'

export const demandReviews: IDemandReview[] = [
  {
    id: 4,
    type: 'demand',
    content: '需要一位熟悉Vue.js的开发者。',
    usefulCount: 10,
    rating: 5.0,
    createTime: '2022-01-01',
    demand: {
      demandId: 1,
      name: '前端开发需求',
      budget: 8000,
      transactionType: { mode: TransactionMode.Pitch },
    },
  },
  {
    id: 5,
    type: 'demand',
    content: '寻找擅长UI设计的自由职业者。',
    reply: '已发送私信，请查收。',
    usefulCount: 7,
    rating: 4.8,
    createTime: '2022-01-01',
    demand: {
      demandId: 2,
      name: '移动应用设计',
      budget: 6000,
      transactionType: {
        mode: TransactionMode.Tender,
        payType: PayType.ByFixedPrice,
      },
    },
  },
  {
    id: 6,
    type: 'demand',
    content: '需要一名摄影师，拍摄产品照片。',
    usefulCount: 3,
    rating: 4.0,
    createTime: '2022-01-01',
    demand: {
      demandId: 3,
      name: '产品摄影',
      budget: 2000,
      transactionType: {
        mode: TransactionMode.Tender,
        payType: PayType.ByFixedPrice,
      },
    },
  },
  {
    id: 11,
    type: 'demand',
    content: '需要一位熟练使用Python的后端开发。',
    usefulCount: 11,
    rating: 4.8,
    createTime: '2022-01-01',
    demand: {
      demandId: 4,
      name: '后端API开发',
      budget: 7000,
      transactionType: {
        mode: TransactionMode.Tender,
        payType: PayType.ByFixedPrice,
      },
    },
  },
  {
    id: 12,
    type: 'demand',
    content: '需要翻译服务，将文件翻译成英语。',
    usefulCount: 5,
    rating: 4.9,
    createTime: '2022-01-01',
    demand: {
      demandId: 5,
      name: '文件翻译',
      budget: 1500,
      transactionType: {
        mode: TransactionMode.Tender,
        payType: PayType.ByFixedPrice,
      },
    },
  },
  {
    id: 13,
    type: 'demand',
    content: '寻找擅长市场调研的专业人士。',
    usefulCount: 3,
    rating: 4.3,
    createTime: '2022-01-01',
    demand: {
      demandId: 6,
      name: '市场调研报告',
      budget: 4500,
      transactionType: {
        mode: TransactionMode.Tender,
        payType: PayType.ByFixedPrice,
      },
    },
  },
]
