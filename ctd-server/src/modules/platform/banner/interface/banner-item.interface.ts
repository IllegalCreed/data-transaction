import { BannerBase } from './base-banner.interface';

export type BannerItem = Omit<BannerBase, 'imageUrl'>;
