import type { ActiveStatus } from '@/constants/mapData'

interface IBaseScene {
  id: string | number
  title: string
  summary?: string
  company?: { id: number; name: string }
  coverImageUrl?: string
  headerImageUrl?: string
  createdAt: string
  updatedAt: string
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
  extends Omit<IScene, 'summary' | 'headerImageUrl' | 'content' | 'link' | 'company'> {
  companyName?: string
}

export interface ISceneDTO
  extends Omit<IScene, 'id' | 'createdAt' | 'updatedAt' | 'readCount' | 'company'> {
  companyId: string | number
}
