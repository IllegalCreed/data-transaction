import type { IPropLabelMap } from '@/types/common'
import type { INewsItem } from '@/types/news'

export const NEWS_PROP_LABEL_MAP: IPropLabelMap<INewsItem> = {
  id: 'ID',
  title: '资讯标题',
  author: '作者',
  readCount: '阅读量',
  status: '状态',
  publishedAt: '发布时间',
  createdAt: '创建时间',
  updatedAt: '更新时间'
}
