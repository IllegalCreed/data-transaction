import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractListService } from 'src/common/services/abstract-list.service';
import { Scene } from 'src/entities/scene.entity';
import { Repository } from 'typeorm';
import { SceneItem } from './interface/scene-item.interface';
import { COMPANY_ALIAS, SCENE_ALIAS } from './config/alias.config';
import { SCENE_FUZZY_SEARCH_MAP } from './config/search-fields.config';
import { SCENE_FIELD_MAP } from './config/field-map.config';
import { Company } from 'src/entities/company.entity';

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
}
