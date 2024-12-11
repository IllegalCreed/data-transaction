import { IsString, IsOptional, IsEnum } from 'class-validator';
import { IndustryType } from 'src/enums/industry-type.enum';
import { CompanySize } from 'src/enums/company-size.enum';

export class UpdateEnterpriseUserDto {
  @IsString()
  enterpriseName: string;

  @IsString()
  @IsOptional()
  enterpriseDescription?: string;

  @IsString()
  registrationNumber: string;

  @IsString()
  contactPersonName: string;

  @IsString()
  @IsOptional()
  contactPersonTitle?: string;

  @IsString()
  contactPhoneNumber: string;

  @IsString()
  enterpriseAddress: string;

  @IsEnum(IndustryType)
  industryType: IndustryType;

  @IsEnum(CompanySize)
  @IsOptional()
  companySize?: CompanySize;
}
