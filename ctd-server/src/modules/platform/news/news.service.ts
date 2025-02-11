import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository, SelectQueryBuilder } from 'typeorm';
import { News } from 'src/entities/news.entity';
import { AbstractListService } from 'src/common/services/abstract-list.service';
import { NewsItem } from './interface/news-item.interface';
import { NEWS_ALIAS } from './config/alias.config';
import { NEWS_FIELD_MAP } from './config/field-map.config';
import { NEWS_FUZZY_SEARCH_MAP } from './config/search-fields.config';
import { UpsertNewsDto } from './dto/upsert-news.dto';
import { ExpectedError } from 'src/types/error';
import { ErrorCode } from 'src/common/constants/error-codes';
import { ActiveStatus } from 'src/enums/active-status.enum';
import { IOption } from 'src/common/interfaces/option.interface';
import { exclude } from 'src/common/utils/exclude';
import { BaseNews } from './interface/base-news.interface';

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

  /**
   * 创建或更新资讯
   * @param dto UpsertNewsDto
   */
  async upsertNews(dto: UpsertNewsDto): Promise<News> {
    const { id, ...newsInfo } = dto;

    let news: News;

    // 如果 id > 0 => 更新
    if (id > 0) {
      news = await this.newsRepository.findOne({ where: { id } });
      if (!news) {
        this.logger.warn(`更新资讯失败: 未找到资讯 id=${id}`);
        throw new ExpectedError(ErrorCode.NEWS_NOT_FOUND);
      }

      // 更新可变字段
      news.title = newsInfo.title;
      news.author = newsInfo.author;
      news.summary = newsInfo.summary;
      news.coverImageUrl = newsInfo.coverImageUrl;
      news.headerImageUrl = newsInfo.headerImageUrl;
      news.content = newsInfo.content;
      news.publishedAt = newsInfo.publishedAt ?? new Date();
      news.status = newsInfo.status;

      await this.newsRepository.save(news);
    } else {
      // 创建
      news = this.newsRepository.create({
        ...newsInfo,
        publishedAt: newsInfo.publishedAt ?? new Date(),
        readCount: 0, // 初始阅读次数
      });
      await this.newsRepository.save(news);
    }

    return news;
  }

  /**
   * 修改资讯状态
   * @param dto ChangeStatusDto
   * @returns Scene
   */
  async changeStatus(ids: number[], status: ActiveStatus): Promise<void> {
    let updateResult;
    try {
      updateResult = await this.newsRepository.update(
        { id: In(ids) },
        { status },
      );
    } catch (error) {
      this.logger.error('修改资讯状态失败', error);
      throw new ExpectedError(ErrorCode.UPDATE_NEWS_STATUS_FAILED);
    }

    if (updateResult.affected === 0) {
      this.logger.warn(`修改资讯状态失败: 未找到任何匹配的资讯: [${ids}]`);
      throw new ExpectedError(ErrorCode.NEWS_NOT_FOUND);
    }
  }

  /**
   * 删除资讯（软删除）
   * @param dto DeleteSceneDto
   * @returns void
   */
  async delete(ids: number[]): Promise<void> {
    const newsList = await this.newsRepository.find({
      where: { id: In(ids) },
      withDeleted: false,
    });

    if (!newsList || newsList.length === 0) {
      this.logger.warn(`删除资讯失败: 未找到任何匹配的资讯: [${ids}]`);
      throw new ExpectedError(ErrorCode.NEWS_NOT_FOUND);
    }

    // 软删除
    try {
      await this.newsRepository.softRemove(newsList);
    } catch (error) {
      this.logger.error('删除资讯失败: 数据库删除失败', error);
      throw new ExpectedError(ErrorCode.DELETE_NEWS_FAILED);
    }
  }

  /**
   * 根据资讯名称进行模糊搜索，返回 IOption 数组
   * @param title 资讯名称
   * @returns IOption[]
   */
  async getOptionsByTitle(title: string): Promise<IOption[]> {
    try {
      const newsList = await this.newsRepository.find({
        where: { title: Like(`%${title}%`) },
        select: ['id', 'title'],
        order: { title: 'ASC' },
      });

      return newsList.map((news) => ({
        value: news.id,
        label: news.title,
      }));
    } catch (error) {
      this.logger.error(`根据名称查询资讯失败: title=${title}`, error);
      throw new ExpectedError(ErrorCode.GET_NEWS_OPTIONS_BY_TITLE_FAILED);
    }
  }

  /**
   * 根据资讯ID查询，返回 IOption 数组
   * @param id 资讯ID
   * @returns IOption[]
   */
  async getOptionsById(id: number): Promise<IOption[]> {
    let news;
    try {
      news = await this.newsRepository.findOne({
        where: { id },
        select: ['id', 'title'],
      });
    } catch (error) {
      this.logger.error(`根据ID查询资讯失败: id=${id}`, error);
      throw new ExpectedError(ErrorCode.GET_NEWS_OPTIONS_BY_ID_FAILED);
    }

    if (!news) {
      this.logger.warn(`根据ID查询资讯失败: 未找到资讯 id=${id}`);
      throw new ExpectedError(ErrorCode.NEWS_NOT_FOUND);
    }

    return [
      {
        value: news.id,
        label: news.title,
      },
    ];
  }

  /**
   * 获取资讯详情
   * @param id 资讯ID
   * @returns 资讯详情
   */
  async getNewsDetail(id: number): Promise<BaseNews> {
    const news = await this.newsRepository.findOne({
      where: { id },
    });

    if (!news) {
      this.logger.warn(`获取资讯详情失败: 未找到资讯 id=${id}`);
      throw new ExpectedError(ErrorCode.NEWS_NOT_FOUND);
    }

    const newsDetail = exclude(news, ['deletedAt']);

    return newsDetail;
  }
}
