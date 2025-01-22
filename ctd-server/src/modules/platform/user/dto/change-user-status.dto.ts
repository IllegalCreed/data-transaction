import { ArrayNotEmpty, IsArray, IsEnum } from 'class-validator';
import { UserStatus } from 'src/enums/user-status.enum';

export class ChangeUserStatusDto {
  @IsArray({ message: 'ids must be an array' })
  @ArrayNotEmpty({ message: 'ids cannot be empty' })
  ids: number[];

  @IsEnum(UserStatus, { message: '无效的用户状态' })
  status: UserStatus;
}
