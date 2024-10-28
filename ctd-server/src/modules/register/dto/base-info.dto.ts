import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { UserType } from 'src/types/enums/user-type.enum';
import { IsStrongPassword } from 'src/decorators/is-strong-password.decorator';

export class BaseInfoDto {
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  email: string;

  @IsString({ message: '密码必须为字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsStrongPassword({ message: '密码强度不符合要求' })
  password: string;

  @IsEnum(UserType, { message: '用户类型不正确' })
  userType: UserType;
}
