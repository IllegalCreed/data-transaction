import { IsString, IsOptional, IsEnum } from 'class-validator';
import { GenderType } from 'src/enums/gender-type.enum';

export class UpdateIndividualUserDto {
  @IsString()
  fullName: string;

  @IsString()
  identificationNumber: string;

  @IsString()
  phoneNumber: string;

  @IsEnum(GenderType)
  @IsOptional()
  gender?: GenderType;

  @IsString()
  @IsOptional()
  dateOfBirth?: string;

  @IsString()
  @IsOptional()
  residentialAddress?: string;
}
