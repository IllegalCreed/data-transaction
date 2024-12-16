import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from 'src/entities/admin.entity';
import { PlatformLoginModule } from 'src/modules/platform/login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), PlatformLoginModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
