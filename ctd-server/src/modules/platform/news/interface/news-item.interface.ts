import { BaseNews } from './base-news.interface';

export type NewsItem = Omit<
  BaseNews,
  'summary' | 'coverImageUrl' | 'headerImageUrl' | 'content'
>;
