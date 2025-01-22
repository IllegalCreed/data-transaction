import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractListService } from 'src/common/services/abstract-list.service';
import { Scene } from 'src/entities/scene.entity';
import { In, Like, Repository } from 'typeorm';
import { SceneItem } from './interface/scene-item.interface';
import { COMPANY_ALIAS, SCENE_ALIAS } from './config/alias.config';
import { SCENE_FUZZY_SEARCH_MAP } from './config/search-fields.config';
import { SCENE_FIELD_MAP } from './config/field-map.config';
import { Company } from 'src/entities/company.entity';
import { IOption } from 'src/common/interfaces/option.interface';
import { ErrorCode } from 'src/common/constants/error-codes';
import { ExpectedError } from 'src/types/error';
import { UpsertSceneDto } from './dto/upsert-scene.dto';
import { SceneDetail } from './interface/scene-detail.interface';
import { exclude } from 'src/common/utils/exclude';
import { ActiveStatus } from 'src/enums/active-status.enum';

@Injectable()
export class SceneService extends AbstractListService<Scene, SceneItem> {
  protected logger = new Logger(SceneService.name);

  protected defaultOrderBy = `${SCENE_ALIAS}.id`;
  protected fuzzySearchMap = SCENE_FUZZY_SEARCH_MAP;
  protected fieldMap = SCENE_FIELD_MAP;

  constructor(
    @InjectRepository(Scene)
    private readonly sceneRepository: Repository<Scene>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {
    super();
  }

  protected buildBaseQuery() {
    const qb = this.sceneRepository
      .createQueryBuilder(SCENE_ALIAS)
      .leftJoinAndSelect(`${SCENE_ALIAS}.company`, COMPANY_ALIAS);

    return qb;
  }

  protected transformEntities(entities: Scene[]): SceneItem[] {
    return entities.map((item) => {
      return {
        id: item.id,
        title: item.title,
        companyName: item.company ? item.company.name : '',
        coverImageUrl: item.coverImageUrl,
        readCount: item.readCount,
        isOuterLink: item.isOuterLink,
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    });
  }

  /**
   * 创建或更新场景
   * @param dto UpsertSceneDto
   * @returns Scene
   */
  async upsertScene(dto: UpsertSceneDto): Promise<Scene> {
    const { id, ...sceneInfo } = dto;

    let scene: Scene;

    if (id > 0) {
      scene = await this.sceneRepository.findOne({
        where: { id },
      });
      if (!scene) {
        this.logger.warn(`更新场景失败: 未找到场景 id=${dto.id}`);
        throw new ExpectedError(ErrorCode.SCENE_NOT_FOUND);
      }

      scene.title = sceneInfo.title;
      scene.summary = sceneInfo.summary;
      scene.companyId = sceneInfo.companyId;
      scene.coverImageUrl = sceneInfo.coverImageUrl;
      scene.headerImageUrl = sceneInfo.headerImageUrl;
      scene.isOuterLink = sceneInfo.isOuterLink;
      scene.link = sceneInfo.isOuterLink ? sceneInfo.link : undefined;
      scene.content = sceneInfo.isOuterLink ? undefined : sceneInfo.content;
      scene.status = sceneInfo.status;

      await this.sceneRepository.save(scene);
    } else {
      // 创建操作
      scene = this.sceneRepository.create({
        ...sceneInfo,
        readCount: 0, // 初始阅读次数
      });
      await this.sceneRepository.save(scene);
    }
    return scene;
  }

  /**
   * 获取场景详情
   * @param id 场景ID
   * @returns Scene
   */
  async getSceneDetail(id: number): Promise<SceneDetail> {
    const scene = await this.sceneRepository.findOne({
      where: { id },
      relations: ['company'],
    });

    if (!scene) {
      this.logger.warn(`获取场景详情失败: 未找到场景 id=${id}`);
      throw new ExpectedError(ErrorCode.SCENE_NOT_FOUND);
    }

    const sceneData = exclude(scene, ['deletedAt', 'companyId']);

    const sceneDetail = {
      ...sceneData,
      company: scene.company
        ? {
            id: scene.company.id,
            name: scene.company.name,
          }
        : undefined,
    };

    return sceneDetail;
  }

  /**
   * 修改场景状态
   * @param dto ChangeStatusDto
   * @returns Scene
   */
  async changeStatus(ids: number[], status: ActiveStatus): Promise<void> {
    let updateResult;
    try {
      updateResult = await this.sceneRepository.update(
        { id: In(ids) },
        { status },
      );
    } catch (error) {
      this.logger.error('修改场景状态失败', error);
      throw new ExpectedError(ErrorCode.UPDATE_SCENE_STATUS_FAILED);
    }

    if (updateResult.affected === 0) {
      this.logger.warn(`修改场景状态失败: 未找到任何匹配的场景: [${ids}]`);
      throw new ExpectedError(ErrorCode.SCENE_NOT_FOUND);
    }
  }

  /**
   * 删除场景（软删除）
   * @param dto DeleteSceneDto
   * @returns void
   */
  async delete(ids: number[]): Promise<void> {
    const scenes = await this.sceneRepository.find({
      where: { id: In(ids) },
      withDeleted: false,
    });

    if (!scenes || scenes.length === 0) {
      this.logger.warn(`删除场景失败: 未找到任何匹配的场景: [${ids}]`);
      throw new ExpectedError(ErrorCode.SCENE_NOT_FOUND);
    }

    // 软删除
    try {
      await this.companyRepository.softRemove(scenes);
    } catch (error) {
      this.logger.error('删除场景失败: 数据库删除失败', error);
      throw new ExpectedError(ErrorCode.DELETE_SCENE_FAILED);
    }
  }

  /**
   * 根据场景名称进行模糊搜索，返回 IOption 数组
   * @param title 场景名称
   * @returns IOption[]
   */
  async getOptionsByTitle(title: string): Promise<IOption[]> {
    try {
      const scenes = await this.sceneRepository.find({
        where: { title: Like(`%${title}%`) },
        select: ['id', 'title'],
        order: { title: 'ASC' },
      });

      return scenes.map((scene) => ({
        value: scene.id,
        label: scene.title,
      }));
    } catch (error) {
      this.logger.error(`根据名称查询场景失败: title=${title}`, error);
      throw new ExpectedError(ErrorCode.GET_SCENE_OPTIONS_BY_TITLE_FAILED);
    }
  }

  /**
   * 根据场景ID查询，返回 IOption 数组
   * @param id 场景ID
   * @returns IOption[]
   */
  async getOptionsById(id: number): Promise<IOption[]> {
    let scene;
    try {
      scene = await this.sceneRepository.findOne({
        where: { id },
        select: ['id', 'title'],
      });
    } catch (error) {
      this.logger.error(`根据ID查询场景失败: id=${id}`, error);
      throw new ExpectedError(ErrorCode.GET_SCENE_OPTIONS_BY_ID_FAILED);
    }

    if (!scene) {
      this.logger.warn(`根据ID查询场景失败: 未找到场景 id=${id}`);
      throw new ExpectedError(ErrorCode.SCENE_NOT_FOUND);
    }

    return [
      {
        value: scene.id,
        label: scene.title,
      },
    ];
  }
}
