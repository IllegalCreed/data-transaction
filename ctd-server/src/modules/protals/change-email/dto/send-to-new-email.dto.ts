import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendToNewEmailDto {
  @IsString()
  @IsNotEmpty({ message: '验证令牌不能为空' })
  token: string;

  @IsEmail({}, { message: '请输入有效的新邮箱地址' })
  newEmail: string;
}
