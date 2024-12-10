import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { User } from 'src/entities/user.entity';
import { UserActivation } from 'src/entities/user-activation.entity';
import { MailerModule } from 'src/modules/protals/mailer/mailer.module';
import { IndividualUserInfo } from 'src/entities/individual-user-info.entity';
import { EnterpriseUserInfo } from 'src/entities/enterprise-user-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserActivation,
      IndividualUserInfo,
      EnterpriseUserInfo,
    ]),
    MailerModule,
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
