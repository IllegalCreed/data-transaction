import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode } from 'src/common/constants/error-codes';
import {
  generateToken,
  verifyPassword,
  verifyToken,
} from 'src/common/utils/security';
import { RecoveryCode } from 'src/entities/recovery-code.entity';
import { User } from 'src/entities/user.entity';
import { UserStatus } from 'src/enums/user-status.enum';
import { VerificationCodes } from 'src/enums/verification-codes.enum';
import { ExpectedError } from 'src/types/error';
import { Repository } from 'typeorm';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class ChangeEmailService {
  private readonly logger = new Logger(ChangeEmailService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(RecoveryCode)
    private readonly recoveryCodeRepository: Repository<RecoveryCode>,

    private readonly configService: ConfigService,

    private readonly mailerService: MailerService,
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

  /**
   * 验证当前密码和救援码，并返回新的 JWT 令牌
   */
  async verifyPassword(
    email: string,
    currentPassword: string,
    recoveryCode: string,
  ): Promise<string> {
    // 1) 查找用户
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.warn(`身份验证失败：用户不存在 email=${email}`);
      throw new ExpectedError(ErrorCode.USER_NOT_FOUND);
    }

    if (user.status !== UserStatus.ACTIVE) {
      this.logger.warn(`身份验证失败：用户状态异常 email=${email}`);
      throw new ExpectedError(ErrorCode.INVALID_CREDENTIALS);
    }

    // 2) 验证用户密码
    const isMatch = await verifyPassword(currentPassword, user.password);
    if (!isMatch) {
      this.logger.warn(`身份验证失败：密码错误 email=${email}`);
      throw new ExpectedError(ErrorCode.VERIFY_PASSWORD_FAILED);
    }

    // 3) 查找未使用的救援码
    const codeEntity = await this.recoveryCodeRepository.findOne({
      where: {
        user: { id: user.id },
        code: recoveryCode,
        isUsed: false,
      },
    });
    if (!codeEntity) {
      this.logger.warn(`身份验证失败：救援码无效 email=${email}`);
      throw new ExpectedError(ErrorCode.RECOVERY_CODE_NOT_FOUND);
    }

    // 4) 标记救援码已使用
    codeEntity.isUsed = true;
    await this.recoveryCodeRepository.save(codeEntity);

    // 5) 生成新的 JWT 令牌
    const payload = {
      email: user.email,
      type: VerificationCodes.verifyRecoveryCodes,
    };
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const newToken = await generateToken(payload, jwtSecret, '10m');

    return newToken;
  }

  /**
   * 发送验证码到新邮箱
   * @param userId 当前登录用户ID
   * @param token 上一步的令牌
   * @param newEmail 用户填写的新邮箱
   */
  async sendToNewEmail(
    email: string,
    token: string,
    newEmail: string,
  ): Promise<void> {
    // 1) 验证 token
    const payload = await verifyToken<{
      email: string;
      type: VerificationCodes;
    }>(token, this.configService.get<string>('JWT_SECRET'));

    if (!payload) {
      this.logger.warn('发送验证码到新邮箱失败: JWT验证失败');
      throw new ExpectedError(ErrorCode.INVALID_VERIFICATION_TOKEN);
    }

    if (
      payload.email !== email ||
      payload.type !== VerificationCodes.verifyRecoveryCodes
    ) {
      this.logger.warn('发送验证码到新邮箱失败: JWT验证失败');
      throw new ExpectedError(ErrorCode.INVALID_VERIFICATION_TOKEN);
    }

    // 检查 用户是否存在 及 用户状态
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.warn(`发送验证码到新邮箱失败: 用户不存在 email=${email}`);
      throw new ExpectedError(ErrorCode.USER_NOT_FOUND);
    }

    if (user.status !== UserStatus.ACTIVE) {
      this.logger.warn(`发送验证码到新邮箱失败: 用户状态异常 email=${email}`);
      throw new ExpectedError(ErrorCode.INVALID_CREDENTIALS);
    }

    // 2) 检查 newEmail 是否已被其他用户使用
    const existUser = await this.userRepository.findOne({
      where: { email: newEmail },
    });
    if (existUser) {
      this.logger.warn(
        `发送验证码到新邮箱失败: 新邮箱已被占用 newEmail=${newEmail}`,
      );
      throw new ExpectedError(ErrorCode.EMAIL_TAKEN);
    }

    // 3) 发送验证码到新邮箱
    await this.mailerService.sendVerificationCode(
      newEmail,
      VerificationCodes.ResetEmail,
      false,
    );
  }

  /**
   * 修改登录邮箱
   */
  async changeEmail(
    email: string,
    newEmail: string,
    code: string,
  ): Promise<void> {
    // 1) 获取用户
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.warn(`修改登录邮箱失败: 用户不存在 email=${email}`);
      throw new ExpectedError(ErrorCode.USER_NOT_FOUND);
    }
    if (user.status !== UserStatus.ACTIVE) {
      this.logger.warn(`修改登录邮箱失败: 用户状态异常 email=${email}`);
      throw new ExpectedError(ErrorCode.INVALID_CREDENTIALS);
    }

    // 2) 调用 mailerService.verifyCode(newEmail, code, VerificationCodes.ResetEmail)
    await this.mailerService.verifyCode(
      newEmail,
      code,
      VerificationCodes.ResetEmail,
    );

    // 3) 如果 newEmail 已被使用，可再查一次数据库
    const existUser = await this.userRepository.findOne({
      where: { email: newEmail },
    });
    if (existUser) {
      this.logger.warn(`修改登录邮箱失败: 新邮箱已被占用 newEmail=${newEmail}`);
      throw new ExpectedError(ErrorCode.EMAIL_TAKEN);
    }

    // 4) 更新用户的 email
    user.email = newEmail;
    await this.userRepository.save(user);
  }
}
