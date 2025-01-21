import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { AuthModule } from 'src/modules/platform/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [FileController],
})
export class FileModule {}
