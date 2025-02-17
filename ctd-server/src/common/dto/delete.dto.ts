import { Type } from 'class-transformer';
import { IsArray, IsInt, ArrayNotEmpty } from 'class-validator';

/**
 * 批量删除 DTO
 */
export class DeleteDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  ids: number[];
}
