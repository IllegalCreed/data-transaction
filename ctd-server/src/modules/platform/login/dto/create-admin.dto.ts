import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: '姓名不能为空' })
  fullName: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
