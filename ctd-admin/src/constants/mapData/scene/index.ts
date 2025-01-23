import type { IPropLabelMap } from '@/types/common'
import type { ISceneItem } from '@/types/scene'

export const SCENE_PROP_LABEL_MAP: IPropLabelMap<ISceneItem> = {
  id: 'ID',
  title: '场景名称',
  companyName: '关联公司名称',
  coverImageUrl: '封面',
  readCount: '阅读量',
  isOuterLink: '外部链接',
  status: '状态',
  createdAt: '创建时间',
  updatedAt: '更新时间'
}
