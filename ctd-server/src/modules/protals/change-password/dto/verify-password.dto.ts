import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyPasswordDto {
  @IsString()
  @IsNotEmpty({ message: '凭据不能为空' })
  token: string;

  @IsString()
  @IsNotEmpty({ message: '当前密码不能为空' })
  currentPassword: string;
}
