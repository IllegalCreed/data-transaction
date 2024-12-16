import request from '@/axios'

export const getCaptcha = (): Promise<unknown> => {
  return request.get(
    {
      url: '/captcha'
    },
    false
  )
}
