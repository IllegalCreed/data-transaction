import type { ILink } from '@/types/master'
export interface ILinkFetchData {
  bizCompanyCode: ''
  bizCompanyName: ''
  bizCompanyInfo: ''
  bizUrl: ''
  sysFile: {
    url: ''
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
