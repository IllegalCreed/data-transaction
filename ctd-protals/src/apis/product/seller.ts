import request from '@/axios'

export const getSeller = (id: string | number): Promise<unknown> => {
  return request.post(
    {
      url: `/getSeller/${id}`
    },
    false
  )
}
