import request from '@/axios'

export const getSeller = (id: string | number): Promise<void> => {
  return request.post(
    {
      url: `/getSeller/${id}`
    },
    false
  )
}
