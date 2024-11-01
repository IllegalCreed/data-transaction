import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { GenderType } from 'src/enums/gender-type.enum';

@Entity()
export class IndividualUserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  identificationNumber: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'enum', enum: GenderType, nullable: true })
  gender?: GenderType;

  @Column({ nullable: true })
  dateOfBirth?: string;

  @Column({ nullable: true })
  residentialAddress?: string;

  @OneToOne(() => User, (user) => user.individualInfo)
  user: User;
}
