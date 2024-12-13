import { IsEmail, IsEnum } from 'class-validator';
import { VerificationCodes } from 'src/enums/verification-codes.enum';

export class SendVerificationCodeDto {
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  email: string;

  @IsEnum(VerificationCodes, { message: '无效的验证码类型' })
  type: VerificationCodes;
}
