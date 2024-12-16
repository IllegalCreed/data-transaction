import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LoginModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
