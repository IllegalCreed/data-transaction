export interface INews {
  id: number | string
  title: string
  summary: string
  content: string
  imageUrl?: string
  bannerUrl?: string
  createTime: string
}

export type INewsItem = Omit<INews, 'content'>
