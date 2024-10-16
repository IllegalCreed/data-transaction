import type { IMyReview } from '@/types/review'
import { defineStore } from 'pinia'

export const useCommentStore = defineStore('comment', () => {
  // 测试数据
  const reviews = ref<IMyReview[]>([
    // 产品评论
    {
      id: 1,
      type: 'product',
      name: 'Alice',
      content: '这款产品非常实用，质量很好！',
      reply: '感谢您的支持！',
      usefulCount: 12,
      rating: 4.5,
      createdAt: '2022-01-01',
      product: {
        productId: 'p001',
        title: '智能手表',
        price: 199.99,
        image: 'https://via.placeholder.com/100x100'
      }
    },
    {
      id: 2,
      type: 'product',
      name: 'Bob',
      content: '性价比高，推荐购买。',
      usefulCount: 8,
      rating: 4.0,
      createdAt: '2022-01-01',
      product: {
        productId: 'p002',
        title: '无线耳机',
        price: 59.99,
        image: 'https://via.placeholder.com/100x100'
      }
    },
    {
      id: 3,
      type: 'product',
      name: 'Cathy',
      content: '外观时尚，但功能有待提升。',
      reply: '感谢您的反馈，我们会努力改进。',
      usefulCount: 5,
      rating: 3.5,
      createdAt: '2022-01-01',
      product: {
        productId: 'p003',
        title: '蓝牙音箱',
        price: 89.99,
        image: 'https://via.placeholder.com/100x100'
      }
    },
    // 需求评论
    {
      id: 4,
      type: 'demand',
      name: 'David',
      content: '需要一位熟悉Vue.js的开发者。',
      usefulCount: 10,
      rating: 5.0,
      createdAt: '2022-01-01',
      demand: {
        demandId: 'd001',
        title: '前端开发需求',
        budget: 8000
      }
    },
    {
      id: 5,
      type: 'demand',
      name: 'Emma',
      content: '寻找擅长UI设计的自由职业者。',
      reply: '已发送私信，请查收。',
      usefulCount: 7,
      rating: 4.8,
      createdAt: '2022-01-01',
      demand: {
        demandId: 'd002',
        title: '移动应用设计',
        budget: 6000
      }
    },
    {
      id: 6,
      type: 'demand',
      name: 'Frank',
      content: '需要一名摄影师，拍摄产品照片。',
      usefulCount: 3,
      rating: 4.0,
      createdAt: '2022-01-01',
      demand: {
        demandId: 'd003',
        title: '产品摄影',
        budget: 2000
      }
    },
    // 更多产品评论
    {
      id: 7,
      type: 'product',
      name: 'Grace',
      content: '包装精美，送人很合适。',
      usefulCount: 9,
      rating: 4.7,
      createdAt: '2022-01-01',
      product: {
        productId: 'p004',
        title: '精美礼盒',
        price: 129.99,
        image: 'https://via.placeholder.com/100x100'
      }
    },
    {
      id: 8,
      type: 'product',
      name: 'Henry',
      content: '物流很快，服务态度好。',
      usefulCount: 6,
      rating: 5.0,
      createdAt: '2022-01-01',
      product: {
        productId: 'p005',
        title: '电子书阅读器',
        price: 499.99,
        image: 'https://via.placeholder.com/100x100'
      }
    },
    {
      id: 9,
      type: 'product',
      name: 'Ivy',
      content: '功能简单易用，老人也能轻松上手。',
      usefulCount: 4,
      rating: 4.2,
      createdAt: '2022-01-01',
      product: {
        productId: 'p006',
        title: '老年手机',
        price: 299.99,
        image: 'https://via.placeholder.com/100x100'
      }
    },
    {
      id: 10,
      type: 'product',
      name: 'Jack',
      content: '质量不错，就是价格有点高。',
      usefulCount: 2,
      rating: 4.5,
      createdAt: '2022-01-01',
      product: {
        productId: 'p007',
        title: '高端笔记本电脑',
        price: 9999.99,
        image: 'https://via.placeholder.com/100x100'
      }
    },
    // 更多需求评论
    {
      id: 11,
      type: 'demand',
      name: 'Karen',
      content: '需要一位熟练使用Python的后端开发。',
      usefulCount: 11,
      rating: 4.8,
      createdAt: '2022-01-01',
      demand: {
        demandId: 'd004',
        title: '后端API开发',
        budget: 7000
      }
    },
    {
      id: 12,
      type: 'demand',
      name: 'Leo',
      content: '需要翻译服务，将文件翻译成英语。',
      usefulCount: 5,
      rating: 4.9,
      createdAt: '2022-01-01',
      demand: {
        demandId: 'd005',
        title: '文件翻译',
        budget: 1500
      }
    },
    {
      id: 13,
      type: 'demand',
      name: 'Mia',
      content: '寻找擅长市场调研的专业人士。',
      usefulCount: 3,
      rating: 4.3,
      createdAt: '2022-01-01',
      demand: {
        demandId: 'd006',
        title: '市场调研报告',
        budget: 4500
      }
    },
    {
      id: 14,
      type: 'demand',
      name: 'Nathan',
      content: '需要UI/UX设计师，优化我们的App界面。',
      usefulCount: 8,
      rating: 4.6,
      createdAt: '2022-01-01',
      demand: {
        demandId: 'd007',
        title: 'App界面设计',
        budget: 5000
      }
    }
  ])

  // Getter：获取 product 类型的评论
  const productReviews = computed(() => reviews.value.filter((review) => review.type === 'product'))

  // Getter：获取 demand 类型的评论
  const demandReviews = computed(() => reviews.value.filter((review) => review.type === 'demand'))

  // 返回状态和 getters
  return {
    reviews,
    productReviews,
    demandReviews
  }
})
