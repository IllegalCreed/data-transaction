import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

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

  @IsString({ message: '性别必须为字符串' })
  @IsOptional()
  gender?: string;

  @IsDateString({}, { message: '出生日期格式不正确' })
  @IsOptional()
  dateOfBirth?: string;

  @IsString({ message: '居住地址必须为字符串' })
  @IsOptional()
  residentialAddress?: string;
}
