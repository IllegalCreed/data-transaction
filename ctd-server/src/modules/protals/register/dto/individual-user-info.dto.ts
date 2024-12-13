import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { GenderType } from 'src/enums/gender-type.enum';

export class IndividualUserInfoDto {
  @IsString({ message: '姓名必须为字符串' })
  @IsNotEmpty({ message: '姓名不能为空' })
  fullName: string;

  @IsString({ message: '身份证号必须为字符串' })
  @IsNotEmpty({ message: '身份证号不能为空' })
  identificationNumber: string;

  @IsString({ message: '手机号必须为字符串' })
  @IsNotEmpty({ message: '手机号不能为空' })
  phoneNumber: string;

  @IsEnum(GenderType, { message: '性别必须是 Male、Female 或 Other' })
  @IsOptional()
  gender?: GenderType;

  @IsDateString({}, { message: '出生日期格式不正确' })
  @IsOptional()
  dateOfBirth?: string;

  @IsString({ message: '居住地址必须为字符串' })
  @IsOptional()
  residentialAddress?: string;
}
