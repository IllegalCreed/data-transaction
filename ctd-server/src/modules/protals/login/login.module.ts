import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { User } from 'src/entities/user.entity';
import { LoginLog } from 'src/entities/login-log.entity';
import { CaptchaModule } from 'src/modules/common/captcha/captcha.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, LoginLog]),
    CaptchaModule,
    JwtModule.registerAsync({
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
  providers: [LoginService],
  exports: [LoginService, JwtModule],
})
export class LoginModule {}
