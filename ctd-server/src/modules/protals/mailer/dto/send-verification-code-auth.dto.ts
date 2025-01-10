import { IsEnum } from 'class-validator';
import { VerificationCodes } from 'src/enums/verification-codes.enum';

export class SendVerificationCodeAuthDto {
  @IsEnum(VerificationCodes, { message: '无效的验证码类型' })
  type: VerificationCodes;
}
