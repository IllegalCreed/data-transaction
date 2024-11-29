import { Module } from '@nestjs/common';
import { ForgotController } from './forgot.controller';
import { ForgotService } from './forgot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ForgotController],
  providers: [ForgotService],
})
export class ForgotModule {}
