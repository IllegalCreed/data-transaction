import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { IndividualService } from './Individual.service';
import { EnterpriseService } from './enterprise.service';
import { UserController } from './user.controller';
import { User } from 'src/entities/user.entity';
import { IndividualUserInfo } from 'src/entities/individual-user-info.entity';
import { EnterpriseUserInfo } from 'src/entities/enterprise-user-info.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, IndividualUserInfo, EnterpriseUserInfo]),
    AuthModule,
  ],
  providers: [UserService, IndividualService, EnterpriseService],
  controllers: [UserController],
})
export class PlatformUserModule {}
