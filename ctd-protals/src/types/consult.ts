export interface IIndicator {
  id: number | string
  title: string
  description: string
  indicator: string
}

export interface IService {
  id: number | string
  title: string
  description: string
  icon: string
  link: string
}

export interface ITeam {
  id: number | string
  title: string
  description: string
  imageUrl: string
  link: string
}
