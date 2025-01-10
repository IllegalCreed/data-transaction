import { IsNotEmpty, IsString } from 'class-validator';
import { IsStrongPassword } from 'src/common/decorators/is-strong-password.decorator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly oldPassword: string;

  @IsString({ message: '密码必须为字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsStrongPassword({ message: '密码强度不符合要求' })
  readonly newPassword: string;
}
