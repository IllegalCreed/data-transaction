import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, LessThan } from 'typeorm';
import { UserStatus } from 'src/enums/user-status.enum';
import { UserType } from 'src/enums/user-type.enum';
import { User } from 'src/entities/user.entity';
import { IndividualUserInfo } from 'src/entities/individual-user-info.entity';
import { EnterpriseUserInfo } from 'src/entities/enterprise-user-info.entity';
import { UserActivation } from 'src/entities/user-activation.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { MailerService } from 'src/modules/mailer/mailer.service';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  generateToken,
  verifyToken,
  hashPassword,
} from 'src/common/utils/security';
import {
  createSuccessResponse,
  createErrorResponse,
} from 'src/common/utils/response';
import { ErrorCode } from 'src/common/constants/error-codes';
import { ActivateAccountDto } from './dto/activate-account.dto';
import { ResendActivationEmailDto } from './dto/resend-activation-email.dto';
import { ExpectedError } from 'src/types/error';

@Injectable()
export class RegisterService {
  private readonly logger = new Logger(RegisterService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserActivation)
    private readonly activationRepository: Repository<UserActivation>,

    @InjectRepository(IndividualUserInfo)
    private readonly individualUserInfoRepository: Repository<IndividualUserInfo>,

    @InjectRepository(EnterpriseUserInfo)
    private readonly enterpriseUserInfoRepository: Repository<EnterpriseUserInfo>,

    private readonly dataSource: DataSource,
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<ApiResponse<string>> {
    const { email, password, userType } = createUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) {
      if (user.status === UserStatus.ACTIVE) {
        this.logger.warn('用户注册失败：用户已激活');
        return createErrorResponse(ErrorCode.ACCOUNT_ALREADY_ACTIVATED);
      } else {
        this.logger.warn('用户注册失败：用户已注册但未激活');
        return createErrorResponse(ErrorCode.ACCOUNT_PENDING_ACTIVATION);
      }
    }

    const hashedPassword = await hashPassword(password);

    try {
      await this.dataSource.transaction(async (manager) => {
        const user = this.userRepository.create({
          email,
          password: hashedPassword,
          userType,
          status: UserStatus.PENDING,
        });

        if (userType === UserType.Individual && createUserDto.individualInfo) {
          const individualInfo = this.individualUserInfoRepository.create(
            createUserDto.individualInfo,
          );
          user.individualInfo = individualInfo;
        } else if (
          userType === UserType.Enterprise &&
          createUserDto.enterpriseInfo
        ) {
          const enterpriseInfo = this.enterpriseUserInfoRepository.create(
            createUserDto.enterpriseInfo,
          );
          user.enterpriseInfo = enterpriseInfo;
        }

        await manager.save(user);

        // 使用事务来保存激活记录
        await this.createAndSendActivation(user, async (activation) => {
          await manager.save(activation);
        });
      });

      this.logger.log(`用户注册成功：${email}`);
      return createSuccessResponse(null, 'REGISTRATION_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('用户注册失败：', error);
      return createErrorResponse(ErrorCode.REGISTRATION_FAILED);
    }
  }

  async activateAccount(
    activateAccountDto: ActivateAccountDto,
  ): Promise<ApiResponse<string>> {
    const { activationToken } = activateAccountDto;

    const email = await verifyToken<string>(
      activationToken,
      this.configService.get<string>('JWT_SECRET'),
    );

    if (!email) {
      this.logger.warn('激活账户失败：JWT验证失败');
      return createErrorResponse(ErrorCode.ACTIVATE_ACCOUNT_FAILED);
    }

    try {
      await this.dataSource.transaction(async (manager) => {
        const activation = await this.activationRepository.findOne({
          where: { activationToken, isActivated: false },
          relations: ['user'],
        });

        if (!activation) {
          this.logger.warn('激活账户失败：无效的激活令牌');
          throw new ExpectedError(ErrorCode.INVALID_ACTIVATION_TOKEN);
        }

        if (activation.expireAt < new Date()) {
          this.logger.warn('激活账户失败：激活令牌已过期');
          throw new ExpectedError(ErrorCode.INVALID_ACTIVATION_TOKEN);
        }

        if (activation.user.email !== email) {
          // JWT反解的邮箱和token关联的用户不一致，说明数据异常，有可能JWT被伪造，直接抛出错误
          this.logger.error('激活账户失败：数据异常');
          throw new ExpectedError(ErrorCode.ACTIVATE_ACCOUNT_FAILED);
        }

        activation.user.status = UserStatus.ACTIVE;
        activation.isActivated = true;

        await manager.save(activation.user);
        await manager.save(activation);
      });

      this.logger.log(`账户激活成功：${email}`);
      return createSuccessResponse(null, 'ACCOUNT_ACTIVATED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        if (error.errorCode === ErrorCode.INVALID_ACTIVATION_TOKEN) {
          return createErrorResponse(error.errorCode, email);
        } else {
          return createErrorResponse(error.errorCode);
        }
      }
      this.logger.error('激活账户失败：', error);
      return createErrorResponse(ErrorCode.ACTIVATE_ACCOUNT_FAILED);
    }
  }

  async resendActivationEmail(
    resendActivationEmailDto: ResendActivationEmailDto,
  ): Promise<ApiResponse<string>> {
    const { email } = resendActivationEmailDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      this.logger.warn('重新发送激活邮件失败：用户未找到');
      return createErrorResponse(ErrorCode.INVALID_CREDENTIALS);
    }

    if (user.status === UserStatus.ACTIVE) {
      this.logger.warn('重新发送激活邮件失败：用户已激活');
      return createErrorResponse(ErrorCode.ACCOUNT_ALREADY_ACTIVATED);
    }

    try {
      // 直接使用激活实体操作，不使用事务
      await this.createAndSendActivation(user, async (activation) => {
        await this.activationRepository.save(activation);
      });

      this.logger.log(`重新发送激活邮件成功：${email}`);
      return createSuccessResponse(null, 'RESEND_ACTIVATION_EMAIL_SUCCEED');
    } catch (error) {
      if (error instanceof ExpectedError) {
        return createErrorResponse(error.errorCode);
      }
      this.logger.error('重新发送激活邮件失败：', error);
      return createErrorResponse(ErrorCode.RESEND_ACTIVATION_EMAIL_FAILED);
    }
  }

  async removeExpiredToken(): Promise<void> {
    try {
      const result = await this.activationRepository.delete({
        expireAt: LessThan(new Date()),
      });

      this.logger.log(`成功删除了 ${result.affected} 条过期激活凭据。`);
    } catch (error) {
      this.logger.error('删除过期激活凭据时发生错误：', error);
    }
  }

  async getActivationTokenForTesting(
    email: string,
  ): Promise<ApiResponse<string>> {
    // 查找最新的未使用的激活记录
    const activation = await this.activationRepository.findOne({
      where: {
        user: { email },
        isActivated: false,
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['user'],
    });

    if (!activation) {
      return createErrorResponse(ErrorCode.ACTIVATION_TOKEN_NOT_FOUND);
    }

    return createSuccessResponse(
      activation.activationToken,
      'GET_ACTIVATION_TOKEN_SUCCEED',
    );
  }

  private async createAndSendActivation(
    user: User,
    saveActivation: (activation: UserActivation) => Promise<void>,
  ): Promise<void> {
    const email = user.email;

    // 生成新的激活令牌
    const activationToken = await generateToken<string>(
      email,
      this.configService.get<string>('JWT_SECRET', { infer: true }),
    );

    // 创建新的激活记录
    const activation = this.activationRepository.create({
      activationToken,
      user,
      expireAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      isActivated: false,
    });

    // 保存激活记录，使用传入的保存函数
    await saveActivation(activation);

    // 发送激活邮件
    await this.mailerService.sendActivationEmailInternal(
      email,
      activationToken,
    );
  }
}
