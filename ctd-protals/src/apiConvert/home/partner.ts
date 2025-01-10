import type { IPartner } from '@/types/home'
export interface IPartnerFetchData {
  bizCompanyCode: string
  bizCompanyName: string
  bizCompanyInfo: string
  bizUrl: string
  sysFile: {
    url: string
  }
}

export const partnerConvert = (raws: IPartnerFetchData[]) => {
  const result: IPartner[] = []
  for (const row of raws) {
    result.push({
      id: row.bizCompanyCode,
      title: row.bizCompanyName,
      description: row.bizCompanyInfo,
      imageUrl: `${import.meta.env.VITE_APP_BASE_API}/${row.sysFile.url}`,
      link: row.bizUrl ?? '',
    })
  }
  return result
}
