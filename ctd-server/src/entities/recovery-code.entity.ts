import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/entities/user.entity';

/**
 * RecoveryCode 实体，用于存储用户的救援/恢复代码
 */
@Entity()
export class RecoveryCode {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 恢复码内容，可使用随机字符串、UUID 等形式
   */
  @Column()
  code: string;

  /**
   * 标记此恢复码是否已经被使用
   */
  @Column({ default: false })
  isUsed: boolean;

  /**
   * 创建时间
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * 与用户的多对一关系，一个用户可关联多个恢复码
   * 删除用户时，级联删除其恢复码
   */
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;
}
