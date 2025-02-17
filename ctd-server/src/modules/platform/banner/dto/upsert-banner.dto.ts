import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsInt,
  IsObject,
} from 'class-validator';
import { ActiveStatus } from 'src/enums/active-status.enum';
import { LinkTypes } from 'src/enums/link-type.enum';

// 基类 DTO
class BaseBannerDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  @IsNotEmpty()
  title: string; // Banner标题

  @IsEnum(ActiveStatus)
  @IsNotEmpty()
  status: ActiveStatus; // Banner的状态（启用或禁用）

  @IsString()
  @IsNotEmpty()
  imageUrl: string; // Banner的图片链接
}

// 继承并添加不同的类型约束

// 1. 用于 `LinkTypes.None` 的 DTO
export class NoneLinkBannerDto extends BaseBannerDto {
  @IsEnum(LinkTypes)
  @IsNotEmpty()
  linkType: LinkTypes.None;
}

// 2. 用于 `LinkTypes.OuterLink` 的 DTO
export class OuterLinkBannerDto extends BaseBannerDto {
  @IsEnum(LinkTypes)
  @IsNotEmpty()
  linkType: LinkTypes.OuterLink;

  @IsNotEmpty()
  @IsString()
  data: string;
}

// 3. 用于 `LinkTypes.Scene` 和 `LinkTypes.News` 的 DTO
export class SceneNewsLinkBannerDto extends BaseBannerDto {
  @IsEnum(LinkTypes)
  @IsNotEmpty()
  linkType:
    | LinkTypes.Scene
    | LinkTypes.Product
    | LinkTypes.Demand
    | LinkTypes.News;

  @IsNotEmpty()
  @IsObject()
  data: { id: number };
}

// 最终的联合类型 DTO
export type UpsertBannerDto =
  | NoneLinkBannerDto
  | OuterLinkBannerDto
  | SceneNewsLinkBannerDto;
