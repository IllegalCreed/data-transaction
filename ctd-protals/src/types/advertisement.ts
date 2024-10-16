export interface ILoginAd {
  title: string
  desc: string
  carousels: ILoginAdCarouselItem[]
}

export interface ILoginAdCarouselItem {
  id: string
  title: string
  name: string
  comment: string
  avatar: string
}

export interface IAdFetchData {
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
