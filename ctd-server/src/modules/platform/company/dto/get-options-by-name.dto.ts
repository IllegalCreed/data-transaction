import { IsString, IsNotEmpty } from 'class-validator';

export class GetOptionsByNameDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
