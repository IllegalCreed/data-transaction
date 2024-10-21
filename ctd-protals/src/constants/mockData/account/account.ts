import type { IUserInfo } from '@/types/master'

export const userInfo: IUserInfo = {
  avatar: new URL('@/assets/icon/user.png', import.meta.url).href,
  name: '爱旅游的小张',
  role: '普通用户',
}
