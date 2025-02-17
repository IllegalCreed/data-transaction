import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/entities/base.entity';
import { LinkTypes } from 'src/enums/link-type.enum';
import { ActiveStatus } from 'src/enums/active-status.enum';
import { Scene } from './scene.entity';
import { News } from './news.entity';

@Entity('banners')
export class Banner extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  imageUrl: string;

  @Column({ type: 'enum', enum: LinkTypes })
  linkType: LinkTypes;

  @Column({ type: 'enum', enum: ActiveStatus, default: ActiveStatus.Active })
  status: ActiveStatus;

  @Column({ name: 'sceneId', type: 'int', nullable: true })
  sceneId?: number;

  // 外键关联场景
  @ManyToOne(() => Scene, { eager: true, nullable: true })
  @JoinColumn({ name: 'sceneId' })
  scene?: Scene;

  @Column({ name: 'newsId', type: 'int', nullable: true })
  newsId?: number;

  // 外键关联资讯
  @ManyToOne(() => News, { eager: true, nullable: true })
  @JoinColumn({ name: 'newsId' })
  news?: News;

  // // 外键关联产品
  // @ManyToOne(() => Product, { nullable: true })
  // @JoinColumn({ name: 'productId' })
  // product?: Product;

  // // 外键关联需求
  // @ManyToOne(() => Demand, { nullable: true })
  // @JoinColumn({ name: 'demandId' })
  // demand?: Demand;

  // 外部链接的数据字段，仅当 linkType 为 OuterLink 时有效
  @Column({ type: 'varchar', length: 255, nullable: true })
  data?: string;
}
