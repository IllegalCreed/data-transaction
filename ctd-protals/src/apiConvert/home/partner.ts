import type { IPartner } from '@/types/home'
interface IAdFetchData {
  createBy: ''
  createTime: ''
  noticeCode: ''
  noticeContent: ''
  noticeId: number
  noticeTime?: ''
  noticeTitle: ''
  noticeType: ''
  remark?: ''
  status: ''
  sysFileList: {
    columnId: number
    createBy: ''
    createTime: ''
    fileCode: ''
    fileSize: ''
    fileType: ''
    name: ''
    remark?: ''
    updateBy: ''
    updateTime?: ''
    url: ''
  }[]
  updateBy: ''
  updateTime?: ''
}

export const partnerConvert = (raw: unknown) => {
  const data = raw as IAdFetchData[]
  const result: IPartner[] = []
  for (const row of data) {
    result.push({
      id: row.noticeCode,
      title: row.noticeTitle,
      description: row.noticeContent,
      imageUrl: row.sysFileList[0].url,
      link: row.remark ?? '',
    })
  }
  return result
}
