import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { Banner } from 'src/entities/banner.entity';
import { AbstractListService } from 'src/common/services/abstract-list.service';
import { BannerItem } from './interface/banner-item.interface';
import { BANNER_ALIAS } from './config/alias.config';
import { BANNER_FIELD_MAP } from './config/field-map.config';
import { BANNER_FUZZY_SEARCH_MAP } from './config/search-fields.config';
import { UpsertBannerDto } from './dto/upsert-banner.dto';
import { ErrorCode } from 'src/common/constants/error-codes';
import { ExpectedError } from 'src/types/error';
import { ActiveStatus } from 'src/enums/active-status.enum';
import { BannerDetail } from './interface/banner-detail.interface';
import { LinkTypes } from 'src/enums/link-type.enum';
import { exclude } from 'src/common/utils/exclude';

@Injectable()
export class BannerService extends AbstractListService<Banner, BannerItem> {
  protected logger = new Logger(BannerService.name);

  // 默认排序字段
  protected defaultOrderBy = `${BANNER_ALIAS}.id`;
  // 模糊搜索可用字段
  protected fuzzySearchMap = BANNER_FUZZY_SEARCH_MAP;
  // 筛选/排序可用字段
  protected fieldMap = BANNER_FIELD_MAP;

  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
  ) {
    super();
  }

  /**
   * 构建基础的 QueryBuilder
   */
  protected buildBaseQuery(): SelectQueryBuilder<Banner> {
    return this.bannerRepository.createQueryBuilder(BANNER_ALIAS);
  }

  /**
   * 将实体数据转换为列表用的 BannerItem 结构
   */
  protected transformEntities(entities: Banner[]): BannerItem[] {
    return entities.map((item) => ({
      id: item.id,
      title: item.title,
      linkType: item.linkType,
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      imageUrl: item.imageUrl,
    }));
  }

  /**
   * 创建或更新Banner
   * @param dto UpsertBannerDto
   */
  async upsertBanner(dto: UpsertBannerDto): Promise<Banner> {
    const { id, ...bannerInfo } = dto;

    let banner: Banner;

    // 如果 id > 0 => 更新
    if (id > 0) {
      banner = await this.bannerRepository.findOne({ where: { id } });
      if (!banner) {
        this.logger.warn(`更新横幅失败: 未找到横幅 id=${id}`);
        throw new ExpectedError(ErrorCode.BANNER_NOT_FOUND);
      }

      // 更新可变字段
      banner.title = bannerInfo.title;
      banner.linkType = bannerInfo.linkType;
      banner.status = bannerInfo.status;
      banner.imageUrl = bannerInfo.imageUrl;

      // 根据 linkType 判断是否更新外键
      if (bannerInfo.linkType === LinkTypes.None) {
        banner.data = null;
      } else if (bannerInfo.linkType === LinkTypes.OuterLink) {
        banner.data = bannerInfo.data;
      } else {
        switch (bannerInfo.linkType) {
          case LinkTypes.Scene:
            banner.sceneId = bannerInfo.data.id;
            break;
          case LinkTypes.News:
            banner.newsId = bannerInfo.data.id;
            break;
        }
      }

      await this.bannerRepository.save(banner);
    } else {
      // 创建
      const newBannerData = {
        title: bannerInfo.title,
        linkType: bannerInfo.linkType,
        status: bannerInfo.status,
        imageUrl: bannerInfo.imageUrl,
      };

      // 处理不同的 linkType 并映射到正确的字段
      if (bannerInfo.linkType === LinkTypes.None) {
        newBannerData['data'] = null;
      } else if (bannerInfo.linkType === LinkTypes.OuterLink) {
        newBannerData['data'] = bannerInfo.data;
      } else {
        // 根据 linkType 选择正确的 ID
        if (bannerInfo.linkType === LinkTypes.Scene) {
          newBannerData['sceneId'] = bannerInfo.data.id;
        } else if (bannerInfo.linkType === LinkTypes.News) {
          newBannerData['newsId'] = bannerInfo.data.id;
        }
      }

      banner = this.bannerRepository.create(newBannerData);
      await this.bannerRepository.save(banner);
    }

    return banner;
  }

  /**
   * 获取 Banner 详情
   * @param id Banner ID
   * @returns 详情数据
   */
  async getBannerDetail(id: number): Promise<BannerDetail> {
    const banner = await this.bannerRepository.findOne({
      where: { id },
    });

    if (!banner) {
      this.logger.warn(`获取 Banner 详情失败: 未找到 Banner id=${id}`);
      throw new ExpectedError(ErrorCode.BANNER_NOT_FOUND);
    }

    let data: string | { id: number; name: string } | undefined;
    if (banner.linkType === LinkTypes.None) {
      data = undefined;
    } else if (banner.linkType === LinkTypes.OuterLink) {
      data = banner.data;
    } else {
      switch (banner.linkType) {
        case LinkTypes.Scene:
          if (banner.scene) {
            data = { id: banner.scene.id, name: banner.scene.title };
          } else {
            throw new ExpectedError(ErrorCode.SCENE_NOT_FOUND);
          }
          break;
        case LinkTypes.News:
          if (banner.news) {
            data = { id: banner.news.id, name: banner.news.title };
          } else {
            throw new ExpectedError(ErrorCode.NEWS_NOT_FOUND);
          }
          break;
        default:
          data = undefined;
          break;
      }
    }

    const bannerData = exclude(banner, [
      'deletedAt',
      'sceneId',
      'newsId',
      'news',
      'scene',
    ]);
    return { ...bannerData, data } as BannerDetail;
  }

  /**
   * 批量修改横幅状态
   * @param ids 横幅 IDs
   * @param status 目标状态
   */
  async changeStatus(ids: number[], status: ActiveStatus): Promise<void> {
    let updateResult;
    try {
      updateResult = await this.bannerRepository.update(
        { id: In(ids) },
        { status },
      );
    } catch (error) {
      this.logger.error('修改横幅状态失败', error);
      throw new ExpectedError(ErrorCode.UPDATE_BANNER_STATUS_FAILED);
    }

    if (updateResult.affected === 0) {
      this.logger.warn(`修改横幅状态失败: 未找到任何匹配的横幅: [${ids}]`);
      throw new ExpectedError(ErrorCode.BANNER_NOT_FOUND);
    }
  }

  /**
   * 批量删除横幅（软删除）
   * @param ids 横幅 IDs
   */
  async delete(ids: number[]): Promise<void> {
    const scenes = await this.bannerRepository.find({
      where: { id: In(ids) },
      withDeleted: false,
    });

    if (!scenes || scenes.length === 0) {
      this.logger.warn(`删除横幅失败: 未找到任何匹配的横幅: [${ids}]`);
      throw new ExpectedError(ErrorCode.BANNER_NOT_FOUND);
    }

    // 软删除
    try {
      await this.bannerRepository.softRemove(scenes);
    } catch (error) {
      this.logger.error('删除横幅失败: 数据库删除失败', error);
      throw new ExpectedError(ErrorCode.DELETE_BANNER_FAILED);
    }
  }
}
