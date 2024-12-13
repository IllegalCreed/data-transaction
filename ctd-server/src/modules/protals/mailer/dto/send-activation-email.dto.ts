import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendActivationEmailDto {
  @IsEmail({}, { message: '请提供有效的邮箱地址' })
  to: string;

  @IsNotEmpty({ message: '激活令牌不能为空' })
  token: string;
}
