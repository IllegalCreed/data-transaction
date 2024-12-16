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

  // 从配置中获取白名单域名列表（假设已在.env中或配置文件中定义）
  // 例如在.env: CORS_WHITELIST='http://localhost:3001,http://example.com'
  const corsWhitelist = (configService.get<string>('CORS_WHITELIST') || '')
    .split(',')
    .map((domain) => domain.trim())
    .filter((domain) => domain);

  // 启用 CORS 并使用自定义回调函数根据白名单验证 origin
  app.enableCors({
    origin: (origin, callback) => {
      // 如果请求中没有origin(例如Postman之类的)直接允许
      if (!origin) return callback(null, true);

      if (corsWhitelist.includes(origin)) {
        // 在白名单中，允许
        callback(null, true);
      } else {
        // 不在白名单中，拒绝
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true, // 如果需要允许发送凭据（cookies、Authorization headers）
  });

  await app.listen(port ?? 3000);
}
bootstrap();
