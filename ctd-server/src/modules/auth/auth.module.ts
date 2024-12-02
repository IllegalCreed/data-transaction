import { Module } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
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
    ConfigModule,
  ],
  providers: [AuthGuard],
  exports: [AuthGuard, JwtModule],
})
export class AuthModule {}
