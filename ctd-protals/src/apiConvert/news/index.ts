import type { INews } from '@/types/news'
export interface INewsFetchData {
  id: number
  bizInfoCode: string
  bizInfoTitle: string
  bizInfoAbstract: string
  releaseTime: string
  bizInfoContent: string
  sysFileList: {
    fileType: string
    url: string
  }[]
}

export const newsListConvert = (raws: INewsFetchData[]): INews[] => {
  const result: INews[] = []
  for (const row of raws) {
    result.push({
      id: row.id,
      title: row.bizInfoTitle,
      summary: row.bizInfoAbstract,
      imageUrl:
        row.sysFileList.find(item => item.fileType === '资讯封面')?.url ?? '',
      bannerUrl:
        row.sysFileList.find(item => item.fileType === '资讯头图')?.url ?? '',
      createTime: row.releaseTime,
      content: row.bizInfoContent,
    })
  }
  return result
}

export const newsConvert = (raw: INewsFetchData): INews => {
  return {
    id: raw.id,
    title: raw.bizInfoTitle,
    summary: raw.bizInfoAbstract,
    imageUrl:
      raw.sysFileList.find(item => item.fileType === '资讯封面')?.url ?? '',
    bannerUrl:
      raw.sysFileList.find(item => item.fileType === '资讯头图')?.url ?? '',
    createTime: raw.releaseTime,
    content: raw.bizInfoContent,
  }
}
