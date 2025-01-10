import {
  IsOptional,
  IsArray,
  IsNumber,
  Min,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum FilterType {
  Input = 'input',
  Enum = 'enum',
  Date = 'date',
}

export enum SortType {
  Asc = 'asc',
  Desc = 'desc',
}

export class SortItem {
  @IsString()
  prop: string;

  @IsOptional()
  order?: SortType;
}

export class FilterItem {
  @IsString()
  prop: string;

  @IsString()
  type: FilterType;

  @IsOptional()
  value?: string | string[] | [string, string];
}

export class ColumnItem {
  @IsString()
  prop: string;

  @IsOptional()
  visible: boolean;
}

export class GetListDto {
  @IsString()
  @IsOptional()
  searchQuery?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FilterItem)
  filters?: FilterItem[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SortItem)
  sorts?: SortItem[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ColumnItem)
  columns?: ColumnItem[];

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  pageNum: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  pageSize: number;
}
