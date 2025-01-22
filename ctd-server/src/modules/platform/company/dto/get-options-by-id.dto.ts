import { IsInt, Min } from 'class-validator';

export class GetOptionsByIdDto {
  @IsInt()
  @Min(1)
  id: number;
}
