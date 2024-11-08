import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendActivationEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
