import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class LoginLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId: string;

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
