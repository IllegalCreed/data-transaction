import { IsEmail } from 'class-validator';

export class GetRecoveryCodeForTestDto {
  @IsEmail({}, { message: '请输入有效的新邮箱地址' })
  email: string;
}
