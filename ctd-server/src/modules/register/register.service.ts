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
  hashPassword,
} from 'src/common/utils/security';
import {
  createSuccessResponse,
  createErrorResponse,
} from 'src/common/utils/response';
import { ErrorCode } from 'src/common/constants/error-codes';

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

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
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

      await queryRunner.manager.save(user);

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

      await queryRunner.manager.save(activation);

      const mailResponse = await this.mailerService.sendActivationEmail(
        email,
        activationToken,
      );

      if (mailResponse.code !== 0) {
        await queryRunner.rollbackTransaction();
        return mailResponse;
      }

      await queryRunner.commitTransaction();
      console.log(`用户注册成功：${email}，发送激活邮件。`);
      return createSuccessResponse('REGISTRATION_SUCCEED');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('注册失败：', error);
      return createErrorResponse(ErrorCode.REGISTRATION_FAILED);
    } finally {
      await queryRunner.release();
    }
  }

  async isEmailAvailable(
    email: string,
  ): Promise<ApiResponse<{ available: boolean }>> {
    const user = await this.userRepository.findOne({ where: { email } });
    const available = !user;
    return createSuccessResponse({ available });
  }
}
