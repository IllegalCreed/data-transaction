import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
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
  generateActivationToken,
  verifyActivationToken,
  hashPassword,
} from 'src/common/utils/security';
import {
  createSuccessResponse,
  createErrorResponse,
} from 'src/common/utils/response';
import { ErrorCode } from 'src/common/constants/error-codes';
import { ActivateAccountDto } from './dto/activate-account.dto';

@Injectable()
export class RegisterService {
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

    if (!(await this.isEmailAvailable(email)).data.available) {
      return createErrorResponse(ErrorCode.EMAIL_TAKEN);
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

        const activationToken = await generateActivationToken(
          email,
          this.configService.get<string>('JWT_SECRET'),
        );

        const activation = this.activationRepository.create({
          activationToken,
          user,
          expireAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          isActivated: false,
        });

        await manager.save(activation);

        await this.mailerService.sendActivationEmailInternal(
          email,
          activationToken,
        );
      });

      console.log(`用户注册成功：${email}`);
      return createSuccessResponse('REGISTRATION_SUCCEED');
    } catch (error) {
      console.error('用户注册失败：', error);

      const errorCode = Number(error.message);
      if (errorCode === ErrorCode.SEND_EMAIL_FAILED) {
        return createErrorResponse(ErrorCode.SEND_EMAIL_FAILED);
      }

      return createErrorResponse(ErrorCode.REGISTRATION_FAILED);
    }
  }

  async isEmailAvailable(
    email: string,
  ): Promise<ApiResponse<{ available: boolean }>> {
    const user = await this.userRepository.findOne({ where: { email } });
    const available = !user;
    return createSuccessResponse({ available });
  }

  async activateAccount(
    activateAccountDto: ActivateAccountDto,
  ): Promise<ApiResponse<string>> {
    const { activationToken } = activateAccountDto;

    const email = await verifyActivationToken(
      activationToken,
      this.configService.get<string>('JWT_SECRET'),
    );

    if (!email) {
      console.error('激活账户失败：JWT验证失败');
      return createErrorResponse(ErrorCode.ACTIVATE_ACCOUNT_FAILED);
    }

    try {
      await this.dataSource.transaction(async (manager) => {
        const activation = await this.activationRepository.findOne({
          where: { activationToken, isActivated: false },
          relations: ['user'],
        });

        if (!activation) {
          console.error('激活账户失败：无效的激活令牌');
          throw new Error(ErrorCode.INVALID_ACTIVATION_TOKEN.toString());
        }

        if (activation.expireAt < new Date()) {
          console.error('激活账户失败：激活令牌已过期');
          throw new Error(ErrorCode.INVALID_ACTIVATION_TOKEN.toString());
        }

        if (activation.user.email !== email) {
          console.error('激活账户失败：数据异常');
          throw new Error(ErrorCode.ACTIVATE_ACCOUNT_FAILED.toString());
        }

        activation.user.status = UserStatus.ACTIVE;
        activation.isActivated = true;

        await manager.save(activation.user);
        await manager.save(activation);
      });

      console.log(`账户激活成功：${email}`);
      return createSuccessResponse('ACCOUNT_ACTIVATED');
    } catch (error) {
      const errorCode = Number(error.message);

      if (errorCode === ErrorCode.INVALID_ACTIVATION_TOKEN) {
        return createErrorResponse(errorCode, email);
      }

      console.error('激活账户失败：', error);
      return createErrorResponse(ErrorCode.ACTIVATE_ACCOUNT_FAILED);
    }
  }
}
