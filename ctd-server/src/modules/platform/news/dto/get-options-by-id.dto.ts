import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetOptionsByIdDto {
  @Type(() => Number) // 将 id 转换为数字
  @IsInt({ message: 'ID 必须是整数' })
  @Min(1, { message: 'ID 必须大于或等于 1' })
  id: number;
}
