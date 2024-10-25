import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';

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

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  dateOfBirth?: string;

  @Column({ nullable: true })
  residentialAddress?: string;

  @OneToOne(() => User, (user) => user.individualInfo)
  user: User;
}
