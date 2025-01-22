import { SubsetRecordOf } from 'src/types/common';
import { COMPANY_ALIAS, SCENE_ALIAS } from './alias.config';
import { SceneItem } from '../interface/scene-item.interface';

/**
 * 这里定义“哪些字段需要做模糊搜索”以及对应的SQL实际字段名。
 */
export const SCENE_FUZZY_SEARCH_MAP: SubsetRecordOf<SceneItem> = {
  title: `${SCENE_ALIAS}.name`,
  companyName: `${COMPANY_ALIAS}.name`,
};
