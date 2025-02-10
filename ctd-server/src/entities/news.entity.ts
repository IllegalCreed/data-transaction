import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ActiveStatus } from 'src/enums/active-status.enum';

@Entity('news')
export class News extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  author?: string;

  @Column({ type: 'text', nullable: true })
  summary?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  coverImageUrl?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  headerImageUrl?: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int', default: 0 })
  readCount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishedAt: Date;

  @Column({
    type: 'enum',
    enum: ActiveStatus,
    default: ActiveStatus.Active,
  })
  status: ActiveStatus;
}
