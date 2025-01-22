import { IsArray, IsEnum, IsInt, ArrayNotEmpty } from 'class-validator';
import { ActiveStatus } from 'src/enums/active-status.enum';

export class ChangeStatusDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  ids: number[];

  @IsEnum(ActiveStatus)
  status: ActiveStatus;
}
