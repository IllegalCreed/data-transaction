import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterModule } from './modules/register/register.module';

const nodeEnv = process.env.NODE_ENV || 'development';

@Module({
  imports: [
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
          // 可以在此处编写调试代码
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
    RegisterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
