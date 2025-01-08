import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode } from 'src/common/constants/error-codes';
import { RecoveryCode } from 'src/entities/recovery-code.entity';
import { ExpectedError } from 'src/types/error';
import { Repository } from 'typeorm';

@Injectable()
export class ChangeEmailService {
  private readonly logger = new Logger(ChangeEmailService.name);

  constructor(
    @InjectRepository(RecoveryCode)
    private readonly recoveryCodeRepository: Repository<RecoveryCode>,
  ) {}

  /**
   * 仅供 E2E 测试：获取当前用户任意一条未使用的恢复码
   */
  async getRecoveryCodeForTest(userId: number): Promise<string> {
    // 根据 userId 找到一条未使用的恢复码
    const recoveryCode = await this.recoveryCodeRepository.findOne({
      where: { user: { id: userId }, isUsed: false },
      order: { createdAt: 'DESC' },
    });

    if (!recoveryCode) {
      this.logger.warn('获取救援代码失败：未找到可用的救援代码');
      throw new ExpectedError(ErrorCode.RECOVERY_CODE_NOT_FOUND);
    }

    return recoveryCode.code;
  }
}
