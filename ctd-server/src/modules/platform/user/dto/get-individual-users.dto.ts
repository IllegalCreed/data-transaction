import {
  IsOptional,
  IsNumber,
  Min,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FilterDto, SortItemDto, TableColumnDto } from 'src/types/table';

export class GetIndividualUsersDto {
  @IsString()
  @IsOptional()
  searchQuery?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  filters: FilterDto[] = [];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SortItemDto)
  sorts: SortItemDto[] = [];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TableColumnDto)
  columns: TableColumnDto[] = [];

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  pageNum: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  pageSize: number;
}
