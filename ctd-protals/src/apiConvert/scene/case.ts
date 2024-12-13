import type { IScene } from '@/types/scene'
export interface ISceneFetchData {
  bizSceneCode: string
  bizSceneName: string
  bizCompanyName: string
  bizSceneInfo: string
  bizUrl: string
  bizSceneContent: string
  sysFileList: {
    fileType: string
    url: string
  }[]
}

export const scenesConvert = (raws: ISceneFetchData[]): IScene[] => {
  const result: IScene[] = []
  for (const row of raws) {
    result.push({
      id: row.bizSceneCode,
      title: row.bizSceneName,
      companyName: row.bizCompanyName,
      description: row.bizSceneInfo,
      imageUrl:
        row.sysFileList.find(item => item.fileType === '场景封面')?.url ?? '',
      bannerUrl:
        row.sysFileList.find(item => item.fileType === '场景头图')?.url ?? '',
      link: row.bizUrl,
      content: row.bizSceneContent,
    })
  }
  return result
}

export const sceneConvert = (raw: ISceneFetchData): IScene => {
  return {
    id: raw.bizSceneCode,
    title: raw.bizSceneName,
    companyName: raw.bizCompanyName,
    description: raw.bizSceneInfo,
    imageUrl:
      raw.sysFileList.find(item => item.fileType === '场景封面')?.url ?? '',
    bannerUrl:
      raw.sysFileList.find(item => item.fileType === '场景头图')?.url ?? '',
    link: raw.bizUrl,
    content: raw.bizSceneContent,
  }
}
