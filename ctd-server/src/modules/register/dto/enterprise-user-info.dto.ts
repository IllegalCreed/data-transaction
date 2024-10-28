import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { IndustryType } from 'src/types/enums/industry-type.enum';
import { CompanySize } from 'src/types/enums/company-size.enum';

export class EnterpriseUserInfoDto {
  @IsString({ message: '企业名称必须为字符串' })
  @IsNotEmpty({ message: '企业名称不能为空' })
  enterpriseName: string;

  @IsString({ message: '企业描述必须为字符串' })
  @IsOptional()
  enterpriseDescription?: string;

  @IsString({ message: '注册号必须为字符串' })
  @IsNotEmpty({ message: '注册号不能为空' })
  registrationNumber: string;

  @IsString({ message: '联系人姓名必须为字符串' })
  @IsNotEmpty({ message: '联系人姓名不能为空' })
  contactPersonName: string;

  @IsString({ message: '联系人职位必须为字符串' })
  @IsOptional()
  contactPersonTitle?: string;

  @IsString({ message: '联系电话必须为字符串' })
  @IsNotEmpty({ message: '联系电话不能为空' })
  contactPhoneNumber: string;

  @IsString({ message: '企业地址必须为字符串' })
  @IsNotEmpty({ message: '企业地址不能为空' })
  enterpriseAddress: string;

  @IsEnum(IndustryType, { message: '行业类型不正确' })
  industryType: IndustryType;

  @IsEnum(CompanySize, { message: '企业规模不正确' })
  @IsOptional()
  companySize?: CompanySize;
}
