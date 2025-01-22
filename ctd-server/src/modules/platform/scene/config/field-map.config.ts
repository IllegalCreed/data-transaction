import { SceneItem } from '../interface/scene-item.interface';
import { COMPANY_ALIAS, SCENE_ALIAS } from './alias.config';

export const SCENE_FIELD_MAP: Record<keyof SceneItem, string> = {
  id: `${SCENE_ALIAS}.id`,
  title: `${SCENE_ALIAS}.title`,
  companyName: `${COMPANY_ALIAS}.name`,
  coverImageUrl: `${SCENE_ALIAS}.coverImageUrl`,
  status: `${SCENE_ALIAS}.status`,
  createdAt: `${SCENE_ALIAS}.createdAt`,
  updatedAt: `${SCENE_ALIAS}.updatedAt`,
  readCount: `${SCENE_ALIAS}.readCount`,
  isOuterLink: `${SCENE_ALIAS}.isOuterLink`,
};
