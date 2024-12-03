import type { ActiveStatus } from '@/constants/mapData'

export interface INews {
  id: string | number
  title: string
  summary: string
  coverImageUrl?: string
  headerImageUrl?: string
  content: string
  status: ActiveStatus
  readCount: number
  publicDate: string
  createTime: string
  updateTime: string
}

export type INewsItem = Omit<INews, 'summary' | 'coverImageUrl' | 'headerImageUrl' | 'content'>

export type INewsDTO = Omit<INews, 'createTime' | 'updateTime' | 'readCount'>
