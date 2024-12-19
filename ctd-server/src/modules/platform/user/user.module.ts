import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { IndividualUserInfo } from 'src/entities/individual-user-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, IndividualUserInfo])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
