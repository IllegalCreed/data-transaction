import { ReviewType } from '@/types/review'

// 状态映射
export const REVIEW_TYPE_MAP: { [key in ReviewType]: string } = {
  [ReviewType.All]: '全部',
  [ReviewType.Positive]: '好评',
  [ReviewType.Neutral]: '中评',
  [ReviewType.Negative]: '差评',
  [ReviewType.Replied]: '商家回复'
}
