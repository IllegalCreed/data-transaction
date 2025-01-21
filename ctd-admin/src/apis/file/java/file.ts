import request from '@/axios'

export const upload = (file: File): Promise<unknown> => {
  const data = {
    file
  }
  return request.post(
    {
      url: '/file/upload',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    },
    true
  )
}
