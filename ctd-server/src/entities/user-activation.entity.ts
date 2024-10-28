import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserActivation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activationToken: string;

  @ManyToOne(() => User, (user) => user.activations, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  expireAt: Date;
}
