export const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase()
  switch (extension) {
    case 'pdf':
      return new URL('@/assets/icon/demand/pdf.png', import.meta.url).href // PDF 图标
    case 'doc':
    case 'docx':
      return new URL('@/assets/icon/demand/word.png', import.meta.url).href // Word 文档图标
    case 'xls':
    case 'xlsx':
      return new URL('@/assets/icon/demand/excel.png', import.meta.url).href // Excel 文档图标
    case 'ppt':
    case 'pptx':
      return new URL('@/assets/icon/demand/ppt.png', import.meta.url).href // PPT 文档图标
    case 'txt':
      return new URL('@/assets/icon/demand/txt.png', import.meta.url).href // 文本文件图标
    case 'jpg':
    case 'jpeg':
    case 'png':
      return new URL('@/assets/icon/demand/pic.png', import.meta.url).href // 图片文件图标
    case 'rar':
    case 'zip':
      return new URL('@/assets/icon/demand/zip.png', import.meta.url).href // 压缩文件图标
    default:
      return new URL('@/assets/icon/demand/common.png', import.meta.url).href // 通用文件图标
  }
}
