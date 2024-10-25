import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局模块, 不需要在其他模块引入
      envFilePath: [
        '.env',
        '.env.local',
        `.env.${process.env.NODE_ENV}`,
        `.env.${process.env.NODE_ENV}.local`,
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
