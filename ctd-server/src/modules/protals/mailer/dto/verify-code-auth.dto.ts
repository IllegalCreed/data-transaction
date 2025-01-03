import { IsEnum, IsNotEmpty } from 'class-validator';
import { VerificationCodes } from 'src/enums/verification-codes.enum';

export class VerifyCodeAuthDto {
  @IsNotEmpty({ message: '验证码不能为空' })
  code: string;

  @IsEnum(VerificationCodes, { message: '无效的验证码类型' })
  type: VerificationCodes;
}
