import request from '@/axios'
import type { ILogin } from '@/types/login'

export const login = (login: ILogin): Promise<unknown> => {
  const data = {
    ...login
  }
  return request.post(
    {
      url: '/platform/login',
      data
    },
    false
  )
}
