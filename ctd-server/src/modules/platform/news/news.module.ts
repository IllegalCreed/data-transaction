import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/entities/news.entity';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([News]), AuthModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class PlatformNewsModule {}
