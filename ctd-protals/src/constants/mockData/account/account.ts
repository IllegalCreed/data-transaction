import type { UserInfo } from '@/types/account'
import { UserType } from '@/types/register'

export const userInfo: UserInfo = {
  userName: 'test@test.com',
  email: 'test@test.com',
  avatar: new URL('@/assets/icon/user.png', import.meta.url).href,
  fullName: '爱旅游的小张',
  userType: UserType.Individual,
  identificationNumber: '123456789012345678',
  phoneNumber: '12345678901',
}
