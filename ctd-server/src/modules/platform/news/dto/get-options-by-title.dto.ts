import { IsString, IsNotEmpty } from 'class-validator';

export class GetOptionsByTitleDto {
  @IsString({ message: '标题必须是字符串' })
  @IsNotEmpty({ message: '标题不能为空' })
  title: string;
}
