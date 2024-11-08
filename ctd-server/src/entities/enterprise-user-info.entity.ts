import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { IndustryType } from '../enums/industry-type.enum';
import { CompanySize } from '../enums/company-size.enum';

@Entity()
export class EnterpriseUserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enterpriseName: string;

  @Column({ type: 'text', nullable: true })
  enterpriseDescription?: string;

  @Column()
  registrationNumber: string;

  @Column()
  contactPersonName: string;

  @Column({ nullable: true })
  contactPersonTitle?: string;

  @Column()
  contactPhoneNumber: string;

  @Column()
  enterpriseAddress: string;

  @Column({
    type: 'enum',
    enum: IndustryType,
  })
  industryType: IndustryType;

  @Column({
    type: 'enum',
    enum: CompanySize,
    nullable: true,
  })
  companySize?: CompanySize;

  @OneToOne(() => User, (user) => user.enterpriseInfo)
  user: User;
}
