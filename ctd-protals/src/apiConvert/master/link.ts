import type { ILink } from '@/types/master'
export interface ILinkFetchData {
  bizCompanyCode: string
  bizCompanyName: string
  bizCompanyInfo: string
  bizUrl: string
  sysFile: {
    url: string
  }
}

export const linkConvert = (raws: ILinkFetchData[]) => {
  const result: ILink[] = []
  for (const row of raws) {
    result.push({
      id: row.bizCompanyCode,
      title: row.bizCompanyName,
      link: row.bizUrl ?? '',
    })
  }
  return result
}
