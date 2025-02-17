import { SubsetRecordOf } from 'src/types/common';
import { BANNER_ALIAS } from './alias.config';
import { BannerItem } from '../interface/banner-item.interface';

export const BANNER_FUZZY_SEARCH_MAP: SubsetRecordOf<BannerItem> = {
  title: `${BANNER_ALIAS}.title`,
};
