import type { ActiveStatus } from '@/constants/mapData'
import type { ICompany } from './company'

interface IBaseScene {
  id: string | number
  title: string
  summary: string
  company: ICompany
  coverImageUrl?: string
  headerImageUrl?: string
  createTime: string
  updateTime: string
  status: ActiveStatus
  readCount: number
}

interface IOuterLinkScene extends IBaseScene {
  isOuterLink: true
  link: string
  content?: string
}

interface IInnerContentScene extends IBaseScene {
  isOuterLink: false
  content: string
  link?: string
}

export type IScene = IOuterLinkScene | IInnerContentScene

export interface ISceneItem
  extends Omit<
    IScene,
    'summary' | 'coverImageUrl' | 'headerImageUrl' | 'content' | 'link' | 'company'
  > {
  companyName: string
}

export interface ISceneDTO
  extends Omit<IScene, 'id' | 'createTime' | 'updateTime' | 'readCount' | 'company'> {
  companyId: string | number
}
