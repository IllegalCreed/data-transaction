import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Captcha {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @Index()
  expiredAt: Date;

  @Column({ default: false })
  isUsed: boolean;
}
