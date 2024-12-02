import { IsEmail, IsNotEmpty } from 'class-validator';

export class CheckCaptchaDto {
  @IsEmail({}, { message: '请提供有效的邮箱地址。' })
  @IsNotEmpty({ message: '邮箱地址不能为空。' })
  email: string;
}
