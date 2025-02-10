import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { News } from 'src/entities/news.entity';
import { AbstractListService } from 'src/common/services/abstract-list.service';
import { NewsItem } from './interface/news-item.interface';
import { NEWS_ALIAS } from './config/alias.config';
import { NEWS_FIELD_MAP } from './config/field-map.config';
import { NEWS_FUZZY_SEARCH_MAP } from './config/search-fields.config';

@Injectable()
export class NewsService extends AbstractListService<News, NewsItem> {
  protected logger = new Logger(NewsService.name);

  // 默认排序字段
  protected defaultOrderBy = `${NEWS_ALIAS}.id`;
  // 模糊搜索可用字段
  protected fuzzySearchMap = NEWS_FUZZY_SEARCH_MAP;
  // 筛选/排序可用字段
  protected fieldMap = NEWS_FIELD_MAP;

  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {
    super();
  }

  /**
   * 构建基础的 QueryBuilder
   */
  protected buildBaseQuery(): SelectQueryBuilder<News> {
    return this.newsRepository.createQueryBuilder(NEWS_ALIAS);
  }

  /**
   * 将实体数据转换为列表用的 NewsItem 结构
   */
  protected transformEntities(entities: News[]): NewsItem[] {
    return entities.map((item) => ({
      id: item.id,
      title: item.title,
      author: item.author,
      status: item.status,
      readCount: item.readCount,
      publishedAt: item.publishedAt,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  }
}
