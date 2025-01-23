import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SceneController } from './scene.controller';
import { SceneService } from './scene.service';
import { Scene } from 'src/entities/scene.entity';
import { AuthModule } from '../auth/auth.module'; // 如果需要认证

@Module({
  imports: [TypeOrmModule.forFeature([Scene]), AuthModule],
  controllers: [SceneController],
  providers: [SceneService],
})
export class PlatformSceneModule {}
