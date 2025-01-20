import { Entity, Column } from 'typeorm';
import { PartnerTypes } from '../enums/partner-types.enum';
import { ActiveStatus } from '../enums/active-status.enum';
import { BaseEntity } from './base.entity';

/**
 * 公司表
 */
@Entity('company')
export class Company extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column()
  link: string;

  @Column({ nullable: true })
  logoUrl?: string;

  @Column({
    type: 'enum',
    enum: PartnerTypes,
    default: PartnerTypes.None,
  })
  partnerType: PartnerTypes;

  @Column({ default: false })
  isShowInFooter: boolean;

  @Column({
    type: 'enum',
    enum: ActiveStatus,
    default: ActiveStatus.Active,
  })
  status: ActiveStatus;
}
