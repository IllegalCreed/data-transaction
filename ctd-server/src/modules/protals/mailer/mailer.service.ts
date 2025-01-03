import { Injectable, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter } from 'nodemailer';
import {
  createErrorResponse,
  createSuccessResponse,
} from 'src/common/utils/response';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { ErrorCode } from 'src/common/constants/error-codes';
import { VerificationCode } from 'src/entities/verification-code.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, LessThan, MoreThan, Repository } from 'typeorm';
import { VerificationCodes } from 'src/enums/verification-codes.enum';
import { ExpectedError } from 'src/types/error';
import { generateRandomCode, generateToken } from 'src/common/utils/security';
import { SendActivationEmailDto } from './dto/send-activation-email.dto';
import { User } from 'src/entities/user.entity';
import { UserStatus } from 'src/enums/user-status.enum';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  constructor(
    @Inject('MAIL_TRANSPORTER')
    private readonly transporter: Transporter,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,

    @InjectRepository(VerificationCode)
    private readonly verificationCodeRepository: Repository<VerificationCode>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    // 打印配置以确保正确加载
    if (process.env.NODE_ENV !== 'production') {
      console.log('--------------MAILER CONFIG----------------');
      console.log(
        'SMTP_SERVER:',
        this.configService.get<string>('SMTP_SERVER'),
      );
      console.log('SMTP_PORT:', this.configService.get<number>('SMTP_PORT'));
      console.log('MAIL_USER:', this.configService.get<string>('MAIL_USER'));
      console.log(
        'MAIL_PASS:',
        this.configService.get<string>('MAIL_PASS') ? '****' : 'undefined',
      );
    }
  }

  // 私有的核心发送邮件方法
  private async sendMail(
    to: string,
    subject: string,
    html: string,
  ): Promise<void> {
    const mailOptions = {
      from: `"北京市文旅数据专区平台" <${this.configService.get<string>('MAIL_USER')}>`,
      to: to,
      subject: subject,
      html: html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`发送邮件成功: ${to}`);
    } catch (error) {
      this.logger.error('发送邮件失败：', error);
      throw new ExpectedError(ErrorCode.SEND_EMAIL_FAILED);
    }
  }

  // 内部方法，供服务调用，抛出异常或返回 void
  async sendActivationEmailInternal(to: string, token: string): Promise<void> {
    const activationLink = `${this.configService.get<string>('FRONTEND_DOMAIN')}/register?token=${token}`;
    const html = `<p>您好，请点击链接激活您的账号: <a href="${activationLink}">${activationLink}</a></p>`;
    await this.sendMail(to, '激活账号', html);
  }

  // 外部方法，供 API 调用，返回统一的 ApiResponse<string>
  async sendActivationEmail(
    sendActivationEmailDto: SendActivationEmailDto,
  ): Promise<ApiResponse<string>> {
    try {
      await this.sendActivationEmailInternal(
        sendActivationEmailDto.to,
        sendActivationEmailDto.token,
      );
      return createSuccessResponse(null, 'SEND_EMAIL_SUCCEED');
    } catch {
      return createErrorResponse(ErrorCode.SEND_EMAIL_FAILED);
    }
  }

  async sendVerificationCode(
    email: string,
    type: VerificationCodes,
  ): Promise<ApiResponse<string>> {
    // 验证用户是否存在以及是否已激活
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user || user.status !== UserStatus.ACTIVE) {
      this.logger.warn('发送验证码失败：用户不存在或状态异常');
      return createErrorResponse(ErrorCode.INVALID_CREDENTIALS);
    }

    // 生成验证码
    const code = generateRandomCode();

    try {
      await this.dataSource.transaction(async (manager) => {
        // 创建验证码记录
        const verificationCode = this.verificationCodeRepository.create({
          email,
          code,
          type,
          isUsed: false,
          expireAt: new Date(Date.now() + 10 * 60 * 1000), // 有效期10分钟
        });
        await manager.save(verificationCode);

        // 发送验证码邮件
        let subject = '';
        let content = '';
        switch (type) {
          case VerificationCodes.ForgotPWD:
            subject = '重置密码验证码';
            content = `您的验证码是: ${code}`;
            break;
          case VerificationCodes.ChangePWD:
            subject = '修改密码验证码';
            content = `您的验证码是: ${code}`;
            break;
          case VerificationCodes.ResetEmail:
            subject = '修改邮箱验证码';
            content = `您的验证码是: ${code}`;
            break;
          default:
            this.logger.error('发送验证码失败：未知的验证码类型');
            throw new ExpectedError(ErrorCode.INVALID_VERIFICATION_CODE_TYPE);
        }

        await this.sendMail(email, subject, content);
      });

      this.logger.log(`发送验证码成功：${email}`);
      return createSuccessResponse(null, 'SEND_VERIFICATION_CODE_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('发送验证码失败：', error);
      return createErrorResponse(ErrorCode.SEND_VERIFICATION_CODE_FAILED);
    }
  }

  async verifyCode(
    email: string,
    code: string,
    type: VerificationCodes,
  ): Promise<ApiResponse<string>> {
    // 查找验证码记录
    const verificationCode = await this.verificationCodeRepository.findOne({
      where: {
        email,
        code,
        type,
        isUsed: false,
        expireAt: MoreThan(new Date()),
      },
    });

    if (!verificationCode) {
      return createErrorResponse(ErrorCode.INVALID_VERIFICATION_CODE);
    }

    try {
      // 标记验证码已使用
      verificationCode.isUsed = true;
      await this.verificationCodeRepository.save(verificationCode);

      const token = await generateToken<{
        email: string;
        type: VerificationCodes;
      }>(
        { email, type },
        this.configService.get<string>('JWT_SECRET', { infer: true }),
        '10m',
      );

      this.logger.log(`验证码核销成功：${email}`);
      return createSuccessResponse(token, 'VERIFY_CODE_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('验证码核销失败：', error);
      return createErrorResponse(ErrorCode.VERIFY_CODE_FAILED);
    }
  }

  async getVerificationCodeForTesting(
    email: string,
    type: VerificationCodes,
  ): Promise<ApiResponse<string>> {
    // 查找指定邮箱和类型的最后一个未使用的验证码
    const verificationCode = await this.verificationCodeRepository.findOne({
      where: { email, type, isUsed: false },
      order: { createdAt: 'DESC' },
    });

    if (!verificationCode) {
      return createErrorResponse(ErrorCode.VERIFICATION_CODE_NOT_FOUND);
    }

    return createSuccessResponse(
      verificationCode.code,
      'GET_VERIFICATION_CODE_SUCCEED',
    );
  }

  async removeExpiredVerificationCode(): Promise<void> {
    try {
      const result = await this.verificationCodeRepository.delete({
        expireAt: LessThan(new Date()),
      });

      this.logger.log(`成功删除了 ${result.affected} 条过期邮件验证码。`);
    } catch (error) {
      this.logger.error('删除过期邮件验证码时发生错误：', error);
    }
  }
}
