import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Admin extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  fullName: string;

  @Column()
  password: string;
}
