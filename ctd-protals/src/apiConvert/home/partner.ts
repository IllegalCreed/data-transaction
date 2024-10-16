import type { IAdFetchData } from '@/types/advertisement'
import type { IPartner } from '@/types/home'

export const partnerConvert = (raw: unknown) => {
  const data = raw as IAdFetchData[]
  const result: IPartner[] = []
  for (const row of data) {
    result.push({
      id: row.noticeCode,
      title: row.noticeTitle,
      description: row.noticeContent,
      imageUrl: row.sysFileList[0].url,
      link: row.remark ?? ''
    })
  }
  return result
}
