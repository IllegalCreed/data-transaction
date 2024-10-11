import { ReviewType, type IReview, type IReviewInfo } from '@/types/review'

export const reviews: IReview[] = [
  {
    id: 1,
    avatar: 'https://via.placeholder.com/50',
    name: '张三',
    content: '这款产品非常好用，推荐购买！',
    reply: '感谢您的好评！我们会继续努力。',
    usefulCount: 10,
    rating: 3.5,
    createdAt: '2023-04-01 10:00:00'
  },
  {
    id: 2,
    avatar: 'https://via.placeholder.com/50',
    name: '李四',
    content: '质量不错，但是价格偏高。',
    usefulCount: 5,
    rating: 5,
    createdAt: '2023-04-01 10:00:00'
  },
  {
    id: 3,
    avatar: 'https://via.placeholder.com/50',
    name: '张三',
    content: '这款产品非常好用，推荐购买！',
    reply: '感谢您的好评！我们会继续努力。',
    usefulCount: 10,
    rating: 3.5,
    createdAt: '2023-04-01 10:00:00'
  },
  {
    id: 4,
    avatar: 'https://via.placeholder.com/50',
    name: '李四',
    content: '质量不错，但是价格偏高。',
    usefulCount: 5,
    rating: 5,
    createdAt: '2023-04-01 10:00:00'
  },
  {
    id: 5,
    avatar: 'https://via.placeholder.com/50',
    name: '张三',
    content: '这款产品非常好用，推荐购买！',
    reply: '感谢您的好评！我们会继续努力。',
    usefulCount: 10,
    rating: 3.5,
    createdAt: '2023-04-01 10:00:00'
  },
  {
    id: 6,
    avatar: 'https://via.placeholder.com/50',
    name: '李四',
    content: '质量不错，但是价格偏高。',
    usefulCount: 5,
    rating: 5,
    createdAt: '2023-04-01 10:00:00'
  }
]

export const reviewInfo: IReviewInfo = {
  rating: 4.8,
  filters: [
    {
      key: ReviewType.All,
      count: 20
    },
    {
      key: ReviewType.Positive,
      count: 15
    },
    {
      key: ReviewType.Neutral,
      count: 3
    },
    {
      key: ReviewType.Negative,
      count: 2
    },
    {
      key: ReviewType.Replied,
      count: 5
    }
  ]
}
