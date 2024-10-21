export interface IRegisterAdCarouselItem {
  id: string | number
  title: string
  comment: string
  imageUrl: string
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
