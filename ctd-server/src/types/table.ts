import { IsOptional, IsString } from 'class-validator';

export enum FilterType {
  Input = 'input',
  Enum = 'enum',
  Date = 'date',
}

export class SortItemDto {
  @IsString()
  prop: string;

  @IsOptional()
  order?: 'asc' | 'desc';
}

export class FilterDto {
  @IsString()
  prop: string;

  @IsString()
  type: FilterType; // 'enum' | 'date' | 'input'

  @IsOptional()
  value?: string | string[] | [string, string];
}

export class TableColumnDto {
  @IsString()
  prop: string;

  @IsOptional()
  visible: boolean;
}
