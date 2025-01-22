import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsUrl,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { PartnerTypes } from 'src/enums/partner-types.enum';
import { ActiveStatus } from 'src/enums/active-status.enum';

/**
 * 新增或修改公司信息时的 DTO
 */
export class UpsertCompanyDto {
  @IsOptional()
  @IsNumber()
  id: number; // 用于判断是插入还是更新

  @IsString()
  @IsNotEmpty({ message: '名称不能为空' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsUrl()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;

  @IsEnum(PartnerTypes)
  partnerType: PartnerTypes;

  @IsBoolean()
  isShowInFooter: boolean;

  @IsEnum(ActiveStatus)
  status: ActiveStatus;
}
