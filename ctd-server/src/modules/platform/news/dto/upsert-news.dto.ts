import {
  IsInt,
  Min,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ActiveStatus } from 'src/enums/active-status.enum';

/**
 * 用于插入或更新 News 数据
 */
export class UpsertNewsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  id: number;

  @IsString()
  @IsNotEmpty({ message: '资讯标题不能为空' })
  title: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @IsOptional()
  @IsString()
  headerImageUrl?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  publishedAt?: Date;

  @IsEnum(ActiveStatus)
  status: ActiveStatus;
}
