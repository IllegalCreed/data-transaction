import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局启用验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 过滤掉未在 DTO 中定义的属性
      forbidNonWhitelisted: true, // 如果有未定义的属性，抛出错误
      transform: true, // 自动转换请求体为 DTO 实例
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port ?? 3000);
}
bootstrap();
