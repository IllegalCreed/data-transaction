export interface INews {
  id: number
  title: string
  summary: string
  content: string
  image?: string
  createTime: string
}

export type INewsItem = Omit<INews, 'content'>
