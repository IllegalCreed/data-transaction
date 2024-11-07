export interface ISeller {
  id: string | number
  name: string
  avatar: string
  tags: string[]
  content: string
  stats: {
    title: string
    value: string
  }[]
}
