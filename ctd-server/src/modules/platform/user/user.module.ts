import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { IndividualUserInfo } from 'src/entities/individual-user-info.entity';
import { PlatformLoginModule } from '../login/login.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, IndividualUserInfo]),
    PlatformLoginModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class PlatformUserModule {}
