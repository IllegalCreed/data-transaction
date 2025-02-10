import type { ActiveStatus } from '@/constants/mapData'

/**
 * 新闻详情
 */
export interface INews {
  id: string | number
  title: string
  author?: string
  summary?: string
  coverImageUrl?: string
  headerImageUrl?: string
  content: string
  readCount: number
  publishedAt: string
  status: ActiveStatus
  createdAt: string
  updatedAt: string
}

/**
 * 新闻列表项
 */
export type INewsItem = Omit<INews, 'summary' | 'coverImageUrl' | 'headerImageUrl' | 'content'>

/**
 * 新增修改新闻
 */
export type INewsDTO = Omit<INews, 'id' | 'createTime' | 'updateTime' | 'readCount'>
