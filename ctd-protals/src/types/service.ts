export interface IService {
  id: number | string
  title: string
  description: string
  sellingPoints: string[]
  imageUrl: string
}

export interface IStep {
  id: number | string
  stepNumber: string
  title: string
  description: string
  icon: string
}
