export interface ISeller {
  id: string | number
  title: string
  avatar: string
  tags: string[]
  content: string
  stats: {
    title: string
    value: string
  }[]
}
