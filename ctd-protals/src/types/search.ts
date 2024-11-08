export interface ISearchResult {
  module: 'produce' | 'service' | 'scene' | 'demand' | 'consult'
  id: number
  title: string
  description: string
}
