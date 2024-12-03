import type { ActiveStatus } from '@/constants/mapData'
import type { ICompany } from './company'

export interface IScene {
  id: string | number
  title: string
  summary: string
  company: ICompany
  coverImageUrl?: string
  headerImageUrl?: string
  content?: string
  isOuterLink: boolean
  link?: string
  status: ActiveStatus
  readCount: number
  createTime: string
  updateTime: string
}

export interface ISceneItem
  extends Omit<
    IScene,
    'summary' | 'coverImageUrl' | 'headerImageUrl' | 'isOuterLink' | 'content' | 'link' | 'company'
  > {
  companyName: string
}

export interface ISceneDTO
  extends Omit<IScene, 'id' | 'createTime' | 'updateTime' | 'readCount' | 'company'> {
  companyId: string
}
