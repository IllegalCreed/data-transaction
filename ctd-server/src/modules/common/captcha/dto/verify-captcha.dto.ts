import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyCaptchaDto {
  @IsNotEmpty({ message: '验证码ID不能为空' })
  @IsString({ message: '验证码ID必须是字符串' })
  captchaId: string;

  @IsNotEmpty({ message: '验证码不能为空' })
  @IsString({ message: '验证码必须是字符串' })
  code: string;
}
