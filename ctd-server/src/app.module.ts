import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RegisterModule } from './modules/protals/register/register.module';
import { ForgotModule } from './modules/protals/forgot/forgot.module';
import { CaptchaModule } from './modules/common/captcha/captcha.module';
import { LoginModule } from './modules/protals/login/login.module';
import { UserModule } from './modules/protals/user/user.module';
import { ChangePasswordModule } from './modules/protals/change-password/change-password.module';
import { ChangeEmailModule } from './modules/protals/change-email/change-email.module';
import { AdminModule } from './modules/platform/admin/admin.module';
import { FileModule } from './modules/common/file/file.module';
import { PlatformLoginModule } from './modules/platform/login/login.module';
import { PlatformUserModule } from './modules/platform/user/user.module';
import { PlatformCompanyModule } from './modules/platform/company/company.module';
import { PlatformSceneModule } from './modules/platform/scene/scene.module';
import { PlatformNewsModule } from './modules/platform/news/news.module';

const nodeEnv = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    // 静态文件服务
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, // 全局模块, 不需要在其他模块引入
      envFilePath: [
        '.env',
        '.env.local',
        `.env.${nodeEnv}`,
        `.env.${nodeEnv}.local`,
      ],
    }),
    // 动态模块, 可以动态注入配置
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('----------------DB CONFIG------------------');
          console.log('DATABASE_HOST', configService.get('DATABASE_HOST'));
          console.log('DATABASE_PORT', configService.get('DATABASE_PORT'));
          console.log(
            'DATABASE_USERNAME',
            configService.get('DATABASE_USERNAME'),
          );
          console.log(
            'DATABASE_PASSWORD',
            configService.get('DATABASE_PASSWORD') ? '****' : 'undefined',
          );
          console.log('DATABASE_NAME', configService.get('DATABASE_NAME'));
          console.log('TYPEORM_SYNC', configService.get('TYPEORM_SYNC'));
        }

        return {
          type: 'mysql',
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          // entities: [], // autoLoadEntities为true则无需手动维护entities
          synchronize: configService.get('TYPEORM_SYNC'),
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    CaptchaModule,
    FileModule,
    RegisterModule,
    ForgotModule,
    LoginModule,
    UserModule,
    ChangePasswordModule,
    ChangeEmailModule,
    PlatformLoginModule,
    AdminModule,
    PlatformUserModule,
    PlatformCompanyModule,
    PlatformSceneModule,
    PlatformNewsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
