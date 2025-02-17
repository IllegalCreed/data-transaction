import { BannerItem } from '../interface/banner-item.interface';
import { BANNER_ALIAS } from './alias.config';

export const BANNER_FIELD_MAP: Record<keyof BannerItem, string> = {
  id: `${BANNER_ALIAS}.id`,
  title: `${BANNER_ALIAS}.title`,
  linkType: `${BANNER_ALIAS}.linkType`,
  status: `${BANNER_ALIAS}.status`,
  createdAt: `${BANNER_ALIAS}.createdAt`,
  updatedAt: `${BANNER_ALIAS}.updatedAt`,
};
