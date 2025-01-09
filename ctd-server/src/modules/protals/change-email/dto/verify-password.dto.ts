import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyPasswordDto {
  @IsString()
  @IsNotEmpty({ message: '当前密码不能为空' })
  currentPassword: string;

  @IsString()
  @IsNotEmpty({ message: '救援代码不能为空' })
  recoveryCode: string;
}
