import { SubsetRecordOf } from 'src/types/common';
import { NEWS_ALIAS } from './alias.config';
import { NewsItem } from '../interface/news-item.interface';

/**
 * 用于模糊搜索时声明“哪些字段支持模糊搜索”，以及对应的 SQL 字段表达式
 */
export const NEWS_FUZZY_SEARCH_MAP: SubsetRecordOf<NewsItem> = {
  title: `${NEWS_ALIAS}.title`,
  author: `${NEWS_ALIAS}.author`,
};
