import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { IndividualUserInfo } from 'src/entities/individual-user-info.entity';
import { EnterpriseUserInfo } from 'src/entities/enterprise-user-info.entity';
import { UserActivation } from 'src/entities/user-activation.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from 'src/types/interfaces/api-response.interface';
import { generateActivationToken, hashPassword } from 'src/utils/security';
import { MailerService } from 'src/modules/mailer/mailer.service';
import { createSuccessResponse, createErrorResponse } from 'src/utils/response';
import { ErrorCode } from 'src/constants/error-codes';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserActivation)
    private readonly activationRepository: Repository<UserActivation>,
    private readonly dataSource: DataSource,
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<ApiResponse<string>> {
    const { email, password, userType } = createUserDto;

    // 1. 验证邮箱是否已被注册
    if (!(await this.isEmailAvailable(email)).data.available) {
      return createErrorResponse(ErrorCode.EMAIL_TAKEN);
    }

    // 2. 哈希密码
    const hashedPassword = await hashPassword(password);

    // 3. 创建事务
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 4. 在事务中保存用户信息
      const user = this.userRepository.create({
        email,
        password: hashedPassword,
        userType,
      });

      // 根据用户类型，保存对应的用户信息
      if (userType === 'individual' && createUserDto.individualInfo) {
        const individualInfo = plainToInstance(
          IndividualUserInfo,
          createUserDto.individualInfo,
        );
        user.individualInfo = individualInfo;
      } else if (userType === 'enterprise' && createUserDto.enterpriseInfo) {
        const enterpriseInfo = plainToInstance(
          EnterpriseUserInfo,
          createUserDto.enterpriseInfo,
        );
        user.enterpriseInfo = enterpriseInfo;
      }

      await queryRunner.manager.save(user);

      // 5. 生成激活令牌
      const activationToken = await generateActivationToken(
        email,
        this.configService.get<string>('JWT_SECRET'),
      );

      // 6. 保存激活令牌到数据库
      const activation = this.activationRepository.create({
        activationToken,
        user,
        expireAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 过期时间为24小时后
      });

      await queryRunner.manager.save(activation);

      // 7. 发送激活邮件
      await this.mailerService.sendActivationEmail(email, activationToken);

      // 提交事务
      await queryRunner.commitTransaction();

      // 8. 返回成功响应
      return createSuccessResponse('RESEND_ACTIVATION_EMAIL_SUCCEED');
    } catch (error) {
      // 回滚事务
      await queryRunner.rollbackTransaction();
      console.error('注册失败：', error);
      return createErrorResponse(ErrorCode.RESEND_ACTIVATION_EMAIL_FAILED);
    } finally {
      // 释放连接
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
