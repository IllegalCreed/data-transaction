import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'captchaId不能为空' })
  captchaId: string;

  @IsString()
  @IsNotEmpty({ message: 'captchaCode不能为空' })
  captchaCode: string;
}
