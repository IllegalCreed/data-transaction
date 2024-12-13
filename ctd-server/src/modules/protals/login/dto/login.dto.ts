import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: '请提供有效的邮箱地址。' })
  @IsNotEmpty({ message: '邮箱地址不能为空。' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空。' })
  password: string;

  @IsString()
  @IsOptional()
  captchaId?: string;

  @IsString()
  @IsOptional()
  captchaCode?: string;
}
