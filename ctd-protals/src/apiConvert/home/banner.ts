import type { IBanner } from '@/types/home'

export interface IBannerFetchData {
  bizBannerCode: string
  bizBannerName: string
  bizCode: string
  bizType: string // 无链接0 外部链接1 场景链接2 产品链接3 需求链接4
  bizUrl: string
  sysFile: {
    url: string
  }
}

export const bannerConvert = (raws: IBannerFetchData[]) => {
  const result: IBanner[] = []
  for (const row of raws) {
    result.push({
      id: row.bizBannerCode,
      imageUrl: row.sysFile.url,
      type: Number(row.bizType),
      payload: Number(row.bizType) === 1 ? row.bizUrl : row.bizCode,
    })
  }
  return result
}
