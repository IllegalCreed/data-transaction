import { LinkTypes } from 'src/enums/link-type.enum';
import { BannerBase } from './base-banner.interface';

export interface BannerNone extends BannerBase {
  linkType: LinkTypes.None;
}

export interface BannerOuterLink extends BannerBase {
  linkType: LinkTypes.OuterLink;
  data: string; // 外部链接的具体数据
}

export interface BannerWithId extends BannerBase {
  linkType:
    | LinkTypes.Scene
    | LinkTypes.Product
    | LinkTypes.Demand
    | LinkTypes.News;
  data: { id: number; name: string }; // 内部链接的具体数据
}

export type BannerDetail = BannerNone | BannerOuterLink | BannerWithId;
