import type { IReview, IReviewInfo } from '@/types/review'

export const reviews: IReview[] = [
  {
    avatar: 'https://via.placeholder.com/50',
    name: '张三',
    content: '这款产品非常好用，推荐购买！',
    reply: '感谢您的好评！我们会继续努力。',
    usefulCount: 10,
    rating: 3.5
  },
  {
    avatar: 'https://via.placeholder.com/50',
    name: '李四',
    content: '质量不错，但是价格偏高。',
    usefulCount: 5,
    rating: 5
  },
  {
    avatar: 'https://via.placeholder.com/50',
    name: '张三',
    content: '这款产品非常好用，推荐购买！',
    reply: '感谢您的好评！我们会继续努力。',
    usefulCount: 10,
    rating: 3.5
  },
  {
    avatar: 'https://via.placeholder.com/50',
    name: '李四',
    content: '质量不错，但是价格偏高。',
    usefulCount: 5,
    rating: 5
  },
  {
    avatar: 'https://via.placeholder.com/50',
    name: '张三',
    content: '这款产品非常好用，推荐购买！',
    reply: '感谢您的好评！我们会继续努力。',
    usefulCount: 10,
    rating: 3.5
  },
  {
    avatar: 'https://via.placeholder.com/50',
    name: '李四',
    content: '质量不错，但是价格偏高。',
    usefulCount: 5,
    rating: 5
  }
]

export const reviewInfo: IReviewInfo = {
  rating: 4.8,
  filters: [
    {
      key: 'all',
      count: 20
    },
    {
      key: 'positive',
      count: 15
    },
    {
      key: 'neutral',
      count: 3
    },
    {
      key: 'negative',
      count: 2
    },
    {
      key: 'replied',
      count: 5
    }
  ]
}
