import { NewsItem } from '../interface/news-item.interface';
import { NEWS_ALIAS } from './alias.config';

/**
 * 供 AbstractListService 筛选/排序时用的“字段 -> SQL真实字段” 映射
 * 比如前端传 { prop: 'title', order: 'asc' }，我们会在后端用 NEWS_FIELD_MAP 找到 news.title 做排序
 */
export const NEWS_FIELD_MAP: Record<keyof NewsItem, string> = {
  id: `${NEWS_ALIAS}.id`,
  title: `${NEWS_ALIAS}.title`,
  author: `${NEWS_ALIAS}.author`,
  readCount: `${NEWS_ALIAS}.readCount`,
  status: `${NEWS_ALIAS}.status`,
  publishedAt: `${NEWS_ALIAS}.publishedAt`,
  createdAt: `${NEWS_ALIAS}.createdAt`,
  updatedAt: `${NEWS_ALIAS}.updatedAt`,
};
