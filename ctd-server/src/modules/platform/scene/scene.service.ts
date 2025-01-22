import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractListService } from 'src/common/services/abstract-list.service';
import { Scene } from 'src/entities/scene.entity';
import { Like, Repository } from 'typeorm';
import { SceneItem } from './interface/scene-item.interface';
import { COMPANY_ALIAS, SCENE_ALIAS } from './config/alias.config';
import { SCENE_FUZZY_SEARCH_MAP } from './config/search-fields.config';
import { SCENE_FIELD_MAP } from './config/field-map.config';
import { Company } from 'src/entities/company.entity';
import { IOption } from 'src/common/interfaces/option.interface';
import { ErrorCode } from 'src/common/constants/error-codes';
import { ExpectedError } from 'src/types/error';

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
