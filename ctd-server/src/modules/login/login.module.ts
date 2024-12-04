import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { User } from '../../entities/user.entity';
import { LoginLog } from '../../entities/login-log.entity';
import { CaptchaModule } from '../captcha/captcha.module';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, LoginLog]),
    CaptchaModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'default_secret'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '3600s'),
        },
      }),
    }),
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [LoginService],
})
export class LoginModule {}
