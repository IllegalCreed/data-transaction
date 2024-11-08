import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendVerificationEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
