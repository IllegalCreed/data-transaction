import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from 'src/entities/banner.entity';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Banner]), AuthModule],
  controllers: [BannerController],
  providers: [BannerService],
})
export class PlatformBannerModule {}
