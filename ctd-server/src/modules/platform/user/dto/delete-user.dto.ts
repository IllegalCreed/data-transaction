import { IsArray, ArrayNotEmpty } from 'class-validator';

export class DeleteUserDto {
  @IsArray({ message: 'ids must be an array' })
  @ArrayNotEmpty({ message: 'ids cannot be empty' })
  ids: (string | number)[];
}
