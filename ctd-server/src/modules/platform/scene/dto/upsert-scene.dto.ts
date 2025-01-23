import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  ValidateIf,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ActiveStatus } from 'src/enums/active-status.enum';

export class UpsertSceneDto {
  @IsOptional()
  @IsNumber()
  id: number; // 用于判断是插入还是更新

  @IsString({ message: '标题必须是字符串' })
  @IsNotEmpty({ message: '标题不能为空' })
  title: string;

  @IsOptional()
  @IsString({ message: '摘要必须是字符串' })
  summary?: string;

  @IsOptional()
  @IsInt({ message: '公司ID必须是整数' })
  companyId?: number;

  @IsOptional()
  @IsString({ message: '封面图片URL必须是字符串' })
  coverImageUrl?: string;

  @IsOptional()
  @IsString({ message: '头图URL必须是字符串' })
  headerImageUrl?: string;

  @IsBoolean({ message: '是否外部链接必须是布尔值' })
  isOuterLink: boolean;

  @IsOptional()
  @IsString({ message: '链接必须是字符串' })
  @ValidateIf((o) => o.isOuterLink)
  link?: string;

  @IsOptional()
  @IsString({ message: '内容必须是字符串' })
  @ValidateIf((o) => !o.isOuterLink)
  content?: string;

  @IsEnum(ActiveStatus)
  status: ActiveStatus;
}
