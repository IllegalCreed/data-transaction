import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { VerificationCodes } from 'src/enums/verification-codes.enum';

@Entity()
export class VerificationCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  code: string;

  @Column({
    type: 'enum',
    enum: VerificationCodes,
  })
  type: VerificationCodes;

  @Column({ default: false })
  isUsed: boolean;

  @Column()
  expireAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
