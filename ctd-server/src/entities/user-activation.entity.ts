import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ default: false })
  isActivated: boolean;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  activatedAt?: Date;
}
