import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SceneController } from './scene.controller';
import { SceneService } from './scene.service';
import { Scene } from 'src/entities/scene.entity';
import { Company } from 'src/entities/company.entity'; // 确保 Company 实体已导入
import { AuthModule } from '../auth/auth.module'; // 如果需要认证

@Module({
  imports: [TypeOrmModule.forFeature([Scene, Company]), AuthModule],
  controllers: [SceneController],
  providers: [SceneService],
})
export class PlatformSceneModule {}
