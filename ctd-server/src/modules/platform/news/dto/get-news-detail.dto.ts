import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetNewsDetailDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'ID 不能为空' })
  id: number;
}
