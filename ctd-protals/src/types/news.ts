export interface INews {
  id: number
  title: string
  summary: string
  content: string
  imageUrl?: string
  createTime: string
}

export type INewsItem = Omit<INews, 'content'>
