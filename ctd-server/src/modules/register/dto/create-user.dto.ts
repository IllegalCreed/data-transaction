import { BaseInfoDto } from './base-info.dto';
import { IndividualUserInfoDto } from './individual-user-info.dto';
import { EnterpriseUserInfoDto } from './enterprise-user-info.dto';
import { ValidateIf, ValidateNested, IsNotEmpty } from 'class-validator';
import { UserType } from 'src/types/enums/user-type.enum';
import { Type } from 'class-transformer';

export class CreateUserDto extends BaseInfoDto {
  @ValidateIf((o) => o.userType === UserType.Individual)
  @ValidateNested()
  @Type(() => IndividualUserInfoDto)
  @IsNotEmpty({ message: '个人用户信息不能为空' })
  individualInfo?: IndividualUserInfoDto;

  @ValidateIf((o) => o.userType === UserType.Enterprise)
  @ValidateNested()
  @Type(() => EnterpriseUserInfoDto)
  @IsNotEmpty({ message: '企业用户信息不能为空' })
  enterpriseInfo?: EnterpriseUserInfoDto;
}
