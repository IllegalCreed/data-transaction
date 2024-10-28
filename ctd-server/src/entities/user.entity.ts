import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserType } from '../types/enums/user-type.enum';
import { IndividualUserInfo } from './individual-user-info.entity';
import { EnterpriseUserInfo } from './enterprise-user-info.entity';
import { UserActivation } from './user-activation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  userType: UserType;

  @OneToOne(() => IndividualUserInfo, (individualInfo) => individualInfo.user, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  individualInfo?: IndividualUserInfo;

  @OneToOne(() => EnterpriseUserInfo, (enterpriseInfo) => enterpriseInfo.user, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  enterpriseInfo?: EnterpriseUserInfo;

  @OneToMany(() => UserActivation, (activation) => activation.user)
  activations: UserActivation[];
}
