import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ChangeEmailDto {
  @IsEmail({}, { message: '请输入有效的新邮箱地址' })
  newEmail: string;

  @IsString()
  @IsNotEmpty({ message: '验证码不能为空' })
  code: string;
}
