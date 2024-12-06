import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class LoginLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.loginLogs, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User | null; // 使用关系映射

  @Column()
  email: string;

  @CreateDateColumn()
  loginTime: Date;

  @Column()
  ipAddress: string;

  @Column()
  userAgent: string;

  @Column()
  success: boolean;

  @Column({ nullable: true })
  failureReason?: string;
}
