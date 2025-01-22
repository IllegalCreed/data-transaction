import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity'; // 确保 Company 实体已存在
import { ActiveStatus } from 'src/enums/active-status.enum';

@Entity('scenes')
export class Scene extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  summary?: string;

  @Column({ name: 'companyId', type: 'int', nullable: true })
  companyId?: number;

  @ManyToOne(() => Company, (company) => company.scenes, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'companyId' })
  company?: Company;

  @Column({ type: 'varchar', length: 255, nullable: true })
  coverImageUrl?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  headerImageUrl?: string;

  @Column({
    type: 'enum',
    enum: ActiveStatus,
    default: ActiveStatus.Active,
  })
  status: ActiveStatus;

  @Column({ type: 'int', default: 0 })
  readCount: number;

  @Column({ type: 'boolean' })
  isOuterLink: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  link?: string;

  @Column({ type: 'text', nullable: true })
  content?: string;
}
