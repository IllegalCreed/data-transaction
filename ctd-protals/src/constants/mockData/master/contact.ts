import type { IContact } from '@/types/master'

export const contact: IContact = {
  address: '北京市通州区运河东大街临6号北投西院',
  email: 'btzh@bj-big.com',
  phone: '010-89588957',
  wechatUrl: new URL('@/assets/mock/qrcode.png', import.meta.url).href
}
