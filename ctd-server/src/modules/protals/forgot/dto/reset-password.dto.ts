import { IsString, IsNotEmpty } from 'class-validator';
import { IsStrongPassword } from 'src/common/decorators/is-strong-password.decorator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty({ message: '凭据不能为空' })
  token: string;

  @IsString({ message: '密码必须为字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsStrongPassword({ message: '密码强度不符合要求' })
  newPassword: string;
}
