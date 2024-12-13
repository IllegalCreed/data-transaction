import { IsString, IsNotEmpty } from 'class-validator';

export class ActivateAccountDto {
  @IsString()
  @IsNotEmpty()
  activationToken: string;
}
