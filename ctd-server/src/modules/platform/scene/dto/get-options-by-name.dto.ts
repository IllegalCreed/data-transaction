import { IsString, IsNotEmpty } from 'class-validator';

export class GetOptionsByNameDto {
  @IsString({ message: '名称必须是字符串' })
  @IsNotEmpty({ message: '名称不能为空' })
  name: string;
}
