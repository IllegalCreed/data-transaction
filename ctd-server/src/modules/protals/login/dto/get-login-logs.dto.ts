import { IsOptional, IsDateString, IsNumber, Min, IsIn } from 'class-validator';

export class GetLoginLogsDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  pageNum?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  pageSize?: number = 10;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsIn(['success', 'failure'])
  type?: string; // 'success' 或 'failure'
}
